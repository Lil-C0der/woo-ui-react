import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import MenuItem from './menuItem';
import Submenu from './submenu';

export const MenuItemProps = ({
  disabled = false,
  index = 'item_${item 的索引}',
  children = '' as React.ReactNode
}) => (
  <MenuItem disabled={disabled} index={index} key={index}>
    {children}
  </MenuItem>
);

interface SubmenuProps {
  title: string;
  index?: string;
  children?: React.ReactNode;
}
export const SubmenuProps = (args: SubmenuProps) => (
  <Submenu {...args}></Submenu>
);
