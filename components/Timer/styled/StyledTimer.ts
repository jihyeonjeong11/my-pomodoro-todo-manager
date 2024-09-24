import styled from "styled-components";

export const StyledTimer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }

  nav {
    height: 4rem;
    background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
    box-sizing: content-box;
    display: flex;
    justify-content: space-around;
    border-radius: 2rem;
    text-align: center;
    align-items: center;
    padding: 0 20px;
    z-index: 0;

    @media (max-width: 768px) {
      width: 90vw;
    }

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

    .tab-item {
      width: 29%;
      height: 3rem;
      border-radius: 4rem;
      color: ${({ theme }) => `${theme.colors.timer.text}`};
      padding: 0.5rem;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    span {
      position: relative;
      width: 100%;
      z-index: 10;
    }
    .tab-highlight {
      position: absolute;
      inset: 0px;
      display: flex;
      align-items: center;
      border-radius: 30px;
      background: ${({ theme }) => `${theme.colors.timer.selectionHighlight}`};
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(-45deg, #2e325a, #0e112a);
    filter: drop-shadow(-3.125rem -3.125rem 6.25rem #272c5a);
    position: relative;
    width: 70vw;
    height: 70vw;

    @media (min-width: 768px) {
      width: 45vw;
      height: 45vw;
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
            transition: 0.25s;
          }
        }
      }
    }

    .numbers-inner {
      position: absolute;
    }
  }
`;

export const StyledSeperator = styled.div`
  height: 6rem;
`;
