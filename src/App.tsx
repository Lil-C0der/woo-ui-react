import React from 'react';
import Col from './components/Grid/Col';
import Row from './components/Grid/Row';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <Row gutter="20">
        <Col span={12}>
          <div className="grid-content bg-dark">test col</div>
        </Col>
        <Col span={12}>
          <div className="grid-content bg-dark">test col2</div>
        </Col>
      </Row>

      {/* <Row gutter="20">
        <Col span="6" offset="6">
          <div className="grid-content bg-light">6</div>
        </Col>
        <Col span="6" offset="6">
          <div className="grid-content bg-light">6</div>
        </Col>
      </Row> */}

      <Menu
        onClick={() => {}}
        onClose={function noRefCheck() {}}
        onOpen={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        selectedIndex="item_4"
        trigger="click"
        vertical={false}
      >
        <Menu.Item disabled={false} index="item_1">
          item 1
        </Menu.Item>
        <Menu.Item disabled index="item_2">
          item 2
        </Menu.Item>
        <Menu.Submenu index="item_3" title="item 3">
          <Menu.Item disabled={false} index="item_3_1">
            item 3-1
          </Menu.Item>
          <Menu.Item disabled index="item_3_2">
            item 3-2
          </Menu.Item>
          <Menu.Submenu index="item_3_3" title="item 3-3">
            <Menu.Item disabled={false} index="item_3_3_1">
              item 3-3-1
            </Menu.Item>
          </Menu.Submenu>
        </Menu.Submenu>
        <Menu.Item disabled={false} index="item_4">
          item 4
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default App;
