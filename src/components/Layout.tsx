import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FooterMinimal from "./FooterMinimal";

const titles: Record<string, string> = {
  "/": "Bool Clone — from an idea to a live app",
  "/drop": "Drop — files to a live link",
  "/gallery": "Gallery — apps made with the builder",
  "/pricing": "Pricing",
  "/whats-new": "What's new",
  "/use-cases": "Use cases",
};

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = titles[pathname] ?? "Bool Clone";
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {pathname === "/" ? <Footer /> : <FooterMinimal />}
    </>
  );
}
