import React, { PropTypes, Component, Children } from 'react';
import { default as SidebarComponent } from 'react-sidebar';
import { Navigation, Spacer, Badge, Icon } from 'react-mdl';
import { Link, IndexLink } from 'react-router';
import FaIcon from '../FaIcon';
import classnames from 'classnames';
import menuStyles from './sidebar.css';

const drawerClassName = classnames(
  'mdl-color--blue-grey-900',
  'mdl-color-text--blue-grey-50',
  menuStyles.drawer
);
const navigationLinkIconClassName = classnames(
  'mdl-color-text--blue-grey-400',
  menuStyles.navigationLinkIcon
);

var Sidebar = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false};
  },

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  render: function() {
    const sidebarContent = (
      <Navigation className={classnames('mdl-color--blue-grey-800', menuStyles.navigation)}
          onMouseEnter={() => this.onSetSidebarOpen(true)}
          onMouseLeave={() => this.onSetSidebarOpen(false)}>

        <Link to="/games" className={menuStyles.navigationLink} activeClassName={menuStyles.active}>
          <Icon name="games" />
          Games
        </Link>

        <Spacer />

        <Link to="/steam" className={menuStyles.navigationLink} activeClassName={menuStyles.active}>
          <FaIcon name="steam" />
          Steam
        </Link>

        <Link to="/settings" className={menuStyles.navigationLink} activeClassName={menuStyles.active}>
          <Icon name="settings" />
          Settings
        </Link>
      </Navigation>
    );

    const styles = {
      sidebar: {
        WebkitAppRegion:'no-drag'
      }
    };

    return (
      <SidebarComponent styles={styles}
                        maxTranslate={90}
                        rootClassName={menuStyles.drawer}
                        sidebar={sidebarContent}
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}>
        {this.props.children}
      </SidebarComponent>
    );
  }
});

export default Sidebar;
