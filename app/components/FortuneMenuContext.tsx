"use client";

import { createContext, useContext, useState, useCallback } from "react";

type FortuneMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const FortuneMenuContext = createContext<FortuneMenuContextValue | null>(null);

export function FortuneMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <FortuneMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </FortuneMenuContext.Provider>
  );
}

export function useFortuneMenu() {
  const ctx = useContext(FortuneMenuContext);
  if (!ctx) throw new Error("useFortuneMenu must be used within FortuneMenuProvider");
  return ctx;
}
