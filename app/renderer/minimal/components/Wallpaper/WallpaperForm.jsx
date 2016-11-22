import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Cell, RadioGroup, Radio } from 'react-mdl';
import adapter, { TOGGLE, TIME, CHECKBOXES } from '../../../shared/forms/adapter';

const forms = {
  fss: require('./FssWallpaper').FssWallpaperForm,
  bing: require('./BingWallpaper').BingWallpaperForm,
  apod: require('./ApodWallpaper').ApodWallpaperForm,
  solid: require('./SolidWallpaper').SolidWallpaperForm,
};

const style = {
  WebkitAppRegion:'no-drag'
};

var WallpaperForm = React.createClass({

  getInitialState: function() {
    return this.props.wallpaper;
  },

  handleChange: function (event) {
    const self = this;
    this.setState({
      [event.target.name]: event.target.value
    });
    setTimeout(function () {
      self.props.onSubmit({
        name: self.state.name,
        settings: self.state.settings,
      });
    });
  },

  render: function () {
    const radios = Object.keys(forms).map(function(name, index) {
      const Form = forms[name];
      const Name = name[0].toUpperCase() + name.slice(1);
      return (
        <Radio key={index} value={name} ripple>{Name}
          {this.state.name == name && <Form settings={this.props.wallpaper.settings} onChange={this.handleChange} />}
        </Radio>
      );
    }.bind(this));
    return (
      <form onChange={this.handleChange} style={style}>
        <Grid>
          <Cell col={12}>
            <span>Wallpaper preferences:</span>
          </Cell>
          <Cell col={12}>
            <RadioGroup childContainer="div" name="name" value={this.state.name}>
              {radios}
            </RadioGroup>
          </Cell>
        </Grid>
      </form>
    );
  }

});

WallpaperForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  wallpaper: PropTypes.object.isRequired,
};

export default WallpaperForm;