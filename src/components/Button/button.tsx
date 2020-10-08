import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ReactNode
} from 'react';
import classNames from 'classnames';

// 导出两个枚举类型
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Normal = 'normal',
  Primary = 'primary',
  Dashed = 'dashed',
  Success = 'success',
  Warn = 'warn',
  Danger = 'danger',
  Link = 'link'
}

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: ReactNode;
}

// 组件的类型应该是 BaseButtonProps 加上 NativeButtonProps
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// 利用工具泛型 Partial 将组件所有的 props 变为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// 重新定义类型后，可以获取到原生的属性，例如 onCLick 等
const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    size,
    disabled,
    href,
    children,
    ...restProps
  } = props;

  const classes = classNames('woo-button', className, {
    [`woo-button-${btnType}`]: btnType,
    [`woo-button-${size}`]: size,
    'woo-button-disabled': disabled
  });

  if (btnType === ButtonType.Link && href) {
    // 如果type 为 link 显示为 a 标签
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Normal
};

export default Button;
