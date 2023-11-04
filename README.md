## Packages

- move-style: 前端低代码组件模型的核心包
- react-renderer: RUI低代码前端渲染器的React实现
- react-rocks: 基础RUI组件的React实现
- antd-extension: Antd组件的RUI封装
- designer-extension: RUI设计器使用到的RUI组件

## Get started

在 nodejs v18 环境下执行以下命令

```
pnpm libs
```

## Roadmap

本项目还在早期开发阶段，我们将在达成以下目标后发布 alpha 版。

- [ ] 实现配置运行时处理插件
- [ ] 实现用户访问控制，包括用户登录状态检查、用户操作权限控制等
- [ ] 完善表单组件
- [ ] 完善表格搜索组件
- [ ] 表格支持手动拖拽排序
- [x] 增加图表组件
- [ ] 完善 react player
  - [ ] 增加面包屑导航
  - [ ] 导航菜单高亮展示
  - [ ] remix兼容的页面跳转
- [ ] 增加 react native player

在达成以下目标后发布 beta 版。

- [ ] 增强开发调试体验：支持日志筛选，组件树查看，数据源管理
- [ ] 增加 app studio，实现应用实体模型、导航菜单、页面等模型可视化配置
- [ ] 将应用定义文件和运行器项目分离
