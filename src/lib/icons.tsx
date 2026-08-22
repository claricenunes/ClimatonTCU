import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function base(children: React.ReactNode, props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: IconProps) =>
  base(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>,
    p,
  );

export const IconChevronDown = (p: IconProps) => base(<path d="m6 9 6 6 6-6" />, p);
export const IconChevronRight = (p: IconProps) => base(<path d="m9 18 6-6-6-6" />, p);
export const IconX = (p: IconProps) =>
  base(
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>,
    p,
  );

export const IconMapPin = (p: IconProps) =>
  base(
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>,
    p,
  );

export const IconDroplet = (p: IconProps) =>
  base(<path d="M12 2.5s7 7.2 7 12a7 7 0 1 1-14 0c0-4.8 7-12 7-12Z" />, p);

export const IconThermometer = (p: IconProps) =>
  base(
    <>
      <path d="M14 4a2 2 0 0 0-4 0v10.5a4 4 0 1 0 4 0Z" />
      <path d="M12 12V8" />
    </>,
    p,
  );

export const IconTriangleAlert = (p: IconProps) =>
  base(
    <>
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>,
    p,
  );

export const IconCheckCircle = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </>,
    p,
  );

export const IconOctagonAlert = (p: IconProps) =>
  base(
    <>
      <path d="M7.5 2h9L21 6.5v9L16.5 22h-9L2 15.5v-9L7.5 2Z" />
      <path d="M12 8v5" />
      <path d="M12 16.5h.01" />
    </>,
    p,
  );

export const IconInfo = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5h.01" />
    </>,
    p,
  );

export const IconArrowLeft = (p: IconProps) => base(<path d="M19 12H5M11 18l-6-6 6-6" />, p);

export const IconMenu = (p: IconProps) => base(<path d="M4 7h16M4 12h16M4 17h16" />, p);

export const IconNewspaper = (p: IconProps) =>
  base(
    <>
      <path d="M4 4h13a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4Z" />
      <path d="M4 4H2v15a2 2 0 0 0 2 2" />
      <path d="M8 8h7M8 12h7M8 16h4" />
    </>,
    p,
  );

export const IconUsers = (p: IconProps) =>
  base(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M21.5 20a6.2 6.2 0 0 0-4.5-6" />
    </>,
    p,
  );

export const IconGraduationCap = (p: IconProps) =>
  base(
    <>
      <path d="m2 9 10-5 10 5-10 5-10-5Z" />
      <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 9v6" />
    </>,
    p,
  );

export const IconContrast = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none" />
    </>,
    p,
  );

export const IconType = (p: IconProps) =>
  base(
    <>
      <path d="M5 6h14" />
      <path d="M12 6v14" />
      <path d="M9 20h6" />
    </>,
    p,
  );

export const IconHome = (p: IconProps) =>
  base(
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </>,
    p,
  );

export const IconFilter = (p: IconProps) => base(<path d="M4 6h16M7 12h10M10 18h4" />, p);

export const IconHeart = (p: IconProps) =>
  base(<path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.6-9.5 9-9.5 9Z" />, p);

export const IconPlus = (p: IconProps) => base(<path d="M12 5v14M5 12h14" />, p);

export const IconClock = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>,
    p,
  );

export const IconLoader = (p: IconProps) =>
  base(<path d="M12 3a9 9 0 1 0 9 9" />, p);

export const IconFileText = (p: IconProps) =>
  base(
    <>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12.5h6M9 16h6M9 9h2" />
    </>,
    p,
  );

export const IconCoins = (p: IconProps) =>
  base(
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v5c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 11v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
    </>,
    p,
  );

export const IconLandmark = (p: IconProps) =>
  base(
    <>
      <path d="M2 10.5 12 4l10 6.5" />
      <path d="M4 10.5h16" />
      <path d="M5 10.5V20M10 10.5V20M14 10.5V20M19 10.5V20" />
      <path d="M3 20h18" />
    </>,
    p,
  );

export const IconFaceHappy = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 13.5c1 1.15 2.2 1.7 3.7 1.7s2.7-.55 3.7-1.7" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </>,
    p,
  );

export const IconFaceNeutral = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 15h7.4" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </>,
    p,
  );

export const IconFaceSad = (p: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 16.3c1-1.15 2.2-1.7 3.7-1.7s2.7.55 3.7 1.7" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </>,
    p,
  );
