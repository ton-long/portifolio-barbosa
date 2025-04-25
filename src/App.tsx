import { RecoilRoot } from "recoil";
import "./App.module.scss";
import TaskBar from "./components/TaskBar";
import Desktop from "./components/Desktop";

const App = () => {
  return (
    <RecoilRoot>
      <Desktop />
      <TaskBar />      
    </RecoilRoot>
  );
};

export default App;
