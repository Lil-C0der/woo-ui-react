import React, { CSSProperties, FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;

  const { selectedIndex, onItemClick } = useContext(MenuContext);

  const classes = classNames('woo-menu-item', className, {
    'woo-menu-item-disabled': disabled,
    'woo-menu-item-active': index === selectedIndex
  });

  const onClick = (e: React.MouseEvent) => {
    // 在 Menu 组件中的 onItemClick 中区分 click 和 select
    !disabled && index && onItemClick && onItemClick(index, e);
  };

  return (
    <li className={classes} style={style} onClick={onClick}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  // index:,
  disabled: false
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
