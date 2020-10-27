import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { IButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn()
};

const testSizeProp: IButtonProps = {
  size: 'sm'
};
const testTypeProp: IButtonProps = {
  btnType: 'danger'
};
const testClassNameProp: IButtonProps = {
  className: 'button_test'
};
const testDisableProp: IButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

describe('Button 组件', () => {
  it('存在', () => {
    expect(Button).toBeTruthy();
  });

  it('默认被渲染成 Button 元素', () => {
    const { getByText } = render(<Button>BTN</Button>);
    const el = getByText('BTN');
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveClass('woo-button woo-button-normal');
  });

  it('可以设置 size', () => {
    const { getByText } = render(<Button {...testSizeProp}>Small</Button>);
    expect(getByText('Small')).toHaveClass('woo-button-sm');
  });

  it('可以设置 btnType', () => {
    const { getByText } = render(<Button {...testTypeProp}>Danger</Button>);
    expect(getByText('Danger')).toHaveClass('woo-button-danger');
  });

  it('可以设置 className', () => {
    const { getByText } = render(<Button {...testClassNameProp}>Test</Button>);
    expect(getByText('Test')).toHaveClass('button_test');
  });

  it('btnType 为 link 且设置了 href 属性时可以渲染成 a 标签', () => {
    const { getByText } = render(
      <Button btnType={'link'} href="http://www.google.com">
        Link
      </Button>
    );
    const el = getByText('Link');
    expect(el.tagName).toEqual('A');
    expect(el).toHaveClass('woo-button-link');
  });

  it('可以设置 disabled 属性，且无法调用 onClick', () => {
    const { getByText } = render(
      <Button {...testDisableProp}>Disabled</Button>
    );
    const el = getByText('Disabled');
    expect(el).toHaveAttribute('disabled');
    expect(el).toHaveClass('woo-button-disabled');
    fireEvent.click(el);
    expect(testDisableProp.onClick).not.toHaveBeenCalled();
  });

  it('可以触发 onClick 事件', () => {
    const { getByText } = render(<Button {...defaultProps}>BTN</Button>);
    fireEvent.click(getByText('BTN'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
