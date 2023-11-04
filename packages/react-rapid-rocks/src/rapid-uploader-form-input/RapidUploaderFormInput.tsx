import { Rock, RockConfig, handleComponentEvent } from "@ruiapp/move-style";
import RapidToolbarLinkMeta from "./RapidUploaderFormInputMeta";
import { renderRock } from "@ruiapp/react-renderer";
import { RapidUploaderFormInputRockConfig } from "./rapid-uploader-form-input-types";
import { Button, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isString } from "lodash";
import { useCallback } from "react";


export default {
  $type: "rapidUploaderFormInput",

  Renderer(context, props) {
    const onUploadChange = useCallback<UploadProps["onChange"]>((info) => {
      const file = info.file;
      if (file) {
        if (file.status === "done") {
          if (props.onUploaded) {
            const eventArgs = {
              name: file.name,
              key: file.response.fileKey,
              size: file.size,
              type: file.type,
            };

            handleComponentEvent("onUploaded", context.framework, context.page, context.scope, props, props.onUploaded, eventArgs);
          }
        }
      }
    }, []);

    const buttonText = props.buttonText || "选择文件";

    return <Upload {...props.uploadProps} onChange={onUploadChange}>
      <Button icon={<UploadOutlined />}>{buttonText.toString()}</Button>
    </Upload>
  },

  ...RapidToolbarLinkMeta,
} as Rock<RapidUploaderFormInputRockConfig>;