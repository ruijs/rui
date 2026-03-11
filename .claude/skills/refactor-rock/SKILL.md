---
name: refactor-rock
description: 当需要将 Rapid Extension 中的 Rock 组件重构为统一设计规范时使用此 skill。重构 Rapid Extension 中的 Rock 组件，使其符合统一的设计规范。适用于重构单个 Rock 组件文件夹、批量重构多个 Rock 组件，或检查现有组件是否符合规范。
---

# Refactor Rock

重构 Rapid Extension 中的 Rock 组件，使其符合统一的设计规范。

## 何时使用

当需要将 Rapid Extension 中的 Rock 组件重构为统一设计规范时使用此 skill。适用于：

- 重构单个 Rock 组件文件夹
- 批量重构多个 Rock 组件
- 检查现有组件是否符合规范

## 重构规则

### 1. 类型定义文件 ({rock-name}-types.ts)

需要定义两个类型：

- **{RockName}Props**: 包含组件所需的业务属性（如 value、onChange 等），**不需要**继承 `RockInstance`
- **{RockName}RockConfig**: 继承 SimpleRockConfig 和 {RockName}Props

示例：

```typescript
// rapid-date-picker-types.ts
import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface RapidDatePickerProps {
  value?: string | moment.Moment | null;
  picker?: "year" | "month" | "date";
  showTime?: boolean;
  onChange?(value: string | null): void;
}

export interface RapidDatePickerRockConfig extends SimpleRockConfig, RapidDatePickerProps {}
```

#### 1.1 {ROCK_NAME}\_ROCK_TYPE 常量定义

为避免 `$type` 字符串在多个文件中重复定义，应在 types 文件中定义 `{ROCK_NAME}_ROCK_TYPE` 常量，并在 `RockConfig` 接口和 Meta 文件中引用：

```typescript
// rapid-uploader-form-input-types.ts
import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { UploadProps } from "antd";

// 定义 ROCK_TYPE 常量
export const RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE = "rapidUploaderFormInput" as const;

export type RapidFileInfo = {
  key: string;
  name: string;
  size: number;
  type: string;
};

export interface RapidUploaderFormInputProps {
  value?: RapidFileInfo | RapidFileInfo[] | null;
  buttonText?: string;
  uploadProps?: UploadProps;
  multiple?: boolean;
  onUploaded?(value: RapidFileInfo): void;
  onChange?(value: RapidFileInfo | RapidFileInfo[] | null): void;
}

export interface RapidUploaderFormInputRockConfig extends SimpleRockConfig, RapidUploaderFormInputProps {
  // 使用 typeof ROCK_TYPE 确保类型安全
  $type: typeof RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE;
}
```

```typescript
// RapidUploaderFormInputMeta.ts
import { RockMeta } from "@ruiapp/move-style";
import { RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE } from "./rapid-uploader-form-input-types";

export default {
  // 引用 RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE 常量，避免硬编码字符串
  $type: RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE,

  propertyPanels: [],
} as RockMeta<typeof RAPID_UPLOADER_FORM_INPUT_ROCK_TYPE>;
```

对于继承其他 renderer 类型的情况：

```typescript
// rapid-currency-renderer-types.ts
import { RapidNumberRendererRockConfig } from "../rapid-number-renderer/rapid-number-renderer-types";

export interface RapidCurrencyRendererProps {
  value: string | number | null | undefined;
  currencyCode?: string;
}

export interface RapidCurrencyRendererRockConfig extends RapidCurrencyRendererProps, Omit<RapidNumberRendererRockConfig, "value"> {}
```

#### 1.2 Meta 文件定义 ({RockName}Meta.ts)

Meta 文件定义了 Rock 组件的元数据，包括类型、属性、事件等。

示例：

```typescript
import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { LABEL_ROCK_TYPE } from "./label-types";

export default {
  $type: LABEL_ROCK_TYPE,

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
    },
    // 引用通用属性
    ...CommonProps.TextStyleProps,
  },
} as RockMeta<typeof LABEL_ROCK_TYPE>;
```

