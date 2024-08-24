import { RuiExtension } from "@ruiapp/move-style";
import Rui from "./Rui";
import ErrorBoundary from "./ErrorBoundary";
import Show from "./Show";
import HtmlElement from "./HtmlElement";
import Anchor from "./Anchor";
import Box from "./Box";
import Component from "./Component";
import Scope from "./Scope";
import Slot from "./Slot";
import Text from "./Text";
import Label from "./Label";
import List from "./List";
import Tree from "./Tree";

export { Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Text, Label, List, Tree };

export default {
  rocks: [Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, Text, Label, List, Tree],
} as RuiExtension;
