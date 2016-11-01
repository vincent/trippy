import React, { PropTypes } from 'react';
import { Layout, Content } from 'react-mdl';
import AutoUpdater from '../AutoUpdater';
import Header from '../Header';
import Drawer from '../Drawer';
import Background from '../Background';

function App({ children, system, job, settings, updateGamesFilter }) {
  return (
    <Layout fixedDrawer fixedHeader>
      <Header updateGamesFilter={updateGamesFilter}  />
      <Background />
      <Drawer job={job} settings={settings} />
      <Content component="main">
        <AutoUpdater system={system} />
        {children}
      </Content>
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('../DevTools'); // eslint-disable-line global-require
            return <DevTools />;
          }
          return null;
        })()
      }
    </Layout>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  system: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

export default App;
