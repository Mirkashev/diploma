import { useEffect, useRef, useState } from "react";
import ExerciseComponent from "./admin/Component"
import DynamicElement from "./admin/dynamicElement/Component";
import UserDynamicElement from "./user/dynamicElement/Component";

import { useRouter } from "next/router";
import { useGetData } from "@/hooks/fetching";
import UserExerciseComponent from "./user/Component";
import StaticElement from "./user/staticElement";
import NavTop2 from "../common/nav/top-layer2/Сomponent";
import SideNav from "../common/nav/left-side";

const ConnectedTest = ()=> {
  const router = useRouter();

  const { id, exercise_id } = router.query;
  // 
  const { data, isLoading, isError } = useGetData('/exercises/' + exercise_id);
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
    if(!!data && router.isReady && !!router.pathname.match('/admin')) {
      const tempArr = data?.exerciseElCoordinates?.map((el: any, i: number)=>{
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

    if(!!data && router.isReady && !router.pathname.match('/admin')) {
      const tempArr = data?.exerciseElCoordinates?.map((el: any, i: number)=>{
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

  }, [data])


  return(
    <>
      <NavTop2/>
      <SideNav>
      {router.isReady && !!router.pathname.match('/admin') 
        ? 
          <ExerciseComponent 
          exercise={data} 
          dElements={dElements} 
          changeDynamicElements={changeDynamicElements} 
          instruments={instruments.data}/>
        :
          <UserExerciseComponent
          exercise={data} 
          dElements={dElements}
          sElements={sElements} 
          changeDynamicElements={changeDynamicElements} 
          instruments={instruments.data}/>
      }
      </SideNav>
    </>)


}

export default ConnectedTest;