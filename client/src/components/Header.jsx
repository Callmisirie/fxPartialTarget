import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { exchangeRate } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useCookies } from "react-cookie";

const Header = () => {
  const { pathname, hash } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [cookies, setCookies] = useCookies(["userAccess_token"]);
  const [userIDCookies, setUserIDCookies] = useCookies(["userID"]);

  useEffect(() => {
    if (openNavigation) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }

    return () => {
      enablePageScroll();
    };
  }, [openNavigation]);

  useEffect(() => {
    if (cookies.userAccess_token && userIDCookies.userID) {
      setCookies("userAccess_token", cookies.userAccess_token);
      setUserIDCookies("userID", userIDCookies.userID);
    } else {
      setCookies("userAccess_token", null);
      setUserIDCookies("userID", null);
    }
  }, [cookies, userIDCookies]);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleClick = (out) => {
    if (out === "out") {
      setCookies("userAccess_token", null);
      setUserIDCookies("userID", null);
      window.scrollTo(0, 0);
    }
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleIconClick = () => {
    window.scrollTo(0, 0);
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const loops = ["/signup", "/login"];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link
          className="fixed w-[12rem] xl:mr-8"
          to="/"
          onClick={handleIconClick}
        >
          <img src={exchangeRate} width={50} height={20} alt="Exchange Rate" />
        </Link>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => {
              if (item.hash) {
                return (
                  <HashLink
                    smooth
                    key={item.id}
                    to={pathname === "/" ? item.hash : item.url + item.hash}
                    onClick={() => handleClick(item?.out)}
                    className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      item.hash === hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                  </HashLink>
                );
              }
              if (loops.includes(item.url)) {
                return !cookies.userAccess_token ? (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={() => handleClick(item?.out)}
                    className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      item.url === pathname
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                  </Link>
                ) : null;
              }
              if (item.out === "out") {
                return cookies.userAccess_token ? (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={() => handleClick(item?.out)}
                    className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      item.url === pathname
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                  </Link>
                ) : null;
              }
            })}
          </div>
          <HamburgerMenu />
        </nav>
        {/* {!cookies.userAccess_token ? (
          <>
            <Link
              to="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>
            <Button className="hidden lg:flex" href="/login">
              Sign in
            </Button>
          </>
        ) : null}
        {cookies.userAccess_token ? (
          <Button className="hidden lg:flex" href="/" out="out">
            Sign out
          </Button>
        ) : null} */}
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
