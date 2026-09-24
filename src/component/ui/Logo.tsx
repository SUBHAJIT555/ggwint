const Logo = ({
  className = "",
  mark = "full",
}: {
  className?: string;
  variant?: "on-dark" | "on-light";
  mark?: "full" | "compact";
}) => {
  if (mark === "compact") {
    return (
      <span className={`flex items-center gap-2.5 ${className}`}>
        <img
          src="/images/GGWIcon.png"
          alt=""
          className="size-10 object-contain"
        />
        <span className="leading-[1.15] text-ink">
          <span className="block text-[11px] font-semibold tracking-[0.04em] sm:text-xs">
            G G W INTERNATIONAL
          </span>
          <span className="block text-[9px] tracking-wide text-muted sm:text-[10px]">
            GENERAL TRADING L.L.C
          </span>
        </span>
      </span>
    );
  }

  return (
    <img
      src="/images/GGWLogo.png"
      alt="G G W INTERNATIONAL GENERAL TRADING L.L.C"
      className={`block w-auto max-w-none object-contain object-left ${className}`}
    />
  );
};

export default Logo;
