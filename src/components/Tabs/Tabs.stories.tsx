import React, { PropsWithChildren } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import Tabs, { ITabsProps } from './tabs';
import { ITabsItemProps } from './tabsItem';
import { TabsItemProps } from './Subcomponents.stories';
import Icon from '../Icon/icon';

export default {
  title: '标签页 Tabs',
  component: Tabs,
  subcomponents: {
    TabsItemProps
  },
  parameters: {
    docs: {
      description: {
        component:
          '#### 选项卡切换组件\n 通过 `activeIndex` 属性可以设置默认展示的标签页，如果不设置 `activeIndex` 属性则默认展示第一个标签页的内容。\n\nTabs 的子组件 TabsItem 必须通过 `index` 属性设置**唯一**的索引，通过 `name` 属性来设置顶部标签选项卡的文本，`children` 属性为标签页的内容。\n\n通过 TabsItem 组件的 `disabled` 属性可以禁用某一个标签。'
      }
    }
  },

  argTypes: {
    activeIndex: {
      description: '默认展示的 Tabs Item 的 index 属性',
      type: {
        summary: 'string'
      },
      control: 'text'
    },
    onTabClick: {
      description: '标签页被点击时触发的回调',
      type: {
        summary:
          '(index: string, name: React.ReactNode, e: React.MouseEvent) => void'
      },
      control: false
    },
    onChange: {
      description: '被选中的标签页发生变化时触发',
      type: {
        summary: '(lastIndex: string, currIndex: string) => void'
      },
      control: false,
      action: 'change'
    }
  }
} as Meta;

const renderTabsItem = (list: Array<PropsWithChildren<ITabsItemProps>>) =>
  list.map((option) => TabsItemProps(option));

const Template: Story<ITabsProps> = (args) => (
  <Tabs {...args}>
    {renderTabsItem([
      { name: 'tab 1', index: 'tab_1', children: 'content 1' },
      {
        name: 'disabled tab',
        index: 'tab_2',
        children: 'content 2',
        disabled: true
      },
      { name: 'tab 3', index: 'tab_3', children: 'content 3' },
      { name: 'tab 4', index: 'tab_4', children: 'content 4' }
    ])}
  </Tabs>
);
export const BasicTabs = Template.bind({});
BasicTabs.args = {
  activeIndex: 'tab_3',
  onTabClick: (...args) => {
    action('onTabClick')(...args);
  },
  onChange: (...args) => {
    action('onChange')(...args);
  }
};

export const customizeTabsItemName = () => (
  <Tabs>
    {renderTabsItem([
      {
        name: (
          <>
            <Icon
              icon="arrow-alt-circle-down"
              style={{ marginRight: '0.3em' }}
            />
            customize tab
          </>
        ),
        index: 'tab_1',
        children: 'content 1'
      },
      {
        name: (
          <>
            disabled tab
            <Icon icon="times" style={{ marginLeft: '0.3em' }} />
          </>
        ),
        index: 'tab_2',
        children: 'content 2',
        disabled: true
      },
      { name: 'tab 3', index: 'tab_3', children: 'content 3' }
    ])}
  </Tabs>
);
customizeTabsItemName.parameters = {
  docs: {
    description: {
      story: 'TabsItem 的 `name` 属性支持 JSX 元素，可以自定义选项卡的样式。'
    }
  }
};
