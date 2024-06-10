import styled from "styled-components";

export const StyledTimer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 53vw;

  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
    padding: 2.75rem 0;
  }

  nav {
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
      width: 55%;
    }

    @media (min-width: 1400px) {
      width: 45%;
    }

    button {
      border-radius: 4rem;
      color: ${({ theme }) => `${theme.colors.timer.text}`};
      padding: 0.5rem;
      text-overflow: ellipsis;
    }
  }

  section {
    width: 50vw;
    height: 50vw;
    margin-top: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(-45deg, #2e325a, #0e112a);
    filter: drop-shadow(-3.125rem -3.125rem 6.25rem #272c5a);
    position: relative;

    @media (min-width: 768px) {
      width: 53vw;
    }

    @media (min-width: 992px) {
      width: 45vw;
    }

    @media (min-width: 1200px) {
      width: 35vw;
      height: 35vw;
    }

    @media (min-width: 1400px) {
      width: 27vw;
      height: 27vw;
    }
    // maybe need one more inner layer! .clock-body-inner-container
    .inner {
      width: 92.88%;
      height: 92.88%;
      background-color: ${({ theme }) => `${theme.colors.timer.navBackground}`};
      border-radius: 50%;
      position: relative;
      .svg-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        svg {
          fill: transparent;
          circle {
            stroke-width: 2%;
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

export const StyledTimerButton = styled.button<{ checked: boolean }>`
  background: ${({ theme, checked }) =>
    checked
      ? `${theme.colors.timer.selectionHighlight}`
      : `${theme.colors.timer.navBackground}`};
`;

export const StyledSeperator = styled.div`
  height: 6rem;
`;
