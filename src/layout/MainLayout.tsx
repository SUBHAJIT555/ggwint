"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "../component/ui/MobileMenu";
import Header from "../component/ui/Header";
import Footer from "../component/ui/Footer";
import WhatsAppButton from "../component/ui/WhatsAppButton";
import ScrollToTopButton from "../component/ui/ScrollToTopButton";
import CallbackModal from "../component/ui/CallbackModal";
import ScrollToTop from "../component/ui/ScrollToTop";
import PageTransition from "../component/PageTransition";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-canvas text-body">
      <ScrollToTop />
      <Header />
      <MobileMenu />
      <main className="w-full pt-16">
        {isHome ? (
          <PageTransition>{children}</PageTransition>
        ) : (
          <div className="mx-auto max-w-content border-x border-dashed border-hairline">
            <PageTransition>{children}</PageTransition>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <CallbackModal />
    </div>
  );
};

export default MainLayout;
