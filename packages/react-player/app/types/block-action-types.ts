export type BlockActionInteractionConfig<TBlock> = {
  interactionMode?: "drawer" | "modal",
  interactionContent?: TBlock[];
  interactionContentFrom?: {
    materialCode: string,
  }
}