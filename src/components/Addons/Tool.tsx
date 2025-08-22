import React, { memo, useCallback } from "react";
import { useStorybookApi } from "storybook/manager-api";
import { IconButton } from "storybook/internal/components";
import { Addon_RenderOptions } from "storybook/internal/types";
import styles from "./Tool.module.css";
import { usePlaygroundState } from "@/hooks";
import { Beaker } from "@/icons";

const Tool: React.FC<Addon_RenderOptions> = () => {
  const { selectStory } = useStorybookApi();
  const { playgroundStoryId } = usePlaygroundState();

  const selectPlaygroundStory = useCallback(() => {
    selectStory(playgroundStoryId);
  }, [selectStory, playgroundStoryId]);

  return (
    <IconButton
      title="Show playground view"
      onClick={selectPlaygroundStory}
      className={styles.tool}
    >
      <Beaker />
    </IconButton>
  );
};

export default memo(Tool);
