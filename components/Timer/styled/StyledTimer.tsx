import styled from "styled-components";
import { m as motion } from "framer-motion";

export const StyledTimer = styled.section`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }

  nav {
    margin-top: 2.75rem;
    height: 4rem;
    background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
    box-sizing: content-box;
    display: flex;
    justify-content: space-between;
    border-radius: 2rem;
    padding: 0.5rem;
    text-align: center;
    gap: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0 20px;

    @media (min-width: 768px) {
      width: 90%;
    }

    @media (min-width: 992px) {
      width: 75%;
    }

    @media (min-width: 1200px) {
      width: 75%;
    }

    @media (min-width: 1400px) {
      width: 75%;
    }

    button {
      width: 29%;
      border-radius: 4rem;
      color: ${({ theme }) => `${theme.colors.timer.text}`};
      padding: 0.5rem;
      text-overflow: ellipsis;
    }
  }

  section {
    margin-top: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(-45deg, #2e325a, #0e112a);
    filter: drop-shadow(-3.125rem -3.125rem 6.25rem #272c5a);
    position: relative;
    width: 80vw;
    height: 80vw;

    @media (min-width: 768px) {
      width: 53.38vw;
      height: 53.38vw;
    }

    @media (min-width: 992px) {
      width: 45vw;
      height: 45vw;
    }

    @media (min-width: 1200px) {
      width: 35vw;
      height: 35vw;
    }

    @media (min-width: 1400px) {
      width: 27vw;
      height: 27vw;
    }
    .inner {
      width: 89%;
      height: 89%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .circle-container {
        width: 92.88%;
        height: 92.88%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        transform: rotate(-90deg);

        svg {
          fill: transparent;
          circle {
            stroke-width: 3.75%;
            stroke: ${({ theme }) =>
              `${theme.colors.timer.selectionHighlight}`};
          }
        }
      }
    }

    .numbers-inner {
      position: absolute;
    }
  }
`;

export const StyledTimerButton = styled(motion.button)<{ checked: boolean }>`
  background: ${({ theme, checked }) =>
    checked
      ? `${theme.colors.timer.selectionHighlight}`
      : `${theme.colors.timer.navBackground}`};
`;

export const StyledNav = styled(motion.nav)``;

export const StyledSeperator = styled.div`
  height: 6rem;
`;
