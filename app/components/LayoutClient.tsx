"use client";

import { FortuneMenuProvider } from "./FortuneMenuContext";
import BottomHeader from "./BottomHeader";
import FortuneMenuSheet from "./FortuneMenuSheet";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <FortuneMenuProvider>
      {children}
      <BottomHeader />
      <FortuneMenuSheet />
    </FortuneMenuProvider>
  );
}
