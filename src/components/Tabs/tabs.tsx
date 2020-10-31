import React, {
  CSSProperties,
  FC,
  FunctionComponentElement,
  ReactNode,
  useState
} from 'react';

import classNames from 'classnames';
import { ITabsItemProps } from './tabsItem';

export type childrenComponent = FunctionComponentElement<ITabsItemProps>;

export interface ITabsProps {
  activeIndex?: string;
  style?: CSSProperties;
  className?: string;
  onTabClick?: (
    itemIndex: string,
    itemName: ReactNode,
    e: React.MouseEvent
  ) => void;
  onChange?: (lastActiveIndex: string, currActiveIndex: string) => void;
}
const Tabs: FC<ITabsProps> = (props) => {
  const {
    activeIndex,
    children,
    style,
    className,
    onTabClick,
    onChange
  } = props;
  const classes = classNames('woo-tabs', className);

  const [currActiveIdx, setCurrActiveIdx] = useState(activeIndex);

  const onItemClick = (index: string, name: ReactNode, e: React.MouseEvent) => {
    onTabClick && onTabClick(index, name, e);
    if (index !== currActiveIdx) {
      // currActiveIndex 为 activeIndex 或者第一个 item 的 index，所以用类型断言
      onChange && onChange(currActiveIdx as string, index);
    }
    setCurrActiveIdx(index);
  };

  const renderTabsHead = () => {
    return React.Children.map(children, (child, i) => {
      const childEl = child as childrenComponent;
      const { index, disabled, name } = childEl.props;
      const { displayName } = childEl.type;

      if (displayName === 'TabsItem') {
        const isActive = currActiveIdx ? index === currActiveIdx : i === 0;
        // 没有设置 activeIndex 属性时，默认将第一个 index 作为 currActiveIndex
        i === 0 && !currActiveIdx && setCurrActiveIdx(index);

        const itemClasses = classNames('woo-tabs-item', {
          'woo-tabs-item-disabled': disabled,
          'woo-tabs-item-active': isActive
        });
        const el = (
          <li
            key={index}
            className={itemClasses}
            onClick={(e) => {
              !disabled && onItemClick(index, name, e);
            }}
          >
            {name}
          </li>
        );

        return el;
      }
    });
  };

  const renderTabsContent = () =>
    React.Children.map(children, (child, i) => {
      const childEl = child as childrenComponent;
      if (currActiveIdx) {
        if (childEl.props.index === currActiveIdx) {
          return childEl;
        }
      } else {
        if (i === 0) {
          return childEl;
        }
      }
    });

  return (
    <div className={classes} style={style}>
      <ul className="woo-tabs-head">{renderTabsHead()}</ul>
      <div className="woo-tabs-content">{renderTabsContent()}</div>
    </div>
  );
};

export default Tabs;
