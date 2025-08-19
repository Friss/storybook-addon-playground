import type { Meta } from "@storybook/react-vite";
import { Button } from "./Button";
import { StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
  title: "Other stories/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
