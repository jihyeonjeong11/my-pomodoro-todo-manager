import styled, { css } from "styled-components";

const horizontalCenter = css`
  margin-left: auto;
  margin-right: auto;
`;

const circleRadius = css`
  border-radius: 9999px;
`;

export const StyledTimer = styled.section`
  /* tabs */
  nav {
    ul {
      ${horizontalCenter}
      margin-top: 2rem;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 24rem;
      gap: 0.5rem;
      background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
      border-radius: 1.5rem;
      padding: 0.5rem;

      li {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        color: ${({ theme }) => `${theme.colors.timer.pomodoroTitle}`};

        .tab-item {
          color: ${({ theme }) => `${theme.colors.timer.text}`};
          padding: 0.5rem;
          text-overflow: ellipsis;
        }
      }

      .tab-highlight {
        background: ${({ theme }) =>
          `${theme.colors.timer.selectionHighlight}`};
        border-radius: 1rem;
      }
    }
  }
  /* clock */
  .clock-button {
    ${horizontalCenter}
    ${circleRadius}
    width: 24rem; // possible media query implementation
    height: 24rem;
    background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
    position: relative;
    box-shadow:
      50px 50px 100px 0 rgba(22, 25, 50, 0.5),
      inset 20px 20px 25px 0 rgba(22, 25, 50, 0.5),
      inset -20px -20px 25px 0 rgba(215, 224, 255, 0.1);

    @media (max-width: 768px) {
      width: 18rem;
      height: 18rem;
    }

    @media (min-width: 992px) {
      width: 24rem;
      height: 24rem;
    }

    svg {
      position: absolute;
      top: 0;

      .fill-current {
        color: ${({ theme }) => `${theme.colors.timer.navBackground}`};
        fill: currentColor;
      }

      circle {
        color: ${({ theme }) => `${theme.colors.timer.selectionHighlight}`};
        stroke: currentColor;
        transform-origin: center;
        transform: rotateZ(-90deg);
        transition: ease-in-out;
        transition-duration: 150ms;
      }
    }

    .remaining-time {
      color: ${({ theme }) => `${theme.colors.timer.text}`};
    }
  }
`;

export const StyledSeperator = styled.div`
  height: 6rem;
`;
