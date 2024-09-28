import { styled } from "styled-components";

// use ResizeObserver to make timer and list.
// on mobile Resolution, flex-direction: column; and on PC flex-direction: row
const StyledApp = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }

  .wrapper {
    overflow-y: scroll;
    height: 100vh;
    max-width: 1280px;
  }

  .wrapper::-webkit-scrollbar {
    display: none;
  }
`;

export default StyledApp;
