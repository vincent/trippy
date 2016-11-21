
import React from 'react';

const style =  {
    position: 'fixed',
    top: '0px',
    width: '100%',
    height: '45px',
    background: 'aliceblue',
    zIndex: '100',
}

export default function BackArrow(props) {
    var className = [ 'backButton' ].concat(String(props.className)).join(' ');
    return (
        <div style={style} className={className}>⟸</div>
    );
};;
