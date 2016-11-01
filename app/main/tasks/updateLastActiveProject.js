import { scheduleJob } from 'node-schedule';

export default function updateLastActiveProject(store) {
  function doUpdate() {
    // get access token
    const {
      steam: {
        steam_id,
      },
    } = store.getState();

    // if (accessToken) {
    //   // store.dispatch(getGithubIssuesAssignedToUser(accessToken));
    // }
  }

  // every 5 minutes
  scheduleJob('*/5 * * * *', doUpdate);

  // immediately
  doUpdate();
}
