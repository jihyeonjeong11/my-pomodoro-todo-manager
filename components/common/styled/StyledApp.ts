import { styled } from "styled-components";

// use ResizeObserver to make timer and list.
// on mobile Resolution, flex-direction: column; and on PC flex-direction: row
const StyledApp = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }
`;

export default StyledApp;
