import { Link } from "react-router-dom";
// import {
//   SignedOut,
//   SignInButton,
//   SignedIn,
//   UserButton,
// } from "@clerk/clerk-react";

import { Button } from "@clerk/clerk-react";

const Header = () => {
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" className="h-20 w-40" />
      </Link>
      <Button variant="outline"></Button>
      {/* <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </nav>
  );
};

export default Header;
