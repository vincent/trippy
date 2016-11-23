import React, { PropTypes, Component } from 'react';
import { Layout, Content } from 'react-mdl';
import AutoUpdater from '../AutoUpdater';
import Wallpaper from '../Wallpaper';
import Sidebar from '../Sidebar';

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
    const style = {
      height:'95%',
      overflow: 'hidden',
      padding:'20px',
      width:'calc(100% - 40px)',
    };
    return (
      <Sidebar>
        <Content style={style} component="main">
          <AutoUpdater system={this.props.system} />
          <Wallpaper wallpaper={this.props.wallpaper}
                     fetchBingImage={this.props.fetchBingImage}
                     fetchApodImage={this.props.fetchApodImage}
          />
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
      </Sidebar>
    );
  }
}

export default App;
