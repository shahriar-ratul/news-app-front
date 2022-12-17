import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Sidenav = dynamic(() => import('../components/landing/Sidenav'), {
  suspense: true,
});
const HomeProducts = dynamic(() => import('../components/landing/HomeProducts'), {
  suspense: true,
});

const Layouts = dynamic(() => import('../layouts/Layouts'), {
  suspense: true,
});

export default function Home() {

  const pageTitle = 'Home'
  return (
    <>
      <Suspense fallback={`Loading...`}>
        <Layouts pageTitle={pageTitle}>
          <div className='flex lg:flex-row flex-col lg:py-4 p-2 pr-3 w-full'>

            <div className='lg:w-1/5 w-full px-2 text-center '>
              <Sidenav />
            </div>

            <div className='lg:w-4/5 w-full'>
              <HomeProducts />
            </div>
          </div>
        </Layouts>
      </Suspense>

    </>
  );
}
