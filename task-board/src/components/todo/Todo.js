import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { TextField } from "@material-ui/core";

import { TodoListContainer, getItemStyle, AddNewTodoInput } from "./Style";

const TodoList = props => {
  const {
    todo,
    index,
    todoTitle,
    isUpdate,
    toggleUpdate,
    removeTodo,
    updateTodo,
    onBlur,
    handleChange,
    updateTodoByEnter,
    todoTitleRef
  } = props;
  return (
    <Draggable draggableId={String(todo.id)} index={index}>
      {(provided, snapshot) => (
        <TodoListContainer
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          innerRef={provided.innerRef}
        >
          <div
            hidden={isUpdate}
            className="todo-details"
            style={getItemStyle(snapshot.isDragging)}
            onDoubleClick={toggleUpdate}
          >
            <span>{todo.title}</span>
            &nbsp;
            <button type="button" onClick={removeTodo}>
              <i className="fa fa-trash" />
            </button>
          </div>
          <div
            hidden={!isUpdate}
            className="todo-details"
            style={getItemStyle(snapshot.isDragging)}
          >
            <AddNewTodoInput>
              <form onSubmit={updateTodo} className="todo-edit">
                <TextField
                  label="Add new item"
                  multiline
                  rows="4"
                  value={todoTitle}
                  onBlur={onBlur}
                  onChange={handleChange}
                  onKeyDown={updateTodoByEnter}
                  inputRef={todoTitleRef}
                  required
                />
                <button type="button" onClick={toggleUpdate} todo={todo}>
                  <i className="fa fa-close" />
                </button>
                <button type="submit">
                  <i className="fa fa-check" />
                </button>
              </form>
            </AddNewTodoInput>
          </div>
        </TodoListContainer>
      )}
    </Draggable>
  );
};

TodoList.propTypes = {
  todo: PropTypes.instanceOf(Object),
  todoTitleRef: PropTypes.instanceOf(Object),
  index: PropTypes.number,
  todoTitle: PropTypes.string,
  isUpdate: PropTypes.bool,
  toggleUpdate: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateTodoByEnter: PropTypes.func.isRequired
};

TodoList.defaultProps = {
  todo: {},
  todoTitleRef: {},
  index: 0,
  todoTitle: "",
  isUpdate: false
};

export default TodoList;
