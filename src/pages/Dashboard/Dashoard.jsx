import { NavLink, Link, Outlet } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import { MdAddBox, MdHome, MdPayment } from "react-icons/md";
import { TbClipboardList, TbListCheck, TbUsers } from "react-icons/tb";
import { BsList } from "react-icons/bs";
import { BiListCheck } from "react-icons/bi";

const Dashoard = () => {
  const [data] = useRole();
  const role = data?.role;

  const admin = role === "admin";
  const instructor = role === "instructor";
  const student = role === "user";

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="border-b flex gap-4 bg-base-100 border-base-200 navbar justify-between">
            <div className="px-2 mx-2">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <Link to={"/"} className="font-bold text- text-2xl ">
                Uni<span className="text-[#1DBF73]">Learners</span>
              </Link>
            </div>
            <div className=" hidden lg:block ">
              <ul className="menu menu-horizontal">
                <li>
                  <NavLink className={"capitalize"} to={"/dashboard/home"}>
                    <MdHome /> {role} Home
                  </NavLink>
                </li>

                {student && (
                  <>
                    <li>
                      <NavLink to={"/dashboard/selectedclasses"}>
                        <BiListCheck />
                        My Selected Classes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dashboard/enrolledclasses"}>
                        <TbListCheck />
                        My Enrolled Classes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dashboard/mypayments"}>
                        <MdPayment />
                        My Payments
                      </NavLink>
                    </li>
                  </>
                )}

                {instructor && (
                  <>
                    <li>
                      <NavLink to={"/dashboard/addclass"}>
                        <MdAddBox />
                        Add a Class
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dashboard/myclasses"}>
                        <TbClipboardList />
                        My Classes
                      </NavLink>
                    </li>
                  </>
                )}

                {admin && (
                  <>
                    <li>
                      <NavLink to={"/dashboard/manageclasses"}>
                        <BsList />
                        Manage Classes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dashboard/manageusers"}>
                        <TbUsers />
                        Manage Users
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="flex-none hidden lg:block ">
              <ul className="menu menu-horizontal">
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
          </nav>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            {student && (
              <>
                <li>
                  <NavLink to={"/"}>My Selected Classes</NavLink>
                </li>
                <li>
                  <NavLink to={"/instructors"}>My Enrolled Classes</NavLink>
                </li>
                <li>
                  <NavLink to={"/classes"}>My Payments</NavLink>
                </li>
              </>
            )}

            {instructor && (
              <>
                <li>
                  <NavLink to={"/"}>Add a Class</NavLink>
                </li>
                <li>
                  <NavLink to={"/instructors"}>My Classes</NavLink>
                </li>
              </>
            )}

            {admin && (
              <>
                <li>
                  <NavLink to={"/"}>Manage Classes</NavLink>
                </li>
                <li>
                  <NavLink to={"/instructors"}>Manage Users</NavLink>
                </li>
              </>
            )}
            <span className="divider"></span>
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
      </div>
    </>
  );
};

export default Dashoard;
