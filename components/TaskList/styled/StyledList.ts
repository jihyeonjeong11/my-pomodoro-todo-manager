import { styled } from "styled-components";
import TaskTitle from "@/components/TaskList/components/item/TaskTitle";

export const StyledList = styled.section`
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 24rem;
  text-align: center;
  color: white;
  justify-content: center;
  align-items: center;

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
      text-align: center;
    }
  }
`;

export const StyledTaskTitle = styled(TaskTitle)`
  color: ${(props) =>
    props.$isactive
      ? `${props.theme.colors.timer.selectionHighlight}`
      : "white"};
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
`;

export const StyledInnerList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;

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

  input {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 1rem 0;
  }
  label {
    font-size: 2rem;
    color: ${({ theme }) => `${theme.colors.timer.text}`};
  }
  ul {
    list-style-type: none;
    width: inherit;

    li {
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${({ theme }) => `${theme.colors.timer.mainBackground}`};
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
