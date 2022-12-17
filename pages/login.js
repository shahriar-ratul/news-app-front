import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi';

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Breadcrumbs } from "react-daisyui";
// const Breadcrumbs = dynamic(() => import('react-daisyui'), {
//   suspense: true,
// });
const Layouts = dynamic(() => import('../layouts/Layouts'), {
  suspense: true,
});
const Sidenav = dynamic(() => import('../components/landing/Sidenav'), {
  suspense: true,
});

const LoginForm = dynamic(() => import('../components/forms/loginForm/LoginForm'), {
  suspense: true,
});


export default function Home() {
	
  const router = useRouter();
  const token = Cookies.get("token");


  
  return (
    <>
    <Suspense fallback={`Loading...`}>
      <Layouts>
        <div className='flex lg:flex-row flex-col lg:py-4 p-2 pr-3 w-full'>

          <div className='lg:w-1/5 w-full px-2 text-center '>
            <Sidenav />
          </div>

          <div className='lg:w-4/5 w-full'>
          <Breadcrumbs className="px-12">
              <Breadcrumbs.Item>
                <Link href="/">
                  <a>
                    <HiHome />
                  </a>
                </Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Breadcrumbs.Item>
            </Breadcrumbs>
              <LoginForm /> 
          </div>
        </div>
      </Layouts>
      </Suspense>

    </>
  );
}
