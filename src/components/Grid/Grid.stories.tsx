import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Row from './Row';
import Col from './Col';

export default {
  title: '栅格系统 Grid',
  subcomponents: {
    Row,
    Col
  },
  parameters: {
    docs: {
      description: {
        component:
          '通过基础的 24 分栏，迅速简便地创建布局。\n\n设置 `Col` 组件的 `span` 属性指定占据的列数，还可以通过 `xs`、`sm` 等属性来设置在不同窗口大小下的响应式布局，属性的值为一个对象，对象的 key 包括 `span` 和 `offset`。\n\n响应式栅格断点参考 [Bootstrap 4.0](https://getbootstrap.com/docs/4.0/layout/grid/)。\n\n通过 `Row` 组件的 `gutter` 属性来设置栅格之间的间隔，通过 `align` 属性来设置 flex 布局下**水平方向**排列方式。'
      }
    }
  },
  argTypes: {
    span: {
      description: 'Col 组件栅格占据的列数',
      type: {
        summary: 'number | string'
      },
      defaultValue: {
        summary: '24'
      }
    },
    offset: {
      description: 'Col 组件栅格偏移的列数',
      type: {
        summary: 'number | string'
      },
      defaultValue: {
        summary: '0'
      }
    },
    align: {
      description: 'Row 组件内元素的水平排列方向',
      type: {
        summary: 'left | center | right'
      },
      defaultValue: {
        summary: 'left'
      },
      control: {
        type: 'select',
        options: ['left', 'right', 'center']
      }
    },
    gutter: {
      description: 'Row 组件内元素间的间隔',
      type: {
        summary: 'number | string'
      }
    }
  }
} as Meta;

const Template: Story = ({ gutter, align, span, offset }) => (
  <>
    <span>不等宽的栅格</span>
    <Row gutter={gutter} align={align}>
      <Col span={span}>
        <div className="grid-content bg-light">{span}</div>
      </Col>
      <Col span={24 - span}>
        <div className="grid-content bg-dark">{24 - span}</div>
      </Col>
    </Row>
    <Row gutter={20} align={align}>
      <Col span={12}>
        <div className="grid-content bg-light">12</div>
      </Col>
      <Col span={8} offset={offset}>
        <div className="grid-content bg-dark">8</div>
      </Col>
    </Row>

    <span>等宽的栅格</span>
    <Row gutter={gutter} align={align}>
      <Col span={span}>
        <div className="grid-content bg-light">{span}</div>
      </Col>
      <Col span={span}>
        <div className="grid-content bg-dark">{span}</div>
      </Col>
    </Row>
    <Row gutter={gutter} align={align}>
      <Col span={(span * 2) / 3}>
        <div className="grid-content bg-light">{(span * 2) / 3}</div>
      </Col>
      <Col span={(span * 2) / 3}>
        <div className="grid-content bg-dark">{(span * 2) / 3}</div>
      </Col>
      <Col span={(span * 2) / 3}>
        <div className="grid-content bg-light">{(span * 2) / 3}</div>
      </Col>
    </Row>
    <Row gutter={gutter} align={align}>
      <Col span={(span * 2) / 4}>
        <div className="grid-content bg-light">{(span * 2) / 4}</div>
      </Col>
      <Col span={(span * 2) / 4}>
        <div className="grid-content bg-dark">{(span * 2) / 4}</div>
      </Col>
      <Col span={(span * 2) / 4}>
        <div className="grid-content bg-light">{(span * 2) / 4}</div>
      </Col>
      <Col span={(span * 2) / 4}>
        <div className="grid-content bg-dark">{(span * 2) / 4}</div>
      </Col>
    </Row>
    <Row gutter={gutter} align={align}>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-light">{(span * 2) / 6}</div>
      </Col>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-dark">{(span * 2) / 6}</div>
      </Col>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-light">{(span * 2) / 6}</div>
      </Col>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-dark">{(span * 2) / 6}</div>
      </Col>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-light">{(span * 2) / 6}</div>
      </Col>
      <Col span={(span * 2) / 6}>
        <div className="grid-content bg-dark">{(span * 2) / 6}</div>
      </Col>
    </Row>
  </>
);

export const basicGrid = Template.bind({});
basicGrid.args = {
  gutter: 0,
  span: 12,
  offset: 0,
  align: 'left'
};

export const GridGutterAndColumnOffset = () => (
  <>
    <Row gutter={20}>
      <Col span={16}>
        <div className="grid-content bg-light">16</div>
      </Col>
      <Col span={8}>
        <div className="grid-content bg-light">8</div>
      </Col>
    </Row>

    <Row>
      <Col span={6}>
        <div className="grid-content bg-light">6</div>
      </Col>
      <Col span={6} offset={6}>
        <div className="grid-content bg-light">6</div>
      </Col>
    </Row>
  </>
);
GridGutterAndColumnOffset.parameters = {
  docs: {
    description: {
      story:
        '通过 `Row` 组件的 `gutter` 属性设置两个栅格之间的间隔，通过 `Col` 组件的 `offset` 属性设置栅格偏移的列数，从而实现更丰富的布局。'
    }
  }
};

export const ResponsiveLayout = () => (
  <>
    <Row gutter={10}>
      <Col
        xs={{ span: 8 }}
        sm={{ span: 6 }}
        md={{ span: 4 }}
        lg={{ span: 3 }}
        xl={{ span: 2 }}
      >
        <div className="grid-content bg-light"></div>
      </Col>

      <Col
        xs={{ span: 4 }}
        sm={{ span: 6 }}
        md={{ span: 8 }}
        lg={{ span: 9 }}
        xl={{ span: 10 }}
      >
        <div className="grid-content bg-dark"></div>
      </Col>
      <Col
        xs={{ span: 4 }}
        sm={{ span: 6 }}
        md={{ span: 8 }}
        lg={{ span: 9 }}
        xl={{ span: 10 }}
      >
        <div className="grid-content bg-dark"></div>
      </Col>
      <Col
        xs={{ span: 8 }}
        sm={{ span: 6 }}
        md={{ span: 4 }}
        lg={{ span: 3 }}
        xl={{ span: 2 }}
      >
        <div className="grid-content bg-light"></div>
      </Col>
    </Row>
  </>
);

ResponsiveLayout.parameters = {
  docs: {
    description: {
      story:
        'xs < 576px, sm ≥ 576px, md ≥ 768px, lg ≥ 992px, xl ≥ 1200px, xxl ≥ 1600px \n\n尝试改变浏览器窗口大小查看不同视口下栅格占据的列数。'
    }
  }
};
