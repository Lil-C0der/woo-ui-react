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
      if (
        !target.className.includes('woo-submenu-title') &&
        isOpenRef.current
      ) {
        closePopper();
      }
    };

    // 确保 document 只有一个监听器
    window.document.onclick = onDocClick;

    return () => {
      window.document.onclick = () => false;
    };
  }, [closePopper]);

  const onSubmenuClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.className.includes('woo-menu-item')) {
      !isOpen && openPopper();
    } else {
      isOpen && closePopper();
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

  let childrenIdxArr: Array<string> = [];

  // 只渲染特定 displayName 的子组件
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
        // 子组件如果没有 index 会添加默认 index，所以使用了类型断言
        childrenIdxArr.push(childEl.props.index as string);

        return childEl;
      } else {
        otherElCount++;
        console.error(`Warning: Menu's child must be a Menu Item or Submenu`);
      }
    });
  };

  const childComponenets = renderChildren();

  // submenu wrapper 的 className
  const classes = classNames('woo-submenu', className, {
    // TODO renderChildren 方法在渲染时才被调用，所以这里的 childrenIdxArr 是空数组
    'has-active-item': childrenIdxArr.includes(
      menuContext.selectedIndex as string
    )
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
    <li className={classes} style={style} {...clickEvent} {...hoverEvent}>
      <div className="woo-submenu-title">{title}</div>
      {/* 这个 context 传递 parentIndex */}
      <SubmenuContext.Provider value={passedContext}>
        <ul style={isOpen ? {} : { display: 'none' }} className={popperClasses}>
          {/* {renderChildren()} */}
          {childComponenets}
        </ul>
      </SubmenuContext.Provider>
    </li>
  );
};

Submenu.displayName = 'Submenu';

export default Submenu;
