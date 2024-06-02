import { useState } from "react";
import Timer from "@/components/Timer";
import { StyledTimer } from "./Timer/styled/StyledTimer";

// spa main
const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState("pomodoro");
  return (
    <StyledTimer>
      <h1>Pomodoro timer</h1>

      <Timer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </StyledTimer>
  );
};

export default MainPage;
