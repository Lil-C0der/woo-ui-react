import React from 'react';
import { render } from '@testing-library/react';

import Icon from '../Icon/icon';

describe('Icon 组件', () => {
  it('存在', () => {
    expect(Icon).toBeTruthy();
  });
  it('可以设置 icon 属性', () => {
    const { container } = render(<Icon icon="arrow-alt-circle-down" />);
    expect(container.querySelector('.woo-icon')).toHaveClass(
      'woo-icon-arrow-alt-circle-down'
    );
  });
  it('可以设置 theme 属性', () => {
    const { container } = render(
      <Icon theme="success" icon="arrow-alt-circle-down" />
    );
    expect(container.querySelector('.woo-icon')).toHaveClass(
      'woo-icon-success'
    );
  });
});
