import { styled } from "styled-components";

export const StyledMainWindow = styled.aside``;

export const StyledLoaderWindow = styled.aside`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    width: 100px;
    height: 100px;
  }
`;

export const StyledBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
