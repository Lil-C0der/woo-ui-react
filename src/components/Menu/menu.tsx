import React, {
  CSSProperties,
  FC,
  FunctionComponentElement,
  useState
} from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './menuItem';
import { ISubmenuProps } from './submenu';

type SelectCallback = (selectIndex: string, e: React.MouseEvent) => void;
// click 回调的参数 path 表示 item 的完整 index 路径
type ClickCallback = (
  clickIndex: string,
  indexPath: Array<string>,
  e: React.MouseEvent
) => void;
type OpenChangeCallback = (clickedIndex: string) => void;

export interface IMenuProps {
  selectedIndex?: string;
  vertical?: boolean;
  className?: string;
  style?: CSSProperties;
  trigger?: 'hover' | 'click';
  onSelect?: SelectCallback;
  onClick?: ClickCallback;
  onOpen?: OpenChangeCallback;
  onClose?: OpenChangeCallback;
}

// 子组件实例类型
export type childrenComponenet = FunctionComponentElement<
  ISubmenuProps | IMenuItemProps
>;

// context 的接口
interface IMenuContext {
  selectedIndex: IMenuProps['selectedIndex'];
  vertical: IMenuProps['vertical'];
  trigger: IMenuProps['trigger'];
  indexPath: Array<string>;
  initPath: (path: Array<string>) => void;
  onItemClick?: ClickCallback;
  onOpen?: IMenuProps['onOpen'];
  onClose?: IMenuProps['onClose'];
}

// 创建的 context 对象
export const MenuContext = React.createContext<IMenuContext>({
  selectedIndex: 'item_0',
  trigger: 'click',
  vertical: false,
  indexPath: ['item_0'],
  initPath: (path) => {}
});

const Menu: FC<IMenuProps> = (props) => {
  const {
    selectedIndex,
    vertical,
    className,
    style,
    children,
    trigger,
    onSelect,
    onClick,
    onOpen,
    onClose
  } = props;

  const classes = classNames('woo-menu', className, {
    'woo-menu-vertical': vertical
  });

  // 用 useState hook 来控制 selected-index
  const [currSelectedIdx, setSelectIdx] = useState(selectedIndex);
  const [indexPath, setIndexPath] = useState(['item_0']);

  const initPath = (path: Array<string>) => {
    setIndexPath(path);
  };

  // 处理 item 的点击事件
  const onItemClick = (
    index: string,
    path: Array<string>,
    e: React.MouseEvent
  ) => {
    onClick && onClick(index, path, e);

    // 重复点击同一个 item 只能触发一次 select
    if (index !== currSelectedIdx) {
      onSelect && onSelect(index, e);
      setIndexPath(path);
    }
    setSelectIdx(index);
  };

  // 传递给子组件的 context
  const passedContext: IMenuContext = {
    selectedIndex: currSelectedIdx,
    vertical,
    trigger,
    indexPath,
    initPath,
    onItemClick,
    onOpen,
    onClose
  };

  // 只渲染子元素中特定 displayName 的元素
  const renderChildren = () => {
    // 统计其他的元素，用于计算默认的 index
    let otherElCount = 0;

    return React.Children.map(children, (child, i) => {
      let childEl = child as childrenComponenet;
      const { index } = childEl.props;
      const { displayName } = childEl.type;

      if (displayName === 'MenuItem' || displayName === 'Submenu') {
        if (!index) {
          // 对于未设置 index 的 menu-item，clone 一份，并添加一个默认的 index
          childEl = React.cloneElement(childEl, {
            // 默认的 index 要注意减去其他元素的数目
            index: `item_${i - otherElCount}`
          });
        }
        return childEl;
      } else {
        otherElCount++;
        console.error(`Warning: Menu's child must be a Menu Item or Submenu`);
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  // selectedIndex: 'item_0',
  vertical: false,
  trigger: 'click'
};
export default Menu;
