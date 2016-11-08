import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Cell, RadioGroup, Radio } from 'react-mdl';
import adapter, { TOGGLE, TIME, CHECKBOXES } from '../../../shared/forms/adapter';


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
        settings: { color:'#efefef' }
      });
    });
  },

  render: function () {
    return (
      <form onChange={this.handleChange}>
        <Grid>
          <Cell col={12}>
            <span>Wallpaper preferences:</span>
          </Cell>
          <Cell col={12}>
            <RadioGroup container="ul" childContainer="li" name="name" value="{this.state.name}">
              <Radio value="solid" ripple>Solid</Radio>
              <Radio value="fss" ripple>FSS</Radio>
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