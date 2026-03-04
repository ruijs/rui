import { RuiExtension } from "@ruiapp/move-style";
import Rui from "./Rui";
import ErrorBoundary from "./ErrorBoundary";
import Show from "./rocks/show/Show";
import HtmlElement from "./HtmlElement";
import Anchor from "./Anchor";
import Box from "./rocks/box/Box";
import Component from "./Component";
import Scope from "./Scope";
import Slot from "./Slot";
import Text from "./Text";
import Label from "./Label";
import List from "./List";
import Tree from "./Tree";

export { configBox } from "./rocks/box/Box";
export * from "./rocks/box/Box-types";

export { configShow } from "./rocks/show/Show";
export * from "./rocks/show/show-types";

export { Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Text, Label, List, Tree };

export default {
  rocks: [Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Text, Label, List, Tree],
} as RuiExtension;
