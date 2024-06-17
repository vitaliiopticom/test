import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button/Button';

import { Transition } from './Transition';

export default {
  title: 'Elements/Transition',
  component: Transition,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Transition>;

const Template: StoryFn<typeof Transition> = ({ children, ...rest }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="w-full" onClick={() => setShow((prev) => !prev)}>
        Show
      </Button>
      <div className="mt-4 h-40 w-40">
        <Transition show={show} {...rest}>
          <div className="h-40 w-40 rounded border shadow-lg" />
        </Transition>
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'scaleOpacity',
};
