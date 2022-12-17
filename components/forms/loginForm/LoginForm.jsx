import { Formik, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import createAuthStore from "../../../store/authStore";
import createUserStore from "../../../store/userStore";
import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";


export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const successLogin = createAuthStore((state) => state.successLogin)
  const fetchUser = createUserStore((state) => state.fetchUser)

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "https://api.printpackmachines.com";
  axios.defaults.withCredentials = true;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  };



  const values = createLanguageStore(state => state.languages);
  // language 
  const [loginTitle, setLoginTitle] = useState([]);
  const [loginEmail, setLoginEmail] = useState([]);
  const [loginPassword, setLoginPassword] = useState([]);
  const [loginButton, setLoginButton] = useState([]);
  const [registerText, setRegisterText] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (values.length > 0) {
      setLoginTitle(values[findKey(values, { key: 'login_title' })]);
      setLoginEmail(values[findKey(values, { key: 'login_email' })]);
      setLoginPassword(values[findKey(values, { key: 'login_password' })]);
      setLoginButton(values[findKey(values, { key: 'login_submit' })]);
      setRegisterText(values[findKey(values, { key: 'signup_title' })]);
     
    }
    setLoading(false);
  }, [values]);



  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await axios
            .post(
              "/api/user/login",
              {
                username: values.email,
                password: values.password,
              },
              headers
            )
            .then((res) => {
              if (res.data.success) {
                Cookies.set("token", res.data.data.token, { secure: true });
                successLogin()
                fetchUser()

                router.push("/");
              }
            })
            .catch((err) => {
              console.log(err);
              setError(err.response.data.message);
            });

          // if (res.url) router.push(res.url)
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full min-h-fit bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
              <div className="w-full sm:max-w-md p-5 mx-auto">
                <h2 className="mb-12 text-center text-5xl font-extrabold">
                { loginTitle && loginTitle.value ? loginTitle.value
                    : loginTitle.value_en }
                </h2>
                <div className="text-red-400 text-md text-center rounded p-2">
                  {error}
                </div>

                <div className="mb-4">
                  <label className="block mb-1" htmlFor="email">
                  { loginEmail && loginEmail.value ? loginEmail.value
                    : loginEmail.value_en }
                  </label>
                  <Field
                    id="email"
                    type="text"
                    name="email"
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                   <div className='text-red-600 text-sm'>
                      <ErrorMessage name='email' />
                    </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="password">
                  { loginPassword && loginPassword.value ? loginPassword.value
                    : loginPassword.value_en }
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                   <div className='text-red-600 text-sm'>
                      <ErrorMessage name='password' />
                    </div>
                  
                </div>
                {/* <div className="mt-6 flex items-center justify-between">
                  <a className="text-sm"> Forgot your password? </a>
                </div> */}
                <div className="mt-6">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold capitalize text-white hover:bg-primary  active:bg-primary  focus:outline-none focus:bg-primary  focus:ring focus:ring-blue-300 disabled:opacity-25 transition">
                   login
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/register" className="underline">
                    
                     register
                    
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
