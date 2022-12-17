import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Navbar = dynamic(() => import('./Navbar'), {
    suspense: true,
});


const Header = () => {
    return (
        <>
            <Suspense fallback={`Loading...`}>
                <header>
                    <Navbar />
                </header>
            </Suspense>

        </>
    );
}

export default Header;