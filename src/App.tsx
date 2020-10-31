import React from 'react';
import Col from './components/Grid/Col';
import Row from './components/Grid/Row';

function App() {
  return (
    <div className="App">
      <Row gutter="20">
        <Col span="16">
          <div className="grid-content bg-dark">12</div>
        </Col>
        <Col span="8">
          <div className="grid-content bg-light">12</div>
        </Col>
      </Row>
      <Row gutter="20">
        <Col span="6" offset="6">
          <div className="grid-content bg-light">6</div>
        </Col>
        <Col span="6" offset="6">
          <div className="grid-content bg-light">6</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
