import React, { PropsWithChildren } from 'react';
import MenuItem, { IMenuItemProps } from './menuItem';
import Submenu, { ISubmenuProps } from './submenu';

export const MenuItemProps: (
  props: PropsWithChildren<IMenuItemProps>
) => JSX.Element = ({
  disabled = false,
  index = 'item_${item 的索引}',
  children
}) => (
  <MenuItem disabled={disabled} index={index} key={index}>
    {children}
  </MenuItem>
);

export const SubmenuProps = (args: PropsWithChildren<ISubmenuProps>) => (
  <Submenu {...args}></Submenu>
);
