"use client";

import { clientLogos } from "../data/clientLogos";

const ClientLogos = () => {
  return (
    <section className="bg-canvas py-16 screen-line-top sm:py-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[13px] text-muted">
          Trusted by companies and operators across
        </p>
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12">
          {clientLogos.map((logo) => (
            <span
              key={logo.name}
              className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.3px] text-ink"
            >
              <img src={logo.src} alt="" className="h-5 w-5 object-contain" />
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
