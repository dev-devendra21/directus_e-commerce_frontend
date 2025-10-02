import { lazy, type ReactNode } from "react";

import { UIConfig } from "@/shared/config/uiConfig";

const { type: variantType } = UIConfig;

const Header = lazy(
  () => import(`../../../variants/${variantType}/components/Header`)
);
const Footer = lazy(
  () => import(`../../../variants/${variantType}/components/Footer`)
);

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className={`flex-1 ${
          variantType === "v1"
            ? "mt-[calc(4.5rem+env(safe-area-inset-top))]"
            : ""
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
