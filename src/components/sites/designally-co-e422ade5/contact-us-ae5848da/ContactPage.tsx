"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { ArrowUpRightIcon } from "@/components/sites/designally-co-e422ade5/shared/icons";
import { cn } from "@/lib/utils";

/**
 * designally.co — /contact-us/ page body (site key designally-co-e422ade5,
 * page key contact-us-ae5848da).
 *
 * The five page-specific sections live in this one file; none of them is reused
 * anywhere else on the site. Everything below is measured from the live page at
 * 1440x900 — see
 * docs/research/designally-co-e422ade5/contact-us-ae5848da/extract-contact.json
 * and .../components/contact-page.spec.md.
 *
 * Container note: this page does NOT use the homepage's fluid 75% `.dsg-container`.
 * Every section's inner is a fixed `max-width: 1200px`, centred — reproduced here by
 * the local `PageContainer`, with the horizontal gutter carried on the section.
 *
 * Only the desktop breakpoint (1440) was measured. Type scales below `desk`
 * (1025px) follow the spec's guidance and are flagged in the build report.
 */

/** Section gutter. Above ~1280px the 1200px cap wins, so the desktop metrics hold. */
const SECTION_PADDING = "px-5 tab:px-10";

/** Live inner box: `max-width: 1200px`, centred (`margin: 0 112.5px` at 1425px). */
function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px]", className)}>{children}</div>
  );
}

type IconProps = React.SVGProps<SVGSVGElement>;

/** Artwork saved verbatim from the live DOM. */
const SVG_BASE = "/sites/designally-co-e422ade5/contact-us-ae5848da/svg";
const IMAGE_BASE = "/sites/designally-co-e422ade5/contact-us-ae5848da/images";

/*
 * The artwork under `SVG_BASE` is multi-path, with fills baked into the files, so
 * every mark below is referenced as a plain `<img>` — never inlined or recoloured.
 * (`next/image` will not optimise an SVG without `dangerouslyAllowSVG`, which is
 * why these are plain `<img>` rather than `<Image>`; the QR bitmap does use
 * `next/image`.)
 *
 * The two exceptions are the phone and envelope glyphs: no inline SVG source for
 * those was recoverable from the live page, so they stay as redraws at the
 * measured boxes — they are the only invented artwork left on this page.
 */

/** Phone handset — measured box 28 x 34, next to `+66 65 005 5993`. */
function PhoneIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 34"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="4.1"
        y="1.1"
        width="19.8"
        height="31.8"
        rx="3.4"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M11.4 5.6h5.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="28" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Envelope — measured box 28 x 28, next to `clients@designally.co`. */
function MailIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="1.6"
        y="5.1"
        width="24.8"
        height="17.8"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M2.8 7.2 14 15.4 25.2 7.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ContactChannel {
  /** Poppins 18 / 400 / lh 23.4, rgb(114, 120, 164). */
  label: string;
  /** Poppins 28 / 500, rgb(33, 33, 33). */
  value: string;
  href: string;
  /** External links open in a new tab, as on the live site. */
  external?: boolean;
  /** Rendered at the measured icon box inside the 28 x 34 slot. */
  icon: React.ReactNode;
}

