import { useEffect, useState } from "react";
import TableComponent from "./Component";
import { TableInterface } from "./table.interfaces";


export default function ConnectedTable({array, pathname}: TableInterface){
  // remove function
  // edit function

  console.log('table conn', array)
  return (
    <TableComponent array={array} pathname={pathname}/>
  )
}