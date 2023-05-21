import { useEffect, useState } from "react";
import { ExInterface } from "../../interfaces";
import ExerciseComponent from "./Component"
import DynamicElement from "./dynamicElement/Component";

const ConnectedTest = ({exercise, toggleShowTest}: ExInterface)=> {
  const [dElements, setDElements]:any = useState([]);
  const [instruments, setInstruments]:any = useState([])
  const changeDynamicElements = ()=> {
    setDElements([...dElements, <DynamicElement key={Math.random() * Math.random()}/>]);
  }

  useEffect(()=>{
    const getInstruments = async ()=> {
      const response = await fetch('http://localhost:3030/instruments', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      if(!response.ok) {
        alert('smthing wrong');
        return;
      }

      const data = await response.json();

      setInstruments(data);
    }

    getInstruments();
  }, [])

  return (
    <ExerciseComponent exercise={exercise} toggleShowTest={toggleShowTest} dElements={dElements} changeDynamicElements={changeDynamicElements} instruments={instruments}/>
  )
}

export default ConnectedTest;