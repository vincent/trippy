/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';
import { reduxForm, Field } from 'redux-form';
import adapter, { TEXT, PASSWORD } from '../../../shared/forms/adapter';

function SteamAuth({ handleSubmit, steam }) {
  function onSubmit(...args) {
    handleSubmit(...args);
  }
  steam = steam || {};
  return (
    <div>
      {! steam.steam_id &&
        <form onSubmit={onSubmit}>
          <Button type="submit" raised accent ripple>Login</Button>
        </form>
      }
      {steam.steam_id &&
        <div>
          You are known on Steam with ID {steam.steam_id}
        </div>
      }
    </div>
  );
}

SteamAuth.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'steamAuth',
  adapter,
})(SteamAuth);
