import React, {
  FC,
  FunctionComponentElement,
  CSSProperties,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';

import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
// import { CSSTransition } from 'react-transition-group';

export interface ISubmenuProps {
  index?: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}

interface ISubmenuContext {
  parentIndex: Array<string>;
}

export const SubmenuContext = React.createContext<ISubmenuContext>({
  // 默认传递一个空数组，避免一级的 MenuItem path 出错
  parentIndex: []
});

const Submenu: FC<ISubmenuProps> = (props) => {
  const { index, title, children, className, style } = props;
  // context
  const menuContext = useContext(MenuContext);
  // 类似 Vue 递归组件
  const submenuContext = useContext(SubmenuContext);
  // 根据 openedSubmenus 属性来判断是否展开
  const defaultOpenState = () => {
    if (menuContext.openedSubmenus?.length) {
      return menuContext.openedSubmenus?.includes(index as string);
    } else {
      return false;
    }
  };
  const [isOpen, setIsOpen] = useState(defaultOpenState());

  // ref
  const isOpenRef = useRef<boolean>(isOpen);
  const submenuDOMRef = useRef<HTMLLIElement>(null);
  const titleDOMRef = useRef<HTMLDivElement>(null);

  const { onClose, onOpen } = menuContext;
  const openPopper = () => {
    setIsOpen(true);
    isOpenRef.current = true;
    onOpen && onOpen(index as string);
  };

  const closePopper = useCallback(() => {
    setIsOpen(false);
    isOpenRef.current = false;
    onClose && onClose(index as string);
  }, [index, onClose]);

  // 给 document 添加 click outside 的监听
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 点击页面其他地方时关闭 popper
      if (!menuContext.vertical) {
        // 水平状态下点击 Submenu 外关闭 popper
        if (!submenuDOMRef.current?.contains(target) && isOpenRef.current) {
          closePopper();
        }
      } else {
        // 垂直状态下点击 Menu 的其他 item 不会关闭 Submenu
        // 只有点击 Menu 外才会关闭 Submenu
        if (
          !menuContext.menuDOMRef?.current?.contains(target) &&
          isOpenRef.current
        ) {
          closePopper();
        }
      }
    };

    menuContext.trigger === 'click' &&
      document.addEventListener('click', onDocClick);
    return () => {
      menuContext.trigger === 'click' &&
        document.removeEventListener('click', onDocClick);
    };
  }, [
    closePopper,
    menuContext.menuDOMRef,
    menuContext.trigger,
    menuContext.vertical
  ]);

  // submenu 的 title 以及 item 被点击时的 handler
  const onSubmenuClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (menuContext.trigger === 'click') {
      if (titleDOMRef.current?.contains(target)) {
        !isOpen && openPopper();
        isOpen && closePopper();
      }
    }
    // 水平状态下，点击 Submenu 内的 item 关闭 popper
    if (
      !menuContext.vertical &&
      target.getAttribute('class')?.includes('woo-menu-item')
    ) {
      closePopper();
    }
  };

  let timer: any;
  const onSubmenuMouseEnter = (e: React.MouseEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      !isOpen && openPopper();
    }, 300);
  };

  const onSubmenuMouseLeave = (e: React.MouseEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      isOpen && closePopper();
    }, 300);
  };

  // trigger 不同，绑定不同的事件
  const clickEvent: React.DOMAttributes<HTMLLIElement> =
    menuContext.trigger === 'click' ? { onClick: onSubmenuClick } : {};
  // hover 方式触发时，点击 item 关闭 popper
  const hoverEvent: React.DOMAttributes<HTMLLIElement> =
    menuContext.trigger === 'hover'
      ? {
          onMouseEnter: onSubmenuMouseEnter,
          onMouseLeave: onSubmenuMouseLeave,
          onClick: onSubmenuClick
        }
      : {};

  // 返回特定 displayName 的子组件，初始化子组件 index 数组
  const renderChildren = () => {
    // 统计其他的元素，用于计算默认的 index
    let otherElCount = 0;

    return React.Children.map(children, (child, i) => {
      let childEl = child as FunctionComponentElement<IMenuItemProps>;
      const { index } = childEl.props;
      const { displayName } = childEl.type;

      if (displayName === 'MenuItem' || displayName === 'Submenu') {
        if (!index) {
          childEl = React.cloneElement(childEl, {
            index: `${props.index}_${i - otherElCount}`
          });
        }
        return childEl;
      } else {
        otherElCount++;
        console.error(`Warning: Menu's child must be a Menu Item or Submenu`);
      }
    });
  };
  // 需要被渲染的子组件
  const childComponenets = renderChildren();

  // submenu wrapper 的 className
  const classes = classNames('woo-submenu', className, {
    'has-active-item': menuContext.indexPath.includes(props.index as string),
    'submenu-opened': isOpen
  });
  // popper 的 className
  const popperClasses = classNames(
    'woo-submenu-list',
    menuContext.vertical ? 'woo-submenu-vertical' : 'woo-submenu-popper'
  );

  // 要传递的 context 对象，parentIndex 用于生成 item 的路径
  const passedContext: ISubmenuContext = {
    // 自身默认 index 通过父组件的 renderChildren 方法生成，所以使用类型断言
    parentIndex: [...submenuContext.parentIndex, index] as Array<string>
  };

  return (
    <li
      className={classes}
      style={style}
      ref={submenuDOMRef}
      {...clickEvent}
      {...hoverEvent}
    >
      <div className="woo-submenu-title" ref={titleDOMRef}>
        {title}
        <Icon icon="angle-down" className="woo-submenu-title-icon" />
      </div>
      {/* 这个 context 传递 parentIndex */}
      <SubmenuContext.Provider value={passedContext}>
        <Transition
          in={isOpen}
          animation="zoom-in-top"
          timeout={300}
          appear
          unmountOnExit
        >
          <ul className={popperClasses}>{childComponenets}</ul>
        </Transition>
      </SubmenuContext.Provider>
    </li>
  );
};

Submenu.displayName = 'Submenu';

export default Submenu;
