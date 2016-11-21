import cachedUrl from '../../../../shared/helpers/cachedUrl';
import React, { PropTypes, Component } from 'react';
import { Grid, Tooltip } from 'react-mdl';

function AchievementList({
  achievements
}) {
  const achievementsCards = achievements.sort((a, b) => (1-a.owned))
    .map(function (achievement, index) {
      const img = achievement.owned ? achievement.icon : achievement.icongray;
      const tip = achievement.displayName + '\n' + achievement.description;
      return (
        <Tooltip key={index} label={tip} large>
          <img src={cachedUrl(img)} width={64} height={64} />
        </Tooltip>
      );
    });
  return (
    <Grid>
      {achievementsCards}
    </Grid>
  );
}

AchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object)
};

export default AchievementList;
