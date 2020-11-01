import React from 'react';
import { ITabsItemProps } from './tabsItem';
import Tabs from './index';

export const TabsItemProps: (
  props: React.PropsWithChildren<ITabsItemProps>
) => JSX.Element = ({ name, index, disabled = false, children }) => (
  <Tabs.Item index={index} name={name} key={index} disabled={disabled}>
    {children}
  </Tabs.Item>
);
