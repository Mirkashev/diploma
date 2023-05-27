import { useEffect, useRef, useState } from "react";
import ExerciseComponent from "./Component"
import DynamicElement from "./dynamicElement/Component";
import { useRouter } from "next/router";
import { useGetData } from "@/hooks/fetching";

const ConnectedTest = ()=> {
  const router = useRouter();

  const { id, exercise_id } = router.query;
  // 
  const exercise = useGetData('/exercises/one/' + exercise_id);
  const instruments = useGetData('/instruments/');
  // when rendering always getting data from swr hooks
  const [dElements, setDElements]:any = useState([]);
  console.log(dElements)

  // TODO:FIX IT 
  const removeElement = (key: any, dElements: any) => {
    const tempArr = dElements.filter((el:any) => el.key !== key)
    setDElements([...tempArr.map((el: any) => ({...el, props: {...el.props, dElements: tempArr} }))]);
  }

  const changeDynamicElements = (instrumentId: number)=> {
    const key = (Math.random() * Math.random() * 100)+'';
    dElements.push(
    <DynamicElement 
      xP={'0'} 
      yP={'0'} 
      width={'75px'} 
      height={'75px'} 
      instrumentId={instrumentId} 
      remove={removeElement} 
      key={key} 
      keyP={key} 
      dElements={dElements} 
    />);

    setDElements([...dElements.map((el: any)=> ({...el, props:{...el.props, dElements: dElements}}))]);
  }


  useEffect(()=> {
    if(!!exercise?.data) {
      console.log('data');
      const tempArr = exercise?.data[0]?.exerciseElCoordinates?.map((el: any, i: number)=>{
        console.log(el)
        const key = (Math.random() * Math.random() * 100)+'';

        return <DynamicElement 
          xP={el?.x} 
          yP={el?.y} 
          width={el?.width} 
          height={el?.height} 
          instrumentId={el?.exerciseElId} 
          remove={removeElement} 
          key={key}
          keyP={key}
          dElements={dElements}
        />
      })
      setDElements([...tempArr.map((el: any)=> ({...el, props: {...el?.props, dElements: tempArr}}))]);
    }

    // setDElements([...exe])
  }, [exercise?.data])


  return (
    <ExerciseComponent 
      exercise={exercise.data?.[0]} 
      dElements={dElements} 
      changeDynamicElements={changeDynamicElements} 
      instruments={instruments.data}/>
  )
}

export default ConnectedTest;