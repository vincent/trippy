import React, { PropTypes, Component, Children } from 'react';
import { default as SidebarComponent } from 'react-sidebar';

var Sidebar = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false};
  },

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  render: function() {
    var sidebarContent = <b>Sidebar content</b>;

    return (
      <SidebarComponent sidebar={sidebarContent} style={{ WebkitAppRegion:'no-drag' }}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                onClick={() => this.sidebarOpen(!this.state.sidebarOpen)}
                onMouseEnter={() => this.sidebarOpen(true)}
                onMouseLeave={() => this.sidebarOpen(false)}>
        {this.props.children}
      </SidebarComponent>
    );
  }
});

export default Sidebar;
