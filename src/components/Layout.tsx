import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

const Layout = ({ children, showNavigation = true }: LayoutProps) => {
  return (
    <div className="min-h-screen gradient-bg">
      <main className={`${showNavigation ? "pb-20" : ""}`}>
        {children}
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default Layout;