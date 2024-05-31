import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { useState, useEffect, memo, CSSProperties } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

export interface RichTextEditorProps {
  width?: number;
  toolbarStyle?: CSSProperties;
  editorStyle?: CSSProperties;
  value?: string;
  onChange?(value: string): void;
}

export default memo<RichTextEditorProps>((props) => {
  const { toolbarStyle = {}, editorStyle = {}, width } = props;

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  let containerStyle = {};
  if (width) {
    containerStyle = { width };
  }

  return (
    <div style={containerStyle}>
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ borderBottom: "1px solid #ccc", ...toolbarStyle }} />
      <Editor
        defaultConfig={editorConfig}
        value={props.value || ""}
        onCreated={setEditor}
        onChange={(editor) => {
          const v = editor.getHtml();
          props.onChange?.(v);
        }}
        mode="default"
        style={{ height: "500px", overflowY: "hidden", ...editorStyle }}
      />
    </div>
  );
});
