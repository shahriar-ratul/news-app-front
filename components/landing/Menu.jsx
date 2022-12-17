/* eslint-disable react-hooks/exhaustive-deps */
import MenuItem from './MenuItem';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import findKey from "lodash/findKey";
import isNull from "lodash/isNull";
import createAuthStore from '@/Store/authStore';
const Menu = ({ mobile }) => {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);

  const [mobileState, setMobileState] = useState(false);
  const is_login = createAuthStore((state) => state.isLogin);
  // console.log(is_login);


  useEffect(() => {
      generateList();
      setLoading(false)

  }, []);





  useEffect(() => {
    if (mobile === true) {
      setMobileState(true);
    }
  }, [mobile])



  function generateList() {
    if (!is_login) {
      setLists([
        {
          name: 'Home',
          link: '/',
        },
        
        {
          name: 'Login',
          link: '/login',
        },
        {
          name: 'Register',
          link: '/register',
        },
      ]);
    } else {
      setLists([
        {
          name: 'Home',
          link: '/',
        },

      ]);
    }
  }


  // generate menu item
  const mobileMenu = lists.map((list, index) => (
    <MenuItem
      link={list.link}
      name={list.name}
      key={index}
      className='block w-full sm:w-auto sm:inline-block sm:mt-0 mt-2  border-b-2 border-gray-200 py-4'
    />
  ));

  const menu = lists.map((list, index) => (
    <MenuItem
      link={list.link}
      name={list.name}
      key={index}
      className='text-gray-800 hover:text-primary duration-500'
    />
  ));

  return (
    <>
      {!loading && (
        mobileState ? mobileMenu : menu
      )}
    </>
  );
};

export default Menu;
