export type BlockTabs<TBlock=any> = {
  type: "tabs";
  code: string;
  tabs: BlockTabItem<TBlock>[];
}

export type BlockTabItem<TBlock=any> = {
  code: string;
  label: string;
  children: TBlock[];
}