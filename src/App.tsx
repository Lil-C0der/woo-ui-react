import React, { useState } from 'react';
import Button from './components/Button';
import Col from './components/Grid/Col';
import Row from './components/Grid/Row';
import Menu from './components/Menu';

function App() {
  const [index, setIndex] = useState('item_2');
  return (
    <div className="App">
      <Button
        onClick={() => {
          setIndex('item_4');
        }}
      >
        BTN
      </Button>

      <Menu
        onClick={() => {}}
        selectedIndex={index}
        trigger="click"
        vertical={false}
        fullyOnControl={true}
      >
        <Menu.Item index="item_1">item 1</Menu.Item>
        <Menu.Item index="item_2">item 2</Menu.Item>

        <Menu.Item index="item_4">item 4</Menu.Item>
      </Menu>
    </div>
  );
}

export default App;
