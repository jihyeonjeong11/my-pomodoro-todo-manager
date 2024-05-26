import React from "react";
import Timer from "@/components/Timer";
import styled from "styled-components";

// spa main
const MainPage = () => {
  return (
    <StyledTimer>
      <h1>Pomodoro timer</h1>
      <Timer />
    </StyledTimer>
  );
};

export default MainPage;

const StyledTimer = styled.section`
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
  }

  nav {
    margin-top: 2.75rem;
    background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
    box-sizing: content-box;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    border-radius: 2rem;
    padding: 0.7rem;
    text-align: center;

    button {
      width: 14rem;
      color: ${({ theme }) => `${theme.colors.timer.text}`};
      background: ${({ theme }) => `${theme.colors.timer.selectionHighlight}`};
      padding: 1.6rem 0;
    }
  }
`;
