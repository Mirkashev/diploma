
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
//TODO: set api end point by env REFACTOR THIS ELEMENT
const fetchConfig: RequestInit = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", 
}

const fetcher = async (route: string, method: string, { arg }: any) => {
  if(route.match('undefined')) return;

  let config = {
    ...fetchConfig, 
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    method: method,
  }

  if(arg) config.body = arg;

  const resp = await fetch('http://localhost:3030' + route, config);

  if(!resp.ok) return resp.ok;

  // console.log( await resp.json())

  return (await resp.json());
}

const fileFetcher = (route: string, { arg }: any) => {
  if(route.match('undefined')) return;

  return fetch('http://localhost:3030' + route, {
  ...fetchConfig, 
  headers: {
    // "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }, 
  method:'POST', 
  body: arg})
}


export function useGetData (route: string) {
  const { data, isLoading, mutate} = useSWR(route, 
    (route)=> fetcher(route, 'GET', { undefined }));

  if(!data) {
    return {
      data,
      isLoading,
      isError: true,
      mutate,
    }
  }

  return {
    data,
    isLoading,
    isError: false,
    mutate,
  }
}

// export function usePostData(route: string) {
//   const { trigger, isMutating, error } = useSWRMutation(route, 
//     (route, { arg }) => fetcher(route, 'POST', { arg }))

//   return {
//     trigger,
//     isMutating,
//     error
//   }
// }

export function usePostData(route: string, mutateRoute?: string) {
  const trigger = async(arg: any)=> {
    const data = await fetcher(route, 'POST', {arg});

    if(!data) {
      return false;
    }

    mutate(mutateRoute || route);
    
    return data;
  }
  
  return {
    trigger
  }
}

export function usePatchDataM(route: string, mutateRoute?: string){
  const trigger = async(arg: any)=> {
    const data = await fetcher(route, 'PATCH', {arg});

    if(!data) {
      return false;
    }

    mutate(mutateRoute || route);

    return true;
  }
  
  return {
    trigger
  }
}

export function usePatchData(route: string) {
  const { trigger, isMutating, error } = useSWRMutation(route, 
    (route, { arg }) => fetcher(route, 'PATCH', { arg }))

  return {
    trigger,
    isMutating,
    error
  }
}

export function useDeleteData(route: string, mutateRoute?: string) {
  const trigger = async()=> {
    const data = await fetcher(route, 'DELETE', {undefined});

    if(!data) {
      return false;
    }

    mutate(mutateRoute || route);

    return true;
  }
  
  return {
    trigger
  }
}

export function useUpload(route: string) {
  const { trigger, isMutating, error } = useSWRMutation(route, fileFetcher)

  return {
    trigger,
    isMutating,
    error
  }
}