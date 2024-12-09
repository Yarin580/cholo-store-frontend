import { useState } from "react";
import Logo from "./Logo";

import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-300  relative">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Logo />

        {/* Hamburger Button */}
        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

        {/* Menu Links */}
        <Menu isOpen={isOpen} />
      </div>
    </nav>
  );
};
export default NavBar;
