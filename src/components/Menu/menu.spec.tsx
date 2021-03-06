import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup
} from '@testing-library/react';
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import Submenu from './submenu';
import { act } from 'react-dom/test-utils';

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

const testClickOutsideProps: IMenuProps = {
  onOpen: jest.fn(),
  onClose: jest.fn()
};

const testTriggerProps: IMenuProps = {
  trigger: 'hover',
  onOpen: jest.fn(),
  onClose: jest.fn()
};

const testOpenSubmenusProps: IMenuProps = {
  openedSubmenus: ['submenu_test']
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

  it('点击 item 能触发回调，参数分别是 index path 和 事件对象 e', () => {
    const firstItemEl = wrapper.getByText('item_0');
    fireEvent.click(firstItemEl);
    expect(testProps.onClick).toHaveBeenCalledWith(
      'item_0',
      ['item_0'],
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
    const { getByText } = render(renderMenu(testOnSelectProps));
    const activeEl1 = getByText('active');
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

describe('包含 Submenu 的 Menu 组件', () => {
  it('点击页面其他地方可以关闭 popper，触发 onClose 回调', () => {
    cleanup();
    jest.useFakeTimers();
    const { getByText, container } = render(
      <Menu {...testClickOutsideProps}>
        <MenuItem>test item 0</MenuItem>
        <Submenu title="submenu" index="submenu_test">
          <MenuItem>test item 1</MenuItem>
          <MenuItem>test item 2</MenuItem>
        </Submenu>
      </Menu>
    );
    const submenuEl = getByText('submenu');
    // 打开 popper
    fireEvent.click(submenuEl);
    let listEl = container.querySelector('.woo-submenu-popper');
    expect(testClickOutsideProps.onOpen).toHaveBeenCalledWith('submenu_test');
    expect(listEl).toBeVisible();
    act(
      () =>
        new Promise((resolve) => {
          // 关闭 popper
          fireEvent.click(submenuEl);
          jest.runAllTimers();
          resolve();
        })
    ).then(() => {
      listEl = wrapper.container.querySelector('.woo-submenu-popper');
      expect(testClickOutsideProps.onClose).toBeCalledWith('submenu_test');
      expect(listEl).toEqual(null);
    });
  });

  // trigger 为 hover 时，有一个 300ms 的定时器，使用 jest 提供的方法来测试异步代码
  it('可以设置 trigger', async () => {
    cleanup();
    jest.useFakeTimers();
    const { getByText, container } = render(
      <Menu {...testTriggerProps}>
        <MenuItem>test item 0</MenuItem>
        <Submenu title="submenu" index="submenu_test">
          <MenuItem>test item 1</MenuItem>
          <MenuItem>test item 2</MenuItem>
        </Submenu>
      </Menu>
    );
    const submenuEl = getByText('submenu');
    let listEl = container.querySelector('.woo-submenu-popper');
    expect(listEl).toEqual(null);
    // 触发 mouseEnter，显示 popper
    act(() => {
      fireEvent.mouseEnter(submenuEl);
      jest.advanceTimersByTime(500);
    });
    expect(testTriggerProps.onOpen).toHaveBeenCalledWith('submenu_test');
    listEl = container.querySelector('.woo-submenu-popper');
    expect(listEl).toBeVisible();
    // 触发 mouseLeave，关闭 popper
    act(
      () =>
        new Promise((resolve) => {
          fireEvent.mouseLeave(submenuEl);
          jest.advanceTimersByTime(500);
          jest.runAllTimers();
          resolve();
        })
    ).then(() => {
      listEl = container.querySelector('.woo-submenu-popper');
      expect(testClickOutsideProps.onClose).toBeCalledWith('submenu_test');
      expect(listEl).toEqual(null);
    });
  });

  it('可以设置 openSubmenus 属性', () => {
    cleanup();
    const { container } = render(
      <Menu {...testOpenSubmenusProps}>
        <MenuItem>test item 0</MenuItem>
        <Submenu title="submenu" index="submenu_test">
          <MenuItem>test item 1</MenuItem>
          <MenuItem>test item 2</MenuItem>
        </Submenu>
      </Menu>
    );
    const popperEl = container.querySelector('.woo-submenu-list');
    expect(popperEl).toBeInTheDocument();
  });
});
