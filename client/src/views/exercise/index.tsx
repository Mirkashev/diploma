import NavTop2 from "@/components/common/nav/top-layer2";
import SideNav from "@/components/common/nav/left-side";
import ExerciseComponent from "@/components/exercise";

export default function ExerciseView(){

  return(
    <>
    <NavTop2/>
    <SideNav>
      <ExerciseComponent/>
    </SideNav>
    </>

  )
}