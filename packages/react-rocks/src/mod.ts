import { RuiExtension } from "@ruiapp/move-style";
import Rui from "./Rui";
import ErrorBoundary from "./ErrorBoundary";
import Show from "./Show";
import HtmlElement from "./HtmlElement";
import Anchor from "./Anchor";
import Box from "./Box";
import Scope from "./Scope";
import Text from "./Text";
import Label from "./Label";
import List from "./List";

export { Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Scope, Text, Label, List };

export default {
  rocks: [Rui, ErrorBoundary, Show, HtmlElement, Anchor, Box, Scope, Text, Label, List],
} as RuiExtension;
