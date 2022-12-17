import Image from 'next/image';
import Link from 'next/link';
import CardTextItem from './CardTextItem';
import jsConvert from 'js-convert-case';

import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";
import { useEffect, useState } from 'react';

const Card = ({
  author,
  title,
  src,
  description,
  slug
}) => {

  return (
    <div className='flex'>
      <Link href={`/details/${slug}`} legacyBehavior>
        <div className='rounded  border border-gray-200  cursor-pointer hover:shadow-lg hover:shadow-grey-700 transition-all'>
          <div className='w-full relative rounded-t'>
           
              {/* <div className='z-10 uppercase w-1/4 absolute top-3 left-5 bg-red-600 rounded text-sm text-white py-1 text-center'>
                
              </div> */}
          
            <img
              className='w-full bg-slate-400 object-cover rounded-t'
              src={src}
              alt={title}
              height={400}
              width={600}
              
            />
          </div>

          <div className='px-4 py-1'>
            <div className='pt-0.5'>
              <p className='font-normal font-sm text-sky-600 border-b border-slate-100'>
                Author {author}
              </p>
            </div>
            <div className='pt-0'>
              <h4 className='font-semibold text-lg text-gray-600 hover:text-sky-600 border-b border-slate-100 tracking-tight'>
                {jsConvert.toUpperCase(title)}
              </h4>
            </div>
            <div className='pt-0'>
              <p>
                {description}
              </p>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
