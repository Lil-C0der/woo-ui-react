import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Icon, { IIconProps } from './icon';

export default {
  title: '图标 Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          '### 常见的图标 \n基于 react-fontawesome，支持的图标见[图标库](https://fontawesome.com/icons?d=gallery)，更多属性可以参考 [FontAwesome 文档](https://github.com/FortAwesome/react-fontawesome#basic)'
      }
    }
  },
  argTypes: {
    icon: {
      description: 'Icon 的名称，不同的 icon 属性对应不同的 icon',
      type: {
        summary: 'string'
      }
    },
    size: {
      description: 'Icon 的大小',
      type: {
        summary:
          'xs | lg | sm | 1x | 2x | 3x | 4x| 5x | 6x | 7x | 8x | 9x | 10x'
      },
      control: {
        type: 'select',
        options: [
          'xs',
          'lg',
          'sm',
          '1x',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x'
        ]
      }
    },
    theme: {
      description: 'Icon 的主题',
      type: {
        summary: 'primary | success | warn | danger | light | dark'
      },
      control: {
        type: 'select',
        options: ['primary', 'success', 'warn', 'danger', 'light', 'dark']
      }
    }
  }
} as Meta;

const Template: Story<IIconProps> = (args) => <Icon {...args} />;
export const basicIcon = Template.bind({});
basicIcon.args = {
  icon: 'arrow-alt-circle-down',
  theme: 'success',
  size: '6x'
};

export const iconAnimation = () => (
  <>
    <Icon theme="primary" icon="spinner" size="6x" spin />
    <Icon theme="danger" icon="spinner" size="6x" pulse />
  </>
);
iconAnimation.parameters = {
  docs: {
    description: {
      story:
        '由 FontAwesome 提供的 feature，设置 `spin` 或 `pulse` 属性，给 Icon 添加不同的动画。'
    }
  }
};
