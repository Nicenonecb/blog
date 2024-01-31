---
title: 'Tailwindcss Preflight'
date: '2024-01-30'
tag: 'tech'
---


## 起因

新起项目Nextjs + Tailwindcss + antd 发现Button组件的primary的颜色不显示，去github issue 没有发现这个问题，100%出自个人个例


## 原因

tailwind中preflight导致Button不显示,
preflight是一个重置样式表，它重置了所有基本HTML元素的样式，确保在应用自定义样式之前，这些元素在不同浏览器中的显示效果一致。Preflight还会移除列表元素的默认样式，将所有的边距设置为零，并将所有边框设置为0像素宽的实线边框。此外，它还会将图片和类似对象的显示属性设置为块级元素，而不是行内元素。使用preflight可以确保我们在应用自定义样式时具有对基本样式的完全控制。

## 解决方案
```javascript
//tailwind.config.js
corePlugins: {
  preflight: false,
},

```


```css
//globals.css

:where(.css-dev-only-do-not-override-1b0bdye).ant-btn-primary {
    background: #1677ff !important;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}
```