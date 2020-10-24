import React from 'react';
import { Interface } from 'readline';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import MenuItem from './menuItem';
import Submenu, { ISubmenuProps } from './submenu';

export const MenuItemProps = ({
  disabled = false,
  index = 'item_${item 的索引}',
  children = ''
}) => (
  <MenuItem disabled={disabled} index={index}>
    {children}
  </MenuItem>
);

export const SubmenuProps = (
  args: ISubmenuProps & { children: React.ReactNode }
) => <Submenu {...args}></Submenu>;
