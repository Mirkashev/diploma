import { useState } from "react";

const useToggle = (value?: boolean)=> {
  const[toggValue, setToggValue] = useState(value || false);

  const toggle = ()=> {
    setToggValue(!toggValue);
  }

  return ({
    value: toggValue, 
    toggle
  })
}

export default useToggle;