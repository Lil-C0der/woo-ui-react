import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ReactNode
} from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType =
  | 'normal'
  | 'primary'
  | 'dashed'
  | 'success'
  | 'warn'
  | 'danger'
  | 'link';

export interface IBaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: ReactNode;
}

// 组件的类型应该是 IBaseButtonProps 加上原生的类型属性
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// 利用工具泛型 Partial 将组件所有的 props 变为可选的
export type IButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// 重新定义类型后，可以获取到原生的属性，例如 onCLick 等
const Button: FC<IButtonProps> = (props) => {
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

  if (btnType === 'link' && href) {
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
  btnType: 'normal'
};

export default Button;