### 2. 主组件文件 ({RockName}.tsx)

#### 2.1 导出 config 函数

增加并导出 `config{RockName}` 函数，用于类型安全的配置创建。注意使用 `RockComponentConfig` 包裹 Config 类型，并显式设置 `$type`：

```typescript
import { RockComponentConfig } from "@ruiapp/move-style";

export function configRapidDatePicker(config: RockComponentConfig<RapidDatePickerRockConfig>): RapidDatePickerRockConfig {
  config.$type = RapidDatePickerMeta.$type;
  return config as RapidDatePickerRockConfig;
}
```

#### 2.2 抽取并包装 React 组件

从 Rock.Renderer 中抽取并导出同名的 React 组件，使用 JSX 语法。

**重要原则**

- 阅读 [renderRock 用法文档](renderRock-usage.md)，理解`renderRock`以及相关函数的调用方法，以便理解原代码的渲染逻辑
- 如果原代码使用 `renderRock` 渲染 `antdTag`、`antdButton` 等 Rock，应改为直接导入并使用 Ant Design 的 `Tag`、`Button` 等组件
- 只有当组件必须嵌套其他动态 Rock 配置时，才考虑保留 `renderRock` 调用
- 组件 Props 使用 `RockComponentConfig<{RockName}RockConfig>`
- 使用 `useRockInstance` 获取 `$id` 等实例信息，注意传入第二个参数 `Meta.$type`
- 使用 `wrapToRockComponent` 将 React 组件包装为 Rock 组件并导出

```typescript
// ✅ 推荐：直接使用 antd 组件
import { Tag } from "antd";
import { RockComponentConfig } from "@ruiapp/move-style";
import { useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import RapidDictionaryEntryRendererMeta from "./RapidDictionaryEntryRendererMeta";

export function RapidDictionaryEntryRendererComponent(props: RockComponentConfig<RapidDictionaryEntryRendererRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, RapidDictionaryEntryRendererMeta.$type);
  const { value } = props;

  if (!value) {
    return null;
  }

  return <Tag color={value.color}>{value.name}</Tag>;
}

export const RapidDictionaryEntryRenderer = wrapToRockComponent(RapidDictionaryEntryRendererMeta, RapidDictionaryEntryRendererComponent);
```

#### 2.3 Rock 导出

对于渲染 React 组件的 Rock，导出默认对象时，Renderer 属性指向 React 组件：

```typescript
export default {
  Renderer: RapidDictionaryEntryRendererComponent,
  ...RapidDictionaryEntryRendererMeta,
} as Rock<RapidDictionaryEntryRendererRockConfig>;
```

### 3. 完整示例

#### rapid-date-picker 示例（使用 genRockRenderer）

```typescript
// rapid-date-picker-types.ts
import type { SimpleRockConfig } from "@ruiapp/move-style";

export interface RapidDatePickerProps {
  value?: string | moment.Moment | null;
  picker?: "year" | "month" | "date";
  showTime?: boolean;
  onChange?(value: string | null): void;
}

export interface RapidDatePickerRockConfig extends SimpleRockConfig, RapidDatePickerProps {}
```

