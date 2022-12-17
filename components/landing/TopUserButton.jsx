import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dropdown } from "react-daisyui";
import createAuthStore from "../../store/authStore";
import createUserStore from "../../store/userStore";

const TopUserButton = () => {
  const router = useRouter();
  const successLogout = createAuthStore((state) => state.successLogout)
  const userLogout = createUserStore((state) => state.userLogout)
  async function logout() {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
      ? process.env.NEXT_PUBLIC_BACKEND_URL
      : "https://api.printpackmachines.com";

    const token = Cookies.get("token");

    const headers = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await axios({
      method: "post",
      url: `${baseURL}/api/user/logout`,
      data: {},
      headers,
    })
      .then((res) => {
        if (res.data.success) {
          Cookies.remove("token");
          successLogout();
          userLogout();
          router.reload();
        }else{
          if(res.data.status == 401){
            Cookies.remove("token");
            successLogout();
            userLogout();
            router.reload();
          }
        }
      })
      .catch((err) => {
        if(err.response.status == 401){
          Cookies.remove("token");
          successLogout();
          userLogout();
          router.reload();
        }
        console.log(err);
      });
  }

  return <>
    <Dropdown hover={true} contextMenu>
      <Dropdown.Toggle className="btn-primary">Profile</Dropdown.Toggle>
      <Dropdown.Menu className="w-28">
        <Dropdown.Item>
          <Link href="/user">
            
            Favorite
            
           
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => logout()}>
            Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>;
};

export default TopUserButton;
