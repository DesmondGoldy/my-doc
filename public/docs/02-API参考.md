# API 参考

本系统提供以下核心 API。

## useDocs Hook

```typescript
const { docs, loading, error } = useDocs();
```

| 参数 | 类型 | 说明 |
|------|------|------|
| docs | Array | 文档列表 |
| loading | boolean | 加载状态 |
| error | Error | 错误信息 |

## 渲染组件

`MarkdownRenderer` 组件用于渲染 Markdown 内容。
