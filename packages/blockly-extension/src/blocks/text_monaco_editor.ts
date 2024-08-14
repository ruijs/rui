import * as Blockly from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";

export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(
            "data:image/svg+xml;base64," +
            "PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA" +
            "6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm" +
            "94PSIwIDAgMTAyNCAxMDI0Ij48c3R5bGU+LnN0M" +
            "HtmaWxsOiNmNmY2ZjY7ZmlsbC1vcGFjaXR5OjB9" +
            "LnN0MXtmaWxsOiNmZmZ9LnN0MntmaWxsOiMxNjd" +
            "hYmZ9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIi" +
            "BkPSJNMTAyNCAxMDI0SDBWMGgxMDI0djEwMjR6I" +
            "i8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTEwMjQg" +
            "ODUuMzMzdjg1My4zMzNIMFY4NS4zMzNoMTAyNHo" +
            "iLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA4NS" +
            "4zMzNoMjk4LjY2N3Y4NTMuMzMzSDBWODUuMzMze" +
            "m0xMDI0IDB2ODUzLjMzM0gzODRWODUuMzMzaDY0" +
            "MHptLTU1NC42NjcgMTYwaDM0MS4zMzN2LTY0SDQ" +
            "2OS4zMzN2NjR6bTM0MS4zMzQgNTMzLjMzNEg0Nj" +
            "kuMzMzdjY0aDM0MS4zMzNsLjAwMS02NHptMTI4L" +
            "TE0OS4zMzRINTk3LjMzM3Y2NGgzNDEuMzMzbC4w" +
            "MDEtNjR6bTAtMTQ5LjMzM0g1OTcuMzMzdjY0aDM" +
            "0MS4zMzNsLjAwMS02NHptMC0xNDkuMzMzSDU5Ny" +
            "4zMzN2NjRoMzQxLjMzM2wuMDAxLTY0eiIvPjwvc3ZnPg==",
            22, 22, "\u00B6", (image) => {
              let textField = image.getSourceBlock()?.getField("TEXT") as Blockly.FieldMultilineInput;
              if (!textField) {
                return;
              }
              let content = textField.getText();
              context.commands.current.showMonacoEditorModal(content).then((value) => {
                textField.setValue(value);
              });
            }));
        this.appendDummyInput()
          .appendField(new Blockly.FieldMultilineInput(), "TEXT");
        this.setOutput(true, "String");
        this.setInputsInline(true);
        this.setColour(160);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {
      const code = (generator as any).multiline_quote_(block.getFieldValue("TEXT"));
      const order = code.includes("+") ? Order.ADDITION : Order.ATOMIC;
      return [code, order];
    },
  } as BlockDef;
}
