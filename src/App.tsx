import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button
        onClick={(e) => {
          console.log(e.target);
        }}
      >
        click
      </Button>

      <Button
        disabled
        onClick={(e) => {
          console.log(e);
        }}
      >
        disabled
      </Button>

      <Button disabled btnType={ButtonType.Dash}>
        Dash Disabled
      </Button>

      <Button disabled btnType={ButtonType.Primary}>
        Primary Disabled
      </Button>

      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Small Danger
      </Button>

      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>

      <Button btnType={ButtonType.Link} href="http://baidu.com" target="_blank">
        Baidu Link
      </Button>

      <Button btnType={ButtonType.Link} disabled>
        disabled Link
      </Button>

      <Button btnType={ButtonType.Link} href="http://baidu.com" disabled>
        disabled Baidu
      </Button>
    </div>
  );
}

export default App;
