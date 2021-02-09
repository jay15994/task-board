import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { CategoryContainer, getItemStyle } from "./Style";
import AddNewTodoContainer from "../../containers/todo/AddNewTodoContainer";
import TodoListContainer from "../../containers/todo/TodoListContainer";

const Category = props => {
  const {
    category,
    index,
    categoryTitle,
    isUpdate,
    toggleUpdate,
    updateCategoryTitle,
    handleChange,
    updateTodoByEnter,
    removeThisCategory,
    onBlur,
    categoryTitleRef
  } = props;
  return (
    <Draggable draggableId={String(category.id)} index={index}>
      {(dragProvided, snapshot) => (
        <CategoryContainer
          {...dragProvided.draggableProps}
          innerRef={dragProvided.innerRef}
        >
          <div style={getItemStyle(snapshot.isDragging)}>
            <div>
              <span
                hidden={isUpdate}
                onDoubleClick={toggleUpdate}
                {...dragProvided.dragHandleProps}
              >
                {category.title}
              </span>
              <form
                className="todo-edit"
                hidden={!isUpdate}
                onSubmit={updateCategoryTitle}
              >
                <input
                  type="text"
                  value={categoryTitle}
                  onBlur={onBlur}
                  onChange={handleChange}
                  onKeyDown={updateTodoByEnter}
                  ref={categoryTitleRef}
                  required
                />
              </form>
              <button
                type="button"
                className="fa fa-trash"
                onClick={removeThisCategory}
                category={category}
              />
            </div>
            <TodoListContainer category={category} />
            <AddNewTodoContainer category={category} />
            {dragProvided.placeholder}
          </div>
        </CategoryContainer>
      )}
    </Draggable>
  );
};

Category.propTypes = {
  category: PropTypes.instanceOf(Object),
  index: PropTypes.number.isRequired,
  isUpdate: PropTypes.bool,
  categoryTitle: PropTypes.string,
  toggleUpdate: PropTypes.func.isRequired,
  updateCategoryTitle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateTodoByEnter: PropTypes.func.isRequired,
  removeThisCategory: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  categoryTitleRef: PropTypes.instanceOf(Object)
};

Category.defaultProps = {
  category: {},
  categoryTitle: "",
  isUpdate: false,
  categoryTitleRef: {}
};

export default Category;
