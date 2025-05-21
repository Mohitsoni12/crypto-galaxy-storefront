
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 lg:px-6 py-4 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
