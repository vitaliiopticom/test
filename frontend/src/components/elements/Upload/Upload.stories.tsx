import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Upload, UploadValue } from './Upload';

export default {
  title: 'Elements/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Upload>;

const Template: StoryFn<typeof Upload> = (args) => {
  const [files, setFiles] = useState<UploadValue>(null);

  return (
    <Upload
      {...args}
      isMultiple={false}
      value={files}
      onChange={(files) => setFiles(files)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'dropzone',
};
