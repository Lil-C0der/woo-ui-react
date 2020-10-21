import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import Submenu from './components/Menu/submenu';
import Transition from './components/Transition/transition';

import Icon from './components/Icon/icon';

function App() {
  const [showText, setShowText] = useState(false);
  return (
    <div className="App" style={{ padding: 10 }}>
      {/* <Icon icon="angle-down" theme="light" size="10x" /> */}
      {/* <Icon icon="cheese" theme="dark" size="10x" /> */}

      <Button
        size="lg"
        onClick={() => {
          setShowText(!showText);
        }}
      >
        Toggle
      </Button>
      <div style={{ width: 200, height: 200 }}>
        <Transition in={showText} timeout={300} animation="zoom-in-left">
          <div>
            <p>TEXT</p>
            <p>TEXT</p>
            <p>TEXT</p>
          </div>
        </Transition>
        <Transition
          in={showText}
          timeout={300}
          animation="zoom-in-bottom"
          wrapper
        >
          <Button size="lg" btnType="primary">
            BIG Button
          </Button>
        </Transition>
      </div>

      <Menu
        // selectedIndex="item_3"
        // selectedIndex="item_5_1"
        // openedSubmenus={['item_5_2']}
        // openedSubmenus={['item_5']}
        // openedSubmenus={['item_5', 'item_5_2']}
        onSelect={(index, e) => {
          console.log('选中了', index);
        }}
        onClick={(index, path) => {
          console.log('点击了', index, path);
        }}
        onOpen={(index) => {
          console.log(`打开了 ${index}`);
        }}
        onClose={(index) => {
          console.log(`关闭了 ${index}`);
        }}
        // trigger="hover"
        // vertical
        // style={{ width: 200 }}
      >
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled>menu item 2</MenuItem>
        <MenuItem>menu item 3</MenuItem>
        <MenuItem>menu item 4</MenuItem>
        <MenuItem>menu item 5</MenuItem>

        <Submenu title="submenu">
          <MenuItem>menu item 6</MenuItem>
          <MenuItem disabled>menu item 7</MenuItem>
          <Submenu title="submenu">
            <MenuItem>menu item 8</MenuItem>
            <MenuItem>menu item 9</MenuItem>
          </Submenu>
        </Submenu>
      </Menu>

      <Menu
        // selectedIndex="item_3"
        // selectedIndex="item_5_1"
        // openedSubmenus={['item_5_2']}
        // openedSubmenus={['item_5']}
        // openedSubmenus={['item_5', 'item_5_2']}
        onSelect={(index, e) => {
          console.log('选中了', index);
        }}
        onClick={(index, path) => {
          console.log('点击了', index, path);
        }}
        onOpen={(index) => {
          console.log(`打开了 ${index}`);
        }}
        onClose={(index) => {
          console.log(`关闭了 ${index}`);
        }}
        vertical
        style={{ width: 200 }}
        // trigger="hover"
      >
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled>menu item 2</MenuItem>
        <MenuItem>menu item 3</MenuItem>
        <MenuItem>menu item 4</MenuItem>
        <MenuItem>menu item 5</MenuItem>

        <Submenu title="submenu">
          <MenuItem>menu item 6</MenuItem>
          <MenuItem>menu item 7</MenuItem>
          <Submenu title="submenu">
            <MenuItem>menu item 8</MenuItem>
            <MenuItem>menu item 9</MenuItem>
          </Submenu>
        </Submenu>
      </Menu>
    </div>
  );
}

export default App;
