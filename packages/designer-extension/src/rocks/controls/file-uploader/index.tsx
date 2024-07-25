import { Rock, SimpleRockConfig } from "@ruiapp/move-style";
import _ from "lodash";
import { CSSProperties, useState } from "react";
import { convertToEventHandlers, renderRock } from "@ruiapp/react-renderer";
import { MoveStyleUtils } from "@ruiapp/move-style";
import { message } from "antd";

import "./style.css";

export interface FileUploaderValue {
  fileKey: string;
  fileName: string;
  fileSize: number;
}

export interface FileUploaderProps extends SimpleRockConfig {
  title?: string;
  value?: FileUploaderValue;
  onChange?(v: FileUploaderValue): void;
  disabled?: boolean;
  accept?: string;
  // 保留字段，暂不支持批量上传
  multiple?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default {
  $type: "fileUploader",

  Renderer: (context, props: FileUploaderProps) => {
    const { accept, multiple, disabled, className, style, title } = props;

    const [uploading, setUploading] = useState<boolean>(false);

    const eventHandlers = convertToEventHandlers({ context, rockConfig: props }) as any;

    const onSelectFiles = async () => {
      if (uploading) {
        return;
      }

      setUploading(true);
      const files = await selectFiles({
        accept,
        multiple,
      });

      const data = await uploadFiles(files);
      if (data) {
        eventHandlers.onChange?.(data);
      } else {
        message.error("上传失败");
      }

      setUploading(false);
    };

    return renderRock({
      context,
      rockConfig: {
        $type: "antdButton",
        disabled,
        className,
        style,
        block: true,
        loading: uploading,
        icon: {
          $type: "antdIcon",
          name: "UploadOutlined",
        },
        children: {
          $type: "text",
          text: title || "上传",
        },
        onClick: [
          {
            $action: "script",
            script: () => {
              if (disabled) {
                return;
              }

              onSelectFiles();
            },
          },
        ],
      },
    });
  },
} as Rock;

async function selectFiles(options: { accept?: string; multiple?: boolean }) {
  return new Promise<File[]>((res) => {
    const input = document.createElement("input");

    input.type = "file";
    input.multiple = options.multiple || false;
    if (options.accept) {
      input.accept = options.accept;
    }

    input.onchange = (e) => {
      const files = (e.target as any)?.files || [];

      document.body.removeChild(input);
      res(files);
    };

    (input as any).oncancel = (e) => {
      document.body.removeChild(input);
      res([]);
    };

    document.body.appendChild(input);
    input.click();
  });
}

function uploadFiles(files: File[]) {
  return new Promise((resolve) => {
    const fisrtFile = files[0];
    const formData = new FormData();
    formData.append("file", fisrtFile);
    MoveStyleUtils.request({
      url: `/api/upload`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          resolve({
            fileName: fisrtFile.name,
            fileSize: fisrtFile.size,
            ...res.data,
          });
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}
