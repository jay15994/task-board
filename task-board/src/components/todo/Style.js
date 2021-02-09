import styled from "styled-components";

export const TodoListContainer = styled.div`
  min-height: 40px;
  margin: 8px 0;
  user-select: none;
  color: rgb(77, 77, 77);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: background-color 0.1s ease 0s;

  .todo-details input {
    float: left;
  }

  .todo-details button {
    cursor: pointer;
    border: none;
    float: right;
    background-color: transparent;
    position: initial;
  }

  .todo-details > span,
  .todo-details form {
    float: left;
    padding: 0 5px;
    width: calc(100% - 50px);
    height: auto;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .todo-details form {
    width: 100%;
  }

  .todo-details form textarea {
    width: calc(100% - 27px);
  }

  > div:hover {
    background-color: #edeff0 !important;
    border-bottom-color: #d6dadc;
  }
`;

export const TodoGrid = styled.div`
  text-align: left;
`;

export const NewTodoContainer = styled.div`
  button {
    cursor: pointer;
    border: none;
  }
`;

export const AddNewTodoInput = styled.div`
  > form > div {
    width: 100%;
    float: left;
  }

  > form > div label,
  > form > div textarea {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: normal;
  }

  > form > div textarea {
    line-height: 1.1;
  }

  > form button {
    position: absolute;
    bottom: 16px;
    right: 24px;
    min-height: 25px;
    height: 30px;
    width: 30px;
  }

  > button {
    width: 100%;
    padding: 0 !important;
  }

  button:focus {
    outline: none;
  }
`;

export const getItemStyle = isDragging => ({
  backgroundColor: isDragging ? "lightblue" : "#fff",
  transform: isDragging ? "rotate(4deg)" : "none",
  boxShadow: "0 1px 0 #ccc",
  width: "100%",
  height: "100%",
  float: "left",
  padding: "8px",
  borderRadius: "3px"
});

export const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? "#ccc" : "transparent",
  height: "100%"
});
