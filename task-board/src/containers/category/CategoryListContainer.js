import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as todoAction from "../../actions/todoAction";
import * as categoryAction from "../../actions/categoryAction";
import CategoryList from "../../components/category/CategoryList";

class CategoryListContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "todo") {
      const { rearrangeTodo, todoList } = this.props;
      rearrangeTodo(result, todoList);
    }
    if (type === "column") {
      const { categoryList, rearrangeCategory } = this.props;
      categoryList.splice(
        destination.index,
        0,
        categoryList.splice(source.index, 1)[0]
      );
      rearrangeCategory(categoryList);
    }
  }

  render() {
    const { categoryList } = this.props;
    return (
      <CategoryList categoryList={categoryList} onDragEnd={this.onDragEnd} />
    );
  }
}

CategoryListContainer.propTypes = {
  categoryList: PropTypes.instanceOf(Array),
  todoList: PropTypes.instanceOf(Array),
  rearrangeTodo: PropTypes.func.isRequired,
  rearrangeCategory: PropTypes.func.isRequired
};

CategoryListContainer.defaultProps = {
  categoryList: [],
  todoList: []
};

const MapStateToProps = state => ({
  categoryList: state.category.categoryList,
  todoList: state.todo.todoList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      rearrangeTodo: todoAction.rearrangeTodo,
      rearrangeCategory: categoryAction.rearrangeCategory
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(CategoryListContainer);
