import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

export const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (token: string) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: jwtDecode(action.payload),
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  useEffect(() => {
    console.log("authprovider ueseees");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token !== null) {
        try {
          const decodedToken: any = jwtDecode(token);

          if (decodedToken?.exp * 1000 < Date.now()) {
            console.log("token expired");
            localStorage.removeItem("token");
          } else {
            login(token);
          }
          return;
        } catch (error) {
          localStorage.removeItem("token");
        }
      }

      router.push("/auth");
    }
  }, []);

  function login(token: string) {
    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN",
      payload: token,
    });

    const decodedToken: any = jwtDecode(token);

    if (!!router.pathname.match("/auth")) {
      router.push(
        `${
          decodedToken?.role === "student" || decodedToken?.role === "teacher"
            ? "user"
            : decodedToken?.role
        }/topics/`
      );
    }
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    router.push("/auth");
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
