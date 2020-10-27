import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import classNames from 'classnames';

type AlertType = 'success' | 'danger' | 'warn';

export interface IAlertProps {
  title: string;
  closable?: boolean;
  description?: string;
  type?: AlertType;
  onClose?: (e: React.MouseEvent) => void;
  afterClosing?: () => void;
}

const Alert: FC<IAlertProps> = (props) => {
  const { title, description, type, closable, onClose, afterClosing } = props;
  const [visible, setVisible] = useState(true);

  const classes = classNames('woo-alert', {
    [`woo-alert-${type}`]: type
  });
  const titleClasses = classNames('woo-alert-title', {
    'woo-alert-title-bold': description
  });

  const onExiting = (el: HTMLElement) => {
    const { height } = el.getBoundingClientRect();
    el.style.height = `${height}px`;
    el.getBoundingClientRect();
    el.style.height = '0';
  };
  const onExited = (el: HTMLElement) => {
    el.style.height = 'auto';
    afterClosing && afterClosing();
  };

  return (
    <Transition
      animation="fade"
      in={visible}
      timeout={300}
      onExiting={onExiting}
      onExited={onExited}
      appear
      wrapper
      unmountOnExit
    >
      <div className={classes}>
        <span className={titleClasses}>{title}</span>
        <span className="woo-alert-description">{description}</span>
        {closable ? (
          <Icon
            icon="times"
            className="woo-alert-close"
            onClick={(e) => {
              setVisible(false);
              onClose && onClose(e);
            }}
          />
        ) : (
          ''
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: false
};

export default Alert;
