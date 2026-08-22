// Vivid, distinct shirt colors — deterministically assigned per name so the
// same person always gets the same "blusa chamativa".
const SHIRT_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
}

/** Little-person avatar with a deterministic, colorful shirt — same name always gets the same color, no network fetch. */
export function Avatar({ name, size = "md" }: AvatarProps) {
  const shirtColor = SHIRT_COLORS[hashString(name) % SHIRT_COLORS.length];
  const dimensions = size === "sm" ? "size-8" : "size-10";

  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 overflow-hidden rounded-full bg-ink-100 ${dimensions}`}
    >
      <svg viewBox="0 0 40 40" className="size-full">
        <circle cx="20" cy="16" r="7" fill="#aab6ac" />
        <path d="M4 40c0-9.4 7.2-17 16-17s16 7.6 16 17" fill={shirtColor} />
      </svg>
    </span>
  );
}
