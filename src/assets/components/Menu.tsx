import type { Dispatch } from "react";
import { Link } from "react-router";
import HoverText from "./HoverText";

interface MenuItem {
  label: string;
  href: string;
}

const Menu = ({ ref, setMenuOpen }: { ref: React.RefObject<HTMLDivElement | null>, setMenuOpen: Dispatch<React.SetStateAction<boolean>> }) => {
  const menuItems: MenuItem[] = [
    { label: "Gallery", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const contactDetails = {
    email: "akmohammedihsan@gmail.com",
    phone: "+94 75 688 2698",
    location: "Kinniya, Trincomalee",
  };

  return (
    <div ref={ref} className="h-0 w-full" style={{
      clipPath: "inset(0 0 100% 0)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      overflow: "hidden"
    }}>
      <div className="w-full bg-black text-white py-10 md:py-16 px-3 md:px-[12px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Close and Contact (Reordered for Mobile) */}
          <div className="flex flex-col justify-between order-2 md:order-1">
            <h3
              className="mb-8 menu-item cursor-pointer hidden md:block"
              onClick={() => setMenuOpen(false)}
            >
              <HoverText classname="text-white text-3xl">Close</HoverText>
            </h3>
            <div className="space-y-6 md:space-y-4 text-sm text-gray-400">
              <div className="menu-item">
                <p className="text-gray-500 text-xs uppercase mb-1">Email</p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="hover:text-white transition-colors text-base md:text-sm"
                >
                  {contactDetails.email}
                </a>
              </div>
              <div className="menu-item">
                <p className="text-gray-500 text-xs uppercase mb-1">Phone</p>
                <a
                  href={`tel:${contactDetails.phone}`}
                  className="hover:text-white transition-colors text-base md:text-sm"
                >
                  {contactDetails.phone}
                </a>
              </div>
              <div className="menu-item">
                <p className="text-gray-500 text-xs uppercase mb-1">Location</p>
                <p className="text-base md:text-sm">{contactDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Menu Items */}
          <div className="flex flex-col justify-start order-1 md:order-2">
            <div className="flex justify-between items-center mb-8 md:hidden">
              <h3 className="text-gray-500 uppercase text-xs tracking-widest">Navigation</h3>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-white text-sm uppercase tracking-widest border border-gray-800 px-4 py-1.5 rounded-full"
              >
                Close
              </button>
            </div>
            <nav className="space-y-4 md:space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <HoverText classname="text-gray-200 text-4xl md:text-5xl">{item.label}</HoverText>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: CTA Button */}
          <div className="flex flex-col justify-start order-3">
            <h3 className="text-lg font-semibold mb-6 menu-item hidden md:block">Get Started</h3>
            <button className="bg-white text-black w-full md:w-auto px-8 py-4 md:py-3 font-semibold hover:bg-gray-200 transition-colors self-start text-sm menu-item rounded-lg">
              Book a Session
            </button>
            <div className="mt-10 pt-10 md:mt-8 md:pt-8 border-t border-gray-700 menu-item">
              <p className="text-xs text-gray-500 uppercase mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:space-y-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block text-base md:text-sm"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block text-base md:text-sm"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block text-base md:text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
