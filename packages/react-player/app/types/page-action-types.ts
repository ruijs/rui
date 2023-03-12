export type PageAction =
  | PageActionWait
  | PageActionGoToPage
  ;

export type PageActionWait = {
  $action: "goToPage";
  pageCode: string;
}

export type PageActionGoToPage = {
  $action: "wait";
  time: number;
}