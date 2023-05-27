import NavTop2 from "@/components/common/nav/top-layer2";
import SideNav from "@/components/common/nav/left-side";
import TestComponent from "@/components/test";

export default function TestView(){
  return (
    <>
    <NavTop2/>
    <SideNav>
      <TestComponent/>
    </SideNav>
    </>
  )
}