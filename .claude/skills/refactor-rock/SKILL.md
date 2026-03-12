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

- **{RockName}Props**: 包含组件所需的业务属性（如 value、onChange 等），**不需要**继承 `RockInstanceProps`
- **{RockName}RockConfig**: 使用 `RockConfig` 或 `ContainerRockConfig` 泛型定义

示例：

```typescript
// anchor-types.ts
import type { ContainerRockConfig, RockConfig, RockEventHandler } from "@ruiapp/move-style";

export const ANCHOR_ROCK_TYPE = "anchor" as const;

export interface AnchorProps {
  className?: string;
  href?: string;
  target?: string;
  children?: RockConfig;
  onClick?: RockEventHandler;
}

export type AnchorRockConfig = ContainerRockConfig<AnchorProps, typeof ANCHOR_ROCK_TYPE>;
```

#### 1.1 {ROCK_NAME}\_ROCK_TYPE 常量定义

为避免 `$type` 字符串在多个文件中重复定义，应在 types 文件中定义 `{ROCK_NAME}_ROCK_TYPE` 常量，并在 `RockConfig` 泛型和 Meta 文件中引用。

#### 1.2 Meta 文件定义 ({RockName}Meta.ts)

Meta 文件定义了 Rock 组件的元数据，包括类型、属性、事件等。

示例：

```typescript
// AnchorMeta.ts
import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { ANCHOR_ROCK_TYPE } from "./anchor-types";

export default {
  $type: ANCHOR_ROCK_TYPE,

  props: {},
} as RockMeta<typeof ANCHOR_ROCK_TYPE>;
```

### 2. 主组件文件 ({RockName}.tsx)

#### 2.1 导出 config 函数

增加并导出 `config{RockName}` 函数，用于类型安全的配置创建。注意使用 `RockComponentProps` 包裹 Config 类型，并显式设置 `$type`：

```typescript
export function configAnchor(config: RockComponentProps<AnchorRockConfig>): AnchorRockConfig {
  config.$type = AnchorMeta.$type;
  return config as AnchorRockConfig;
}
```

#### 2.2 抽取并包装 React 组件

从 Rock.Renderer 中抽取并导出同名的 React 组件，使用 JSX 语法。

**重要原则**

- 阅读 [renderRock 用法文档](renderRock-usage.md)，理解`renderRock`以及相关函数的调用方法，以便理解原代码的渲染逻辑
- 如果原代码使用 `renderRock` 渲染 `antdTag`、`antdButton` 等 Rock，应改为直接导入并使用 Ant Design 的 `Tag`、`Button` 等组件
- 只有当组件必须嵌套其他动态 Rock 配置时，才考虑保留 `renderRock` 或 `renderRockChildren` 调用
- 组件 Props 使用 `RockInstanceProps<{RockName}RockConfig>`
- 使用 `useRockInstance` 获取 `$id` 等实例信息，注意传入第二个参数 `Meta.$type`
- 使用 `wrapToRockComponent` 将 React 组件包装为 Rock 组件并导出

```typescript
// Anchor.tsx
import { RockInstanceProps, fireEvent, CommonProps } from "@ruiapp/move-style";
import AnchorMeta from "./AnchorMeta";
import { AnchorRockConfig } from "./anchor-types";
import { renderRockChildren, useRockInstance, useRockInstanceContext } from "@ruiapp/react-renderer";
import React from "react";
import { pick } from "lodash";

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export function AnchorComponent(props: RockInstanceProps<AnchorRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, AnchorMeta.$type);
  const { onClick, href, target, children, className, $slot } = props;

  const style: React.CSSProperties = pick(props, boxStylePropNames) as any;

  return (
    <a
      data-component-id={$id}
      className={className}
      style={style}
      href={href}
      target={target}
      onClick={(e) => {
        fireEvent({
          eventName: "onClick",
          framework,
          page,
          scope,
          sender: props,
          eventHandlers: onClick,
          eventArgs: [e],
        });
      }}
    >
      {renderRockChildren({
        context,
        rockChildrenConfig: children,
        expVars: {
          $slot,
        },
        fixedProps: {
          $slot,
        },
      })}
    </a>
  );
}
```

#### 2.3 Rock 导出

对于渲染 React 组件的 Rock，导出默认对象时，Renderer 属性指向 React 组件：

```typescript
export const Anchor = wrapToRockComponent(AnchorMeta, AnchorComponent);

export default {
  Renderer: AnchorComponent,
  ...AnchorMeta,
} as Rock<AnchorRockConfig>;
```

### 3. 完整示例

#### Anchor 示例

```typescript
// anchor-types.ts
import type { ContainerRockConfig, RockConfig, RockEventHandler } from "@ruiapp/move-style";

export const ANCHOR_ROCK_TYPE = "anchor" as const;

export interface AnchorProps {
  className?: string;
  href?: string;
  target?: string;
  children?: RockConfig;
  onClick?: RockEventHandler;
}

export type AnchorRockConfig = ContainerRockConfig<AnchorProps, typeof ANCHOR_ROCK_TYPE>;
```

```typescript
// AnchorMeta.ts
import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { ANCHOR_ROCK_TYPE } from "./anchor-types";

export default {
  $type: ANCHOR_ROCK_TYPE,

  props: {},
} as RockMeta<typeof ANCHOR_ROCK_TYPE>;
```

