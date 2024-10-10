import { styled } from "styled-components";

// use ResizeObserver to make timer and list.
// on mobile Resolution, flex-direction: column; and on PC flex-direction: row
const StyledApp = styled.div`
  position: fixed;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }

  .wrapper {
    overflow-y: scroll;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .wrapper::-webkit-scrollbar {
    display: none;
  }
`;

export default StyledApp;
