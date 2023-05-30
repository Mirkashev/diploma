import { Test } from "@/components/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface TableInterface {
  array: Array<any> | Array<Test>,
  pathname?: string,
  remove?: ()=> {},
  edit?: any
  toggleShowTest?:Dispatch<SetStateAction<boolean>>
  setTestWindowData?:Dispatch<SetStateAction<Test>>
  route?: string,
  mutateRoute?:string,
  modalType?:string,
  isAdmin?: boolean
}
