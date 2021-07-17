import React from 'react'

import DragAndDrop from '.'

export default {
  title: 'Example/DragAndDrop',
  component: DragAndDrop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

const Template = (args) => <DragAndDrop {...args} />

export const Test = Template.bind({})
Test.args = {
  label: 'Button',
}
