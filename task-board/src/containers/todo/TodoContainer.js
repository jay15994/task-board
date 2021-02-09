import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as action from "../../actions/todoAction";
import notificationAction from "../../actions/notificationAction";
import Todo from "../../components/todo/Todo";

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      todoTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTodoByEnter = this.updateTodoByEnter.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.todoTitleRef = React.createRef();
  }

  onBlur() {
    this.setState({
      isUpdate: false
    });
  }

  handleChange(e) {
    this.setState({ todoTitle: e.target.value });
  }

  updateTodoByEnter(e) {
    if (e.keyCode === 27) {
      this.toggleUpdate();
    }
    if (e.keyCode === 13 && e.metaKey) {
      e.target.blur();
      this.updateTodo(e);
    }
  }

  updateTodo(e) {
    e.preventDefault();

    const { todoTitle } = this.state;
    const { updateTodo, todo, notification } = this.props;
    if (todoTitle.trim()) {
      updateTodo({
        ...todo,
        title: todoTitle
      });
      this.toggleUpdate();

      this.setState({
        todoTitle: ""
      });
    } else {
      notification({
        level: "error",
        title: "Todo cannot be empty",
        position: "tr"
      });
      e.target.focus();
    }
  }

  removeTodo() {
    const { removeTodo, todo } = this.props;
    removeTodo(todo);
  }

  toggleUpdate() {
    const { isUpdate } = this.state;
    const { todo } = this.props;
    setTimeout(() => {
      this.todoTitleRef.current.focus();
    }, 10);
    this.setState({
      isUpdate: !isUpdate,
      todoTitle: todo.title
    });
  }

  render() {
    const { isUpdate, todoTitle } = this.state;
    const { todo, index } = this.props;
    return (
      <Todo
        todo={todo}
        index={index}
        isUpdate={isUpdate}
        todoTitle={todoTitle}
        toggleUpdate={this.toggleUpdate}
        removeTodo={this.removeTodo}
        updateTodo={this.updateTodo}
        onBlur={this.onBlur}
        handleChange={this.handleChange}
        updateTodoByEnter={this.updateTodoByEnter}
        todoTitleRef={this.todoTitleRef}
      />
    );
  }
}

TodoListContainer.propTypes = {
  todo: PropTypes.instanceOf(Object),
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired,
  index: PropTypes.number
};

TodoListContainer.defaultProps = {
  todo: {},
  index: 0
};

const MapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTodo: action.updateTodo,
      removeTodo: action.removeTodo,
      notification: notificationAction
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(TodoListContainer);
