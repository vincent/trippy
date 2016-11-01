/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import config from '../../../../config';
import SteamAuth from './SteamAuth';

// TODO: link to unlink account (remove token via API + delete from state)
function Steam({
  cancelSteamAccount,
  restoreSteamAccount,
  authenticateSteam,
  steam,
}) {
  const authRequired = ! steam.steam_id;

  if (authRequired) restoreSteamAccount();

  return (
    <Grid>
      <Cell col={12}>
        <h1>Steam</h1>

        {authRequired &&
          <SteamAuth
            onSubmit={authenticateSteam}
            steam={steam}
          />
        }

        {!authRequired &&
          <div>
            You are known on Steam as #{steam.steam_id} <Button onClick={cancelSteamAccount}>Cancel</Button>
          </div>
        }
      </Cell>
    </Grid>
  );
}

Steam.propTypes = {
  cancelSteamAccount: PropTypes.func.isRequired,
  restoreSteamAccount: PropTypes.func.isRequired,
  authenticateSteam: PropTypes.func.isRequired,
  steam: PropTypes.object.isRequired,
};

export default Steam;
