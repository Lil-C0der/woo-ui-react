import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Alert, { IAlertProps } from './alert';

export default {
  title: '提示 Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          '#### 警告提示 \n展示页面中重要的提示信息。\n通过 `type` 属性来设置不同类型，改变 Alert 的样式。\n当 `closable` 属性为 `true` 时，点击右侧按钮可以关闭，同时触发 `onClose` 和 `afterClosing` 回调'
      }
    }
  },
  argTypes: {
    title: {
      type: {
        required: true,
        summary: 'string'
      },
      description: 'Alert 的标题'
    },
    type: {
      description: 'Alert 的类型',
      type: {
        summary: 'primary | success | warn | danger'
      },
      defaultValue: {
        summary: 'primary'
      },
      control: {
        type: 'select',
        options: ['primary', 'success', 'warn', 'danger']
      }
    },
    description: {
      description:
        'Alert 的详细内容，添加 `description` 属性后，标题的样式随之改变。',
      type: {
        summary: 'string'
      }
    },
    closable: {
      description: '是否显示关闭按钮',
      type: {
        summary: 'boolean'
      },
      control: 'boolean',
      defaultValue: {
        summary: 'false'
      }
    },
    closeText: {
      description: '自定义关闭按钮',
      type: {
        summary: 'React.ReactNode'
      },
      control: false
    },
    onClose: {
      description: '关闭时触发的回调',
      type: {
        summary: '(e: React.MouseEvent) => void'
      },
      control: false
    },
    afterClosing: {
      description: '关闭动画结束后触发的回调',
      type: {
        summary: '() => void'
      },
      control: false
    }
  }
} as Meta;

const Template: Story<IAlertProps> = (args) => (
  <Alert style={{ width: 280 }} {...args} />
);
export const BasicAlert = Template.bind({});
BasicAlert.args = {
  closable: true,
  title: 'it is an alert box',
  type: 'primary',
  afterClosing: action('afterClosing')
};

export const alertType = () => (
  <>
    <Alert style={{ marginBottom: 10 }} title="it is a default message" />
    <Alert
      style={{ marginBottom: 10 }}
      title="it is a success message"
      type="success"
    />
    <Alert
      style={{ marginBottom: 10 }}
      title="it is a warning message"
      type="warn"
    />
    <Alert
      style={{ marginBottom: 10 }}
      title="it is a danger message"
      type="danger"
    />
  </>
);
alertType.parameters = {
  docs: {
    description: {
      story: '设置 `type` 属性来改变 alert 的类型'
    }
  }
};

export const AlertWithDescription = () => (
  <Alert title="Title" description="description" />
);
AlertWithDescription.parameters = {
  docs: {
    description: {
      story: '通过 `description` 属性给 Alert 添加描述'
    }
  }
};

export const customizeCloseText = () => (
  <Alert
    title="自定义关闭按钮"
    closable
    closeText={<i style={{ fontSize: 16 }}>customize button</i>}
  />
);
customizeCloseText.parameters = {
  docs: {
    description: {
      story: '设置 `closeText` 属性实现自定义关闭按钮'
    }
  }
};
