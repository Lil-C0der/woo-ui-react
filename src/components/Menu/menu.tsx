import React, { CSSProperties, FC, createContext, useState } from 'react';
import classNames from 'classnames';

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

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  vertical: false
};
export default Menu;
