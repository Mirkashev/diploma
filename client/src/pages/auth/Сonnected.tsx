import AuthorizationComponent from "./Сomponent";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";

const ConnectedAuthorization = () => {
  const { login }: any = useContext(AuthContext);
  const [isShownPass, togglePassword] = useState("password");

  const showPassword = (e: any): void => {
    e.preventDefault();
    togglePassword(isShownPass === "password" ? "text" : "password");
  };

  const authQuery = async (e: any): Promise<void> => {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => (reqBody[key] = value));

    const response = await fetch("http://localhost:3030/auth/login", {
      method: "POST", 
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        login(data.access_token, data.refresh_token);

      } catch (error) {
        console.log(error);
      }
    } else {
      alert("invalid login or password");
    }
  };

  return (
    <AuthorizationComponent
      title={"Авторизация"}
      authQuery={authQuery}
      showPassword={showPassword}
      isShownPass={isShownPass}
    />
  );
};
export default ConnectedAuthorization;
