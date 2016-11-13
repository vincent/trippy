import React, { PropTypes, Component } from 'react';
import { Layout, Content } from 'react-mdl';
import AutoUpdater from '../AutoUpdater';
import Header from '../Header';
import Drawer from '../Drawer';
import Wallpaper from '../Wallpaper';

class App extends Component {
  static propTypes = {
    appStartup: PropTypes.func.isRequired,
    updateGamesFilter: PropTypes.func.isRequired,
    updateOwnedGames: PropTypes.func.isRequired,
    restoreAccounts: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    system: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,
    wallpaper: PropTypes.object.isRequired,
    initWallpaper: PropTypes.func.isRequired,
    fetchBingImage: PropTypes.func.isRequired,
    fetchApodImage: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.appStartup();
    this.props.initWallpaper();
    this.props.restoreAccounts();
  }

  render() {
    return (
      <Layout fixedDrawer fixedHeader>
        <Header updateGamesFilter={this.props.updateGamesFilter}  />
        <Wallpaper wallpaper={this.props.wallpaper}
                   fetchBingImage={this.props.fetchBingImage}
                   fetchApodImage={this.props.fetchApodImage}
        />
        <Drawer job={this.props.job} settings={this.props.settings} />
        <Content component="main">
          <AutoUpdater system={this.props.system} />
          {this.props.children}
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
}

export default App;
