import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { ButtonLink } from "@/components/site/ButtonLink";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { SmartLink } from "@/components/site/SmartLink";
import { Stripes } from "@/components/site/Stripes";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bookingHref,
  founder,
  mapsUrl,
  needOptions,
  packages,
  site,
  timelineOptions,
  waLink,
  whatsappMessages,
  whatsappUrl,
} from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search["package"] === "string" ? search["package"] : undefined,
    intent: typeof search["intent"] === "string" ? search["intent"] : undefined,
  }),
  component: ContactPage,
  head: () =>
    seo({
      path: "/contact",
      title: "Contact Apex Pixels",
      description:
        "Message Apex Pixels on WhatsApp, book a 15-minute call or send an enquiry about a website, web app or business software project in Chennai or across India.",
    }),
});

const packageIds = packages.map((p) => p.id);

const PHONE_PATTERN = /^(?:\+91|0)?[6-9]\d{9}$/;

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters)")
    .max(80, "Please keep the name under 80 characters"),
  businessName: z.string().max(120, "Please keep this under 120 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone or WhatsApp number")
    .refine((value) => PHONE_PATTERN.test(value.replace(/\s+/g, "")), {
      message: "Enter a 10-digit Indian mobile number, with an optional +91 or 0",
    }),
  email: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  need: z.string(),
  pkg: z.string(),
  timeline: z.string(),
  message: z.string().max(1000, "Please keep the message under 1000 characters"),
  // Honeypot. Real visitors never see or fill this.
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const ENDPOINT = "https://api.web3forms.com/submit";
const COOLDOWN_SECONDS = 10;

type Status = "idle" | "submitting" | "success" | "error" | "whatsapp";

function packageLabel(id: string) {
  return packages.find((p) => p.id === id)?.name ?? "Not sure yet";
}

