/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import createAuthStore from '@/Store/authStore'

import dynamic from 'next/dynamic'
import createPostStore from '@/Store/postStore';

const ReactLoader = dynamic(() => import('@/Components/loader/ReactLoader'));


function MyApp({ Component, pageProps }) {

  const successLogin = createAuthStore((state) => state.successLogin);
  const successLogout = createAuthStore((state) => state.successLogout);
  const fetchPosts = createPostStore((state) => state.fetchPosts);

  const [loading,setLoading] = useState(false)

  const param = {
    language: '',
    from:null,
    to:null
  }



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
      } else {
        successLogout();
      }
      setLoading(false);
    } catch (err) {
      successLogout();
    }
  }




  useEffect(() => {
    verifyToken()
    fetchPosts(param)
  }, [])






  return (
    <>
      {loading && (
        <div className="flex h-screen">
          <div className="m-auto">
            <ReactLoader height={120} width={120} />
          </div>
        </div>
      )}
      {!loading && <Component {...pageProps} />}
    </>
  )


}

export default MyApp
