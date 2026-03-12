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
import I18nText from "./rocks/i18nText/I18nText";
import Text from "./rocks/text/Text";
import Label from "./rocks/label/Label";
import List from "./rocks/list/List";
import Tree from "./rocks/tree/Tree";

export * from "./rocks/anchor/Anchor";
export * from "./rocks/anchor/anchor-types";

export * from "./rocks/box/Box";
export * from "./rocks/box/Box-types";

export * from "./rocks/component/Component";
export * from "./rocks/component/component-types";

export * from "./rocks/errorBoundary/ErrorBoundary";
export * from "./rocks/errorBoundary/error-boundary-types";

export * from "./rocks/htmlElement/HtmlElement";
export * from "./rocks/htmlElement/html-element-types";

export * from "./rocks/label/Label";
export * from "./rocks/label/label-types";

export * from "./rocks/list/List";
export * from "./rocks/list/list-types";

export * from "./rocks/rui/Rui";
export * from "./rocks/rui/rui-types";

export * from "./rocks/scope/Scope";
export * from "./rocks/scope/scope-types";

export * from "./rocks/show/Show";
export * from "./rocks/show/show-types";

export * from "./rocks/slot/Slot";
export * from "./rocks/slot/slot-types";

export * from "./rocks/i18nText/I18nText";
export * from "./rocks/i18nText/i18n-text-types";

export * from "./rocks/text/Text";
export * from "./rocks/text/text-types";

export * from "./rocks/tree/Tree";
export * from "./rocks/tree/tree-types";

export default {
  rocks: [Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Component, Scope, Slot, I18nText, Text, Label, List, Tree],
} as RuiExtension;
