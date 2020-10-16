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
  const [isOpen, setIsOpen] = useState(false);

  // context
  const menuContext = useContext(MenuContext);
  // 类似 Vue 递归组件
  const submenuContext = useContext(SubmenuContext);
  // ref
  const isOpenRef = useRef<boolean>(false);

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
      if (!submenuDOMRef.current?.contains(target) && isOpenRef.current) {
        closePopper();
      }
    };

    document.addEventListener('click', onDocClick);
    return () => {
      document.removeEventListener('click', onDocClick);
    };
  }, [closePopper]);

  const onSubmenuClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (titleDOMRef.current?.contains(target)) {
      !isOpen && openPopper();
      isOpen && closePopper();
    }
    // 水平状态下，点击 item 关闭 popper
    if (!menuContext.vertical && target.className.includes('woo-menu-item')) {
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

  const hoverEvent: React.DOMAttributes<HTMLLIElement> =
    menuContext.trigger === 'hover'
      ? {
          onMouseEnter: onSubmenuMouseEnter,
          onMouseLeave: onSubmenuMouseLeave
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
    'has-active-item': menuContext.indexPath.includes(props.index as string)
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
      </div>
      {/* 这个 context 传递 parentIndex */}
      <SubmenuContext.Provider value={passedContext}>
        <ul style={isOpen ? {} : { display: 'none' }} className={popperClasses}>
          {childComponenets}
        </ul>
      </SubmenuContext.Provider>
    </li>
  );
};

Submenu.displayName = 'Submenu';

export default Submenu;
