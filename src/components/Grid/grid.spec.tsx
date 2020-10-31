import React from 'react';
import { render } from '@testing-library/react';

import Col, { IColProps } from './Col';
import Row, { IRowProps } from './Row';

describe('Grid 布局系统', () => {
  it('存在', () => {
    expect(Col).toBeTruthy();
    expect(Row).toBeTruthy();
  });
  describe('Col 组件', () => {
    const renderCol = (props: IColProps) =>
      render(<Col {...props}>test col</Col>);
    it('默认的 span 属性值为 24', () => {
      const { getByText } = renderCol({});
      expect(getByText('test col')).toHaveClass('woo-col-24');
    });
    it('可以设置 span 属性', () => {
      const { getByText } = renderCol({ span: 12 });
      expect(getByText('test col')).toHaveClass('woo-col-12');
    });
    it('可以设置 offset 属性', () => {
      const { getByText } = renderCol({ span: 12, offset: 10 });
      expect(getByText('test col')).toHaveClass('woo-col-offset-10');
    });
    it('可以设置 xs 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        xs: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-xs-12');
      expect(getByText('test col')).toHaveClass('woo-col-xs-offset-12');
    });
    it('可以设置 sm 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        sm: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-sm-12');
      expect(getByText('test col')).toHaveClass('woo-col-sm-offset-12');
    });
    it('可以设置 md 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        md: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-md-12');
      expect(getByText('test col')).toHaveClass('woo-col-md-offset-12');
    });
    it('可以设置 lg 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        lg: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-lg-12');
      expect(getByText('test col')).toHaveClass('woo-col-lg-offset-12');
    });
    it('可以设置 xl 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        xl: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-xl-12');
      expect(getByText('test col')).toHaveClass('woo-col-xl-offset-12');
    });
    it('可以设置 xxl 属性', () => {
      const { getByText } = renderCol({
        span: 12,
        xxl: { span: 12, offset: 12 }
      });
      expect(getByText('test col')).toHaveClass('woo-col-xxl-12');
      expect(getByText('test col')).toHaveClass('woo-col-xxl-offset-12');
    });
  });

  describe('Row 组件', () => {
    const renderGrid = (props: IRowProps) =>
      render(
        <Row {...props}>
          <Col span={12}>test col 1</Col>
          <Col span={12}>test col 2</Col>
        </Row>
      );
    it('默认的 align 属性是 center', () => {
      const { container } = renderGrid({});
      expect(container.querySelector('.woo-row')).toHaveClass('align-center');
      // TODO 测试 CSS 属性
    });
    it('可以设置 align 属性', () => {
      const { container } = renderGrid({ align: 'right' });
      expect(container.querySelector('.woo-row')).toHaveClass('align-right');
      // TODO 测试 CSS 属性
      // expect(
      //   window.getComputedStyle(container.querySelector('.woo-row') as Element)
      //     .justifyContent
      // ).toEqual('flex-end');
    });
    it('可以设置 gutter 属性', () => {
      const { container, getByText } = renderGrid({ gutter: 20 });
      expect(container.querySelector('.woo-row')).toHaveStyle(
        'margin-left: -10px'
      );
      expect(container.querySelector('.woo-row')).toHaveStyle(
        'margin-right: -10px'
      );
      expect(getByText('test col 1')).toHaveStyle('padding-left: 10px');
      expect(getByText('test col 1')).toHaveStyle('padding-right: 10px');
    });
  });
});