function enquiryMessage(v: FormValues) {
  const lines = [
    "Hi Apex Pixels, I would like to send an enquiry.",
    `Name: ${v.fullName.trim()}`,
    v.businessName.trim() && `Business: ${v.businessName.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email?.trim() && `Email: ${v.email.trim()}`,
    v.need && `Need: ${v.need}`,
    `Package: ${packageLabel(v.pkg)}`,
    v.timeline && `Timeline: ${v.timeline}`,
    v.message.trim() && `Message: ${v.message.trim()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function ContactPage() {
  const { package: packageParam } = Route.useSearch();
  const presetPackage = packageParam && packageIds.includes(packageParam) ? packageParam : "unsure";

  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const [errorWhatsapp, setErrorWhatsapp] = useState(whatsappUrl);
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      businessName: "",
      phone: "",
      email: "",
      need: "",
      pkg: presetPackage,
      timeline: "",
      message: "",
      botcheck: "",
    },
  });

  useEffect(
    () => () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    },
    [],
  );

  const startCooldown = () => {
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    setCooldown(COOLDOWN_SECONDS);
    cooldownTimer.current = setInterval(() => {
      setCooldown((value) => {
        if (value <= 1) {
          if (cooldownTimer.current) clearInterval(cooldownTimer.current);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // Honeypot filled: pretend success and send nothing.
    if (values.botcheck) {
      setStatus("success");
      return;
    }

    const accessKey = (import.meta.env["VITE_WEB3FORMS_KEY"] as string | undefined) || site.formKey;

    // No access key configured: hand the enquiry to WhatsApp instead.
    if (!accessKey) {
      window.open(waLink(enquiryMessage(values)), "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      startCooldown();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New enquiry from the Apex Pixels website",
          from_name: "Apex Pixels Website",
          name: values.fullName.trim(),
          business: values.businessName.trim(),
          phone: values.phone.trim(),
          email: values.email?.trim() ?? "",
          need: values.need,
          package: packageLabel(values.pkg),
          timeline: values.timeline,
          message: values.message.trim(),
          botcheck: "",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submit failed");
      try {
        sessionStorage.setItem("apx-enquiry-name", values.fullName.trim());
      } catch {
        /* storage can be blocked; the thank-you page works without it */
      }
      setStatus("success");
      reset({
        fullName: "",
        businessName: "",
        phone: "",
        email: "",
        need: "",
        pkg: presetPackage,
        timeline: "",
        message: "",
        botcheck: "",
      });
      void navigate({ to: "/thank-you" });
    } catch {
      setErrorWhatsapp(waLink(enquiryMessage(values)));
      setStatus("error");
    } finally {
      startCooldown();
    }
  };

  const submitting = status === "submitting";
  const submitDisabled = submitting || cooldown > 0;

  return (
    <main id="main">
      <header className="tone-light section-pad pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="container-apx">
          <Reveal>
            <Stripes count={6} itemClassName="h-2.5 w-9" />
            <h1 className="mt-6">Get in touch</h1>
            <p className="muted mt-4 max-w-2xl">Pick whichever way is easiest.</p>
          </Reveal>
        </div>
      </header>

      <section className="tone-light pb-20">
        <div className="container-apx grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: enquiry form */}
          <Reveal className="card-light p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">Send an enquiry</h2>
            {status === "success" ? (
              <div className="mt-6" role="status" aria-live="polite">
                <p className="text-lg font-medium">
                  Thank you. Your enquiry has been sent. A reply will follow by WhatsApp or email.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-full btn-glass-light px-6 text-sm font-semibold text-on-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSubmit(onSubmit)(e);
                }}
                noValidate
                aria-busy={submitting}
              >
                <fieldset disabled={submitting} className="contents">
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Leave this field empty
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("botcheck")}
                      />
                    </label>
                  </div>
                  <Field
                    label="Full name"
                    required
                    error={errors.fullName?.message}
                    errorId="fullName-error"
                    className="sm:col-span-1"
                  >
                    <Input
                      {...register("fullName")}
                      aria-required="true"
                      aria-invalid={errors.fullName ? true : undefined}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                  </Field>

                  <Field label="Business name" className="sm:col-span-1">
                    <Input {...register("businessName")} />
                  </Field>

                  <Field
                    label="Phone or WhatsApp number"
                    required
                    error={errors.phone?.message}
                    errorId="phone-error"
                  >
                    <Input
                      {...register("phone")}
                      type="tel"
                      inputMode="tel"
                      aria-required="true"
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                  </Field>

                  <Field label="Email" error={errors.email?.message} errorId="email-error">
                    <Input
                      {...register("email")}
                      type="email"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>

                  <Field label="What do you need?" className="sm:col-span-1">
                    <Controller
                      control={control}
                      name="need"
                      render={({ field }) => (
                        <Select
                          {...(field.value ? { value: field.value } : {})}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {needOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field label="Package" className="sm:col-span-1">
                    <Controller
                      control={control}
                      name="pkg"
                      render={({ field }) => (
                        <Select
                          {...(field.value ? { value: field.value } : {})}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field label="Rough timeline" className="sm:col-span-2">
                    <Controller
                      control={control}
                      name="timeline"
                      render={({ field }) => (
                        <Select
                          {...(field.value ? { value: field.value } : {})}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelineOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field
                    label="Message"
                    error={errors.message?.message}
                    errorId="message-error"
                    className="sm:col-span-2"
                  >
                    <Textarea
                      {...register("message")}
                      rows={5}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitDisabled}
                      className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full btn-glass-solid btn-glass-orange px-7 text-base font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        "Send the enquiry"
                      )}
                    </button>
                    <div aria-live="polite" className="mt-4 text-sm">
                      {status === "whatsapp" && (
                        <p className="muted">
                          Opening WhatsApp so your enquiry reaches Apex Pixels.
                        </p>
                      )}
                      {status === "error" && (
                        <div role="alert">
                          <p className="text-destructive">
                            Something went wrong. Please try again, or message on WhatsApp.
                          </p>
                          <div className="mt-3">
                            <ButtonLink href={errorWhatsapp} size="sm">
                              Message on WhatsApp
                            </ButtonLink>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="muted mt-4 text-xs">
                      By sending this form you agree to be contacted about your enquiry. See the{" "}
                      <SmartLink
                        href="/privacy"
                        className="underline underline-offset-2 hover:text-orange"
                      >
                        Privacy
                      </SmartLink>{" "}
                      page.
                    </p>
                  </div>
                </fieldset>
              </form>
            )}
          </Reveal>

          {/* Right: three stacked cards */}
          <Stagger className="flex flex-col gap-4">
            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-green text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">WhatsApp</h2>
              <p className="muted mt-1 text-sm">{site.whatsappDisplay}</p>
              <div className="mt-4">
                <ButtonLink href={whatsappUrl} size="sm">
                  Message on WhatsApp
                </ButtonLink>
              </div>
            </StaggerItem>

            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange text-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M8 2v4M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">Book a 15-minute call</h2>
              <p className="muted mt-1 text-sm">A free call to talk through the project.</p>
              <div className="mt-4">
                <ButtonLink href={bookingHref} size="sm">
                  Book a call
                </ButtonLink>
              </div>
            </StaggerItem>

            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">Email and address</h2>
              <p className="mt-1 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="underline underline-offset-2 transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </p>
              <p className="muted mt-1 text-sm">{site.address}</p>
              <p className="muted mt-3 text-sm">Replies on WhatsApp are usually quickest.</p>
              <div className="mt-4">
                <ButtonLink href={mapsUrl} variant="outline-light" size="sm">
                  View on Google Maps
                </ButtonLink>
              </div>
            </StaggerItem>

            <p className="muted px-1 text-xs">
              Founded by {founder.name}. Apex Pixels works from {site.location}.
            </p>
          </Stagger>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  errorId?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="font-medium text-on-light">
        {label}
        {required && <span className="text-orange"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <span id={errorId} className="mt-1 block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
