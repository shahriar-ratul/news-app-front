import { Formik, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import findKey from "lodash/findKey";
import isNull from "lodash/isNull";
import Select from "react-select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RegisterForm() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [newsletter, setNewsletter] = useState(true);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const MySwal = withReactContent(Swal);

  const [selectedCountry, setSelectedCountry] = useState(null);

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
  const [registerTitle, setRegisterTitle] = useState([]);
  const [registerEmail, setRegisterEmail] = useState([]);
  const [registerPhone, setRegisterPhone] = useState([]);
  const [registerPassword, setRegisterPassword] = useState([]);
  const [registerCountry, setRegisterCountry] = useState([]);
  const [registerBusinessType, setRegisterBusinessType] = useState([]);
  const [newsletterText, setNewsletterText] = useState([]);
  const [registerButton, setRegisterButton] = useState([]);


  useEffect(() => {
    setLoading(true);
    if (values.length > 0) {
      setRegisterTitle(values[findKey(values, { key: 'register_title' })]);
      setRegisterEmail(values[findKey(values, { key: 'register_email' })]);
      setRegisterPassword(values[findKey(values, { key: 'register_password' })]);
      setRegisterPhone(values[findKey(values, { key: 'register_phone' })]);
      setRegisterCountry(values[findKey(values, { key: 'register_country' })]);
      setRegisterBusinessType(values[findKey(values, { key: 'register_business_type' })]);
      setNewsletterText(values[findKey(values, { key: 'newsletter' })]);
      setRegisterButton(values[findKey(values, { key: 'register_submit' })]);
    }
    setLoading(false);
  }, [values]);

  const fetchCountries = async () => {
    const { data } = await axios.get("api/countries");
    setLoading(false);
    setCountries(
      data.data.countries.map(function (item) {
        return { value: item.name, label: item.name };
      })
    );
  };

  useEffect(() => {
    fetchCountries();
  }, []);




  function handleButtonClick() {
    setNewsletter(!newsletter);
  }


  return (
    <div>
      <Formik
        initialValues={{
          // first_name: "",
          // last_name: "",
          // username: "",
          email: "",
          password: "",
          // whatsapp: "",
          // skype: "",
          // country: "",
          // address: "",
          business_type: "",
          phone: "",
          newsletter: "",
        }}
        validationSchema={Yup.object({
          // first_name: Yup.string()
          //   .max(50, "Must be 50 characters or less")
          //   .required("Please enter your first name"),
          // last_name: Yup.string()
          //   .max(50, "Must be 50 characters or less")
          //   .required("Please enter your last name"),
          // username: Yup.string()
          //   .max(50, "Must be 50 characters or less")
          //   .required("Please enter your username"),
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
          // whatsapp: Yup.string().required("Please enter your whatsapp"),
          // skype: Yup.string().required("Please enter your skype"),
          // country: Yup.string().required("Please enter your country"),
          // address: Yup.string().required("Please enter your address"),
          business_type: Yup.string().required("Please enter your business_type"),
          phone: Yup.string().required("Please enter your phone"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const res = await axios
            .post(
              "/api/user/register",
              {
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                email: values.email,
                skype: values.skype,
                whatsapp: values.whatsapp,
                password: values.password,
                country: selectedCountry ? selectedCountry.value : "",
                address: values.address,
                business_type: values.business_type,
                phone: values.phone,
                newsletter: JSON.stringify(newsletter),
              },
              headers
            )
            .then((res) => {
              if (res.data.success) {
                setSelectedCountry(null)
                resetForm();
                setMessage(res.data.message);
                setSuccess(true);
                setError(null);
                MySwal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success'
                }).then(() => {
                    // router.reload()
                })
              }
            })
            .catch((err) => {
              console.log(err);
              setSuccess(false);
              setError(err.response.data.message);
            });

          // if (res.url) router.push(res.url)
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
              <div className="container flex flex-col mx-auto space-y-12">
                <div className="w-full">
                  <h2 className="text-center text-5xl font-extrabold">
                    {registerTitle && registerTitle.value ? registerTitle.value
                      : registerTitle.value_en}
                  </h2>
                  <div className="text-green-600 text-md text-center rounded p-2">
                    {success &&
                      <h4 className="text-center text-3xl font-extrabold">
                        {message}
                        <button className="btn btn-primary btn-outline" onClick={e => {
                          setSuccess(false);
                          router.push('/login')
                        }}>login</button>
                      </h4>
                    }
                  </div>
                  <div className="text-red-400 text-md text-center rounded p-2">
                    {error}
                  </div>
                </div>

                <fieldset className="grid grid-cols-3 gap-6  rounded-md shadow-sm dark:bg-gray-900">
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <Field
                        name="first_name"
                        type="text"
                        placeholder="First name"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="first_name" />
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">Last Name</span>
                      </label>
                      <Field
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="last_name" />
                      </div>
                    </div>
                    {/* <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">Username</span>
                      </label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="username" />
                      </div>
                    </div>  */}
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">
                          {registerEmail && registerEmail.value ? registerEmail.value
                            : registerEmail.value_en}
                        </span>
                      </label>
                      <Field
                        name="email"
                        type="text"
                        placeholder={registerEmail && registerEmail.value ? registerEmail.value
                          : registerEmail.value_en}
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">
                          {registerPassword && registerPassword.value ? registerPassword.value
                            : registerPassword.value_en}
                        </span>
                      </label>
                      <Field
                        name="password"
                        type="password"
                        placeholder={registerPassword && registerPassword.value ? registerPassword.value
                          : registerPassword.value_en}
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">
                          {registerPhone && registerPhone.value ? registerPhone.value
                            : registerPhone.value_en}
                        </span>
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        placeholder={registerPhone && registerPhone.value ? registerPhone.value
                          : registerPhone.value_en}
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="phone" />
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span
                          htmlFor="role"
                          className="uppercase text-sm text-gray-600 font-bold dark:text-white"
                        >
                          {registerCountry && registerCountry.value ? registerCountry.value
                            : registerCountry.value_en}
                        </span>
                      </label>

                      <Select
                        isMulti={false}
                        escapeClearsValue={true}
                        isClearable={true}
                        placeholder={registerCountry && registerCountry.value ? registerCountry.value
                          : registerCountry.value_en}
                        onChange={setSelectedCountry}
                        value={selectedCountry}
                        options={countries}
                        classNamePrefix="react-select"
                        className="react-select-container"
                      />
                    </div>
                    {/* <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <Field
                        name="address"
                        type="text"
                        placeholder="Enter Your Address"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="address" />
                      </div>
                    </div> */}
                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">
                          {registerBusinessType && registerBusinessType.value ? registerBusinessType.value
                            : registerBusinessType.value_en}
                        </span>
                      </label>
                      <Field
                        name="business_type"
                        as="select"
                        className="select select-info w-full"
                      >
                        <option value="" readOnly selected>Select One Type</option>
                        <option value="agent">agent</option>
                        <option value="broker">broker</option>
                        <option value="printer">printer</option>
                        <option value="used-machines-dealer">used-machines-dealer</option>
                      </Field>
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="address" />
                      </div>
                    </div>

                    {/* <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">whatsapp</span>
                      </label>
                      <Field
                        name="whatsapp"
                        type="text"
                        placeholder="Enter Your whatsapp"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="whatsapp" />
                      </div>
                    </div>

                    <div className="col-span-full sm:col-span-3">
                      <label className="label">
                        <span className="label-text">skype</span>
                      </label>
                      <Field
                        name="skype"
                        type="text"
                        placeholder="Enter Your Address"
                        className="input input-bordered input-info w-full"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="skype" />
                      </div>
                    </div> */}
                  </div>
                  <div className="form-control w-32">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {newsletterText && newsletterText.value ? newsletterText.value
                          : newsletterText.value_en}
                      </span>
                      <input
                        type="checkbox"
                        checked={newsletter ? "checked" : ""}
                        className="checkbox checkbox-primary"
                        onChange={() => handleButtonClick()}
                      />
                    </label>
                  </div>
                </fieldset>
                <div className="mb-6">





                </div>
                <div className="flex items-center justify-center">
                  <button type="submit" className="btn">
                    {formik.isSubmitting ? "Please wait..." : 'Register'}
                  </button>
                </div>
              </div>
            </section>
          </form>
        )}
      </Formik>
    </div>
  );
}
