import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

// import { Button, ButtonProps } from './Button';

import '../styles/index.scss';
import Button, { IBaseButtonProps } from '../components/Button/button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args}></Button>;

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button'
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button'
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button'
// };

const Template: Story<IBaseButtonProps> = (args) => (
  <Button {...args} onClick={action('it is a button')}>
    {args.children}
  </Button>
);

// const RenderButton: Story<IBaseButtonProps> = (props) => (
//   <Button {...props}>{props.children}</Button>
// );

// export const BaseButton = RenderButton.bind({});
// BaseButton.args = {
//   children: 'Normal Button'
// };

export const NormalButton = Template.bind({});
NormalButton.args = {
  children: 'Normal',
  disabled: false,
  btnType: 'normal'
};

export const ButtonType = () => (
  <>
    <Button btnType="dashed">Dashed</Button>
    <Button btnType="primary">Primary</Button>
    <Button btnType="success">Success</Button>
    <Button btnType="warn">Warn</Button>
    <Button btnType="danger">Danger</Button>
    <Button btnType="link">
      <a href="https://www.google.com">Link</a>
    </Button>
  </>
);

export const ButtonSize = () => (
  <>
    <Button size="sm">Small Button</Button>
    <Button size="lg">Large Button</Button>
  </>
);
