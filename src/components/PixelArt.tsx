// Procedural pixel-art landscape, drawn from scratch — seeded noise, no external images.
type Variant = "warm" | "cool";

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const WIDTH = 120;
const HEIGHT = 68;

export default function PixelArt({
  variant = "warm",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const rand = lcg(variant === "warm" ? 42 : 1337);

  // layered color ramps: sky → horizon glow → hills → field
  const sky: string[] =
    variant === "warm"
      ? ["#b7c6e6", "#c9d3ea", "#e8c9b0", "#f6b98d", "#fcd9a8"]
      : ["#dfe7f2", "#cdd9ec", "#b7c4e4", "#a3b3d9", "#96a8d4"];
  const hills = variant === "warm" ? ["#8fae8b", "#7d9d7f", "#6c8d74"] : ["#7e94d1", "#6c81c2", "#5b6fae"];
  const field = variant === "warm" ? ["#5f7d60", "#526e55", "#46604b", "#3a5241", "#2f4536"] : ["#4a5da0", "#40508c", "#364278", "#2c3664", "#232a50"];

  const total = sky.length + hills.length + field.length;
  const bandH = HEIGHT / total;

  const cells: { x: number; y: number; w: number; h: number; fill: string }[] = [];

  // sky bands
  sky.forEach((fill, row) => {
    const y = row * bandH;
    // gentle stepped horizon noise
    for (let x = 0; x < WIDTH; x += 8) {
      const jitter = Math.floor(rand() * 3) - 1;
      cells.push({ x, y: y + jitter, w: 8, h: bandH + 1, fill });
    }
  });

  // sun / moon — a pixelated disc on the glow row (warm only; cool keeps clean sky)
  if (variant === "warm") {
    const sunY = (sky.length - 2) * bandH + 2;
    const sunX = WIDTH * 0.38;
    const sunFill = "#fff3c4";
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -6; dx <= 6; dx++) {
        const d = (dx / 6.4) ** 2 + (dy / 4.6) ** 2;
        if (d <= 1) {
          cells.push({
            x: sunX + dx * 1.6,
            y: sunY + dy * 1.2,
            w: 1.7,
            h: 1.3,
            fill: sunFill,
          });
        }
      }
    }
  }

  // two hill silhouette rows
  hills.forEach((fill, row) => {
    const base = (sky.length + row) * bandH;
    for (let x = 0; x < WIDTH; x += 4) {
      const amp = Math.sin(x / 9 + row * 2) * 2.4 + (rand() - 0.5) * 1.2;
      cells.push({ x, y: base + amp, w: 4.2, h: bandH + 2, fill });
    }
  });

  // field: denser noise + tiny crop accents, rolling rows
  field.forEach((fill, row) => {
    const y = (sky.length + hills.length + row) * bandH;
    for (let x = 0; x < WIDTH; x += 3) {
      const drift = Math.sin(x / 14 + row) * 1.6;
      const noise = rand();
      const accent =
        row >= 1 && noise > 0.94
          ? variant === "warm"
            ? "#9dbb6f"
            : "#b9c6ef"
          : null;
      cells.push({ x, y: y + drift, w: 3.1, h: bandH + 0.8, fill: accent ?? fill });
    }
  });

  // drifting pixel clouds — only warm variant, pinned away from the center
  if (variant === "warm") {
    for (let c = 0; c < 4; c++) {
      const left = rand() < 0.5;
      const cx = left ? 4 + rand() * 22 : WIDTH - 34 + rand() * 22;
      const cy = (rand() * 0.32 + 0.05) * HEIGHT;
      const cw = 5 + Math.floor(rand() * 7);
      for (let seg = 0; seg < cw; seg += 2) {
        const lift = Math.floor(rand() * 2);
        cells.push({ x: cx + seg, y: cy + lift, w: 2, h: 1.3, fill: "#ffffff" });
      }
    }
  }

  return (
    <svg
      className={`pixel-art ${className}`}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={c.w + 0.15} height={c.h + 0.15} fill={c.fill} />
      ))}
    </svg>
  );
}
