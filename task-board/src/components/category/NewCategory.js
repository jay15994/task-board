import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import { NewCategoryContainer } from "./Style";

const NewCategory = props => {
  const {
    showTitle,
    categoryTitle,
    onBlur,
    toggle,
    submitForm,
    handleChange,
    updateTodoByEnter,
    categoryTitleRef
  } = props;
  return (
    <NewCategoryContainer>
      <button hidden={showTitle} type="button" onClick={toggle}>
        <i className="fa fa-plus" />
      </button>
      <form hidden={!showTitle} autoComplete="off" onSubmit={submitForm}>
        <TextField
          name="categoryTitle"
          label="Category Title"
          value={categoryTitle}
          onBlur={onBlur}
          onChange={handleChange}
          onKeyDown={updateTodoByEnter}
          margin="normal"
          inputRef={categoryTitleRef}
          required
        />
        <button type="button" onClick={toggle}>
          <i className="fa fa-close" />
        </button>
        <button type="submit">
          <i className="fa fa-check" />
        </button>
      </form>
    </NewCategoryContainer>
  );
};

NewCategory.propTypes = {
  categoryTitle: PropTypes.string,
  showTitle: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateTodoByEnter: PropTypes.func.isRequired,
  categoryTitleRef: PropTypes.instanceOf(Object)
};

NewCategory.defaultProps = {
  categoryTitle: "",
  showTitle: false,
  categoryTitleRef: {}
};

export default NewCategory;
