"use client";

import { clientLogos } from "../data/clientLogos";

const ClientLogos = () => {
  return (
    <section className="bg-canvas py-16 screen-line-top sm:py-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[13px] text-muted">
          Trusted by companies and operators across
        </p>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-3 items-center gap-x-3 gap-y-5 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-6">
          {clientLogos.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt=""
              className="h-9 w-full object-contain sm:h-12 sm:w-32"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
