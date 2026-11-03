import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
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
  whatsappUrl,
} from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search["package"] === "string" ? search["package"] : undefined,
    intent: typeof search["intent"] === "string" ? search["intent"] : undefined,
  }),
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Apex Pixels" },
      {
        name: "description",
        content:
          "Start a conversation with Apex Pixels: message on WhatsApp, book a 15-minute call, or send an enquiry.",
      },
      { property: "og:title", content: "Contact — Apex Pixels" },
      {
        property: "og:description",
        content:
          "Message on WhatsApp, book a 15-minute call, or send an enquiry. Pick whichever way is easiest.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const packageIds = packages.map((p) => p.id);

const schema = z.object({
  fullName: z.string().min(1, "Please enter your full name"),
  businessName: z.string(),
  phone: z.string().min(1, "Please enter a phone or WhatsApp number"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  need: z.string(),
  pkg: z.string(),
  timeline: z.string(),
  message: z.string(),
});

type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const { package: packageParam } = Route.useSearch();
  const presetPackage =
    packageParam && packageIds.includes(packageParam) ? packageParam : "unsure";

  const {
    register,
    control,
    handleSubmit,
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
    },
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    // Prompt 4 connects the form. Until then, valid submissions are acknowledged inline.
  };

  return (
    <main>
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
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Send an enquiry
            </h2>
            <form
              className="mt-6 grid gap-5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
              }}
              noValidate
            >
              <Field
                label="Full name"
                required
                error={errors.fullName?.message}
                className="sm:col-span-1"
              >
                <Input {...register("fullName")} aria-required="true" />
              </Field>

              <Field label="Business name" className="sm:col-span-1">
                <Input {...register("businessName")} />
              </Field>

              <Field
                label="Phone or WhatsApp number"
                required
                error={errors.phone?.message}
              >
                <Input {...register("phone")} type="tel" aria-required="true" />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <Input {...register("email")} type="email" />
              </Field>

              <Field label="What do you need?" className="sm:col-span-1">
                <Controller
                  control={control}
                  name="need"
                  render={({ field }) => (
                    <Select {...(field.value ? { value: field.value } : {})} onValueChange={field.onChange}>
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
                    <Select {...(field.value ? { value: field.value } : {})} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} — {pkg.price}
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
                    <Select {...(field.value ? { value: field.value } : {})} onValueChange={field.onChange}>
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

              <Field label="Message" className="sm:col-span-2">
                <Textarea {...register("message")} rows={5} />
              </Field>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-orange px-7 text-base font-semibold text-ink shadow-glow-orange transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-glow-orange-strong active:translate-y-0 active:brightness-95"
                >
                  Send the enquiry
                </button>
                <p className="muted mt-4 text-xs">
                  By sending this form you agree to be contacted about your
                  enquiry. See the{" "}
                  <SmartLink
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-orange"
                  >
                    Privacy
                  </SmartLink>{" "}
                  page.
                </p>
              </div>
            </form>
          </Reveal>

          {/* Right: three stacked cards */}
          <Stagger className="flex flex-col gap-4">
            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-green text-white">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                WhatsApp
              </h2>
              <p className="muted mt-1 text-sm">{site.whatsappDisplay}</p>
              <div className="mt-4">
                <ButtonLink href={whatsappUrl} size="sm">
                  Message on WhatsApp
                </ButtonLink>
              </div>
            </StaggerItem>

            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange text-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Book a 15-minute call
              </h2>
              <p className="muted mt-1 text-sm">
                A free call to talk through the project.
              </p>
              <div className="mt-4">
                <ButtonLink href={bookingHref} size="sm">
                  Book a call
                </ButtonLink>
              </div>
            </StaggerItem>

            <StaggerItem className="card-light card-lift p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Email and address
              </h2>
              <p className="mt-1 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="underline underline-offset-2 transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </p>
              <p className="muted mt-1 text-sm">{site.address}</p>
              <p className="muted mt-3 text-sm">
                Replies on WhatsApp are usually quickest.
              </p>
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
  className,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
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
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
