import React, { CSSProperties, FC, createContext, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './menuItem';

type SelectCallback = (selectIndex: string) => void;
type ClickCallback = (clickIndex: string) => void;
export interface IMenuProps {
  selectedIndex?: string;
  vertical?: boolean;
  className?: string;
  style?: CSSProperties;
  onSelect?: SelectCallback;
  onClick?: ClickCallback;
}

// context 的接口
interface IMenuContext {
  selectedIndex: IMenuProps['selectedIndex'];
  onItemClick?: ClickCallback;
}

// 创建的 context 对象
export const MenuContext = createContext<IMenuContext>({
  selectedIndex: 'item_0'
});

const Menu: FC<IMenuProps> = (props) => {
  const {
    selectedIndex,
    vertical,
    className,
    style,
    children,
    onSelect,
    onClick
  } = props;

  const classes = classNames('woo-menu', className, {
    'woo-menu-vertical': vertical
  });

  // 用 useState hook 来控制 selected-index
  const [currSelectedIdx, setSelectIdx] = useState(selectedIndex);

  // 处理 item 的点击事件
  const onItemClick = (index: string) => {
    onClick && onClick(index);
    // 重复点击同一个 item 只能触发一次 select
    if (index !== currSelectedIdx) {
      onSelect && onSelect(index);
    }
    setSelectIdx(index);
  };

  // 传递给子组件的 context
  const passedContext: IMenuContext = {
    selectedIndex: currSelectedIdx,
    onItemClick
  };

  // 只渲染子元素中 displayName 为 MenuItem 的元素
  const renderChildren = () => {
    // 统计不为 MenuItem 的元素，用于计算默认的 index
    let otherElCount = 0;

    return React.Children.map(children, (child, i) => {
      let childEl = child as React.FunctionComponentElement<IMenuItemProps>;
      const { index } = childEl.props;
      const { displayName } = childEl.type;

      if (displayName === 'MenuItem') {
        if (!index) {
          // 对于未设置 index 的 menu-item，clone 一份，并添加一个默认的 index
          // 默认的 index 要注意减去其他元素的数目
          childEl = React.cloneElement(childEl, {
            index: `item_${i - otherElCount}`
          });
        }
        return childEl;
      } else {
        otherElCount++;
        console.error(`Warning: Menu's child must be a Menu Item`);
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
  vertical: false
};
export default Menu;
