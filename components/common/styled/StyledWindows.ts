import { styled } from "styled-components";

const StyledMainWindow = styled.aside`
  background-color: white;
  position: absolute;
  inset: 0;
  top: auto;
  width: 100vw;
  height: 100vw;
  border-top-right-radius: 4rem;
  border-top-left-radius: 4rem;

  @media (min-width: 992px) {
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  }
`;

export default StyledMainWindow;
