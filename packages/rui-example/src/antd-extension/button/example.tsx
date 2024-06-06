import { css } from "@emotion/css";
import { Rock } from "@ruiapp/move-style";

const ButtonExample = {
  $type: "buttonExample",

  Renderer(context, props, state) {
    return <div className={CssNames.container}></div>;
  },
} as Rock;

export default ButtonExample;

const CssNames = {
  container: css`
    padding: 16px;
  `,
};
