import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out",
    }).then((result) => {
      const signOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error.message);
          return;
        }
      };

      if (result.isConfirmed) {
        signOut();
        Swal.fire("Successfully Sign Out!", "", "success");
      }
    });
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-base-100 border-base-200">
      <nav className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn lg:hidden bg-white mr-2  h-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill=""
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/instructors"}>Instructors</NavLink>
              </li>
              <li>
                <NavLink to={"/classes"}>Classes</NavLink>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="font-bold text- text-2xl ">
            Uni<span className="text-[#1DBF73]">Learners</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-medium ">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/instructors"}>Instructors</NavLink>
            </li>
            <li>
              <NavLink to={"/classes"}>Classes</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-4 cursor-pointer">
            <label className="swap swap-rotate">
              <input
                checked={theme === "dark"}
                onClick={handleToggle}
                type="checkbox"
                className="w-0 hidden"
              />

              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          {user ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label
                  title={user?.displayName}
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <button className="justify-between font-semibold my-1">
                    {user?.displayName}
                  </button>

                  <span className="divider m-0"></span>
                  <li>
                    <Link to={"/dashboard/home"} className="justify-between">
                      Dashboard
                    </Link>
                  </li>

                  <li onClick={handleLogOut}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn bg-[#ffc929] text-black capitalize text-base hover:bg-[#E5B525] rounded-2xl border-none btn-sm md:btn-md"
            >
              Login In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
