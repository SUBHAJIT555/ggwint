"use client";

import { brandLogos, type ClientLogo } from "../../data/clientLogos";
import { LogosCarousel } from "./LogosCarousel";

const BrandRow = ({
  caption = "Proud Partners of Excellence and Innovation",
  logos = brandLogos,
}: {
  caption?: string;
  logos?: ClientLogo[];
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className="max-w-2xl text-balance text-center text-sm font-medium text-ink">
        {caption}
      </p>
      <LogosCarousel
        columnCount={4}
        compact
        cellClassName="h-12 sm:h-14 sm:min-w-36"
      >
        {logos.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt=""
            className="h-10 w-full object-contain sm:h-12"
          />
        ))}
      </LogosCarousel>
    </div>
  );
};

export default BrandRow;
