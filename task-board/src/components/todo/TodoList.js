import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

import { TodoGrid, getListStyle } from "./Style";
import TodoContainer from "../../containers/todo/TodoContainer";

const TodoList = props => {
  const { category, categorizedList } = props;
  return (
    <div>
      <Droppable droppableId={String(category.id)} type="todo">
        {(provided, snapshot) => (
          <TodoGrid
            {...provided.droppableProps}
            innerRef={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {categorizedList.length > 0
              ? categorizedList.map((todo, index) => (
                  <TodoContainer
                    key={todo.id}
                    todo={todo}
                    category={category}
                    index={index}
                  />
                ))
              : "Todo list empty"}
            {provided.placeholder}
          </TodoGrid>
        )}
      </Droppable>
    </div>
  );
};

TodoList.propTypes = {
  categorizedList: PropTypes.instanceOf(Array),
  category: PropTypes.instanceOf(Object)
};

TodoList.defaultProps = {
  categorizedList: [],
  category: {}
};

export default TodoList;
