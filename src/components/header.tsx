import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20 w-40" />
        </Link>
        <Button variant="outline">Login</Button>
      </nav>
    </>
  );
};

export default Header;
