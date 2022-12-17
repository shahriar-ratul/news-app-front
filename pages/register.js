/* eslint-disable react-hooks/exhaustive-deps */
// import Layouts from "../layouts/Layouts";
// import Sidenav from "../components/landing/Sidenav";
// import RegisterForm from "../components/forms/registerForm/RegisterForm";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Breadcrumbs } from "react-daisyui";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import createAuthStore from "@/Store/authStore";
import { useEffect } from "react";

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// const Breadcrumbs = dynamic(() => import('react-daisyui'), {
//   suspense: true,
// });
const Layouts = dynamic(() => import('../layouts/Layouts'), {
  suspense: true,
});
const Sidenav = dynamic(() => import('../components/landing/Sidenav'), {
  suspense: true,
});

const RegisterForm = dynamic(() => import('../components/forms/registerForm/RegisterForm'), {
  suspense: true,
});

export default function Home() {
  const router = useRouter();

  const isLogin = createAuthStore((state) => state.isLogin);
  const successLogin = createAuthStore((state) => state.successLogin);
  const successLogout = createAuthStore((state) => state.successLogout);

  async function verifyToken() {
    try {
      const token = Cookies.get("token");
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`/api/user/verify`, header);
      if (res.data.success == true) {
        successLogin();
        router.push("/");
      } else {
        successLogout();
      }
    } catch (err) {
      successLogout();
    }
  }




  useEffect(() => {
    verifyToken()
  }, [])



  return (
    <>
      <Suspense fallback={`Loading...`}>
        <Layouts>
          <div className="flex lg:flex-row flex-col lg:py-4 p-2 pr-3 w-full">
            <div className="lg:w-1/5 w-full px-2 text-center ">
              <Sidenav />
            </div>

            <div className="lg:w-4/5 w-full">
              <Breadcrumbs className="px-12">
                <Breadcrumbs.Item>
                  <Link href="/">
                    <a>
                      <HiHome />
                    </a>
                  </Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </Breadcrumbs.Item>
              </Breadcrumbs>
              <RegisterForm />
            </div>
          </div>
        </Layouts>
      </Suspense>
    </>
  );
}
