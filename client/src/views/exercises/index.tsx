import NavTop2 from "@/components/common/nav/top-layer2";
import SideNav from "@/components/common/nav/left-side";
import ExComponent from "@/components/exercises";

export default function ExercisesView(){

  return (
    <>
    <NavTop2/>
    <SideNav>
      <ExComponent/>
    </SideNav>
    </>

  )
}