```typescript
// RapidDatePicker.tsx
import { Rock, RockComponentConfig } from "@ruiapp/move-style";
import RapidDatePickerMeta from "./RapidDatePickerMeta";
import { useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import { RapidDatePickerProps, RapidDatePickerRockConfig } from "./rapid-date-picker-types";
import { DatePicker } from "antd";
import { isString } from "lodash";
import moment from "moment";

export function configRapidDatePicker(config: RockComponentConfig<RapidDatePickerRockConfig>): RapidDatePickerRockConfig {
  config.$type = RapidDatePickerMeta.$type;
  return config as RapidDatePickerRockConfig;
}

export function RapidDatePickerComponent(props: RockComponentConfig<RapidDatePickerRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, RapidDatePickerMeta.$type);

  let { value, onChange, picker, showTime } = props;

  if (isString(value)) {
    value = moment(value);
  }

  function handleChange(date: moment.Moment | null, dateString: string) {
    if (!onChange) return;
    if (!date) {
      onChange(null);
      return;
    }

    let formattedValue: string;
    switch (picker) {
      case "year":
        formattedValue = date.format("YYYY");
        break;
      case "month":
        formattedValue = date.format("YYYY-MM");
        break;
      default:
        formattedValue = showTime ? dateString : date.format("YYYY-MM-DD");
        break;
    }
    onChange(formattedValue);
  }

  return <DatePicker value={value as moment.Moment} onChange={handleChange} picker={picker} showTime={showTime} />;
}

export const RapidDatePicker = wrapToRockComponent(RapidDatePickerMeta, RapidDatePickerComponent);

export default {
  Renderer: RapidDatePickerComponent,
  ...RapidDatePickerMeta,
} as Rock<RapidDatePickerRockConfig>;
```

#### rapid-dictionary-entry-renderer 示例（使用 antd Tag 组件）

**重构前：**

```typescript
// RapidDictionaryEntryRenderer.tsx
import { Rock, RockConfig } from "@ruiapp/move-style";
import RapidDictionaryEntryRendererMeta from "./RapidDictionaryEntryRendererMeta";
import { RapidDictionaryEntryRendererRockConfig } from "./rapid-dictionary-entry-renderer-types";
import { renderRock } from "@ruiapp/react-renderer";

export default {
  $type: "rapidDictionaryEntryRenderer",

  Renderer(context, props: RapidDictionaryEntryRendererRockConfig) {
    const { value } = props;

    if (!value) {
      return null;
    }

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "antdTag",
      color: value.color,
      children: {
        $id: `${props.$id}-txt`,
        $type: "text",
        text: value.name,
      },
    } as RockConfig;

    return renderRock({ context, rockConfig });
  },

  ...RapidDictionaryEntryRendererMeta,
} as Rock;
```

**重构后：**

```typescript
// rapid-dictionary-entry-renderer-types.ts
import { SimpleRockConfig } from "@ruiapp/move-style";
import { RapidDataDictionaryEntry } from "@ruiapp/rapid-common";

export interface RapidDictionaryEntryRendererProps {
  value?: RapidDataDictionaryEntry;
}

export interface RapidDictionaryEntryRendererRockConfig extends SimpleRockConfig, RapidDictionaryEntryRendererProps {}
```

```typescript
// RapidDictionaryEntryRenderer.tsx
import { Rock, RockComponentConfig } from "@ruiapp/move-style";
import RapidDictionaryEntryRendererMeta from "./RapidDictionaryEntryRendererMeta";
import { RapidDictionaryEntryRendererProps, RapidDictionaryEntryRendererRockConfig } from "./rapid-dictionary-entry-renderer-types";
import { useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import { Tag } from "antd";

export function configRapidDictionaryEntryRenderer(config: RockComponentConfig<RapidDictionaryEntryRendererRockConfig>): RapidDictionaryEntryRendererRockConfig {
  config.$type = RapidDictionaryEntryRendererMeta.$type;
  return config as RapidDictionaryEntryRendererRockConfig;
}

export function RapidDictionaryEntryRendererComponent(props: RockComponentConfig<RapidDictionaryEntryRendererRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, RapidDictionaryEntryRendererMeta.$type);
  const { value } = props;

  if (!value) {
    return null;
  }

  return <Tag color={value.color}>{value.name}</Tag>;
}

export const RapidDictionaryEntryRenderer = wrapToRockComponent(RapidDictionaryEntryRendererMeta, RapidDictionaryEntryRendererComponent);

export default {
  Renderer: RapidDictionaryEntryRendererComponent,
  ...RapidDictionaryEntryRendererMeta,
} as Rock<RapidDictionaryEntryRendererRockConfig>;
```

