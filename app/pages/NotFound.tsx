import { Link } from "react-router";
import HoverText from "../assets/components/HoverText";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-black px-4 text-center">
      <h1 className="text-[12vw] font-bold leading-none select-none opacity-10">404</h1>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-light mb-6">Lost in focus?</h2>
        <p className="text-gray-500 mb-10 max-w-md">
          The page you are looking for doesn't exist or has been moved to a different gallery.
        </p>
        <Link to="/">
          <button className="bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300">
            <HoverText classname="text-white">Back to Home</HoverText>
          </button>
        </Link>
      </div>
    </div>
  );
}
