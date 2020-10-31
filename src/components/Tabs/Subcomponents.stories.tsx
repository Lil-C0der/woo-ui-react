import React from 'react';
import TabsItem, { ITabsItemProps } from './tabsItem';

export const TabsItemProps: (
  props: React.PropsWithChildren<ITabsItemProps>
) => JSX.Element = ({ name, index, disabled = false, children }) => (
  <TabsItem index={index} name={name} key={index} disabled={disabled}>
    {children}
  </TabsItem>
);
