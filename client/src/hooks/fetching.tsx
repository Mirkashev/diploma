
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
//TODO: set api end point by env
const fetchConfig: RequestInit = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", 
}

const fetcher = (route: string) => {
  if(route.match('undefined')) return;

  return fetch('http://localhost:3030' + route, {
  ...fetchConfig, 
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }}).then(res => res.json());
}

const postFetcher = (route: string, { arg }: any) => {
  if(route.match('undefined')) return;

  return fetch('http://localhost:3030' + route, {
  ...fetchConfig, 
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }, 
  method:'POST', 
  body: arg})
}

export function useGetData (route: string) {
  const { data, error, isLoading, mutate} = useSWR(route, fetcher);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function usePostData(route: string) {
  const { trigger, isMutating, error } = useSWRMutation(route, postFetcher)

  return {
    trigger,
    isMutating,
    error
  }
}