const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    label: "TALK WITH US",
    value: "+66 65 005 5993",
    href: "tel:0650055993",
    icon: <PhoneIcon className="h-[34px] w-[28px]" />,
  },
  {
    label: "DROP US A LINE",
    value: "clients@designally.co",
    href: "mailto:clients@designally.co",
    icon: <MailIcon className="h-[28px] w-[28px]" />,
  },
  {
    label: "ADD LINE",
    value: "@designally",
    href: "https://line.me/ti/p/%40designally",
    external: true,
    // LINE mark, verbatim from the live DOM: viewBox "0 0 24 24", rendered 28 x 28.
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${SVG_BASE}/line-icon.svg`}
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
        className="block h-[28px] w-[28px]"
      />
    ),
  },
];

/**
 * 1. Hero + contact details — live section `7fa1ce5`, 1425 x 449.
 * Inner: max-width 1200, `padding: 80px 0 120px`.
 */
function ContactHero() {
  return (
    <section className={cn("flex w-full flex-col", SECTION_PADDING)}>
      <PageContainer className="flex flex-col pt-[60px] pb-[80px] desk:pt-[80px] desk:pb-[120px]">
        {/* Headline row: flex, gap 16px, padding-bottom 60px, height 124. */}
        <h1 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-10 font-serif text-[40px] leading-[1.05] desk:pb-[60px] desk:text-[64px] desk:leading-[64px]">
          <span className="font-medium text-dsg-ink-strong">Have a project in Mind?</span>
          <span className="font-semibold text-dsg-orange">Let’s talk.</span>
        </h1>

        {/* Contact row: space-between at desktop, stacked below 768px. */}
        <div className="flex flex-col gap-10 tab:flex-row tab:flex-wrap tab:items-center tab:justify-between tab:gap-x-8">
          {CONTACT_CHANNELS.map((channel) => {
            return (
              <div key={channel.label} className="flex flex-col items-start gap-2">
                <h2 className="font-sans text-[18px] leading-[23.4px] font-normal text-[rgb(114,120,164)]">
                  {channel.label}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="flex h-[34px] w-[28px] shrink-0 items-center justify-center text-dsg-ink-strong">
                    {channel.icon}
                  </span>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-sans text-[22px] leading-[1.3] font-medium text-dsg-ink-strong transition-colors hover:text-dsg-orange desk:text-[28px]"
                  >
                    {channel.value}
                  </a>
                </div>
              </div>
            );
          })}

          {/* LINE QR code — 800 x 800 source rendered at 125 x 125, desktop only. */}
          <Image
            src={`${IMAGE_BASE}/qr-code-3-1024x1024.png`}
            alt=""
            width={800}
            height={800}
            aria-hidden="true"
            className="hidden h-[125px] w-[125px] desk:block"
          />
        </div>
      </PageContainer>
    </section>
  );
}

/**
 * 2. "Don't be shy" band — live section `463aaa2`, 1425 x 414, `padding: 0 10px`.
 *
 * The extraction captured no background for this section, but its only text is
 * `rgb(255, 255, 255)` — so per the spec it is painted brand orange here. The
 * headline block carries an Elementor `e-transform`: its 180 x 80 box paints into a
 * 197 x 146 rect, which solves to a ~24deg rotation (direction assumed).
 */
function ContactHello() {
  return (
    <section className="w-full bg-dsg-orange px-[10px]">
      <PageContainer className="flex min-h-[320px] flex-col items-center justify-end gap-5 py-[10px] desk:min-h-[414px] desk:items-end">
        <p className="-rotate-[24deg] text-center font-[family-name:var(--font-hand)] text-[40px] leading-[40px] font-bold whitespace-pre-line text-white">
          {"Don’t be shy,\nsay hello!"}
        </p>
        {/*
          Hand-drawn arrow, verbatim from the live DOM: viewBox "0 0 80 124",
          rendered 90 x 140. On the live page it is pulled 98px below the band
          (`margin: 0 64px -98px 0`); it is kept inside the band here so the white
          mark stays on the orange ground rather than bleeding onto the white
          section below.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SVG_BASE}/say-hello-arrow.svg`}
          alt=""
          width={80}
          height={124}
          aria-hidden="true"
          className="block h-[140px] w-[90px] max-w-none desk:mr-16"
        />
      </PageContainer>
    </section>
  );
}

/** The six "Interested in" checkboxes, in the live order. */
const SERVICE_OPTIONS: readonly string[] = [
  "Brand Identity",
  "Website Design + Dev",
  "Brand Guideline",
  "Brand Strategy",
  "Design Support",
  "Other",
];

/** Full acceptance copy, verbatim from the extraction (two lines). */
const ACCEPTANCE_TEXT = [
  "I agree to the DESIGNALLY agreement and customer Privacy Policy",
  "I also agree to be contacted at the number provided with more information or offers about DESIGNALLY services.",
];

