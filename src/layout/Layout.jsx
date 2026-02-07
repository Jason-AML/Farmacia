import { SideNavbar } from "./SideNavbar";
import { TopNavbar } from "./TopNavbar";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
        <SideNavbar />

        <main className="flex-1 ml-64">
          <TopNavbar />
          {children}
        </main>
      </div>
    </>
  );
};
