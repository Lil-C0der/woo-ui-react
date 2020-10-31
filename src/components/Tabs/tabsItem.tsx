import React, { CSSProperties, FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface ITabsItemProps {
  name: ReactNode;
  index: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const TabsItem: FC<ITabsItemProps> = (props) => {
  const { children, style, className } = props;

  const classes = classNames('woo-tabs-pane', className);
  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};
TabsItem.defaultProps = {
  disabled: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
