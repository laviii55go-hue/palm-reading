"use client";

import { FortuneMenuProvider } from "./FortuneMenuContext";
import FortuneMenuSheet from "./FortuneMenuSheet";
import SiteMobileHeader from "./SiteMobileHeader";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <FortuneMenuProvider>
      <SiteMobileHeader />
      {children}
      <FortuneMenuSheet />
    </FortuneMenuProvider>
  );
}
