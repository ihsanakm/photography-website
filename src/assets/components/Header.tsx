import HoverText from "./HoverText";

const Header = () => {
  return (
    <header
      className="w-full flex justify-between items-center sticky top-6 z-7 px-8 py-6"
      style={{ mixBlendMode: "difference" }}
    >
      <HoverText>Menu</HoverText>
      <p className="text-brand leading-1">AKMI Photography</p>
      <p className="text-user uppercase">UserId</p>
    </header>
  );
};

export default Header;
