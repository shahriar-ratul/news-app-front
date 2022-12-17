import Head from 'next/head'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ScrollToTop } from '@/Components/scroll'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Header = dynamic(() => import('../components/landing/Header'), {
  suspense: true,
});

const Footer = dynamic(() => import('../components/landing/Footer'), {
  suspense: true,
});

const Layouts = ({ children, pageTitle }) => {


  const token = Cookies.get('token')

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : 'https://api.printpackmachines.com'

  // axios.defaults.withCredentials = true

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`

 

  return (
    <>
      {pageTitle ? (
        <Head>
          <title>{pageTitle}</title>
        </Head>
      ) : (
        <Head>
          <title>Name</title>
        </Head>
      )}
      <Suspense fallback={`Loading...`}>
        <div className='flex flex-col'>
          <Header />
          <div className='w-full overflow-y-scroll'>
            {children}
          </div>
          <Footer />
        </div>

        <ScrollToTop />
      </Suspense>
    </>
  );
}

export default Layouts;