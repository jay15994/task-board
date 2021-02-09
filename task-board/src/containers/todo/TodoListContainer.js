import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TodoList from "../../components/todo/TodoList";

class TodoListContainer extends PureComponent {
  render() {
    const { todoList, category } = this.props;
    const categorizedList = todoList.filter(
      todo => todo.categoryId === category.id
    );
    return <TodoList categorizedList={categorizedList} category={category} />;
  }
}

TodoListContainer.propTypes = {
  todoList: PropTypes.instanceOf(Array),
  category: PropTypes.instanceOf(Object)
};

TodoListContainer.defaultProps = {
  todoList: [],
  category: {}
};

const MapStateToProps = state => ({
  todoList: state.todo.todoList
});

export default connect(MapStateToProps)(TodoListContainer);
