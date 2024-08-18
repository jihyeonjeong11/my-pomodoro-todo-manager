import { styled } from "styled-components";

const StyledMainWindow = styled.aside`
  background-color: white;
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100vw;
  height: 100vw;

  @media (min-width: 992px) {
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  }
`;

export default StyledMainWindow;
