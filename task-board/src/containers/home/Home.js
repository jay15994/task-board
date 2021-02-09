import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Loader from "../loader/Loader";
import CategoryListContainers from "../category/CategoryListContainer";

class Home extends React.PureComponent {
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Loader loading={isLoading} />
        <CategoryListContainers />
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool
};

Home.defaultProps = {
  isLoading: false
};

const MapStateToProps = state => ({
  isLoading: state.todo.isLoading
});

export default connect(MapStateToProps)(Home);
