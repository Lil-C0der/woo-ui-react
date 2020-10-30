import React, {
  CSSProperties,
  FC,
  FunctionComponentElement,
  useState
} from 'react';

import classNames from 'classnames';
import { ITabsItemProps } from './tabsItem';

export type childrenComponent = FunctionComponentElement<ITabsItemProps>;

export interface ITabsProps {
  activeIndex?: string;
  style?: CSSProperties;
  className?: string;
}
const Tabs: FC<ITabsProps> = (props) => {
  const { activeIndex, children, style, className } = props;
  const classes = classNames('woo-tabs', className);

  const [currActiveIdx, setCurrActiveIdx] = useState(activeIndex);

  const onTabClick = (index: string) => {
    console.log(`tab item ${index} got clicked!!`);
    setCurrActiveIdx(index);
  };

  const renderTabsHead = () => {
    let otherElCount = 0;
    return React.Children.map(children, (child, i) => {
      let childEl = child as childrenComponent;
      const { index, disabled, name } = childEl.props;
      const { displayName } = childEl.type;

      if (displayName === 'TabsItem') {
        const itemClasses = classNames('woo-tabs-item', {
          'woo-tabs-item-disabled': disabled,
          'woo-tabs-item-active': currActiveIdx
            ? index === currActiveIdx
            : i === 0
        });
        const idx = index ? index : `item_${i - otherElCount}`;
        let el = (
          <li
            key={idx}
            className={itemClasses}
            onClick={() => {
              onTabClick(idx);
            }}
          >
            {name}
          </li>
        );
        return el;
      } else {
        otherElCount++;
      }
    });
  };

  return (
    <div className={classes} style={style}>
      {/* <ul className="woo-tabs-head">{childComponents}</ul> */}
      <ul className="woo-tabs-head">{renderTabsHead()}</ul>
      <div className="woo-tabs-content">
        {React.Children.map(children, (child, i) => {
          const childEl = child as childrenComponent;
          return React.cloneElement(childEl, {
            isActive: currActiveIdx
              ? childEl.props.index === currActiveIdx
              : i === 0
          });
        })}
      </div>
    </div>
  );
};

export default Tabs;
