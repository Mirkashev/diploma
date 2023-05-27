import NavTop2 from "@/components/common/nav/top-layer2";
import SideNav from "@/components/common/nav/left-side";
import TheoryComponent from "@/components/theory";

export default function TheoryView(){
  console.log('theoryview')
  return (
    <>
    <NavTop2/>
    <SideNav>
      <TheoryComponent/>
    </SideNav>
    </>

  )
}