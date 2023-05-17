import { TestInterface } from "../../interfaces";
import TestComponent from "./Component"

const ConnectedTest = ({test, toggleShowTest}: TestInterface)=> {
  return (
    <TestComponent test={test} toggleShowTest={toggleShowTest}/>
  )
}

export default ConnectedTest;