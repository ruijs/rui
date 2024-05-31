import { CSSProperties, memo } from "react";

interface IProps {
  style?: CSSProperties;
  richText?: string;
}

export default memo<IProps>((props) => {
  return <div style={props.style} dangerouslySetInnerHTML={{ __html: props.richText || "" }}></div>;
});
