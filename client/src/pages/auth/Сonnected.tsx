import AuthorizationComponent from "./Сomponent";
import { useContext, useState } from 'react';
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

const ConnectedAuthorization = () => {
  const { login, user: userContext } = useContext(AuthContext);
  const router = useRouter();
  const [isShownPass, togglePassword] = useState('password');

  const showPassword = (e: any): void => {
    e.preventDefault();
    togglePassword((isShownPass === 'password' ? 'text' : 'password'));
  }

  const authQuery = async (e: any): Promise<void> => {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => reqBody[key] = value);

    console.log(reqBody);
    // TODO: send encrypted body
    const response = await fetch('http://localhost:3030/auth/login', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(reqBody)
    })

    if(response.ok) {
      try {
        const data = await response.json();
        login(data.access_token);

        router.push('/user/topics');
      } catch (error) {
        console.log(error);
      }
    }else {
      alert('invalid login or password');
    }
  }


  return (
  <AuthorizationComponent 
    title={'Авторизация'}
    authQuery={authQuery}
    showPassword={showPassword}
    isShownPass={isShownPass}
  />
  )
}
export default ConnectedAuthorization;