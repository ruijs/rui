import { RuiExtension } from "@ruiapp/move-style";
import Rui from "./Rui";
import ErrorBoundary from "./ErrorBoundary";
import Show from "./rocks/show/Show";
import HtmlElement from "./rocks/htmlElement/HtmlElement";
import Anchor from "./rocks/anchor/Anchor";
import Box from "./rocks/box/Box";
import Component from "./Component";
import Scope from "./Scope";
import Slot from "./Slot";
import Sr from "./rocks/sr/Sr";
import Text from "./rocks/text/Text";
import Label from "./rocks/label/Label";
import List from "./List";
import Tree from "./rocks/tree/Tree";

export { configAnchor } from "./rocks/anchor/Anchor";
export * from "./rocks/anchor/anchor-types";

export { configBox } from "./rocks/box/Box";
export * from "./rocks/box/Box-types";

export { configHtmlElement } from "./rocks/htmlElement/HtmlElement";
export * from "./rocks/htmlElement/html-element-types";

export { configLabel } from "./rocks/label/Label";
export * from "./rocks/label/label-types";

export { configShow } from "./rocks/show/Show";
export * from "./rocks/show/show-types";

export { configSr } from "./rocks/sr/Sr";
export * from "./rocks/sr/sr-types";

export { configText } from "./rocks/text/Text";
export * from "./rocks/text/text-types";

export { configTree } from "./rocks/tree/Tree";
export * from "./rocks/tree/tree-types";

export { Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Sr, Text, Label, List, Tree };

export default {
  rocks: [Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Sr, Text, Label, List, Tree],
} as RuiExtension;
