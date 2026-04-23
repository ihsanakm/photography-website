import { Link } from "react-router";
import HoverText from "./HoverText";
import type { Dispatch } from "react";

const Header = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header
      className="w-full flex justify-between items-center sticky top-4 md:top-6 z-7 px-3 md:px-[12px] py-4 md:py-6"
      style={{ mixBlendMode: "difference" }}
    >
      <div
        className="cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <HoverText>Menu</HoverText>
      </div>
      <Link to="/">
        <p className="text-brand leading-none">AKMi's</p>
      </Link>
      <Link to="/portfolio">
        <HoverText>Portfolio</HoverText>
      </Link>
    </header>
  );
};

export default Header;
