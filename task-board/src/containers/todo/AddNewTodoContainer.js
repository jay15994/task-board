import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as action from "../../actions/todoAction";
import notificationAction from "../../actions/notificationAction";
import AddNewTodo from "../../components/todo/AddNewTodo";

class AddNewTodoContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
      todoTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNewTodoByEnter = this.addNewTodoByEnter.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.todoTitleRef = React.createRef();
  }

  onBlur() {
    this.setState({
      showTitle: false
    });
  }

  addNewTodoByEnter(e) {
    if (e.keyCode === 27) {
      this.setState({
        todoTitle: ""
      });
      e.target.blur();
    }
    if (e.keyCode === 13 && e.metaKey) {
      e.target.blur();
      this.addNewTodo(e);
    }
  }

  addNewTodo(e) {
    e.preventDefault();
    const { category, addNewTodo, notification } = this.props;
    const { todoTitle } = this.state;
    if (todoTitle.trim()) {
      addNewTodo({
        title: todoTitle,
        categoryId: category.id
      });
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

  toggle() {
    const { showTitle } = this.state;
    setTimeout(() => {
      this.todoTitleRef.current.focus();
    }, 10);
    this.setState({
      showTitle: !showTitle,
      todoTitle: ""
    });
  }

  handleChange(e) {
    this.setState({ todoTitle: e.target.value });
  }

  render() {
    const { todoTitle, showTitle } = this.state;
    return (
      <AddNewTodo
        todoTitle={todoTitle}
        showTitle={showTitle}
        todoTitleRef={this.todoTitleRef}
        toggle={this.toggle}
        addNewTodo={this.addNewTodo}
        handleChange={this.handleChange}
        addNewTodoByEnter={this.addNewTodoByEnter}
        onBlur={this.onBlur}
      />
    );
  }
}

AddNewTodoContainer.propTypes = {
  category: PropTypes.instanceOf(Object),
  addNewTodo: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
};

AddNewTodoContainer.defaultProps = {
  category: {}
};

const MapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewTodo: action.addNewTodo,
      notification: notificationAction
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(AddNewTodoContainer);
