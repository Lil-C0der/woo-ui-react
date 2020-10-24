import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { IButtonProps } from './button';

export default {
  title: '按钮 Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '#### 常见的按钮组件'
      }
    }
  },
  argTypes: {
    children: {
      description: '按钮的内容',
      type: { summary: 'string' }
    },
    disabled: {
      description: '是否禁用按钮',
      type: { summary: 'boolean' },
      defaultValue: {
        summary: 'false'
      }
    },
    btnType: {
      description: '按钮的类型',
      type: {
        summary: `normal
         | primary
         | dashed
         | success
         | warn
         | danger
         | link`
      },
      control: {
        type: 'select',
        options: [
          'normal',
          'primary',
          'dashed',
          'success',
          'warn',
          'danger',
          'link'
        ]
      },
      defaultValue: {
        summary: 'normal'
      }
    },
    size: {
      type: { summary: 'string' },
      description: '按钮的尺寸',
      control: {
        type: 'inline-radio',
        options: ['sm', 'lg']
      }
    },
    href: {
      description: `当 btnType 为 link 时，
      通过 href 属性设置点击跳转的地址。
      指定此属性 button 的行为和 a 链接一致`,
      type: { summary: 'string' },
      control: 'text'
    },
    onClick: {
      description: '点击按钮时触发的回调',
      control: false,
      type: {
        summary: '(e: React.MouseEvent) => void'
      }
    }
  }
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args}></Button>;

export const NormalButton = Template.bind({});
NormalButton.args = {
  children: 'Normal',
  disabled: false,
  btnType: 'normal'
};

const buttonTypeDemo: Story = () => (
  <>
    <Button btnType="dashed">Dashed</Button>
    <Button btnType="primary">Primary</Button>
    <Button btnType="success">Success</Button>
    <Button btnType="warn">Warn</Button>
    <Button btnType="danger">Danger</Button>
    <Button btnType="link" href="https://www.google.com" target="_blank">
      Link
    </Button>
  </>
);
export const ButtonType = buttonTypeDemo.bind({});
ButtonType.parameters = {
  docs: {
    description: {
      story:
        '通过 `btnType` 属性来设置按钮的类型，类型为 `link` 时，按钮的行为和 a 标签一致'
    }
  }
};

const buttonSizeDemo: Story = () => (
  <>
    <Button size="sm">Small Button</Button>
    <Button size="lg">Large Button</Button>
    <Button size="lg" btnType="primary">
      Large Primary Button
    </Button>
  </>
);
export const ButtonSize = buttonSizeDemo.bind({});
ButtonSize.parameters = {
  docs: {
    description: {
      story: '通过 `size` 属性来设置按钮的大小'
    }
  }
};
