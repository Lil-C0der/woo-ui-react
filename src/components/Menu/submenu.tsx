import React, {
  FC,
  FunctionComponentElement,
  CSSProperties,
  useContext,
  useState,
  useEffect,
  useRef
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
  const { vertical } = useContext(MenuContext);
  // 类似 Vue 递归组件
  const { parentIndex } = useContext(SubmenuContext);
  // ref
  const titleDOMRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef<boolean>(false);

  const classes = classNames('woo-submenu', className);
  const popperClasses = classNames(
    'woo-submenu-list',
    vertical ? 'woo-submenu-vertical' : 'woo-submenu-popper'
  );

  const openPopper = (e: React.MouseEvent) => {
    const { target } = e;
    // 点击 title 时，打开 popper
    if (target === titleDOMRef.current) {
      setIsOpen(true);
      isOpenRef.current = true;
    }
  };

  const closePopper = (e: MouseEvent) => {
    const { target } = e;
    // 点击除了 popper 以外的地方则关闭 popper
    // 状态 isOpen 用了一个 ref 来获取最新的值
    if (target !== titleDOMRef.current && isOpenRef.current) {
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
        return childEl;
      } else {
        otherElCount++;
        console.error(`Warning: Menu's child must be a Menu Item or Submenu`);
      }
    });
  };

  // 要传递的 context 对象，parentIndex 用于生成 item 的路径
  const passedContext: ISubmenuContext = {
    // 自身默认 index 通过父组件的 renderChildren 方法生成，所以使用类型断言
    parentIndex: [...parentIndex, index] as Array<string>
  };

  return (
    <li
      className={classes}
      style={style}
      onClick={(e: React.MouseEvent) => {
        openPopper(e);
      }}
    >
      <div className="woo-submenu-title" ref={titleDOMRef}>
        {title}
      </div>
      {/* 这个 context 传递 parentIndex */}
      <SubmenuContext.Provider value={passedContext}>
        <ul style={isOpen ? {} : { display: 'none' }} className={popperClasses}>
          {renderChildren()}
        </ul>
      </SubmenuContext.Provider>
    </li>
  );
};

Submenu.displayName = 'Submenu';

export default Submenu;
