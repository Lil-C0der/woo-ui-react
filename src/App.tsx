import React, { useEffect, useRef } from 'react';
import Col from './components/Grid/Col';
import Row from './components/Grid/Row';

function App() {
  useEffect(() => {
    console.log(
      window.getComputedStyle(document.querySelector('.woo-col') as Element)
        .width
    );
  }, []);
  return (
    <div className="App">
      <Row>
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
    </div>
  );
}

export default App;
