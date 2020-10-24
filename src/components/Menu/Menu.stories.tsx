import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Menu, { IMenuProps } from './menu';
import MenuItem, { IMenuItemProps } from './menuItem';
import Submenu from './submenu';

import { MenuItemProps, SubmenuProps } from './Subcomponents.stories';

export default {
  title: '菜单 Menu',
  component: Menu,
  subcomponents: {
    MenuItemProps,
    SubmenuProps
  },
  parameters: {
    docs: {
      description: {
        component:
          '#### 为网站提供导航功能的菜单。\n导航菜单默认为水平模式，通过 `vertical` 属性可以使导航菜单变为垂直模式。<br /><br />在菜单中通过 `Submenu` 组件可以生成二级菜单，二级菜单的标题通过 `title` 属性来设置。可以通过 `selectedIndex` 属性来指定默认选中的 MenuItem。<br /><br />默认点击展开二级菜单，可以通过 `trigger` 属性来设置不同的激活菜单方式，可选的方式有 `click` 和 `hover`。'
      }
    }
  },
  argTypes: {
    selectedIndex: {
      description: '默认选中 item 的 index',
      type: {
        summary: 'string'
      }
    },
    openedSubmenus: {
      description: '默认展开的 submenu 的 index 数组',
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
    },
    onClick: {
      description:
        '点击 item 时触发的回调。参数为 item 的 index，index 的 path 以及事件对象 e',
      type: {
        summary:
          '(index: string, path: Array<string>, e: React.MouseEvent) => void'
      },
      control: false
    },
    onSelect: {
      description:
        '第一次选中 item 时触发的回调，多次点击同一个 item 只会触发一次。参数为 item 的 index 和事件对象 e',
      type: {
        summary: '(index: string, e: React.MouseEvent) => void'
      },
      control: false
    },
    onOpen: {
      description: 'submenu 展开时触发的回调。参数为 submenu 的 index',
      type: {
        summary: '(index: string) => void'
      },
      control: false
    },
    onClose: {
      description: 'submenu 关闭时触发的回调。参数为 submenu 的 index',
      type: {
        summary: '(index: string) => void'
      },
      control: false
    }
  }
} as Meta;

// const Template: Story<IMenuProps> = (args) => (
//   <div style={{ minHeight: 200, minWidth: 200 }}>
//     <Menu {...args}>
//       <MenuItem index="item_1">menu item 1</MenuItem>
//       <MenuItem disabled index="item_2">
//         menu item 2
//       </MenuItem>
//       <Submenu title="menu item 3" index="item_3">
//         <MenuItem index="item_4_1">menu item 3-1</MenuItem>
//         <MenuItem disabled index="item_3_2">
//           menu item 3-2
//         </MenuItem>
//         <Submenu title="item_3_2" index="item_3_2">
//           <MenuItem index="item_3_2_1">menu item 3-2-1</MenuItem>
//           <MenuItem index="item_3_2_2">menu item 3-2-2</MenuItem>
//         </Submenu>
//       </Submenu>
//       <MenuItem index="item_4">menu item 4</MenuItem>
//     </Menu>
//   </div>
// );

const Template: Story<IMenuProps> = (args) => (
  <div style={{ minHeight: 200, minWidth: 200 }}>
    <Menu {...args}>
      {/* TODO 重构 MenuItemProps 和 SubmenuProps 
      接收 element 的配置作为参数，返回多个 JSX.Element */}

      {MenuItemProps({ index: 'item_1', children: 'item 1' })}
      {MenuItemProps({ index: 'item_2', children: 'item 2', disabled: true })}
      {SubmenuProps({
        title: 'menu item 3',
        index: 'item_3',
        children: MenuItemProps({ index: 'item_3_1', children: 'item 3-1' })
      })}
      {/* {MenuItemProps({ index: 'item_3', children: 'item 3' })} */}
      {/* {MenuItemProps({ index: 'item_4', children: 'item 4' })} */}
    </Menu>
  </div>
);

export const BasicMenu = Template.bind({});
BasicMenu.args = {
  selectedIndex: 'item_4',
  trigger: 'click',
  vertical: false
};

// MenuItem.args = {
//   disabled: false,
//   index: '1',
//   children:'item 1'
// };
// MenuItem({ disabled: false, index: '1', children: 'item 1' });

// BasicMenu.parameters = {
//   docs: {
//     source: {
//       code: `
// <div style={{ minHeight: 200, minWidth: 200 }}>
//   <Menu
//     selectedIndex="item_4"
//     trigger="click"
//     vertical
//     onClick={() => {}}
//     onSelect={() => {}}
//     onOpen={{() => {}}}
//     onClose={{() => {}}}
//   >
//     <MenuItem index="item_1">menu item 1</MenuItem>
//     <MenuItem disabled index="item_2">menu item 2</MenuItem>
//     <Submenu title="menu item 3" index="item_3">
//       <MenuItem index="item_4_1">menu item 3-1</MenuItem>
//       <MenuItem disabled index="item_3_2">menu item 3-2</MenuItem>
//       <Submenu title="item_3_2" index="item_3_2">
//         <MenuItem index="item_3_2_1">menu item 3-2-1</MenuItem>
//         <MenuItem index="item_3_2_2">menu item 3-2-2</MenuItem>
//       </Submenu>
//     </Submenu>
//     <MenuItem index="item_4">menu item 4</MenuItem>
//   </Menu>
// </div>
//     `
//     }
//   }
// };

// const openSubmenusDemo: Story<IMenuProps> = (args) => (
//   <Menu style={{ width: 200, minHeight: 380 }} {...args}>
//     <MenuItem index="item_1">menu item 1</MenuItem>
//     <Submenu title="menu item 2" index="item_2">
//       <MenuItem disabled index="item_2_1">
//         menu item 2-1
//       </MenuItem>
//       <MenuItem index="item_2_2">menu item 2-2</MenuItem>
//     </Submenu>
//     <MenuItem index="item_3">menu item 3</MenuItem>
//     <Submenu title="menu item 4" index="item_4">
//       <MenuItem index="item_4_1">menu item 4-1</MenuItem>
//     </Submenu>
//   </Menu>
// );
// export const openedSubmenus = openSubmenusDemo.bind({});
// openedSubmenus.args = {
//   openedSubmenus: ['item_2', 'item_4'],
//   selectedIndex: 'item_2_2',
//   vertical: true,
//   trigger: 'click'
// };
// openedSubmenus.parameters = {
//   docs: {
//     description: {
//       story: '通过 `openSubmenus` 数组来指定多个默认展开的二级菜单'
//     },
//     source: {
//       code: `
// <Menu
//   style={{ width: 200, minHeight: 380 }}
//   vertical
//   openedSubmenus={['item_2', 'item_4']}
//   selectedIndex="item_2_2"
//   trigger="click"
//   onClick={() => {}}
//   onSelect={() => {}}
//   onOpen={{() => {}}}
//   onClose={{() => {}}}
// >
//   <MenuItem index="item_1">menu item 1</MenuItem>
//   <Submenu title="menu item 2" index="item_2">
//     <MenuItem disabled index="item_2_1">menu item 2-1</MenuItem>
//     <MenuItem index="item_2_2">menu item 2-2</MenuItem>
//   </Submenu>
//   <MenuItem index="item_3">menu item 3</MenuItem>
//   <Submenu title="menu item 4" index="item_4">
//     <MenuItem index="item_4_1">menu item 4-1</MenuItem>
//   </Submenu>
// </Menu>
//       `
//     }
//   }
// };
