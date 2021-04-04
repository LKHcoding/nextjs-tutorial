import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

const admin = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function checkLogin() {
    Axios.get("/api/isLogin").then((res) => {
      if (res.status === 200 && res.data.name) {
        //로그인
        setIsLogin(true);
      } else {
        //로그인 안됨
        router.push("/login");
      }
    });
  }

  const logout = () => {
    Axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        router.push("/");
      }
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <>
      admin
      {isLogin && <Button onClick={logout}>Logout</Button>}
    </>
  );
};

export default admin;