#### rapid-currency-renderer 示例（纯渲染函数）

```typescript
// rapid-currency-renderer-types.ts
import { RapidNumberRendererRockConfig } from "../rapid-number-renderer/rapid-number-renderer-types";

export interface RapidCurrencyRendererProps {
  value: string | number | null | undefined;
  currencyCode?: string;
}

export interface RapidCurrencyRendererRockConfig extends RapidCurrencyRendererProps, Omit<RapidNumberRendererRockConfig, "value"> {}
```

```typescript
// RapidCurrencyRenderer.tsx
import { Rock, RockComponentConfig } from "@ruiapp/move-style";
import RapidCurrencyRendererMeta from "./RapidCurrencyRendererMeta";
import { RapidCurrencyRendererProps, RapidCurrencyRendererRockConfig } from "./rapid-currency-renderer-types";
import { isNull, isString, isUndefined } from "lodash";

export function configRapidCurrencyRenderer(config: RockComponentConfig<RapidCurrencyRendererRockConfig>): RapidCurrencyRendererRockConfig {
  config.$type = RapidCurrencyRendererMeta.$type;
  return config as RapidCurrencyRendererRockConfig;
}

export function RapidCurrencyRenderer(props: RockComponentConfig<RapidCurrencyRendererRockConfig>) {
  const { value, currencyCode, defaultText, conversionCoefficient, usingThousandSeparator, decimalPlaces, roundingMode } = props;

  let numValue = value;
  if (isUndefined(numValue) || isNull(numValue)) {
    return defaultText || "";
  }

  if (isString(numValue)) {
    numValue = parseFloat(numValue);
  }

  numValue = numValue / (conversionCoefficient || 1);

  const useGrouping = !!usingThousandSeparator;

  if (roundingMode !== "halfExpand" && decimalPlaces) {
    const powNum = Math.pow(10, decimalPlaces);
    if (roundingMode === "ceil") {
      numValue = Math.ceil(numValue * powNum) / powNum;
    } else if (roundingMode === "floor") {
      numValue = Math.floor(numValue * powNum) / powNum;
    }
  }

  return Intl.NumberFormat("Zh-cn", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces,
    useGrouping: useGrouping,
  }).format(numValue);
}

export default {
  $type: "rapidCurrencyRenderer",
  Renderer(context, props: RapidCurrencyRendererRockConfig) {
    return RapidCurrencyRenderer(props);
  },
  ...RapidCurrencyRendererMeta,
} as Rock;
```

## 注意事项

1. **命名规范**:

   - Props 类型: `{RockName}Props`
   - RockConfig 类型: `{RockName}RockConfig`
   - config 函数: `config{RockName}`
   - React 组件: `{RockName}`
   - {ROCK_NAME}\_ROCK_TYPE 常量: `{ROCK_NAME}_ROCK_TYPE` (定义在 types 文件中，统一使用此名称)

2. **类型继承**:

   - {RockName}Props **不需要**继承 `RockInstance`，仅包含业务属性即可
   - {RockName}RockConfig 继承 `SimpleRockConfig` 或者 `ContainerRockConfig` (当 `{RockName}Props` 包含 children 属性时)
   - {RockName}RockConfig 类型继承时，对父类型中已存在的字段，使用 `Omit` 排除重复定义

3. **wrapToRockComponent**:

   - 仅用于渲染 antd 组件或自定义 React 组件的场景
   - 纯渲染函数（返回字符串等）不需要使用

