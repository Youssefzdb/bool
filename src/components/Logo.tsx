// Colored wordmark logo — drawn from scratch (letters get their own hues).
const palette: Record<string, string> = {
  b: "#2f6bff",
  o1: "#ff7a1a",
  o2: "#ff4337",
  l: "#a04dff",
  plus: "#0e0f13",
};

export function LogoMark({ size = 24 }: { size?: number }) {
  // abstract bird/spark mark, all original curves
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M6 24c1.8-6.5 6.4-11.4 12.4-13.2C22 9.5 25 9.9 27 11.6c-2.2.4-4.2 1.6-5.7 3.3-2.5 2.9-4.6 6.8-5.9 9.1H6Z"
        fill="#2f6bff"
      />
      <circle cx="24.3" cy="8.2" r="2.1" fill="#ff4337" />
      <path d="M27.5 6.2l-.7 1.7-1.7.7 1.7.7.7 1.7.7-1.7 1.7-.7-1.7-.7-.7-1.7Z" fill="#0e0f13" />
    </svg>
  );
}

export function LogoWord({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        display: "inline-flex",
        gap: "0.5px",
        alignItems: "baseline",
      }}
    >
      <span style={{ color: palette.b }}>b</span>
      <span style={{ color: palette.o1 }}>o</span>
      <span style={{ color: palette.o2 }}>o</span>
      <span style={{ color: palette.l }}>l</span>
      <span style={{ color: "#a04dff", fontSize: size * 0.55, marginLeft: 0 }}>✦</span>
    </span>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <LogoMark size={size + 4} />
      <LogoWord size={size} />
    </span>
  );
}
