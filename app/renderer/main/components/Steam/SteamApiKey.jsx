/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import { Button, Textfield } from 'react-mdl';
import { reduxForm, Field } from 'redux-form';
import adapter, { TEXT, PASSWORD } from '../../../shared/forms/adapter';
import {shell} from 'electron';


var SteamApiKey = React.createClass({

  getInitialState: function() {
    const steam = this.props.steam;
    return {
      textFieldValue: steam.api_key
    };
  },

  _handleTextFieldChange: function(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  },

  _onSubmit: function (e) {
    this.props.onApiKeyChange(this.state.textFieldValue);
  },

  openSteamApiPage: function () {
    shell.openExternal('http://steamcommunity.com/dev/apikey');
  },

  render: function () {
    const steam = this.props.steam;
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <h3>Steam API key</h3>
          <Textfield
            onChange={this._handleTextFieldChange}
            floatingLabel={true}
            label="Enter a new Steam API key"
            value={this.state.textFieldValue}
          />&nbsp;&nbsp;Grab a Steam API key from <a onClick={this.openSteamApiPage}>here</a>
          <br/>
          <Button type="submit" raised accent ripple>Update API key</Button>
        </form>
      </div>
    );
  }
})

SteamApiKey.propTypes = {
  onApiKeyChange: PropTypes.func.isRequired,
  steam: PropTypes.object.isRequired,
};

export default SteamApiKey;