4. **Slots 处理**:

   当组件需要配置 slots（如 itemRenderer、separator 等）时，需要区分 Props 和 RockConfig 中的类型定义：

   - **{RockName}Props 中的 slot**: 应为 renderProp 函数类型，使用 `ReactNode` 作为返回值
   - **{RockName}RockConfig 中的 slot**: 应为 `RockConfig` 或 `ContainerRockConfig` 类型
   - **Meta 文件**: 需要配置 `toRenderProp: true` 和 `argumentNames`

   ```typescript
   // rapid-array-renderer-types.ts
   import type { ContainerRockConfig, RockConfig, SimpleRockConfig } from "@ruiapp/move-style";
   import type { ReactNode } from "react";

   export interface RapidArrayRendererProps {
     value?: any[] | null;
     // Props 中的 slot 是函数类型
     item?: (value: any, index: number) => ReactNode;
     separator?: () => ReactNode;
     listContainer?: (children: ReactNode[]) => ReactNode;
     itemContainer?: (children: ReactNode, value: any, index: number) => ReactNode;
   }

   export interface RapidArrayRendererRockConfig
     extends SimpleRockConfig,
       Omit<RapidArrayRendererProps, "item" | "separator" | "listContainer" | "itemContainer"> {
     // RockConfig 中的 slot 是 RockConfig 类型
     item?: RockConfig;
     separator?: RockConfig;
     listContainer?: ContainerRockConfig;
     itemContainer?: ContainerRockConfig;
   }
   ```

   ```typescript
   // RapidArrayRendererMeta.ts
   export default {
     $type: "rapidArrayRenderer",
     slots: {
       separator: {
         allowMultiComponents: false,
         required: false,
         toRenderProp: true, // 转换为 renderProp 函数
       },
       item: {
         allowMultiComponents: false,
         required: false,
         toRenderProp: true,
         argumentsToProps: true,
         argumentNames: ["value", "index"], // 函数参数名
       },
       itemContainer: {
         allowMultiComponents: false,
         required: false,
         toRenderProp: true,
         argumentsToProps: true,
         argumentNames: ["children", "value", "index"],
       },
       listContainer: {
         allowMultiComponents: false,
         required: false,
         toRenderProp: true,
         argumentsToProps: true,
         argumentNames: ["children"],
       },
     },
     // ...
   } as RockMeta<typeof RAPID_ARRAY_RENDERER_ROCK_TYPE>;
   ```

   ```typescript
   // RapidArrayRenderer.tsx
   export function RapidArrayRenderer(props: RockComponentConfig<RapidArrayRendererRockConfig>) {
     const { value, item, separator, noSeparator, listContainer, itemContainer } = props;

     if (!value || value.length === 0) {
       return null;
     }

     const items: ReactElement[] = [];

     for (let i = 0; i < value.length; i++) {
       const itemValue = value[i];

       // 渲染分隔符
       if (!noSeparator && i > 0) {
         if (separator) {
           items.push(<Fragment key={`sep-${i}`}>{separator()}</Fragment>);
         }
       }

       // 渲染项目 - 直接调用 slot 函数
       let itemElement = item(itemValue, i);

       // 使用 itemContainer 包裹
       if (itemContainer) {
         itemElement = itemContainer(itemElement, itemValue, i);
       }

       items.push(<Fragment key={i}>{itemElement}</Fragment>);
     }

     // 使用 listContainer 包裹整个列表
     if (listContainer) {
       return listContainer(items);
     }

     return <>{items}</>;
   }
   ```

5. **{ROCK_NAME}\_ROCK_TYPE 常量**:

   - 在 types 文件中定义 `export const {ROCK_NAME}_ROCK_TYPE = "rockName" as const;`
   - `{RockName}RockConfig` 接口中使用 `$type: typeof {ROCK_NAME}_ROCK_TYPE;`
   - Meta 文件中引用 `{ROCK_NAME}_ROCK_TYPE` 常量而非硬编码字符串
   - 优点：单一来源、类型安全、避免重复、便于重构

