import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as action from "../../actions/categoryAction";
import notificationAction from "../../actions/notificationAction";
import NewCategory from "../../components/category/NewCategory";

class NewCategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
      categoryTitle: ""
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTodoByEnter = this.updateTodoByEnter.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.categoryTitleRef = React.createRef();
  }

  onBlur() {
    this.setState({
      showTitle: false
    });
  }

  toggle() {
    const { showTitle } = this.state;
    setTimeout(() => {
      this.categoryTitleRef.current.focus();
    }, 10);
    this.setState({
      showTitle: !showTitle,
      categoryTitle: ""
    });
  }

  updateTodoByEnter(e) {
    if (e.keyCode === 27) {
      this.toggle();
    }
    if (e.keyCode === 13 && e.metaKey) {
      e.target.blur();
      this.submitForm(e);
    }
  }

  submitForm(e) {
    e.preventDefault();
    const { notification } = this.props;
    const { categoryTitle } = this.state;
    if (categoryTitle.trim()) {
      const { addNewCategory } = this.props;
      addNewCategory(categoryTitle);
      this.toggle();
    } else {
      notification({
        level: "error",
        title: "Category title cannot be empty",
        position: "tr"
      });
      e.target.focus();
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { showTitle, categoryTitle } = this.state;
    return (
      <NewCategory
        showTitle={showTitle}
        categoryTitle={categoryTitle}
        onBlur={this.onBlur}
        toggle={this.toggle}
        submitForm={this.submitForm}
        handleChange={this.handleChange}
        updateTodoByEnter={this.updateTodoByEnter}
        categoryTitleRef={this.categoryTitleRef}
      />
    );
  }
}

NewCategoryContainer.propTypes = {
  notification: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired
};

NewCategoryContainer.defaultProps = {};

const MapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewCategory: action.addNewCategory,
      notification: notificationAction
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(NewCategoryContainer);
