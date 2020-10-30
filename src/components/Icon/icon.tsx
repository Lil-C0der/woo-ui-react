import React, { FC } from 'react';
import classNames from 'classnames';

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

type iconTheme = 'primary' | 'success' | 'warn' | 'danger' | 'light' | 'dark';

// 组件的 props 类型继承自 FontAwesomeIcon 定义的类型
export interface IIconProps extends FontAwesomeIconProps {
  theme?: iconTheme;
}

const Icon: FC<IIconProps> = (props) => {
  // restProps 包括 FontAwesomeIcon 自带的属性，icon size 等
  const { className, theme, ...restProps } = props;

  const classes = classNames('woo-icon', className, {
    [`woo-icon-${theme}`]: theme
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
