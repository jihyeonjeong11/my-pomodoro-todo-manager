import { styled } from "styled-components";
import TaskTitle from "@/components/TaskList/components/item/TaskTitle";

export const StyledList = styled.section`
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 24rem;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const StyledTaskTitle = styled(TaskTitle)`
  color: ${(props) =>
    props.$isactive
      ? `${props.theme.colors.timer.selectionHighlight}`
      : `${props.theme.colors.tasklist.text}`};
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
`;

export const StyledInnerList = styled.div`
  color: ${({ theme }) => `${theme.colors.tasklist.text}`};
  display: flex;
  flex-direction: column;
  width: inherit;

  // tasklistController

  .motion-button {
    border: 1px dashed;
    padding: 2rem;
    min-width: 2rem;
    justify-content: center;
    display: flex;
    flex-direction: column;
    button {
      display: flex;
      justify-content: center;
    }
  }

  // taskInput

  form {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      font-size: 1.5rem;
      color: ${({ theme }) => `${theme.colors.timer.text}`};
    }

    input {
      color: ${({ theme }) => `${theme.colors.tasklist.text}`};
      background-color: transparent;
      border: none;
      font-size: 1.5rem;
      padding: 1rem 0;
      text-align: center;
    }
  }

  // taskItems
  ul {
    list-style-type: none;
    width: inherit;

    li {
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: ${({ theme }) => `solid 1px ${theme.colors.timer.text}`};
        span {
          font-size: 1.5em;
          line-height: 23px;
        }
      }
      button {
        padding: 1rem;
      }
    }
  }
`;
