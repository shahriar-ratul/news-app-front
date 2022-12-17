/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import FooterMenuItem from './FooterMenuItem';
import { useEffect, useState } from 'react';

const FooterSection = () => {

  return (
    <div className='container mx-auto px-6 py-4'>
      <div className='lg:flex'>
        <div className='w-full -mx-6 lg:w-2/5 flex justify-start'>
          <div className='px-6 '>
            <div>
              <h6 className='text-xl font-semibold text-sky-300'>
                About Us
              </h6>
              <Image
                  src='/images/logo.png'
                  width={219}
                  height={61}
                  alt='logo'
                  className='rounded'
                />
            </div>
           
          </div>
        </div>

        <div className='mt-6 lg:mt-0 lg:flex-1'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3'>
            <div className='space-y-2'>
              <FooterMenuItem
                title="Footer Menu"
                type='header'
              />
              <FooterMenuItem title='ADDRESS:' type='title' />
              <FooterMenuItem
                type='subtitle'
                title= 'Čimelická 957/1, Lhotka, 140 00 Praha, Czech Republic'
              />

              <FooterMenuItem
                title="phone number"
                type='title'
              />
              <FooterMenuItem
                title='+420 731 933 313' 
                type='extralink'
                url={`tel:'+420 731 933 313'`}
              />

              <FooterMenuItem title='EMAIL:' type='title' />
              <FooterMenuItem
                title='info@eurobizlink.com' 
                type='extralink'
                url={`mailto:${'info@eurobizlink.com'}`}
              />
            </div>

            <div className='flex flex-col'>
              <FooterMenuItem
                title="Footer Links"
                type='header'
              />
              <FooterMenuItem
                title="About"
                type='link'
                url='/about'
              />
              <FooterMenuItem
                title="Contact"
                type='link'
                url='/contact'
              />
            </div>

            <div className='flex flex-col'>
              <FooterMenuItem
                title="Popular"
                type='header'
              />
              <FooterMenuItem
                title="About"
                type='btnLink'
                url='/about'
              />
            </div>
          </div>
        </div>
      </div>

      <hr className='h-px my-6 bg-gray-300 border-none dark:bg-gray-700' />

      <div>
        <p className=' '>
          © SiteName 2022.{' '}
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
