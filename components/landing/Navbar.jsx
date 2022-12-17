/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import { HiOutlineViewList, HiOutlineX } from "react-icons/hi";
import TopUserButton from "./TopUserButton";
import Cookies from "js-cookie";
import { HiSearch } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/router";
import createAuthStore from "@/Store/authStore";
import { useRef } from "react";

const Navbar = () => {

  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isFix, setIsFix] = useState(false);

  const is_login = createAuthStore((state) => state.isLogin);




  useEffect(() => {
    function setFixed() {
      if (window.scrollY > 0) {
        setIsFix(true);
      } else {
        setIsFix(false);
      }
    }
    window.addEventListener("scroll", setFixed);
  }, []);







  return (
    <div>
      <nav
        className={` ${isFix == true ? "fixed z-20" : "relative"
          }  shadow-sm top-0  w-full bg-white `}
      >
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center px-4  justify-between w-full">
              <div className="flex justify-between items-center flex-shrink-0 ">
               
                  <Link href='/' legacyBehavior>
                    <Image
                      className='cursor-pointer'
                      src='/images/logo.png'
                      alt='logo'
                      width='219'
                      height='61'
                    />
                  </Link>
            
              </div>

              <div className="hidden lg:block">
                <div className="mx-10 flex items-baseline space-x-4 font-bold  text-md absolute right-8 top-6 cursor-pointer">
                  <Menu mobile={false} />
                  {is_login && <TopUserButton />}
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </nav>


    </div>
  );
};

export default Navbar;