interface ContactFormValues {
  services: string[];
  fullname: string;
  companyName: string;
  briefly: string;
  email: string;
  phone: string;
  acceptance: boolean;
}

const EMPTY_FORM: ContactFormValues = {
  services: [],
  fullname: "",
  companyName: "",
  briefly: "",
  email: "",
  phone: "",
  acceptance: false,
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/** Poppins 32 / 400 / lh 48, rgb(33, 33, 33) — the mad-libs sentence runs. */
const SENTENCE_RUN =
  "font-sans text-[22px] leading-[34px] font-normal text-dsg-ink-strong tab:text-[26px] tab:leading-[40px] desk:text-[32px] desk:leading-[48px]";

/**
 * Measured input: Poppins 16px, `rgb(33, 33, 33)`, white ground,
 * `border-bottom: 1px solid rgb(33, 33, 33)`, `padding: 8px 0`, height 41.
 */
const FIELD_INPUT =
  "h-[41px] w-full border-b bg-white px-0 py-2 font-sans text-[16px] leading-[24px] text-dsg-ink-strong outline-none transition-colors placeholder:text-dsg-ink-strong/50 focus:border-dsg-orange";

/**
 * 3. Inquiry form — live section `e259632`, 1425 x 913, inner `padding: 160px 0`.
 *
 * IMPORTANT — THIS FORM DOES NOT SUBMIT ANYWHERE.
 * This is a static clone with no backend: there is no action, no endpoint, no
 * mail transport and no third-party service. `handleSubmit` calls
 * `event.preventDefault()`, validates in the browser and swaps in an inline
 * success state. Nothing leaves the page and nobody receives the message — do not
 * assume otherwise, and wire a real handler before using this in production.
 *
 * The live DOM renders this form three times (Elementor desktop / tablet / mobile
 * variants, 48 inputs in total). This is the single responsive equivalent, with
 * the 16 real fields.
 */
function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSent, setIsSent] = useState(false);

  const toggleService = (option: string) => {
    setValues((current) => ({
      ...current,
      services: current.services.includes(option)
        ? current.services.filter((entry) => entry !== option)
        : [...current.services, option],
    }));
  };

  const setField = (
    field: "fullname" | "companyName" | "briefly" | "email" | "phone",
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (candidate: ContactFormValues): ContactFormErrors => {
    const next: ContactFormErrors = {};
    if (!candidate.fullname.trim()) next.fullname = "Please enter your name.";
    if (!candidate.companyName.trim())
      next.companyName = "Please enter your company name.";
    if (!candidate.briefly.trim())
      next.briefly = "Please tell us a little about the project.";
    if (!candidate.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!candidate.acceptance)
      next.acceptance = "Please accept the agreement to continue.";
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // No network call is made here, by design — see the block comment above.
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setIsSent(true);
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setIsSent(false);
  };

  return (
    <section className={cn("flex w-full flex-col", SECTION_PADDING)}>
      <PageContainer className="flex flex-col py-[80px] desk:py-[160px]">
        {/* Heading row: flex, gap 16px, padding-bottom 40px. */}
        <h2 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-10 font-serif text-[40px] leading-[1.05] font-medium desk:min-h-[131px] desk:items-center desk:text-[64px] desk:leading-[64px]">
          <span className="text-dsg-ink-strong">Which services are you</span>
          {/*
            Elementor headline highlight — the loop drawn around "interested in?".
            Path copied verbatim from `heading-highlight.svg` (viewBox "0 0 500 150",
            `preserveAspectRatio="none"`, rendered 460 x 103).

            This is the ONE recovered mark that is inlined rather than referenced as
            an `<img>`, and it has to be: the file carries no `fill`/`stroke` at all
            (Elementor drives them from CSS), so as an `<img>` the browser applies
            the SVG default — an opaque black fill — which blots out the heading.
            Inlined, it can be what it is meant to be: unfilled, stroked, and
            painted in the brand orange. Stroke width and colour are the only
            invented values here.
          */}
          <span className="relative inline-block text-dsg-ink">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[103px] w-[460px] max-w-none -translate-x-1/2 -translate-y-1/2 text-dsg-orange desk:block"
            >
              <path
                d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>
            <span className="relative">interested in?</span>
          </span>
        </h2>

        {isSent ? (
          <div
            role="status"
            className="flex flex-col items-start gap-4 border-b border-dsg-ink-strong pb-10"
          >
            <p className={SENTENCE_RUN}>
              Thanks{values.fullname.trim() ? `, ${values.fullname.trim()}` : ""} — your
              inquiry is noted.
            </p>
            <p className="font-sans text-[16px] leading-[24px] text-dsg-ink">
              This is a clone of designally.co with no backend, so nothing was sent
              anywhere. On the live site the team replies within one business day.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-[200px] border border-dsg-orange px-8 py-4 font-sans text-[16px] leading-[19.2px] font-medium text-dsg-orange transition-colors hover:bg-dsg-orange hover:text-white"
            >
              Write another
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Field 1 — "Interested in" checkbox group, six inline options. */}
            <fieldset className="flex flex-col gap-3">
              <legend className="sr-only">Interested in</legend>
              <div className="flex flex-wrap items-center gap-3 desk:min-h-[58px]">
                {SERVICE_OPTIONS.map((option) => {
                  const isChecked = values.services.includes(option);
                  return (
                    <label
                      key={option}
                      className={cn(
                        "cursor-pointer rounded-[500px] border px-5 py-2 font-sans text-[16px] leading-[24px] transition-colors",
                        isChecked
                          ? "border-dsg-orange bg-dsg-orange text-white"
                          : "border-dsg-ink-strong/30 text-dsg-ink-strong hover:border-dsg-ink-strong",
                      )}
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={option}
                        checked={isChecked}
                        onChange={() => toggleService(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Fields 2 + 3 — "My name's [ ] from [ ]". */}
            <div className="flex flex-col gap-x-6 gap-y-4 tab:flex-row tab:flex-wrap tab:items-center">
              <span className={SENTENCE_RUN}>My name’s</span>
              <div className="flex min-w-[220px] shrink grow basis-[466px] flex-col gap-1">
                <label htmlFor={`${formId}-fullname`} className="sr-only">
                  Input name
                </label>
                <input
                  id={`${formId}-fullname`}
                  name="fullname"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={values.fullname}
                  onChange={(event) => setField("fullname", event.target.value)}
                  aria-invalid={Boolean(errors.fullname)}
                  className={cn(
                    FIELD_INPUT,
                    errors.fullname ? "border-dsg-orange" : "border-dsg-ink-strong",
                  )}
                />
                {errors.fullname ? (
                  <span className="font-sans text-[13px] text-dsg-orange">
                    {errors.fullname}
                  </span>
                ) : null}
              </div>
              <span className={SENTENCE_RUN}>from</span>
              <div className="flex min-w-[220px] shrink grow basis-[411px] flex-col gap-1">
                <label htmlFor={`${formId}-company`} className="sr-only">
                  Company name
                </label>
                <input
                  id={`${formId}-company`}
                  name="company_name"
                  type="text"
                  required
                  placeholder="Enter your company name"
                  value={values.companyName}
                  onChange={(event) => setField("companyName", event.target.value)}
                  aria-invalid={Boolean(errors.companyName)}
                  className={cn(
                    FIELD_INPUT,
                    errors.companyName ? "border-dsg-orange" : "border-dsg-ink-strong",
                  )}
                />
                {errors.companyName ? (
                  <span className="font-sans text-[13px] text-dsg-orange">
                    {errors.companyName}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Field 4 — "I'd like to discuss about [ ]". */}
            <div className="flex flex-col gap-x-6 gap-y-4 tab:flex-row tab:flex-wrap tab:items-center">
              <span className={SENTENCE_RUN}>I’d like to discuss about</span>
              <div className="flex min-w-[220px] shrink grow basis-[803px] flex-col gap-1">
                <label htmlFor={`${formId}-briefly`} className="sr-only">
                  Briefly
                </label>
                <input
                  id={`${formId}-briefly`}
                  name="briefly"
                  type="text"
                  required
                  placeholder="Briefly describe your project or idea."
                  value={values.briefly}
                  onChange={(event) => setField("briefly", event.target.value)}
                  aria-invalid={Boolean(errors.briefly)}
                  className={cn(
                    FIELD_INPUT,
                    errors.briefly ? "border-dsg-orange" : "border-dsg-ink-strong",
                  )}
                />
                {errors.briefly ? (
                  <span className="font-sans text-[13px] text-dsg-orange">
                    {errors.briefly}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Fields 5 + 6 — "Feel free to contact me at [ ] or [ ]". */}
            <div className="flex flex-col gap-x-6 gap-y-4 tab:flex-row tab:flex-wrap tab:items-center">
              <span className={SENTENCE_RUN}>Feel free to contact me at</span>
              <div className="flex min-w-[220px] shrink grow basis-[341px] flex-col gap-1">
                <label htmlFor={`${formId}-email`} className="sr-only">
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={cn(
                    FIELD_INPUT,
                    errors.email ? "border-dsg-orange" : "border-dsg-ink-strong",
                  )}
                />
                {errors.email ? (
                  <span className="font-sans text-[13px] text-dsg-orange">
                    {errors.email}
                  </span>
                ) : null}
              </div>
              <span className={SENTENCE_RUN}>or</span>
              <div className="flex min-w-[220px] shrink grow basis-[341px] flex-col gap-1">
                <label htmlFor={`${formId}-phone`} className="sr-only">
                  Phone
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone no."
                  value={values.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  className={cn(FIELD_INPUT, "border-dsg-ink-strong")}
                />
              </div>
            </div>

            {/*
              Field 7 (acceptance, required) + field 8 (submit). On the live page the
              button is pulled up 100px so it sits alongside the acceptance block; at
              desktop that reads as bottom-aligned, which is what is reproduced here.
              The submit widget is its own full-width group there — a 1px box with a
              24px bottom margin — so that 25px is carried here as padding instead.
            */}
            <div className="flex flex-col gap-8 desk:flex-row desk:items-end desk:justify-between desk:pb-[25px]">
              <div className="flex max-w-[588px] flex-col gap-1 desk:min-h-[109px]">
                <label className="flex items-start gap-3" htmlFor={`${formId}-acceptance`}>
                  <input
                    id={`${formId}-acceptance`}
                    name="acceptance"
                    type="checkbox"
                    required
                    checked={values.acceptance}
                    onChange={(event) => {
                      const { checked } = event.target;
                      setValues((current) => ({ ...current, acceptance: checked }));
                      setErrors((current) => ({ ...current, acceptance: undefined }));
                    }}
                    aria-invalid={Boolean(errors.acceptance)}
                    className="mt-[6px] h-[13px] w-[13px] shrink-0 accent-dsg-orange"
                  />
                  <span className="font-sans text-[16px] leading-[24px] text-dsg-ink-strong">
                    {ACCEPTANCE_TEXT[0]}
                    <br />
                    {ACCEPTANCE_TEXT[1]}
                  </span>
                </label>
                {errors.acceptance ? (
                  <span className="font-sans text-[13px] text-dsg-orange">
                    {errors.acceptance}
                  </span>
                ) : null}
              </div>

              <div className="flex justify-start desk:justify-end">
                <button
                  type="submit"
                  className="flex h-[60px] items-center gap-[10px] rounded-[500px] bg-dsg-ink-strong px-6 font-sans text-[24px] leading-[60px] font-normal text-white transition-opacity hover:opacity-90 tab:text-[32px] desk:min-w-[343px] desk:text-[40px]"
                >
                  {/* Same ↗ mark the shared components use, painted white here. */}
                  <ArrowUpRightIcon className="h-[28px] w-[28px] shrink-0 desk:h-[40px] desk:w-[40px]" />
                  Send inquiry
                </button>
              </div>
            </div>
          </form>
        )}

        {/*
          Decorative mark under the form (live widget `7c88910`): viewBox
          "0 0 124 69", rendered 115 x 64, pulled up 40px and offset 80px right of
          centre by the widget's `margin: -40px -160px 0 0`.
        */}
        <div className="mt-[-40px] flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SVG_BASE}/form-mark.svg`}
            alt=""
            width={124}
            height={69}
            aria-hidden="true"
            className="block h-[64px] w-[115px] max-w-none desk:translate-x-[80px]"
          />
        </div>
      </PageContainer>
    </section>
  );
}

/** Exact embed URL from the live iframe — a keyless Google Maps embed. */
const MAP_SRC = "https://maps.google.com/maps?q=Designally&t=m&z=15&output=embed&iwloc=near";

/** 4. Google map — live section `5eae665`, full-bleed iframe 1425 x 500. */
function ContactMap() {
  return (
    <section className="w-full">
      <iframe
        src={MAP_SRC}
        title="DESIGNALLY on Google Maps"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full border-0 desk:h-[500px]"
      />
    </section>
  );
}

/** Support ticket form — external, so it keeps its absolute URL. */
const TICKET_URL = "https://forms.clickup.com/3819042/f/3mhh2-27922/WC7V6SY2IUXE41Y9AF";

/**
 * 5. Customer support — live section `d1348f0`, 1425 x 501.
 * Inner: centred column, `gap: 24px`, `padding: 120px 0`.
 */
function ContactSupport() {
  return (
    <section className={cn("flex w-full flex-col", SECTION_PADDING)}>
      <PageContainer className="flex flex-col items-center gap-6 py-[80px] text-center desk:py-[120px]">
        {/*
          Both marks are absolutely positioned on the live page, so they overlay the
          heading without shifting its centring: the left one (viewBox "0 0 68 53",
          62 x 48) sits 68px left of line 1 and 8px above it; the right one
          (viewBox "0 0 67 73", 73 x 77) sits just right of line 2, raised 26px.
          Desktop only — below `desk` they would collide with the wrapping text.
        */}
        <h2 className="flex flex-col items-center gap-2 font-sans text-[28px] leading-[1.15] font-medium text-dsg-ink-strong desk:text-[40px] desk:leading-[40px]">
          <span className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SVG_BASE}/support-mark-left.svg`}
              alt=""
              width={68}
              height={53}
              aria-hidden="true"
              className="pointer-events-none absolute top-[-8px] right-[calc(100%+68px)] hidden h-[48px] w-[62px] max-w-none desk:block"
            />
            If you need some help
          </span>
          <span className="relative">
            contact our customer support
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SVG_BASE}/support-mark-right.svg`}
              alt=""
              width={67}
              height={73}
              aria-hidden="true"
              className="pointer-events-none absolute top-[-26px] left-[calc(100%+5px)] hidden h-[77px] w-[73px] max-w-none desk:block"
            />
          </span>
        </h2>
        <p className="w-full max-w-[600px] font-sans text-[16px] leading-[24px] font-normal text-dsg-ink-strong">
          For website support or assistance with existing projects, please submit a
          ticket. This will help us gather the necessary information to assist you
          promptly.
        </p>
        <a
          href={TICKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-[200px] border border-dsg-orange px-8 py-4 font-sans text-[16px] leading-[19.2px] font-medium text-dsg-orange transition-colors hover:bg-dsg-orange hover:text-white"
        >
          Send us a ticket
        </a>
      </PageContainer>
    </section>
  );
}

/** The five page-specific sections of /contact-us/, in live order. */
export function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactHello />
      <ContactForm />
      <ContactMap />
      <ContactSupport />
    </>
  );
}
