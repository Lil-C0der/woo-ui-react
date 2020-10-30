import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import classNames from 'classnames';

type AlertType = 'primary' | 'success' | 'danger' | 'warn';

export interface IAlertProps {
  title: string;
  closable?: boolean;
  description?: string;
  type?: AlertType;
  closeText?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClose?: (e: React.MouseEvent) => void;
  afterClosing?: () => void;
}

const Alert: FC<IAlertProps> = (props) => {
  const {
    title,
    description,
    type,
    closable,
    closeText,
    style,
    className,
    onClose,
    afterClosing
  } = props;
  const [visible, setVisible] = useState(true);

  const classes = classNames('woo-alert', className, {
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
      <div style={style} className={classes}>
        <span className={titleClasses}>{title}</span>
        <span className="woo-alert-description">{description}</span>
        {closable && (
          <span
            className="woo-alert-close"
            onClick={(e) => {
              setVisible(false);
              onClose && onClose(e);
            }}
          >
            {closeText ? (
              closeText
            ) : (
              <Icon icon="times" className="woo-alert-close-icon" />
            )}
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: 'primary',
  closable: false
};

export default Alert;
