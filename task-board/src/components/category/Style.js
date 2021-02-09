import styled from "styled-components";

export const CategoryGrid = styled.div`
  padding: 3rem;
  padding-top: 55px;
  display: grid;
  grid-auto-flow: column;
  float: left;

  > div + div {
    margin-left: 8px;
  }
`;

export const NewCategoryContainer = styled.div`
  height: min-content;
  float: left;
  width: 300px;
  display: flex;
  padding: 8px;
  background-color: #e2e4e6;
  border-radius: 3px;
  box-sizing: border-box;

  > button {
    width: 100%;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
  }

  > form,
  div {
    width: 100%;
  }

  > form > button {
    cursor: pointer;
    border: none;
    float: right;
    background-color: transparent;
    position: initial;
  }
`;

export const CategoryContainer = styled.div`
  height: min-content;
  float: left;
  width: 300px;
  border-radius: 3px;
  box-sizing: border-box;

  > div > div,
  > i,
  input[type="text"] {
    width: 100%;
    float: left;
  }

  > i {
    font-size: 20px;
    width: calc(100% - 30px);
  }

  > div > div:not(:nth-child(4)) {
    padding: 8px;
    position: relative;
  }

  input {
    background-color: transparent;
    border-color: transparent;
    font-size: 1.14285714em;
    font-style: inherit;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.006em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input:hover,
  input:focus {
    background-color: #ccc;
  }

  > div > div > button {
    cursor: pointer;
    border: none;
    float: right;
    background-color: transparent;
    padding: 5px;
  }

  > div > div > form.todo-edit,
  > div > div > span {
    width: calc(100% - 30px);
  }

  > div > div > span {
    height: 28px;
    float: left;
    text-align: left;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const getItemStyle = isDragging => ({
  backgroundColor: "#e2e4e6",
  transform: isDragging ? "rotate(4deg)" : "none",
  boxShadow: "0 1px 0 #ccc",
  borderRadius: "3px",
  width: "100%",
  float: "left"
});
