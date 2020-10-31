import React, { CSSProperties, FC, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { IColProps } from './Col';

export interface IRowProps {
  gutter?: number | string;
  align?: 'left' | 'right' | 'center';
  style?: CSSProperties;
  className?: string;
}

const Row: FC<IRowProps> = (props) => {
  const { gutter, align, children, className, style } = props;
  const classes = classNames('woo-row', className, {
    [`align-${align}`]: align
  });

  let rowStyle;
  if (gutter) {
    rowStyle = {
      marginLeft: `${-gutter / 2}px`,
      marginRight: `${-gutter / 2}px`,
      ...style
    };
  }

  const renderChildren = () =>
    gutter &&
    React.Children.map(children, (child) => {
      let childEl = child as FunctionComponentElement<IColProps>;
      childEl = React.cloneElement(childEl, {
        style: {
          paddingLeft: `${+gutter / 2}px`,
          paddingRight: `${+gutter / 2}px`
        }
      });
      return childEl;
    });

  return (
    <div className={classes} style={rowStyle}>
      {gutter ? renderChildren() : children}
    </div>
  );
};

Row.defaultProps = {
  align: 'left'
};
export default Row;
