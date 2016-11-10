import React from 'react'
import ReactDOM from 'react-dom'

import Gamepad from 'gamepad.js'

const gamepad = new Gamepad();

function NavigableComponent(WrappedComponent, options) {
  options = options || {};

  return class NavigableWrappedComponent extends React.Component {

    addListeners() {
      const self = this;

      this.gamepad && this.gamepad.destroy();

      this.gamepad = new Gamepad();

      const node = ReactDOM.findDOMNode(this.refs.navigable);

      this.gamepad.on('connect', e => {
        console.log(`controller ${e.index} connected!`);
      });

      // node.addEventListener('focus')

      this.gamepad.on('press', 'd_pad_up', this.navigateUp.bind(this));
      this.gamepad.on('press', 'd_pad_down', this.navigateDown.bind(this));
      this.gamepad.on('press', 'd_pad_left', this.navigateLeft.bind(this));
      this.gamepad.on('press', 'd_pad_right', this.navigateRight.bind(this));

      this.gamepad.on('press', 'button_1', () => {
          console.log('button 1 was pressed!');
          self.navigateUp();
      });
      this.gamepad.on('press', 'button_2', () => {
          console.log('button 2 was pressed!');
          self.navigateDown();
      });
    }

    removeListeners() {
      this.gamepad && this.gamepad.destroy();
    }

    amongSiblings() {
      const node = ReactDOM.findDOMNode(this.refs.navigableParent).children[0];
      const document = node.ownerDocument;
      const children = Array.prototype.slice.apply(node.children).filter(this.isFocusable);
      const childFocused = children.find((child) => (child === document.activeElement));
      const childFocusedIndex = children.indexOf(childFocused);
      return { node, document, children, childFocused, childFocusedIndex };
    }

    isFocusable(node) {
      if (node.attributes.getNamedItem('disabled') || node.attributes.getNamedItem('tabindex') == -1)
        return false;
      if (node instanceof HTMLAnchorElement)
        return true;
      if (node instanceof HTMLAreaElement && node.attributes.getNamedItem('href'))
        return true;
      if (!node.attributes.getNamedItem('disabled')
          && (node instanceof HTMLInputElement)
          && (node instanceof HTMLSelectElement)
          && (node instanceof HTMLTextAreaElement)
          && (node instanceof HTMLButtonElement))
        return true;
      return false;
    }

    focusElement(node) {
      node.focus();
      if (options.clickOnNavigate)
        node.click();
    }

    navigateUp() {
      console.log('navigateUp');
      const { node, document, children, childFocused, childFocusedIndex } = this.amongSiblings();

      if (childFocusedIndex > -1 && childFocusedIndex > 0) {
        this.focusElement(children[childFocusedIndex-1]);

      } else if (children.length) {
        this.focusElement(children[children.length-1]);
      }
    }

    navigateDown() {
      console.log('navigateDown');
      const { node, document, children, childFocused, childFocusedIndex } = this.amongSiblings();

      if (childFocusedIndex > -1 && childFocusedIndex < children.length-1) {
        this.focusElement(children[childFocusedIndex+1]);

      } else if (children.length) {
        this.focusElement(children[0]);
      }
    }

    navigateLeft() {
      console.log('navigateLeft');
    }

    navigateRight() {
      console.log('navigateRight');
    }

    componentDidMount() {
      this.addListeners();
    }

    componentWillUnmount() {
      this.removeListeners();
    }

    render() {
      return <div ref='navigableParent'><WrappedComponent {... this.props} /></div>;
    }
  }
}

export default NavigableComponent;