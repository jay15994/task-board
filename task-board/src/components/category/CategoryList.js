import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { CategoryGrid } from "./Style";
import NewCategoryContainer from "../../containers/category/NewCategoryContainer";
import CategoryContainer from "../../containers/category/CategoryContainer";

const CategoryList = props => {
  const { categoryList, onDragEnd } = props;
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-column"
          type="column"
          direction="horizontal"
        >
          {dropProvided => (
            <CategoryGrid
              {...dropProvided.droppableProps}
              innerRef={dropProvided.innerRef}
            >
              {categoryList.map((category, index) => (
                <CategoryContainer
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
              <NewCategoryContainer />
              {dropProvided.placeholder}
            </CategoryGrid>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

CategoryList.propTypes = {
  categoryList: PropTypes.instanceOf(Array),
  onDragEnd: PropTypes.func.isRequired
};

CategoryList.defaultProps = {
  categoryList: []
};

export default CategoryList;
