import NavTop2 from "@/components/common/nav/top-layer2";
import SideNav from "@/components/common/nav/left-side";
import TestComponent from "@/components/tests";

export default function TestsView(){
  return (
    <>
    <NavTop2/>
    <SideNav>
      <TestComponent/>
    </SideNav>
    </>

  )
}