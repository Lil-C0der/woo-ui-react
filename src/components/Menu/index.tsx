// import { FC } from 'react';
import { FC } from 'react';
import Menu, { IMenuProps } from './menu';
import MenuItem, { IMenuItemProps } from './menuItem';
import SubMenu, { ISubmenuProps } from './submenu';

// 交叉类型，除了 IMenuProps 还具有 Item 和 Submenu 属性，用于导出
export type IMenuComponent = FC<IMenuProps> & {
  Item?: FC<IMenuItemProps>;
  SubMenu?: FC<ISubmenuProps>;
};

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
