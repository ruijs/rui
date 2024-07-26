import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import _ from "lodash";
import { hsvaToHslString, hsvaToHslaString, hsvaToRgbString, hsvaToRgbaString } from "@uiw/color-convert";
import Sketch from "@uiw/react-color-sketch";
import { Popover } from "antd";
import { CSSProperties, useState } from "react";
import { convertToEventHandlers, renderRock } from "@ruiapp/react-renderer";

import "./style.css";

export interface ColorPickerProps extends SimpleRockConfig {
  value?: string;
  onChange?(v: string): void;
  disabled?: boolean;
  format?: "rgb" | "hex" | "hsl"; // default: hex
  enableAlpha?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default {
  $type: "colorPicker",

  Renderer: (context, props: ColorPickerProps) => {
    const { format = "hex", enableAlpha, disabled, className, style } = props;
    const [open, setOpen] = useState<boolean>(false);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    if (disabled) {
      return (
        <div className={`ant-input ant-input-disabled rr-color-picker ${className || ""}`} style={{ display: "inline-flex", ...(style || {}) }}>
          <span className="rr-color-picker--block">
            <span className="rr-color-picker--inner" style={{ backgroundColor: props.value }}></span>
          </span>
          <span className="rr-color-picker--value" style={{ flex: "1 0 0" }}>
            {props.value}
          </span>
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
            disableAlpha={!enableAlpha}
            color={props.value}
            onChange={(v) => {
              let fmtValue: string = null;
              switch (format) {
                case "hex":
                  fmtValue = enableAlpha ? v.hexa : v.hex;
                  break;
                case "rgb":
                  fmtValue = enableAlpha ? hsvaToRgbaString(v.hsva) : hsvaToRgbString(v.hsva);
                  break;
                case "hsl":
                  fmtValue = enableAlpha ? hsvaToHslaString(v.hsva) : hsvaToHslString(v.hsva);
                  break;
              }

              eventHandlers.onChange?.(fmtValue);
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
          <span className="rr-color-picker--value" style={{ flex: "1 0 0" }}>
            {props.value}
          </span>
          {props.value && (
            <span
              className="rr-color-picker--clear"
              onClick={(e) => {
                e.stopPropagation();

                eventHandlers.onChange?.(undefined);
              }}
            >
              {renderRock({
                context,
                rockConfig: {
                  $id: `${props.$id}_remove_btn`,
                  $type: "antdIcon",
                  name: "CloseOutlined",
                },
              })}
            </span>
          )}
        </div>
      </Popover>
    );
  },
} as Rock;
