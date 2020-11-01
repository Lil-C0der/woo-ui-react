import React, { PropsWithChildren } from 'react';
import { IMenuItemProps } from './menuItem';
import { ISubmenuProps } from './submenu';
import Menu from './index';

export const MenuItemProps: (
  props: PropsWithChildren<IMenuItemProps>
) => JSX.Element = ({
  disabled = false,
  index = 'item_${item 的索引}',
  children
}) => (
  <Menu.Item disabled={disabled} index={index} key={index}>
    {children}
  </Menu.Item>
);

export const SubmenuProps = (args: PropsWithChildren<ISubmenuProps>) => (
  <Menu.Submenu {...args}></Menu.Submenu>
);
