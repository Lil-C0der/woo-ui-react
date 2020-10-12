import React, { CSSProperties, FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { SubmenuContext } from './submenu';

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;

  const { selectedIndex, onItemClick } = useContext(MenuContext);
  // Submenu 传递的 context 包含 parentIndex，用于计算 path
  const { parentIndex } = useContext(SubmenuContext);

  const classes = classNames('woo-menu-item', className, {
    'woo-menu-item-disabled': disabled,
    'woo-menu-item-active': index === selectedIndex
  });

  const onClick = (e: React.MouseEvent) => {
    // index 路径 path
    // 自身默认 index 会通过父组件 renderChildren 生成，所以使用类型断言
    let path = [...parentIndex, index] as Array<string>;
    // 在 Menu 组件中的 onItemClick 中区分 click 和 select
    !disabled && index && onItemClick && onItemClick(index, path, e);
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
