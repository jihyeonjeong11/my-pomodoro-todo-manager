import { styled } from "styled-components";

export const StyledMainWindow = styled.aside`
  background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
  position: absolute;
  inset: 0;
  top: auto;
  border: 1px solid;
  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  border-top-right-radius: 4rem;
  border-top-left-radius: 4rem;
  width: 100vw;
  height: 100vw;

  @media (min-width: 768px) {
    left: auto;
    right: auto;
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  }

  /* @media (min-width: 992px) {
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  } */
`;

// out of my creativity.
export const StyledBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: transparent;
`;
