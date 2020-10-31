import React, { CSSProperties, FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface ITabsItemProps {
  name: ReactNode;
  index: string;
  disabled?: boolean;
  isActive?: boolean;
  style?: CSSProperties;
  className?: string;
}

const TabsItem: FC<ITabsItemProps> = (props) => {
  const { index, isActive, children, style, className } = props;

  const classes = classNames('woo-tabs-pane', className, {
    'woo-tabs-pane-active': isActive
  });
  return (
    <div style={style} data-index={index} className={classes}>
      {children}
    </div>
  );
};

TabsItem.defaultProps = {
  disabled: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
