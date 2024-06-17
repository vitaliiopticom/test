import { useState } from 'react';
import type { ComponentStoryFn, Meta } from '@storybook/react';

import { Button } from '../Button/Button';

import { Modal } from './Modal';

export default {
  title: 'Elements/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Modal>;

const Template: ComponentStoryFn<typeof Modal> = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Confirm</Button>
          </>
        }
        className="lg:max-w-[50%]"
        isOpen={isOpen}
        title="Title"
        onClose={() => setOpen(false)}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend
          nisi at augue porttitor, eu commodo nulla condimentum. Quisque vel
          felis a massa dapibus elementum vitae ac lorem. Donec molestie ligula
          vitae accumsan iaculis.
        </div>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
