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
describe('Button 组件', () => {
  it('存在', () => {
    expect(Alert).toBeTruthy();
  });
  it('可以设置 title 属性，默认不显示关闭按钮', () => {
    const { container } = render(<Alert {...defaultProps} />);
    const titleEl = container.querySelector('.woo-alert-title');
    const closeIconEl = container.querySelector('svg');
    expect(titleEl?.innerHTML).toEqual('alert_test');
    expect(closeIconEl).toEqual(null);
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
    let closeIconEl = container.querySelector('svg');
    expect(closeIconEl).toBeVisible();
    act(() => {
      closeIconEl && fireEvent.click(closeIconEl);
      expect(testClosableProps.onClose).toHaveBeenCalledWith(
        expect.any(Object)
      );
      expect(testClosableProps.afterClosing).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
    });
    closeIconEl = container.querySelector('svg');
    expect(closeIconEl).toEqual(null);
    expect(testClosableProps.afterClosing).toHaveBeenCalled();
    jest.runAllTimers();
  });
});
