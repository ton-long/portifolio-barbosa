import { RecoilRoot } from "recoil";
import styles from "./App.module.scss";
import TaskBar from "./components/TaskBar";
import Desktop from "./components/Desktop";

const App = () => {
  return (
    <RecoilRoot>
      <div className={styles.body}>
        <Desktop />
        <TaskBar />
      </div>
    </RecoilRoot>
  );
};

export default App;
