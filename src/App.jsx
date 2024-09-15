import { SiGit } from "react-icons/si";
import logo from "./assets/logo-no-background.png";
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { Button } from "./components/ui/button";

function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 flex w-full items-center justify-between p-4">
      <div className="flex items-center gap-12">
        <SiGit className="text-4xl" />
        <div className="flex items-center gap-6">
          <a href="#">Product</a>
          <a href="#">Solution</a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
        </div>
      </div>
      <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white">
        Join Newsletter
      </button>
    </nav>
  );
}

function Nava() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex w-[92%] items-center justify-between pt-3">
        <div>
          <img className="w-35 h-16" src={logo} alt="Holidaze logo" />
        </div>
        <div className="nav-links bg-primary-90 absolute left-0 top-[-100%] flex min-h-[60vh] w-full items-center px-5 md:static md:min-h-fit md:w-auto md:bg-white">
          <ul className="flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vw]">
            <li>
              <a className="hover:text-gray-500" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Contact us
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                About us
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Profile
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-primary-90 rounded-full px-5 py-2 text-white hover:bg-[#87acec]">
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
  navLinks.classList.toggle("top-[18%]");
  console.log(navLinks);
}

function App() {
  return (
    <>
      <Nava />
      <Button className="bg-primary-100 text-secondary-90">click me</Button>
    </>
  );
}

export default App;
