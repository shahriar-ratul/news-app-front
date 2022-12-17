
import { HiOutlineViewList, HiOutlineX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import SliderOver from './SliderOver';
import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Router from 'next/router';
const Sidenav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);


  return (
    <>
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-start'>
          <div className='flex flex-col w-full lg:min-h-fit pr-1 bg-white border-r dark:bg-gray-800 dark:border-gray-600'>
            <h2 className='bg-sky-600 px-1 py-0.5 rounded text-xl text-left font-medium text-white dark:text-white'>
                Categories
            </h2>
            <div className='flex flex-col text-left flex-1 mt-2'>
             language
            </div>
          </div>
          <div className='mt-10 text-start max-w-sm'>
            lists

          </div>
        </div>
      </div>

    </>
  );
};

export default Sidenav;
