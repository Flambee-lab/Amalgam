"use client";

import { useEffect, useState } from "react";

/** true solo tras hidratación — para animaciones Framer Motion */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
