import React, { PropTypes } from 'react';
import { Header as MdlHeader, HeaderRow, Textfield } from 'react-mdl';
import classnames from 'classnames';
import styles from './header.css';

var Header = React.createClass({

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
    const headerClassNames = classnames(
      'mdl-color--grey-100',
      'mdl-color-text--grey-600',
      styles.header
    );
    return (
      <MdlHeader className={headerClassNames}>
        <Textfield
          onChange={this._handleTextFieldChange}
          floatingLabel={true}
          label="Search"
          value={this.state.textFieldValue}
        />
      </MdlHeader>
    );
  }
});

Header.propTypes = {
  updateGamesFilter: PropTypes.func.isRequired,
};

export default Header;
