import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup
} from '@testing-library/react';
import Menu, { IMenuProps } from './menu';
import MenuItem, { IMenuItemProps } from './menuItem';

const testProps: IMenuProps = {
  // 默认选中第二个 item，即文本为 active 的 item
  selectedIndex: 'item_1',
  className: 'menu_test',
  onClick: jest.fn(),
  onSelect: jest.fn()
};

const testOnSelectProps: IMenuProps = {
  selectedIndex: 'item_1',
  onClick: jest.fn(),
  onSelect: jest.fn()
};

const testVerticalProps: IMenuProps = {
  selectedIndex: 'item_0',
  vertical: true
};

const renderMenu = (props: IMenuProps) => (
  <Menu {...props}>
    <div>extra element</div>
    <MenuItem>item_0</MenuItem>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>item_3</MenuItem>
  </Menu>
);

let wrapper: RenderResult,
  menuEl: HTMLElement,
  activeEl: HTMLElement,
  disabledEl: HTMLElement;

describe('Menu 组件', () => {
  beforeEach(() => {
    wrapper = render(renderMenu(testProps));
    menuEl = wrapper.container.querySelector('.woo-menu') as HTMLElement;
    activeEl = wrapper.getByText('active');
    disabledEl = wrapper.getByText('disabled');
  });

  it('存在', () => {
    expect(Menu).toBeTruthy();
  });

  it('提供默认 props 时能够正常渲染 Menu 和 MenuItem 组件', () => {
    expect(menuEl).toBeInTheDocument();
    expect(menuEl).toHaveClass('woo-menu menu_test');
    expect(menuEl.childElementCount).toEqual(4);
    expect(activeEl).toHaveClass('woo-menu-item woo-menu-item-active');
    expect(disabledEl).toHaveClass('woo-menu-item woo-menu-item-disabled');
  });

  it('点击 item 能触发回调', () => {
    const firstItemEl = wrapper.getByText('item_0');
    fireEvent.click(firstItemEl);
    expect(testProps.onClick).toHaveBeenCalledWith(
      'item_0',
      // RTL 貌似不能捕获到事件对象 e，所以第二个参数改成 expect 一个对象
      // https://stackoverflow.com/questions/63735881/react-jest-testing-mock-a-click-event-object
      expect.any(Object)
    );

    expect(firstItemEl).toHaveClass('woo-menu-item-active');
  });

  it('点击 disabled 的 item 不会触发回调', () => {
    fireEvent.click(disabledEl);
    expect(disabledEl).not.toHaveClass('woo-menu-item-active');
    expect(testProps.onClick).not.toHaveBeenCalledWith('item_2');
  });

  it('重复点击一个 item 只能调用一次 select', () => {
    cleanup();
    const wrapper1 = render(renderMenu(testOnSelectProps));
    const activeEl1 = wrapper1.getByText('active');
    // 点击已经 active 的 Menu Item
    fireEvent.click(activeEl1);
    expect(testOnSelectProps.onSelect).toBeCalledTimes(0);
  });

  it('可以设置 vertical 属性', () => {
    cleanup();
    const verticalWrapper = render(renderMenu(testVerticalProps));
    const verticalMenuEl = verticalWrapper.container.querySelector('.woo-menu');
    expect(verticalMenuEl).toHaveClass('woo-menu-vertical');
  });
});
