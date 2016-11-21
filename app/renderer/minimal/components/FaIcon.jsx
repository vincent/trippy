
import React from 'react';

var FaIcon = function FaIcon(props) {
    var className = [ 'fa fa-' + String(props.name) ].concat(String(props.className)).join(' ');
    return React.createElement(
        'i',
        { className: className } // aria-hidden="true"
    );
};

export default FaIcon;
