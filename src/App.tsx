import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import Submenu from './components/Menu/submenu';

function App() {
  return (
    <div className="App">
      <Menu
        // selectedIndex="item_3"
        selectedIndex="item_5_2_1"
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
      >
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled index="item_2">
          menu item 2
        </MenuItem>
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
        selectedIndex="item_3"
        onSelect={(index) => {
          console.log('选中了', index);
        }}
        onClick={(index) => {
          console.log('点击了', index);
        }}
        vertical
        style={{ width: 256, marginTop: 30 }}
      >
        <MenuItem index="item_1">menu item 1</MenuItem>
        <MenuItem disabled index="item_2">
          menu item 2
        </MenuItem>
        <MenuItem index="item_3">menu item 3</MenuItem>
        <MenuItem index="item_4">menu item 4</MenuItem>
        <MenuItem index="item_5">menu item 5</MenuItem>
      </Menu> */}

      {/* <Menu
        selectedIndex="item_3"
        onSelect={(index, e) => {
          console.log('选中了', index);
          console.log(e.target);
        }}
        onClick={(index) => {
          console.log('点击了', index);
        }}
      >
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled>menu item 2</MenuItem>
        <MenuItem>menu item 3</MenuItem>
        <MenuItem>menu item 4</MenuItem>
        <MenuItem>menu item 5</MenuItem>
      </Menu> */}
    </div>
  );
}

export default App;
