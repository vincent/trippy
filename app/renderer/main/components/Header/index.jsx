import React, { PropTypes } from 'react';
import { Header as MdlHeader, HeaderRow, Textfield } from 'react-mdl';
import classnames from 'classnames';
import styles from './header.css';
import GameSearchInput from '../GameSearchInput';

var Header = React.createClass({

  render: function() {
    const headerClassNames = classnames(
      'mdl-color--grey-100',
      'mdl-color-text--grey-600',
      styles.header
    );
    return (
      <MdlHeader className={headerClassNames}>
        <GameSearchInput updateGamesFilter={this.props.updateGamesFilter}/>
      </MdlHeader>
    );
  }
});

Header.propTypes = {
  updateGamesFilter: PropTypes.func.isRequired,
};

export default Header;
