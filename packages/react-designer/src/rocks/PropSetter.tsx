import { ContainerRockConfig, RockMeta } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import React from "react";

export interface PropSetterProps extends ContainerRockConfig {
  $type: "propSetter",
  label: string;
  labelTip?: string;
}

export default {
  $type: "propSetter",

  renderer(props: PropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { label, labelTip } = props;
    return <div style={styleSetter}>
      <div style={styleSetterLabelSection}>
        <div style={styleSetterLabel} title={label}>
          {label}
        </div>
      </div>
      <div style={styleSetterControls}>
        {
          renderRockChildren(framework, page, props.children)
        }
      </div>
    </div>
  },

} as RockMeta;

const styleSetter: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  paddingBottom: "5px",
};

const styleSetterLabelSection: React.CSSProperties = {
  width: "100px",
  minWidth: "100px",
  paddingRight: "5px",
}

const styleSetterLabel: React.CSSProperties = {
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
}

const styleSetterControls: React.CSSProperties = {
  width: "100%",
}