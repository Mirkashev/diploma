import { Test } from "@/components/adminTopic/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface TableInterface {
  array: Array<any>,
  pathname?: string,
  remove?: ()=> {},
  edit?: ()=> {}
  toggleShowTest?:Dispatch<SetStateAction<boolean>>
  setTestWindowData?:Dispatch<SetStateAction<Test>>
}
