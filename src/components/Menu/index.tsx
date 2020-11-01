import { FC } from 'react';
import Menu, { IMenuProps } from './menu';
import MenuItem, { IMenuItemProps } from './menuItem';
import Submenu, { ISubmenuProps } from './submenu';

// 交叉类型，除了 IMenuProps 还具有 Item 和 Submenu 属性，用于导出
export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  Submenu: FC<ISubmenuProps>;
};

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.Submenu = Submenu;

export default TransMenu;
