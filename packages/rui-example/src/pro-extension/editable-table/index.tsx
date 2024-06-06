import { Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useState } from "react";

const Example = {
  $type: "editableTableExample",

  Renderer(context, props, state) {
    const [fields, setFields] = useState<any[]>([
      {
        name: "留",
        team: {
          name: "研发",
        },
      },
      {
        name: "李",
      },
    ]);

    return renderRock({
      context,
      rockConfig: {
        $type: "editableTable",
        $id: "editableTable_demo1",
        width: 300,
        columns: [
          {
            name: "name",
            title: "姓名",
            // fixed: "left",
            // control: "input",
            width: 150,
          },
          {
            name: "team.name",
            title: "小组",
            control: "input",
            width: 150,
          },
        ],
        // value: fields,
        onChange: (v: any[]) => {
          setFields(v);
        },
      },
    });
  },
} as Rock;

export default {
  name: "EditableTable",
  title: "EditableTable",
  componentRock: Example,
} as PKGConfig<Rock>["examples"][0];
