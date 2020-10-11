import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <Button
        style={{ fontSize: '20px', marginBottom: '20px' }}
        onClick={(e) => {
          console.log(e.target);
        }}
      >
        click
      </Button>

      {/* <Menu
        selectedIndex="item_3"
        onSelect={(index) => {
          console.log('选中了', index);
        }}
        onClick={(index) => {
          console.log('点击了', index);
        }}
      >
        <li>extra element</li>

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

      <Menu
        selectedIndex="item_3"
        onSelect={(index) => {
          console.log('选中了', index);
        }}
        onClick={(index) => {
          console.log('点击了', index);
        }}
      >
        <li>123</li>
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled>menu item 2</MenuItem>
        <MenuItem>menu item 3</MenuItem>
        <MenuItem>menu item 4</MenuItem>
        <MenuItem>menu item 5</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
