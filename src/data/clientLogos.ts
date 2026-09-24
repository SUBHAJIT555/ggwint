export type ClientLogo = {
  name: string;
  src: string;
};

const logo = (folder: string, label: string, count: number): ClientLogo[] =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const file = `${label}-${number}.webp`;
    return {
      name: file,
      src: `/images/${folder}/${encodeURIComponent(file)}`,
    };
  });

export const clientLogos = logo("OurClientsLogo", "Our Clients-Logo", 22);
export const brandLogos = logo("OurBrandLogos", "Our Brands-Logo", 18);
