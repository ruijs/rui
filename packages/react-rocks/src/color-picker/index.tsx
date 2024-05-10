import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import _ from "lodash";
import { hsvaToHslString, hsvaToHslaString, hsvaToRgbString, hsvaToRgbaString } from "@uiw/color-convert";
import Sketch from "@uiw/react-color-sketch";
import { Popover } from "antd";
import { CSSProperties, useState } from "react";

import "./style.css";

export interface ColorPickerProps extends SimpleRockConfig {
  value?: string;
  onChange?(v: string): void;
  disabled?: boolean;
  format?: "rgb" | "hex" | "hsl"; // default: hex
  disableAlpha?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default {
  $type: "colorPicker",

  Renderer: (context, props: ColorPickerProps) => {
    const { format = "hex", disableAlpha = true, disabled, className, style } = props;
    const [open, setOpen] = useState<boolean>(false);

    if (disabled) {
      return (
        <div className={`ant-input ant-input-disabled rr-color-picker ${className || ""}`} style={{ display: "inline-flex", ...(style || {}) }}>
          <span className="rr-color-picker--block">
            <span className="rr-color-picker--inner" style={{ backgroundColor: props.value }}></span>
          </span>
          <span style={{ flex: "1 0 0" }}>{props.value}</span>
        </div>
      );
    }

    return (
      <Popover
        open={open}
        overlayClassName="rr-color-picker--popover"
        destroyTooltipOnHide
        content={
          <Sketch
            disableAlpha={disableAlpha}
            color={props.value}
            onChange={(v) => {
              let fmtValue: string = null;
              switch (format) {
                case "hex":
                  fmtValue = disableAlpha ? v.hex : v.hexa;
                  break;
                case "rgb":
                  fmtValue = disableAlpha ? hsvaToRgbaString(v.hsva) : hsvaToRgbString(v.hsva);
                  break;
                case "hsl":
                  fmtValue = disableAlpha ? hsvaToHslaString(v.hsva) : hsvaToHslString(v.hsva);
                  break;
              }

              props.onChange?.(fmtValue);
            }}
          />
        }
        trigger={["click"]}
        onOpenChange={(visible) => {
          setOpen(visible);
        }}
      >
        <div
          className={`ant-input rr-color-picker ${className || ""}`}
          style={{ display: "inline-flex", ...(style || {}) }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="rr-color-picker--block">
            <span className="rr-color-picker--inner" style={{ backgroundColor: props.value }}></span>
          </span>
          <span style={{ flex: "1 0 0" }}>{props.value}</span>
        </div>
      </Popover>
    );
  },
} as Rock;
