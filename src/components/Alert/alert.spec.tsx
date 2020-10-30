import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Alert, { IAlertProps } from './alert';

const defaultProps: IAlertProps = {
  title: 'alert_test'
};
const testTypeProps: IAlertProps = {
  title: 'alert_test',
  type: 'success'
};
const testDescriptionProps: IAlertProps = {
  title: 'alert_test',
  description: 'description_test'
};
const testClosableProps: IAlertProps = {
  title: 'alert_test',
  closable: true,
  onClose: jest.fn(),
  afterClosing: jest.fn()
};
const testCloseTextProps: IAlertProps = {
  title: 'alert_test',
  closable: true,
  closeText: 'test closeText',
  onClose: jest.fn(),
  afterClosing: jest.fn()
};
const testCloseTextJSXElProps: IAlertProps = {
  title: 'alert_test',
  closable: true,
  closeText: <h2 style={{ color: '#f00' }}>close Element</h2>
};

describe('Button 组件', () => {
  it('存在', () => {
    expect(Alert).toBeTruthy();
  });
  it('可以设置 title 属性，默认不显示关闭按钮', () => {
    const { container } = render(<Alert {...defaultProps} />);
    const titleEl = container.querySelector('.woo-alert-title');
    const closeEl = container.querySelector('.woo-alert-close');
    expect(titleEl?.innerHTML).toEqual('alert_test');
    expect(closeEl).toEqual(null);
  });
  it('可以设置 type 属性', () => {
    const { container } = render(<Alert {...testTypeProps} />);
    const alertEl = container.querySelector('.woo-alert');
    expect(alertEl).toHaveClass('woo-alert-success');
  });
  it('可以添加 description 属性，添加以后 title 具有 woo-alert-title-bold 这个类', () => {
    const { getByText } = render(<Alert {...testDescriptionProps} />);
    expect(getByText('description_test')).toBeVisible();
    expect(getByText('alert_test')).toHaveClass('woo-alert-title-bold');
  });
  it('可以设置 closable 属性，并且点击会触发 onClose 回调，同时 alert 消失', () => {
    jest.useFakeTimers();
    const { container } = render(<Alert {...testClosableProps} />);
    const closeEl = container.querySelector('.woo-alert-close');
    expect(closeEl).toBeVisible();
    act(() => {
      closeEl && fireEvent.click(closeEl);
      expect(testClosableProps.onClose).toHaveBeenCalledWith(
        expect.any(Object)
      );
      expect(testClosableProps.afterClosing).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
    });
    expect(container.querySelector('.woo-alert')).toEqual(null);
    expect(testClosableProps.afterClosing).toHaveBeenCalled();
    jest.runAllTimers();
  });
  it('支持自定义 close 按钮的文本，点击以后触发 onClose 回调', () => {
    jest.useFakeTimers();
    const { getByText, container } = render(<Alert {...testCloseTextProps} />);
    const closeEl = getByText('test closeText');
    expect(closeEl).toBeVisible();
    expect(closeEl).toHaveClass('woo-alert-close');
    act(() => {
      fireEvent.click(closeEl);
      expect(testCloseTextProps.onClose).toHaveBeenCalledWith(
        expect.any(Object)
      );
      expect(testCloseTextProps.afterClosing).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
    });
    expect(container.querySelector('.woo-alert')).toEqual(null);
    expect(testCloseTextProps.afterClosing).toHaveBeenCalled();
    jest.runAllTimers();
    jest.useFakeTimers();
  });
  it('closeText 属性可以设置 jsx 元素', () => {
    const { getByText } = render(<Alert {...testCloseTextJSXElProps} />);
    expect(getByText('close Element')).toEqual(expect.any(HTMLHeadingElement));
    expect(getByText('close Element')).toHaveStyle('color: #f00');
  });
});
