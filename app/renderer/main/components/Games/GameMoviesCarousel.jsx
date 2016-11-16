import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cachedUrl from '../../../../shared/helpers/cachedUrl';
import Slider from 'react-slick';
import Video from 'react-html5video';
import 'react-html5video/dist/ReactHtml5Video.css';

const styles = {
}

function GameMoviesCarousel({
  movies,
}) {
  const items = movies.map(function(movie, index) {
    return (
      <div key={index}>
        <Video controls autoPlay loop muted
          poster={movie.thumbnail}>
          <source src={movie.webm[480]} type="video/webm" />
        </Video>
      </div>
    );
  });
  var settings = {
    arrows: false,
    autoplay: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {items}
    </Slider>
  );
}

GameMoviesCarousel.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default GameMoviesCarousel;
