import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background">
        <main className="min-h-screen min-w-screen container py-1 px-2">
          <Header />
          <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">
          Made with Love by Meeeee ❤️
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
