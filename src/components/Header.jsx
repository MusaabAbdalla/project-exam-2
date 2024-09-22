import logo from "../assets/logo-no-background.png";
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white">
      <nav className="mx-auto flex w-[92%] items-center justify-between pt-3">
        <div>
          <Link>
            <img className="w-35 h-16" src={logo} alt="Holidaze logo" />
          </Link>
        </div>
        <div className="nav-links bg-primary-100 absolute left-0 top-[-100%] flex min-h-[60vh] w-full items-center px-5 md:static md:min-h-fit md:w-auto md:bg-white">
          <ul className="flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vw]">
            <li>
              <Link
                className="text-lg font-bold uppercase hover:text-gray-500"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-lg font-bold uppercase hover:text-gray-500"
                to="/contact"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                className="text-lg font-bold uppercase hover:text-gray-500"
                to="/about"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className="text-lg font-bold uppercase hover:text-gray-500"
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-primary-90 rounded-full px-5 py-2 text-white hover:bg-[#87acec]"
          >
            Sign in
          </button>
          <div
            onClick={onToggleMenu}
            className="open-icon text-secondary-100 cursor-pointer text-3xl md:hidden"
          >
            <FiMenu />
          </div>
          <div
            onClick={onToggleMenu}
            className="close-icon text-secondary-100 hidden cursor-pointer text-3xl md:hidden"
          >
            <RiCloseLargeFill />
          </div>
        </div>
      </nav>
    </header>
  );
}

function onToggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const close = document.querySelector(".close-icon");
  const open = document.querySelector(".open-icon");
  close.classList.toggle("hidden");
  open.classList.toggle("hidden");
  navLinks.classList.toggle("top-[-100%]");
  navLinks.classList.toggle("top-[12%]");
  console.log(navLinks);
}

export default Header;
