import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import notificationAction from "../../actions/notificationAction";
import * as action from "../../actions/categoryAction";
import Category from "../../components/category/Category";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      categoryTitle: props.category.title
    };
    this.updateCategoryTitle = this.updateCategoryTitle.bind(this);
    this.removeThisCategory = this.removeThisCategory.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTodoByEnter = this.updateTodoByEnter.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.categoryTitleRef = React.createRef();
  }

  onBlur() {
    this.setState({
      isUpdate: false
    });
  }

  updateCategoryTitle(e) {
    e.preventDefault();
    const { category, updateCategory, notification } = this.props;
    const { categoryTitle } = this.state;

    if (categoryTitle.trim()) {
      updateCategory({
        ...category,
        title: categoryTitle
      });
      this.toggleUpdate();
    } else {
      notification({
        level: "error",
        title: "Category cannot be empty",
        position: "tr"
      });
      e.target.focus();
    }
  }

  toggleUpdate() {
    const { isUpdate } = this.state;
    const { category } = this.props;
    setTimeout(() => {
      this.categoryTitleRef.current.focus();
    }, 10);
    this.setState({
      isUpdate: !isUpdate,
      categoryTitle: category.title
    });
  }

  removeThisCategory() {
    const { removeCategory, category } = this.props;
    removeCategory(category);
  }

  updateTodoByEnter(e) {
    if (e.keyCode === 27) {
      this.toggleUpdate();
    }
    if (e.keyCode === 13 && e.metaKey) {
      e.target.blur();
      this.updateCategoryTitle(e);
    }
  }

  handleChange(e) {
    this.setState({ categoryTitle: e.target.value });
  }

  render() {
    const { category, index } = this.props;
    const { categoryTitle, isUpdate } = this.state;
    return (
      <Category
        category={category}
        index={index}
        categoryTitle={categoryTitle}
        isUpdate={isUpdate}
        toggleUpdate={this.toggleUpdate}
        updateCategoryTitle={this.updateCategoryTitle}
        handleChange={this.handleChange}
        updateTodoByEnter={this.updateTodoByEnter}
        removeThisCategory={this.removeThisCategory}
        onBlur={this.onBlur}
        categoryTitleRef={this.categoryTitleRef}
      />
    );
  }
}

CategoryContainer.propTypes = {
  category: PropTypes.instanceOf(Object),
  index: PropTypes.number.isRequired,
  updateCategory: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
};

CategoryContainer.defaultProps = {
  category: {}
};

const MapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCategory: action.updateCategory,
      removeCategory: action.removeCategory,
      notification: notificationAction
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(CategoryContainer);
