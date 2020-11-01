import { FC } from 'react';
import Tabs, { ITabsProps } from './tabs';
import TabsItem, { ITabsItemProps } from './tabsItem';

export type ITabsComponent = FC<ITabsProps> & {
  Item: FC<ITabsItemProps>;
};

const TransTab = Tabs as ITabsComponent;
TransTab.Item = TabsItem;

export default TransTab;
