import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import Submenu from './submenu';

export default {
  title: '菜单 Menu',
  component: Menu,
  parameters: {},
  argTypes: {
    selectedIndex: {
      description: '默认选中 item 的 index',
      type: {
        summary: 'string'
      }
    },
    openedSubmenus: {
      description: '默认展开的 Submenu 的 index',
      type: {
        summary: 'Array<string>'
      }
    },
    trigger: {
      description: '展开 Submenu 的方式',
      type: {
        summary: 'click | hover'
      },
      defaultValue: {
        summary: 'click'
      },
      control: {
        type: 'inline-radio',
        options: ['click', 'hover']
      }
    },
    vertical: {
      description: '是否垂直',
      type: {
        summary: 'boolean'
      },
      defaultValue: {
        summary: 'false'
      }
    }
  }
} as Meta;

// const Template: Story<IMenuProps> = (args) => <Menu></Menu>;
const Template: Story<IMenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>menu item 1</MenuItem>
    <MenuItem disabled>menu item 2</MenuItem>
    <MenuItem>menu item 3</MenuItem>
    <Submenu title="submenu">
      <MenuItem>menu item 4</MenuItem>
      <MenuItem disabled>menu item 5</MenuItem>
      <Submenu title="another submenu">
        <MenuItem>menu item 6</MenuItem>
        <MenuItem>menu item 7</MenuItem>
      </Submenu>
    </Submenu>
  </Menu>
);

export const BasicMenu = Template.bind({});
BasicMenu.args = {
  selectedIndex: 'item_2',
  trigger: 'click',
  vertical: false
};
