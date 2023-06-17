import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import jwtDecode from "jwt-decode";

//TODO: set api end point by env REFACTOR THIS ELEMENT
const fetchConfig: RequestInit = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
};

const updateToken = async () => {
  const send = verifyToken("/auth/refresh");
  const token = localStorage.getItem("token");

  if (token) {
    const decodedtoken: any = jwtDecode(token);

    if (decodedtoken?.exp * 1000 < Date.now()) {
      const newToken = await send.trigger(
        JSON.stringify({ access_token: token })
      );

      if (newToken) {
        localStorage.setItem("token", newToken);
        return;
      }
    }
  }
};

const fetcher = async (route: string, method: string, { arg }: any) => {
  if (route.match("undefined")) return;

  await updateToken();

  let config: any = {
    ...fetchConfig,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: method,
  };

  if (arg) config.body = arg;

  const resp = await fetch("http://localhost:3030" + route, config);

  console.log(resp.ok);

  if (!resp.ok) return resp.ok;

  try {
    return await resp.json();
  } catch (error) {
    return false;
  }
};

const fetcherRefresh = async (route: string, method: string, { arg }: any) => {
  if (route.match("undefined")) return;

  let config: any = {
    ...fetchConfig,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("refresh")}`,
    },
    method: method,
  };

  if (arg) config.body = arg;

  const resp = await fetch("http://localhost:3030" + route, config);

  console.log(resp.ok);

  if (!resp.ok) return resp.ok;

  try {
    return await resp.json();
  } catch (error) {
    return false;
  }
};

const fileFetcher = (route: string, { arg }: any) => {
  if (route.match("undefined")) return;

  updateToken();

  return fetch("http://localhost:3030" + route, {
    ...fetchConfig,
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: arg,
  });
};

export function useGetData(route: string) {
  const { data, isLoading, mutate } = useSWR(route, (route) =>
    fetcher(route, "GET", { undefined })
  );

  if (data === false) {
    return {
      data,
      isLoading,
      isError: true,
      mutate,
    };
  }

  return {
    data,
    isLoading,
    isError: false,
    mutate,
  };
}

export function postData(route: string, mutateRoute?: string) {
  const trigger = async (arg: any) => {
    const data = await fetcher(route, "POST", { arg });

    console.log(data);

    if (!data) {
      return false;
    }

    mutate(mutateRoute || route);

    alert("Сохранено");

    return data;
  };

  return {
    trigger,
  };
}

export function verifyToken(route: string, mutateRoute?: string) {
  const trigger = async (arg: any) => {
    const data = await fetcherRefresh(route, "POST", { arg });

    console.log(data);

    if (!data) {
      return false;
    }

    // mutate(mutateRoute || route);

    // alert("Сохранено");

    return data.access_token;
  };

  return {
    trigger,
  };
}

export function patchData(route: string, mutateRoute?: string) {
  const trigger = async (arg: any) => {
    const data = await fetcher(route, "PATCH", { arg });

    if (!data) {
      return false;
    }

    mutate(mutateRoute || route);

    alert("Сохранено");

    return true;
  };

  return {
    trigger,
  };
}

export function deleteData(route: string, mutateRoute?: string) {
  const trigger = async () => {
    console.log(route);
    const data = await fetcher(route, "DELETE", { undefined });

    if (!data) {
      return false;
    }

    mutate(mutateRoute || route);

    alert("Удалено");

    return true;
  };

  return {
    trigger,
  };
}

export function useUpload(route: string) {
  const { trigger, isMutating, error } = useSWRMutation(route, fileFetcher);

  return {
    trigger,
    isMutating,
    error,
  };
}
