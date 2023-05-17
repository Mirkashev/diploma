import { TestInterface } from "../../interfaces";

export default function TestComponent({test, toggleShowTest}: TestInterface){
  return(
    <div>
      <button onClick={()=> toggleShowTest(false)}>back</button>
      {test.title}
    </div>
  )
}