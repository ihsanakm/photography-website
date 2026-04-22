import { Link } from "react-router";
import HoverText from "./HoverText";

const Header = () => {
  return (
    <header
      className="w-full flex justify-between items-center sticky top-6 z-7 px-8 py-6"
      style={{ mixBlendMode: "difference" }}
    >
      <Link to="/">
        <HoverText>Gallery</HoverText>
      </Link>
      <Link to="/">
        <p className="text-brand leading-1">AKMI Photography</p>
      </Link>
      <Link to="/portfolio">
        <HoverText>Portfolio</HoverText>
      </Link>
    </header>
  );
};

export default Header;
