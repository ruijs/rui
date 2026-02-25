# renderRock 函数使用文档

## 概述

`renderRock` 是 `@ruiapp/react-renderer` 包提供的核心渲染函数，用于将 Rock 组件配置（`RockConfig`）渲染为 React 元素。它是 RUI（Rock UI）框架的基础渲染机制，支持表达式解析、状态管理、插槽渲染等高级特性。

## 导入方式

```typescript
import { renderRock, renderRockChildren, renderRockSlot } from "@ruiapp/react-renderer";
```

## 函数签名

### renderRock

```typescript
function renderRock(options: RenderRockOptions): React.ReactElement | null;
```

### 参数说明

#### RenderRockOptions

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `context` | `RockInstanceContext` | 是 | 渲染上下文，包含 framework、page、scope、logger |
| `rockConfig` | `RockConfig` | 是 | 组件配置对象，包含 $type、$id 等属性 |
| `expVars` | `Record<string, any>` | 否 | 表达式变量，用于 $exps 表达式计算 |
| `fixedProps` | `any` | 否 | 固定属性，会合并到 rockConfig 中，常用于传递 $slot |

#### RockInstanceContext

```typescript
type RockInstanceContext = {
  framework: Framework;    // 框架实例
  page: Page;              // 页面实例
  scope: Scope;            // 作用域实例
  logger: RuiRockLogger;   // 日志器
  component?: RockInstance; // 当前宿主组件（可选）
};
```

#### RockConfig

```typescript
type RockConfig = {
  $type: string;           // 组件类型（必填）
  $id?: string;            // 组件唯一标识
  $version?: string;       // 组件版本
  $name?: string;          // 组件名称
  $description?: string;   // 组件描述
  $exps?: RockExpsConfig;  // 属性表达式配置
  _hidden?: boolean;       // 是否隐藏
  [key: string]: any;      // 其他组件特定属性
};
```

## 渲染流程

`renderRock` 函数执行以下步骤：

1. **空值检查** - 如果 `rockConfig` 为 null 或 undefined，返回 null
2. **字符串处理** - 如果 `rockConfig` 是字符串，直接返回
3. **获取 Rock 元数据** - 从 framework 中获取组件定义
4. **组件实例管理** - 获取或初始化组件实例，附加到页面
5. **本地化配置** - 处理国际化属性
6. **配置处理器** - 执行注册的 beforeRockRender 钩子
7. **表达式解析** - 解析 `$exps` 中定义的表达式
8. **隐藏检查** - 如果 `_hidden` 为 true，返回 null
9. **插槽转换** - 将插槽配置转换为 React 属性
10. **创建 React 元素** - 使用 ComponentRenderer 创建最终元素

## 使用示例

### 基础用法

```typescript
import { renderRock } from "@ruiapp/react-renderer";
import type { RockInstanceContext, RockConfig } from "@ruiapp/move-style";

function MyComponent(context: RockInstanceContext, props: MyComponentProps) {
  const rockConfig: RockConfig = {
    $type: "button",
    $id: "myButton",
    text: "点击我",
    onClick: {
      $action: "notify",
      type: "success",
      message: "Hello World!"
    }
  };

  return renderRock({
    context,
    rockConfig,
  });
}
```

### 带表达式的渲染

```typescript
function MyComponent(context: RockInstanceContext, props: MyComponentProps) {
  const { scope } = context;

  const rockConfig: RockConfig = {
    $type: "text",
    $id: "displayText",
    $exps: {
      text: "$scope.vars.count + ' items'"
    }
  };

  return renderRock({
    context,
    rockConfig,
    expVars: {
      $scope: scope,
      customVar: "value"
    }
  });
}
```

### 传递插槽上下文

```typescript
function ListComponent(context: RockInstanceContext, props: ListProps) {
  const { framework, page, scope } = context;

  return (
    <div className="list-container">
      {props.items.map((item, index) => {
        const itemConfig: RockConfig = {
          $type: "listItem",
          $id: `item-${index}`,
          title: item.title,
        };

        return renderRock({
          context,
          rockConfig: itemConfig,
          fixedProps: {
            $slot: { item, index }  // 传递插槽上下文数据
          }
        });
      })}
    </div>
  );
}
```

## 相关辅助函数

### renderRockChildren

用于渲染子组件集合，支持数组、函数和单个配置。

