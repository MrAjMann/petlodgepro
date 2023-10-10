"use client";

import MobileMenu from "./mobileMenu";
import DesktopMenu from "./desktopMenu";
import { useState } from "react";

const NavMenu = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="w-full mx-24 ">
      <MobileMenu isActive={isActive} setIsActive={setIsActive} />
      <DesktopMenu />
    </nav>
  );
};

export default NavMenu;
