import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import Submenu from './components/Menu/submenu';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import Icon from './components/Icon/icon';

function App() {
  return (
    <div className="App">
      {/* <Icon icon="coffee"></Icon> */}
      <Icon icon="angle-down" theme="light" size="10x" />
      <Icon icon="cheese" theme="dark" size="10x" />
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
        vertical
        // style={{ width: 200 }}
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

      {/* <Menu
        // selectedIndex="item_3"
        selectedIndex="item_5_1"
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
        style={{ marginTop: 50 }}
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
      </Menu> */}
    </div>
  );
}

export default App;
