import logo from "../assets/logo-no-background.png";
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { load } from "@/storage/load";
import { clear } from "@/storage/clear";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const profile = load("profile");

  // Check the token status when the component mounts
  // useEffect(() => {
  //   const token = load("token");
  //   setIsLoggedIn(!!token); // Set logged-in state based on token presence
  // }, []);

  // const handleLogout = () => {
  //   clear(); // Clear storage
  //   setIsLoggedIn(false); // Update logged-in state
  //   navigate("/login"); // Redirect to login page after logging out
  // };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex w-[92%] items-center justify-between pt-3">
        <div>
          <Link>
            <img className="w-35 h-16" src={logo} alt="Holidaze logo" />
          </Link>
        </div>
        <div className="nav-links absolute left-0 top-[-100%] flex min-h-[60vh] w-full items-center bg-primary-100 px-5 md:static md:min-h-fit md:w-auto md:bg-white">
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
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={profile?.avatar?.url} alt="User Avatar" />
                  <AvatarFallback>{profile?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
              <button
                onClick={() => {
                  logout();
                  clear();
                  navigate("/login");
                }}
                className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-primary-90 px-5 py-2 text-white hover:bg-[#87acec]"
            >
              Sign in
            </button>
          )}

          <div
            onClick={onToggleMenu}
            className="open-icon cursor-pointer text-3xl text-secondary-100 md:hidden"
          >
            <FiMenu />
          </div>
          <div
            onClick={onToggleMenu}
            className="close-icon hidden cursor-pointer text-3xl text-secondary-100 md:hidden"
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
}

export default Header;
