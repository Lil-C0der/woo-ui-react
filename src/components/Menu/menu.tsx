import React, { CSSProperties, FC, createContext, useState } from 'react';
import classNames from 'classnames';

type SelectCallback = (selectIndex: string) => void;
export interface IMenuProps {
  selectIndex?: string;
  vertical?: boolean;
  className?: string;
  style?: CSSProperties;
  onSelect?: SelectCallback;
}

// context 的接口
interface IMenuContext {
  selectIndex: IMenuProps['selectIndex'];
  onSelect?: SelectCallback;
  initItems?: () => {};
}

// 创建的 context 对象
export const MenuContext = createContext<IMenuContext>({
  selectIndex: 'item_0'
});

const Menu: FC<IMenuProps> = (props) => {
  const { selectIndex, vertical, className, style, children, onSelect } = props;

  const classes = classNames('woo-menu', className, {
    'woo-menu-vertical': vertical
  });

  const [currSelectIdx, setSelectIdx] = useState(selectIndex);

  // 处理 item 的点击事件
  const onItemClick = (index: string) => {
    setSelectIdx(index);
    onSelect && onSelect(index);
  };

  // 传递给子组件的 context
  const passedContext: IMenuContext = {
    selectIndex: currSelectIdx,
    onSelect: onItemClick
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
