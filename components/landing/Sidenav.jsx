
import { HiOutlineViewList, HiOutlineX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import SliderOver from './SliderOver';
import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Router from 'next/router';
import { Radio } from 'react-daisyui';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import createPostStore from '@/Store/postStore';

const Sidenav = () => {

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);



  const [startDate, setStartDate] = useState(new Date());





  const fetchCategories = async () => {

    const response = await axios
      .get(`/api/categories`)
      .then((res) => {
        setCategories(res.data.data.items);
      })
      .catch((err) => {

      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCountries = async () => {
    const { data } = await axios.get("api/languages");
    setCountries(
      data.data.items.map(function (item) {
        return { value: item, label: item };
      })
    );
  };


  useEffect(() => {
    fetchCountries();
  }, []);




  return (
    <>
      <div className='hidden lg:block'>
        <div className='flex flex-col justify-start'>
          <div className='flex flex-col w-full lg:min-h-fit pr-1 bg-white border-r dark:bg-gray-800 dark:border-gray-600'>
          <h2 className='px-1 py-0.5 rounded text-xl text-left font-medium '>
                Filters
            </h2>
            <h2 className='px-1 py-0.5 rounded text-xl text-left font-medium '>
                Categories
            </h2>
            <ul className='justify-start'>
            {categories && categories.map((item, index) => {
                return(<li key={index}>
                  <Radio size='xs'  name="radio1" /> {item}
                  
                </li>
                );
            })}
            </ul>
           
            <div className='flex flex-col text-left flex-1 mt-2'>
             languages
             <Select
              isMulti={false}
              escapeClearsValue={true}
              isClearable={true}
              placeholder="Select a language"
      
              onChange={setSelectedCountry}
              value={selectedCountry}
              options={countries}
              classNamePrefix="react-select"
              className="react-select-container"
              />
            </div>
          </div>
          <div className='mt-10 text-start max-w-sm'>
          
           <h2 className='px-1 py-0.5 rounded text-xl text-left font-medium '>
                Date
            </h2>
            <div>
            <DatePicker 
            selected={startDate} 
            onChange={(date) => {

              setItem({ ...item, from: date })
              handleChange()
              }} 
            className="border border-black my-3" />
            </div>
            <div>
            <DatePicker 
            selected={startDate} 
            onChange={(date) => setItem({ ...item, to: date })} 
            className="border border-black  my-3"
             />
            </div>         

      

          </div>
        </div>
      </div>

    </>
  );
};

export default Sidenav;
