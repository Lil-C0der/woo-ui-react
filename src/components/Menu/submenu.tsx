import React, {
  FC,
  CSSProperties,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

interface ISubmenuProps {
  title: string;
  className?: string;
  style?: CSSProperties;
}

const Submenu: FC<ISubmenuProps> = (props) => {
  const { title, children, className, style } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { vertical } = useContext(MenuContext);

  const classes = classNames('woo-submenu', className);
  const popperClasses = classNames(
    'woo-submenu-list',
    vertical ? 'woo-submenu-vertical' : 'woo-submenu-popper'
  );

  const titleRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef<boolean>(false);

  const openPopper = (e: React.MouseEvent) => {
    const { target } = e;
    // 点击 title 时，打开 popper
    if (target === titleRef.current) {
      setIsOpen(true);
      isOpenRef.current = true;
    }
  };

  const closePopper = (e: MouseEvent) => {
    const { target } = e;
    // 点击除了 popper 以外的地方则关闭 popper
    // 状态 isOpen 用了一个 ref 来获取最新的值
    if (target !== titleRef.current && isOpenRef.current) {
      setTimeout(() => {
        setIsOpen(false);
        isOpenRef.current = false;
      }, 300);
    }
  };

  useEffect(() => {
    window.document.addEventListener('click', closePopper);
    return () => {
      window.document.removeEventListener('click', closePopper);
    };
  }, [isOpen]);

  return (
    <li
      className={classes}
      style={style}
      onClick={(e: React.MouseEvent) => {
        openPopper(e);
      }}
    >
      <div className="woo-submenu-title" ref={titleRef}>
        {title}
      </div>
      <ul style={isOpen ? {} : { display: 'none' }} className={popperClasses}>
        {children}
      </ul>
    </li>
  );
};

Submenu.displayName = 'MenuItem';

export default Submenu;
