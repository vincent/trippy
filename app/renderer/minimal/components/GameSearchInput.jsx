import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';

var GameSearchInput = React.createClass({

  getInitialState: function() {
    return {
      textFieldValue: ''
    };
  },

  _handleTextFieldChange: function(e) {
    this.setState({
      textFieldValue: e.target.value
    });
    this.props.updateGamesFilter(e.target.value);
  },

  render: function() {
    return (
      <Textfield
        onChange={this._handleTextFieldChange}
        floatingLabel={true}
        label="Search"
        value={this.state.textFieldValue}
        style={this.props.style}
      />
    );
  }
});

GameSearchInput.propTypes = {
  updateGamesFilter: PropTypes.func.isRequired,
};

export default GameSearchInput;
