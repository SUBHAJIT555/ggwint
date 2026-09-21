"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
