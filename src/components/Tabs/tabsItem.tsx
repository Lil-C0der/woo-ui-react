import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';

export interface ITabsItemProps {
  name: string;
  index?: string;
  disabled?: boolean;
  // children?: React.ReactNode;
  isActive?: boolean;
  style?: CSSProperties;
  className?: string;
}

const TabsItem: FC<ITabsItemProps> = (props) => {
  const { name, index, disabled, isActive, children, style, className } = props;

  const classes = classNames('woo-tabs-pane', className, {
    // 'woo-tabs-item-disabled': disabled,
    'woo-tabs-pane-active': isActive
  });
  return (
    <li style={style} data-index={index} className={classes}>
      {children}
      {/* {name} */}
    </li>
  );
};

TabsItem.defaultProps = {
  disabled: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
