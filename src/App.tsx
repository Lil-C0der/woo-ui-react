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

      <Menu
        selectIndex="item_2"
        onSelect={(index) => {
          console.log(index);
        }}
        style={{ height: '48px' }}
      >
        <MenuItem index="item_0">menu item 1</MenuItem>
        <MenuItem disabled index="item_1">
          menu item 2
        </MenuItem>
        <MenuItem index="item_2">menu item 3</MenuItem>
        <MenuItem index="item_3">menu item 4</MenuItem>
        <MenuItem index="item_5">menu item 5</MenuItem>
      </Menu>

      <Menu
        selectIndex="item_2"
        onSelect={(index) => {
          console.log(index);
        }}
        vertical
      >
        <MenuItem index="item_0">menu item 1</MenuItem>
        <MenuItem disabled index="item_1">
          menu item 2
        </MenuItem>
        <MenuItem index="item_2">menu item 3</MenuItem>
        <MenuItem index="item_3">menu item 4</MenuItem>
        <MenuItem index="item_5">menu item 5</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
