import styled from "styled-components";

export const StyledTimer = styled.section`
  h1 {
    color: ${({ theme }) => `${theme.colors.timer.text}`};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
  }

  div {
    padding: 0 20rem 0 20rem;
    nav {
      margin-left: auto;
      margin-right: auto;
      margin-top: 2.75rem;
      background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
      box-sizing: content-box;
      display: flex;
      justify-content: space-between;
      border-radius: 2rem;
      padding: 0.5rem;
      text-align: center;
      gap: 0.5rem;

      button {
        width: 14rem;
        color: ${({ theme }) => `${theme.colors.timer.text}`};

        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }
`;

export const StyledTimerButton = styled.button<{ checked: boolean }>`
  background: ${({ theme, checked }) =>
    checked
      ? `${theme.colors.timer.selectionHighlight}`
      : `${theme.colors.timer.navBackground}`};
`;