6. **在 React 组件中触发 RockEvent**:

   当需要在 React 组件中触发 Rock 事件（如通知事件、调用其他组件的动作等），使用 `fireEvent` 函数：

   ```typescript
   // 从 @ruiapp/move-style 导入 fireEvent
   import { fireEvent } from "@ruiapp/move-style";

   // 在 React 组件中获取 context
   export function MyRockComponent(props: RockComponentConfig<MyRockComponentProps>) {
     const context = useRockInstanceContext();
     const { framework, page, scope } = context;

     const handleClick = async () => {
       // 使用 fireEvent 触发事件
       await fireEvent({
         eventName: "onAction", // 事件名称
         framework, // 框架实例
         page, // 页面实例
         scope, // 作用域实例
         sender: props, // 发送者（当前组件）
         senderCategory: "component", // 发送者类别
         eventHandlers: [
           // 事件处理器配置数组
           {
             $action: "notifyEvent",
             eventName: "onNewEntityButtonClick",
           },
         ],
         eventArgs: [], // 事件参数
       });
     };

     return <Button onClick={handleClick}>点击</Button>;
   }
   ```

   **常见的事件处理器类型**:

   - `notifyEvent`: 通知作用域中的事件监听器
   - `sendComponentMessage`: 向指定组件发送消息
   - `setComponentProperty`: 设置组件属性
   - `script`: 执行脚本

   **完整示例 - SonicToolbarNewEntityButton**:

   ```typescript
   import type { Rock, RockInstance, RockComponentConfig } from "@ruiapp/move-style";
   import { fireEvent } from "@ruiapp/move-style";
   import SonicToolbarNewEntityButtonMeta from "./SonicToolbarNewEntityButtonMeta";
   import { useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
   import { SonicToolbarNewEntityButtonProps, SonicToolbarNewEntityButtonRockConfig } from "./sonic-toolbar-new-entity-button-types";
   import { RapidToolbarButton } from "../rapid-toolbar-button/RapidToolbarButton";
   import { getExtensionLocaleStringResource } from "../../helpers/i18nHelper";

   export function SonicToolbarNewEntityButtonComponent(props: RockComponentConfig<SonicToolbarNewEntityButtonProps>) {
     const context = useRockInstanceContext();
     const { framework, page, scope } = context;

     const handleAction = async () => {
       await fireEvent({
         eventName: "onAction",
         framework,
         page,
         scope,
         sender: props,
         senderCategory: "component",
         eventHandlers: [
           {
             $action: "notifyEvent",
             eventName: "onNewEntityButtonClick",
           },
         ],
         eventArgs: [],
       });
     };

     return (
       <RapidToolbarButton
         {...props}
         text={props.text || getExtensionLocaleStringResource(framework, "new")}
         actionEventName="onClick"
         onAction={handleAction}
       />
     );
   }

   export const SonicToolbarNewEntityButton = wrapToRockComponent(SonicToolbarNewEntityButtonMeta, SonicToolbarNewEntityButtonComponent);

   export default {
     Renderer: SonicToolbarNewEntityButtonComponent,
     ...SonicToolbarNewEntityButtonMeta,
   } as Rock<SonicToolbarNewEntityButtonRockConfig>;
   ```

7. **修复问题**:
   - 检查并修复拼写错误（如 `formatedValue` → `formattedValue`）
   - 确保导入的 Meta 类型和文件名一致

## 执行步骤

1. 读取指定文件夹中的代码
2. 分析当前 rock 组件的结构
3. 按照上述规则进行重构
4. 保存修改后的文件

## 再次强调

- 在理解原 `Rock.Renderer` 方法的功能后，再抽取并导出同名的 React 组件，使用 JSX 语法。
- 新组件应直接接收 `RockComponentConfig<{RockName}RockConfig>` 类型，不包含 `context` 参数
- 新组件的功能和原 `Rock.Renderer` 方法保持一致
- 如果原代码使用 `renderRock` 渲染 `antdTag`、`antdButton` 等 Rock，应改为直接导入并使用 Ant Design 的 `Tag`、`Button` 等组件
- 只有当组件必须嵌套其他动态 Rock 配置时，才考虑保留 `renderRock` 调用
- 使用 `wrapToRockComponent` 将 React 组件包装为 Rock 组件并导出
