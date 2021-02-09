import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { AddNewTodoInput } from "./Style";

const AddNewTodo = props => {
  const {
    todoTitle,
    showTitle,
    todoTitleRef,
    toggle,
    addNewTodo,
    handleChange,
    addNewTodoByEnter,
    onBlur
  } = props;
  return (
    <AddNewTodoInput>
      <button hidden={showTitle} type="button" onClick={toggle}>
        <i className="fa fa-plus" />
      </button>
      <form hidden={!showTitle} onSubmit={addNewTodo}>
        <TextField
          label="Add new item"
          multiline
          rows="4"
          value={todoTitle}
          onBlur={onBlur}
          onChange={handleChange}
          onKeyDown={addNewTodoByEnter}
          inputRef={todoTitleRef}
          required
        />
        <Button hidden={!todoTitle} type="submit" variant="fab" color="primary">
          <AddIcon />
        </Button>
      </form>
    </AddNewTodoInput>
  );
};

AddNewTodo.propTypes = {
  todoTitle: PropTypes.string,
  showTitle: PropTypes.bool,
  todoTitleRef: PropTypes.instanceOf(Object),
  toggle: PropTypes.func.isRequired,
  addNewTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  addNewTodoByEnter: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

AddNewTodo.defaultProps = {
  todoTitle: "",
  showTitle: false,
  todoTitleRef: {}
};

export default AddNewTodo;
