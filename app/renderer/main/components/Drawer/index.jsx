import React, { PropTypes } from 'react';
import { Drawer as MdlDrawer, Navigation, Spacer, Badge, Icon } from 'react-mdl';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames';
import styles from './drawer.css';
import FaIcon from '../FaIcon';

function Drawer({ job, settings }) {
  const activeJobsCount = job.jobs.reduce(
    (previous, current) => (current.status === 'running' ? previous + 1 : previous),
    0
  );
  const drawerClassName = classnames(
    'mdl-color--blue-grey-900',
    'mdl-color-text--blue-grey-50',
    styles.drawer
  );
  const navigationLinkIconClassName = classnames(
    'mdl-color-text--blue-grey-400',
    styles.navigationLinkIcon
  );

  return (
    <MdlDrawer className={drawerClassName}>
      <Navigation className={classnames('mdl-color--blue-grey-800', styles.navigation)}>
        <IndexLink to="/" className={styles.navigationLink} activeClassName={styles.active}>
          <Icon name="home" className={navigationLinkIconClassName} />
          Games
        </IndexLink>
        <Link to="/jobs" className={styles.navigationLink} activeClassName={styles.active}>
          {!!activeJobsCount &&
            <Badge text={activeJobsCount} overlap>
              <Icon name="timer" className={navigationLinkIconClassName} />
            </Badge>
          }
          {!activeJobsCount &&
            <Icon name="timer" className={navigationLinkIconClassName} />
          }
          Jobs
        </Link>

        <Spacer />

        <Link to="/steam" className={styles.navigationLink} activeClassName={styles.active}>
          <FaIcon name="steam" className={navigationLinkIconClassName} />
          Steam
        </Link>

        <Link to="/settings" className={styles.navigationLink} activeClassName={styles.active}>
          <Icon name="settings" className={navigationLinkIconClassName} />
          Settings
        </Link>
      </Navigation>
    </MdlDrawer>
  );
}

Drawer.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Drawer;
