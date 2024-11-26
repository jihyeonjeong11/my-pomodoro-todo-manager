import { styled } from "styled-components";

const StyledApp = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => `${theme.colors.timer.mainBackground}`};
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
  /* title */
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }
`;

export default StyledApp;
