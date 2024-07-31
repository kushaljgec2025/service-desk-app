import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useEffect, useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Logo from "../../src/assets/img/Logo.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { MenuIcon, CirclePower } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authslice";

export default function Navbar({ Title = "" }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const [isuser, setIsuser] = useState(true);
  useLayoutEffect(() => {
    setIsuser(localStorage.getItem("userid") ? true : false);
  });
  const handeLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userid");
        localStorage.removeItem("userdetails");
        localStorage.removeItem("admin");
        dispatch(logout());
        setIsuser(false);
        navigate("/login");
      })
      .catch((error) => {});
  };
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-black  top-0 z-10">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon color="white" />
        </SheetTrigger>
        <SheetContent side="left">
          <Link
            to="/admin-dashboard"
            className="flex justify-center items-center flex-col"
          >
            <img
              src={Logo}
              alt=""
              className="rounded-full h-20 hover:rotate-90 transition-all duration-300 ease-in-out"
            />
            <span className="font-bold">Service Ticket</span>
          </Link>

          <div className="grid gap-2 py-6">
            {!isuser && (
              <Link
                to="/login"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Login
              </Link>
            )}
            {!isuser && (
              <Link
                to="/register"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Signup
              </Link>
            )}
            {!isuser && (
              <Link
                to="/admin-register"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Admin
              </Link>
            )}
            {isuser && (
              <Button
                variant="outline"
                onClick={handeLogout}
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                <CirclePower />
              </Button>
            )}
            {isuser && (
              <Link
                to="/user-dashboard"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Dashboard
              </Link>
            )}
            {isuser && (
              <Link
                to="/profile"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Profile
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <NavigationMenu className="hidden lg:flex ">
        <NavigationMenuList className="w-[100vw] flex justify-start gap-6 ">
          <NavigationMenuLink asChild>
            <Link to="/user-dashboard" className="flex items-center">
              <img
                src={Logo}
                alt=""
                className="h-10 w-auto rounded-full shadow-lg hover:rotate-90 transition-all duration-300 ease-in-out"
              />
              <span className="sr-only">Logo</span>
            </Link>
          </NavigationMenuLink>

          {!isuser && (
            <NavigationMenuLink asChild>
              <Link
                to="/login"
                className="group inline-flex h-9 w-max text-white  items-center justify-center rounded-md px-4 py-2 text-sm font-medium "
              >
                Login
              </Link>
            </NavigationMenuLink>
          )}
          {!isuser && (
            <NavigationMenuLink asChild>
              <Link
                to="/register"
                className="group inline-flex h-9 w-max  text-white items-center justify-center rounded-md px-4 py-2 text-sm font-medium "
              >
                Signup
              </Link>
            </NavigationMenuLink>
          )}
          {!isuser && (
            <NavigationMenuLink asChild>
              <Link
                to="/admin-register"
                className="group inline-flex h-9 w-max  text-white items-center justify-center rounded-md px-4 py-2 text-sm font-medium "
              >
                Admin
              </Link>
            </NavigationMenuLink>
          )}
          {isuser && (
            <NavigationMenuLink className="absolute right-20">
              <Button variant="outline" onClick={handeLogout}>
                <CirclePower />
              </Button>
            </NavigationMenuLink>
          )}
          {isuser && (
            <NavigationMenuLink className=" text-white ">
              <Link
                to={
                  localStorage.getItem("admin")
                    ? "/admin-dashboard"
                    : "/user-dashboard"
                }
                className=""
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          )}
          {isuser && (
            <NavigationMenuLink className=" text-white ">
              <Link to="/profile" className="">
                Profile
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
