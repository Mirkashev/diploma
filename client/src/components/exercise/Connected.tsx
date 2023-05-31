import { useEffect, useRef, useState } from "react";
import ExerciseComponent from "./admin/Component"
import DynamicElement from "./admin/dynamicElement/Component";
import UserDynamicElement from "./user/dynamicElement/Component";

import { useRouter } from "next/router";
import { useGetData } from "@/hooks/fetching";
import UserExerciseComponent from "./user/Component";
import StaticElement from "./user/staticElement";

const ConnectedTest = ()=> {
  const router = useRouter();

  const { id, exercise_id } = router.query;
  // 
  const exercise = useGetData('/exercises/one/' + exercise_id);
  const instruments = useGetData('/instruments/');
  // when rendering always getting data from swr hooks
  const [dElements, setDElements]:any = useState([]);
  const [sElements, setSElements]:any = useState([]);

  const removeElement = (key: any, dElements: any) => {
    const tempArr = dElements.filter((el:any) => el.key !== key)
    setDElements([...tempArr.map((el: any) => ({...el, props: {...el.props, dElements: tempArr} }))]);
  }

  const changeDynamicElements = (instrumentId: number, imgUrl?: string)=> {
    const key = (Math.random() * Math.random() * 100)+'';
    dElements.push(
      !!router?.pathname?.match('/admin') ? 
        <DynamicElement 
          xP={'0'} 
          yP={'0'} 
          width={'75px'} 
          height={'75px'} 
          instrumentId={instrumentId} 
          remove={removeElement} 
          imgUrl={imgUrl}
          key={key} 
          keyP={key} 
          dElements={dElements} 
        />
      : <UserDynamicElement
          xP={'0'} 
          yP={'0'} 
          instrumentId={instrumentId} 
          imgUrl={imgUrl}
          remove={removeElement} 
          key={key} 
          keyP={key} 
          dElements={dElements} 
        />
    );

    setDElements([...dElements.map((el: any)=> ({...el, props:{...el.props, dElements: dElements}}))]);
  }


  useEffect(()=> {
    if(!!exercise?.data && router.isReady && !!router.pathname.match('/admin')) {
      const tempArr = exercise?.data[0]?.exerciseElCoordinates?.map((el: any, i: number)=>{
        const key = (Math.random() * Math.random() * 100)+'';

        return <DynamicElement 
          xP={el?.x} 
          yP={el?.y} 
          width={el?.width} 
          height={el?.height} 
          instrumentId={el?.exerciseElId} 
          imgUrl={instruments?.data?.find((elem:any) => elem.id == el?.exerciseElId)?.url}
          remove={removeElement} 
          key={key}
          keyP={key}
          dElements={dElements}
        />
      })
      setDElements([...tempArr.map((el: any)=> ({...el, props: {...el?.props, dElements: tempArr}}))]);
    }

    if(!!exercise?.data && router.isReady && !router.pathname.match('/admin')) {
      console.log('here', exercise?.data?.[0]?.exerciseElCoordinates)
      const tempArr = exercise?.data?.[0]?.exerciseElCoordinates?.map((el: any, i: number)=>{
        const key = (Math.random() * Math.random() * 100)+'';

        return <StaticElement
          key={key}
          xP={el?.x} 
          yP={el?.y} 
          width={el?.width} 
          height={el?.height} 
        />
      })
      setSElements([...tempArr]);
    }

  }, [exercise?.data])

  if(router.isReady && !!router.pathname.match('/admin')) {
    return (
      <ExerciseComponent 
        exercise={exercise.data?.[0]} 
        dElements={dElements} 
        changeDynamicElements={changeDynamicElements} 
        instruments={instruments.data}/>
    )
  }

  return(
    <UserExerciseComponent
      exercise={exercise.data?.[0]} 
      dElements={dElements}
      sElements={sElements} 
      changeDynamicElements={changeDynamicElements} 
      instruments={instruments.data}/>
  )


}

export default ConnectedTest;