```typescript
// Anchor.tsx
import { Rock, RockComponentProps, fireEvent, CommonProps, RockInstanceProps } from "@ruiapp/move-style";
import AnchorMeta from "./AnchorMeta";
import { AnchorRockConfig } from "./anchor-types";
import { renderRockChildren, useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import React from "react";
import { pick } from "lodash";

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export function configAnchor(config: RockComponentProps<AnchorRockConfig>): AnchorRockConfig {
  config.$type = AnchorMeta.$type;
  return config as AnchorRockConfig;
}

export function AnchorComponent(props: RockInstanceProps<AnchorRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, AnchorMeta.$type);
  const { onClick, href, target, children, className, $slot } = props;

  const style: React.CSSProperties = pick(props, boxStylePropNames) as any;

  return (
    <a
      data-component-id={$id}
      className={className}
      style={style}
      href={href}
      target={target}
      onClick={(e) => {
        fireEvent({
          eventName: "onClick",
          framework,
          page,
          scope,
          sender: props,
          eventHandlers: onClick,
          eventArgs: [e],
        });
      }}
    >
      {renderRockChildren({
        context,
        rockChildrenConfig: children,
        expVars: {
          $slot,
        },
        fixedProps: {
          $slot,
        },
      })}
    </a>
  );
}

export const Anchor = wrapToRockComponent(AnchorMeta, AnchorComponent);

export default {
  Renderer: AnchorComponent,
  ...AnchorMeta,
} as Rock<AnchorRockConfig>;
```

## 注意事项

1. **命名规范**:

   - Props 类型: `{RockName}Props`
   - RockConfig 类型: `{RockName}RockConfig`
   - config 函数: `config{RockName}`
   - React 组件: `{RockName}Component` (注意：Anchor 示例中使用了 `AnchorComponent`)
   - {ROCK_NAME}\_ROCK_TYPE 常量: `{ROCK_NAME}_ROCK_TYPE` (定义在 types 文件中，统一使用此名称)

2. **类型定义**:

   - {RockName}Props **不需要**继承 `RockInstanceProps`，仅包含业务属性即可
   - {RockName}RockConfig 使用 `RockConfig` 或 `ContainerRockConfig` (当 `{RockName}Props` 包含 children 属性时) 泛型定义
   - 当需要扩展 RockConfig 类型时，使用 intersection type (`&`) 而不是 `extends`

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
   import type { ContainerRockConfig, RockConfig } from "@ruiapp/move-style";
   import type { ReactNode } from "react";

   export const RAPID_ARRAY_RENDERER_ROCK_TYPE = "rapidArrayRenderer" as const;

   export interface RapidArrayRendererProps {
     value?: any[] | null;
     // Props 中的 slot 是函数类型
     item?: (value: any, index: number) => ReactNode;
     separator?: () => ReactNode;
     listContainer?: (children: ReactNode[]) => ReactNode;
     itemContainer?: (children: ReactNode, value: any, index: number) => ReactNode;
   }

   export type RapidArrayRendererRockConfig = RockConfig<
     Omit<RapidArrayRendererProps, "item" | "separator" | "listContainer" | "itemContainer"> & {
       // RockConfig 中的 slot 是 RockConfig 类型
       item?: RockConfig;
       separator?: RockConfig;
       listContainer?: ContainerRockConfig;
       itemContainer?: ContainerRockConfig;
     },
     typeof RAPID_ARRAY_RENDERER_ROCK_TYPE
   >;
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
   export function RapidArrayRenderer(props: RockInstanceProps<RapidArrayRendererRockConfig>) {
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
   - `{RockName}RockConfig` 类型定义中使用 `typeof {ROCK_NAME}_ROCK_TYPE` 作为泛型参数
   - Meta 文件中引用 `{ROCK_NAME}_ROCK_TYPE` 常量而非硬编码字符串
   - 优点：单一来源、类型安全、避免重复、便于重构

6. **在 React 组件中触发 RockEvent**:

   当需要在 React 组件中触发 Rock 事件（如通知事件、调用其他组件的动作等），使用 `fireEvent` 函数：

   ```typescript
   // Anchor.tsx
   // ...
   onClick={(e) => {
      fireEvent({
        eventName: "onClick",
        framework,
        page,
        scope,
        sender: props,
        eventHandlers: onClick,
        eventArgs: [e],
      });
   }}
   // ...
   ```

7. **修复问题**:

   - 检查并修复拼写错误（如 `formatedValue` → `formattedValue`）
   - 确保导入的 Meta 类型和文件名一致

8. **useRockInstance 使用时机**:

渲染组件时，不一定要调用 `useRockInstance`。在以下情况下可以调用 `useRockInstance` 以获取自身 `$id`：

- 如果组件渲染时需要渲染自身 `$id`
- 当需要指定下级Rock组件的 `$id`，以便后续向特定组件发送message

## 执行步骤

1. 读取指定文件夹中的代码
2. 分析当前 rock 组件的结构
3. 按照上述规则进行重构
4. 保存修改后的文件

## 再次强调

- 在理解原 `Rock.Renderer` 方法的功能后，再抽取并导出同名的 React 组件，使用 JSX 语法。
- 新组件应直接接收 `RockInstanceProps<{RockName}RockConfig>` 类型
- 新组件的功能和原 `Rock.Renderer` 方法保持一致
- 如果原代码使用 `renderRock` 渲染 `antdTag`、`antdButton` 等 Rock，应改为直接导入并使用 Ant Design 的 `Tag`、`Button` 等组件
- 只有当组件必须嵌套其他动态 Rock 配置时，才考虑保留 `renderRock` 或 `renderRockChildren` 调用
- 使用 `wrapToRockComponent` 将 React 组件包装为 Rock 组件并导出
