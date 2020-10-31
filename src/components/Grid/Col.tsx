import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';

interface ResponsiveObj {
  span: number | string;
  offset?: number | string;
}
export interface IColProps {
  span: number | string;
  offset?: number | string;
  xs?: ResponsiveObj;
  sm?: ResponsiveObj;
  md?: ResponsiveObj;
  lg?: ResponsiveObj;
  xl?: ResponsiveObj;
  xxl?: ResponsiveObj;
  style?: CSSProperties;
  className?: string;
}

const Col: FC<IColProps> = (props) => {
  const {
    span,
    offset,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    children,
    className,
    style
  } = props;

  const createClass = (obj: ResponsiveObj | undefined, prefix: string) => {
    let arr = [];
    obj?.span && arr.push(`woo-col-${prefix}${obj?.span}`);
    obj?.offset && arr.push(`woo-col-${prefix}offset-${obj?.offset}`);
    return arr.join(' ');
  };

  const classes = classNames(
    'woo-col',
    className,
    ...[
      createClass({ span, offset }, ''),
      // 响应式相关的类名
      createClass(xs, 'xs-'),
      createClass(sm, 'sm-'),
      createClass(md, 'md-'),
      createClass(lg, 'lg-'),
      createClass(xl, 'xl-'),
      createClass(xxl, 'xxl-')
    ]
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
Col.defaultProps = {
  span: 24,
  offset: 0
};

export default Col;