```typescript
function renderRockChildren(options: RenderRockChildrenOptions): React.ReactNode;

type RenderRockChildrenOptions = {
  context: RockInstanceContext;
  rockChildrenConfig: RockChildrenConfig;  // RockConfig | RockConfig[] | Function
  expVars?: Record<string, any>;
  fixedProps?: any;
};
```

**示例：**

```typescript
import { renderRockChildren } from "@ruiapp/react-renderer";

function ContainerComponent(context: RockInstanceContext, props: ContainerProps) {
  return (
    <div className="container">
      {renderRockChildren({
        context,
        rockChildrenConfig: props.children,
        fixedProps: { $slot: props.$slot }
      })}
    </div>
  );
}
```

### renderRockSlot

用于渲染特定插槽，支持插槽元数据解析和参数传递。

```typescript
function renderRockSlot(options: RenderRockSlotOptions): React.ReactNode;

type RenderRockSlotOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;        // 宿主组件类型
  slotPropName: string;    // 插槽属性名
  args: any[];             // 传递给插槽的参数
  fixedProps?: any;
};
```

**示例：**

```typescript
import { renderRockSlot } from "@ruiapp/react-renderer";

function TableComponent(context: RockInstanceContext, props: TableProps) {
  return (
    <table>
      <tbody>
        {props.dataSource.map((record, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              {renderRockSlot({
                context,
                slot: props.renderCell,
                rockType: "table",
                slotPropName: "renderCell",
                args: [record, rowIndex],  // 传递行数据和索引
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### toRenderRockSlot

将插槽转换为渲染函数，适用于 render props 模式。

```typescript
function toRenderRockSlot(options: GenerateRockSlotRendererOptions): (...args: any[]) => React.ReactNode;
```

**示例：**

```typescript
import { toRenderRockSlot } from "@ruiapp/react-renderer";

function CustomComponent(context: RockInstanceContext, props: CustomProps) {
  const renderItem = toRenderRockSlot({
    context,
    slot: props.itemRender,
    rockType: "customList",
    slotPropName: "itemRender",
  });

  return (
    <ThirdPartyList
      items={props.items}
      renderItem={(item, index) => renderItem(item, index)}
    />
  );
}
```

## 完整组件示例

以下是一个完整的 Rock 组件实现，展示了 `renderRock` 和 `renderRockChildren` 的使用：

```typescript
import type { Rock, RockConfig } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";

export interface ShowProps {
  when: boolean;
  children: RockConfig[];
  fallback?: RockConfig[];
}

export default {
  $type: "show",

  slots: {
    fallback: {
      required: false,
      allowMultiComponents: true,
    },
  },

  Renderer(context, props: ShowProps) {
    let children;
    if (props.when) {
      children = props.children;
    } else if (props.fallback) {
      children = props.fallback;
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: children,
      fixedProps: { $slot: props.$slot },
    });
  },
} as Rock;
```

## 类型定义速查

```typescript
// 渲染选项
interface RenderRockOptions {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  expVars?: Record<string, any>;
  fixedProps?: any;
}

// 子组件渲染选项
interface RenderRockChildrenOptions {
  context: RockInstanceContext;
  rockChildrenConfig: RockConfig | RockConfig[] | ((options: RenderRockOptions) => React.ReactNode);
  expVars?: Record<string, any>;
  fixedProps?: any;
}

// 插槽渲染选项
interface RenderRockSlotOptions {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  args: any[];
  fixedProps?: any;
}

// Rock 组件定义
type Rock<TRockConfig = any, TRockState = any, TRockMessage = any> = {
  $type: string;
  Renderer: RockRenderer<TRockConfig, TRockState>;
  slots?: RockMetaSlots;
  // ... 其他元数据
};
```

## 最佳实践

1. **始终传递 context** - 确保 context 包含 framework、page、scope 和 logger
2. **使用 fixedProps 传递 $slot** - 保持插槽上下文在组件树中传递
3. **处理空值** - `renderRock` 会处理 null/undefined 配置，但建议在外层也做检查
4. **合理使用 expVars** - 只在需要时传递表达式变量，默认会自动注入 $scope
5. **组件 ID 唯一性** - 确保 $id 在页面范围内唯一，用于状态管理

## 注意事项

- `renderRock` 只能在 React 组件的渲染过程中调用
- 组件的 `$type` 必须在 framework 中注册，否则会抛出错误
- 表达式（`$exps`）在渲染时动态计算，可以访问 $scope 和其他 expVars
- `_hidden` 属性可以在渲染前动态控制组件显示/隐藏
