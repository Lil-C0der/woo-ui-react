import React, { CSSProperties, FC, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

interface IMenuItemProps {
  index: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;

  const { selectIndex, onSelect } = useContext(MenuContext);

  const classes = classNames('woo-menu-item', className, {
    'woo-menu-item-disabled': disabled,
    'woo-menu-item-active': index === selectIndex
  });

  const onItemClick = () => {
    !disabled && onSelect && onSelect(index);
  };

  return (
    <li className={classes} style={style} onClick={onItemClick}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  // index:,
  disabled: false
};
export default MenuItem;
