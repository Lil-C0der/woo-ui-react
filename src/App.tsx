import React from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import Submenu from './components/Menu/submenu';
import Icon from './components/Icon/icon';

import Tabs, { ITabsProps } from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';

function App() {
  const testTabsProps: ITabsProps = {
    onChange: (oldIndex, curIndex) => {
      console.log('change', oldIndex, curIndex);
    },
    onTabClick: (i, name, e) => {
      console.log('click', i, name, e);
    }
  };
  return (
    <div className="App" style={{ padding: 10 }}>
      {/* <Tabs activeIndex="item_1"> */}
      <Tabs {...testTabsProps}>
        <TabsItem name="tab_0" index="item_0">
          content 0
        </TabsItem>
        <TabsItem name="tab_1" index="item_1">
          content 1
        </TabsItem>
        <TabsItem name="tab_2" index="item_2" disabled>
          content 2
        </TabsItem>
        <TabsItem
          name={
            <>
              <Icon icon="exclamation-circle" />
              自定义图标
            </>
          }
          index="item_3"
        >
          content 3
        </TabsItem>
        {/* {[0, 1, 2, 3].map((el, index) => (
          <TabsItem
            name={'tab' + index}
            index={`item_${index + 1}`}
            key={index}
          >
            content {index}
          </TabsItem>
        ))} */}
      </Tabs>

      <Menu
        // selectedIndex="item_3"
        // selectedIndex="item_5_1"
        // openedSubmenus={['item_5_2']}
        // openedSubmenus={['item_5']}
        // openedSubmenus={['item_5', 'item_5_2']}
        onSelect={(index, e) => {
          console.log('选中了', index);
        }}
        onClick={(index, path) => {
          console.log('点击了', index, path);
        }}
        onOpen={(index) => {
          console.log(`打开了 ${index}`);
        }}
        onClose={(index) => {
          console.log(`关闭了 ${index}`);
        }}
        // trigger="hover"
        // vertical
        // style={{ width: 200 }}
      >
        <MenuItem>menu item 1</MenuItem>
        <MenuItem disabled>menu item 2</MenuItem>
        <MenuItem>menu item 3</MenuItem>
        <MenuItem>menu item 4</MenuItem>
        <MenuItem>menu item 5</MenuItem>

        <Submenu title="submenu">
          <MenuItem>menu item 6</MenuItem>
          <MenuItem disabled>menu item 7</MenuItem>
          <Submenu title="another submenu">
            <MenuItem>menu item 8</MenuItem>
            <MenuItem>menu item 9</MenuItem>
          </Submenu>
        </Submenu>
      </Menu>
    </div>
  );
}

export default App;
