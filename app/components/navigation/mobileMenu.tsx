import { AnimatePresence } from "framer-motion";
import NavMenu from "./navMenu";

const MobileMenu = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: any;
}) => {
  return (
    <>
      <div
        className={` md:hidden bg-[#B68467] fixed w-full flex  z-50 transition-colors ${
          isActive ? "opacity-100" : "opacity-100"
        }`}
      >
        <div className="">
          <a href="/" className="flex items-center aspect-video ">
            PetLodgePro
          </a>

          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={`${"button "} `}
          >
            <button
              id="nav-icon"
              className={` ${"burger"} ${isActive ? "burgerActive" : ""}`}
            ></button>
          </div>
        </div>
        <AnimatePresence mode="wait">{isActive && <NavMenu />}</AnimatePresence>
      </div>
    </>
  );
};

export default MobileMenu;
