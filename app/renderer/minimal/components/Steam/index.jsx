/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import SteamAuth from './SteamAuth';
import SteamApiKey from './SteamApiKey';

const style = {
  WebkitAppRegion:'no-drag'
};

// TODO: link to unlink account (remove token via API + delete from state)
function Steam({
  cancelSteamAccount,
  authenticateSteam,
  updateSteamApiKey,
  steam,
}) {
  return (
    <Grid style={style}>
      <Cell col={12}>
        <h1>Steam</h1>

        <SteamApiKey
          onApiKeyChange={updateSteamApiKey}
          steam={steam}
        />

        {!steam.steam_id &&
          <SteamAuth
            onSubmit={authenticateSteam}
            steam={steam}
          />
        }

        {steam.steam_id &&
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
  authenticateSteam: PropTypes.func.isRequired,
  updateSteamApiKey: PropTypes.func.isRequired,
  steam: PropTypes.object.isRequired,
};

export default Steam;
