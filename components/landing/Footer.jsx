import dynamic from 'next/dynamic'
import { Suspense } from 'react'


const FooterSection = dynamic(() => import('./FooterSection'), {
    suspense: true,
});

const Footer = () => {
    return (
        <>
            <Suspense fallback={`Loading...`}>
                <section className="bg-slate-800 text-white">
                    <FooterSection />
                </section>
            </Suspense>
        </>
    );
}

export default Footer;