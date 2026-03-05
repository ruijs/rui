import { RuiExtension } from "@ruiapp/move-style";
import Rui from "./rocks/rui/Rui";
import ErrorBoundary from "./rocks/errorBoundary/ErrorBoundary";
import Show from "./rocks/show/Show";
import HtmlElement from "./rocks/htmlElement/HtmlElement";
import Anchor from "./rocks/anchor/Anchor";
import Box from "./rocks/box/Box";
import Component from "./rocks/component/Component";
import Scope from "./rocks/scope/Scope";
import Slot from "./rocks/slot/Slot";
import Sr from "./rocks/sr/Sr";
import Text from "./rocks/text/Text";
import Label from "./rocks/label/Label";
import List from "./rocks/list/List";
import Tree from "./rocks/tree/Tree";

export { configAnchor } from "./rocks/anchor/Anchor";
export * from "./rocks/anchor/anchor-types";

export { configBox } from "./rocks/box/Box";
export * from "./rocks/box/Box-types";

export { configComponent } from "./rocks/component/Component";
export * from "./rocks/component/component-types";

export { configErrorBoundary } from "./rocks/errorBoundary/ErrorBoundary";
export * from "./rocks/errorBoundary/error-boundary-types";

export { configHtmlElement } from "./rocks/htmlElement/HtmlElement";
export * from "./rocks/htmlElement/html-element-types";

export { configLabel } from "./rocks/label/Label";
export * from "./rocks/label/label-types";

export { configList } from "./rocks/list/List";
export * from "./rocks/list/list-types";

export { configRui } from "./rocks/rui/Rui";
export * from "./rocks/rui/rui-types";

export { configScope } from "./rocks/scope/Scope";
export * from "./rocks/scope/scope-types";

export { configShow } from "./rocks/show/Show";
export * from "./rocks/show/show-types";

export { configSlot } from "./rocks/slot/Slot";
export * from "./rocks/slot/slot-types";

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
