import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs, { ITabsProps } from './tabs';
import TabsItem from './tabsItem';

import Icon from '../Icon/icon';

const testDisabledProps: ITabsProps = {
  onTabClick: jest.fn()
};
const testDefaultProps: ITabsProps = {
  activeIndex: 'item_2',
  onTabClick: jest.fn(),
  onChange: jest.fn()
};
const testOnChangeProps: ITabsProps = {
  onChange: jest.fn()
};

const renderTabs = (props?: ITabsProps) =>
  render(
    <Tabs {...props}>
      <TabsItem name="item 1" index="item_1">
        content 1
      </TabsItem>
      <TabsItem name="item 2" index="item_2">
        content 2
      </TabsItem>
      <TabsItem name="item 3" index="item_3">
        content 3
      </TabsItem>
    </Tabs>
  );

describe('Tabs 组件', () => {
  it('存在', () => {
    expect(Tabs).toBeTruthy();
  });
  it('默认第一个 item 为 active 状态，tabs-pane 类的内容对应 TabsItem 的 children', () => {
    const { queryByText, container } = renderTabs();
    expect(queryByText('content 1')).toBeVisible();
    expect(container.querySelector('.woo-tabs-pane')?.innerHTML).toBe(
      'content 1'
    );
    expect(queryByText('item 1')).toHaveClass('woo-tabs-item-active');
  });
  it('TabsItem 组件可以设置 disabled 属性，点击后不能触发 onTabClick 回调', () => {
    const { getByText } = render(
      <Tabs {...testDisabledProps}>
        <TabsItem name="item 1" index="item_1">
          content 1
        </TabsItem>
        <TabsItem name="item 2" index="item_2" disabled>
          content 2
        </TabsItem>
        <TabsItem name="item 3" index="item_3">
          content 3
        </TabsItem>
      </Tabs>
    );
    fireEvent.click(getByText('item 2'));
    expect(getByText('item 2')).toHaveClass('woo-tabs-item-disabled');
    expect(testDisabledProps.onTabClick).not.toBeCalled();
  });
  it('Tabs 组件可以设置 activeIndex 属性，点击 TabsItem 显示不同内容，并触发 onTabClick 和 onChange 回调', () => {
    const { getByText, queryByText } = renderTabs(testDefaultProps);
    expect(queryByText('content 2')).toBeVisible();
    expect(getByText('item 2')).toHaveClass('woo-tabs-item-active');
    fireEvent.click(getByText('item 1'));
    expect(queryByText('content 2')).toEqual(null);
    expect(getByText('content 1')).toBeVisible();
    expect(testDefaultProps.onTabClick).toBeCalledWith(
      'item_1',
      'item 1',
      expect.any(Object)
    );

    fireEvent.click(getByText('item 2'));
    expect(testDefaultProps.onChange).toBeCalledWith('item_1', 'item_2');
  });
  it('重复点击 item 只会触发一次 onChange 回调', () => {
    const { getByText } = renderTabs(testOnChangeProps);
    fireEvent.click(getByText('item 1'));
    expect(testOnChangeProps.onChange).not.toBeCalled();
  });
  it('TabsItem 组件可以自定义标签内容', () => {
    const customizeName = (
      <>
        <Icon icon="arrow-alt-circle-down" className="testIcon" />
        test customize name
      </>
    );
    const { container, getByText } = render(
      <Tabs>
        <TabsItem name={customizeName} index="item_1">
          content 1
        </TabsItem>
        <TabsItem name="item 2" index="item_2">
          content 2
        </TabsItem>
        <TabsItem name="item 3" index="item_3">
          content 3
        </TabsItem>
      </Tabs>
    );
    expect(container.querySelector('.testIcon')).toBeVisible();
    expect(getByText('test customize name')).toBeVisible();
  });
});
