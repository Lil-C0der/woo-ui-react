import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName =
  | 'fade'
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition: FC<TransitionProps> = (props) => {
  const { animation, classNames, children, ...restProps } = props;

  return (
    <CSSTransition
      classNames={animation ? animation : classNames}
      {...restProps}
    >
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true,
  // exit 时默认卸载子节点
  unmountOnExit: true
};

export default Transition;
