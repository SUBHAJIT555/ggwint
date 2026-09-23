import Button from "@/component/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-20">
      <img
        src="/images/404notfound.svg"
        alt=""
        className="h-auto w-full max-w-md"
      />
      <h1 className="mt-8 text-section text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-copy text-body">
        This page is missing or the address is out of date. Head back home, or
        get in touch and we will help you find what you need.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="accent" className="h-11 rounded-lg px-5">
          Back to home
        </Button>
        <Button href="/contact" variant="primary" className="h-11 rounded-lg px-5">
          Contact us
        </Button>
      </div>
    </section>
  );
}
