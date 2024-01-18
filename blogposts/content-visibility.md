---
title: 'content-visibility使用&性能优化&相关原理探究 - 附demo'
date: '2023-10-26'
tag: 'tech'
---

## content-visibility使用
    详见mdn 文档 https://developer.mozilla.org/zh-CN/docs/Web/CSS/content-visibility
    content-visibility: auto | visible | hidden | clip | unset | initial | inherit;
控制元素的可见性，这里的可见指的是浏览器原理的合成树上



## content-visibility性能优化场景

1. **延迟渲染非视口内容**：
    - 当元素设置为 `content-visibility: auto;` 时，任何不在视口内的内容都不会立即被渲染。相反，浏览器会延迟渲染这些内容，直到它们接近或进入视口。
    - 这意味着页面的初始加载和渲染只需要处理当前可见的内容，从而显著减少页面的加载时间和主线程的工作量。

2. **跳过不必要的样式和布局计算**：
    - 如果某个元素及其子元素被标记为 `content-visibility: hidden;`，则浏览器会跳过该元素的样式和布局计算，进一步提高性能。

3. **优化重排和重绘**：
    - 当页面的部分内容发生变化（例如，由于动画或用户交互），通常需要重新计算页面的布局。使用 `content-visibility` 可以减少这些重排和重绘的范围，因为浏览器知道它可以安全地忽略那些不在视口内的内容。

4. **使用`contain-intrinsic-size`提高占位体验**：
    - 当使用 `content-visibility: auto;` 时，你可以与 `contain-intrinsic-size` 属性一起使用，为不在视口内的内容提供估计的大小。这确保了页面的滚动行为仍然准确，即使部分内容尚未渲染。

5. **简化复杂页面的渲染流程**：
    - 对于复杂的页面，尤其是长列表或大型数据表，使用 `content-visibility` 可以避免一次性渲染大量内容。相反，只渲染用户当前可以看到的部分，从而提供更流畅的滚动和更快的响应时间。

`content-visibility` 并非适用于所有场景。例如，如果页面内容较少或不太复杂，使用此属性可能不会带来明显的性能改进。但是，对于复杂的页面或Web应用，正确使用此属性可以显著提高性能和用户体验。

## content-visibility可以被全文搜索的原理探究
   ###  为什么content-visibility可以被cmd+f搜素
区别于可视区域动态加载的虚拟列表，`content-visibility`的元素一直都在dom结构上，所以暂时判断因为在dom结构上所以cmd+F 可以搜索到，但是问题来了 
`display:none`的元素也在dom树结构上，所以进行试验
 ```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>content-visibility列表 + 搜索</title>
  <style>
    .box {
      height: 200px;
      overflow: auto;
      width: 200px;
    }

    .listItem {
      height: 20px;
      content-visibility: auto;
      contain-intrinsic-size: 20px 0;
    }

    .layout {
      display: flex;
    }

    .test1 {
      display: none;
    }

    .test2 {
      visibility: hidden;
    }
  </style>
</head>

<body>

  <div class="layout">
    <!-- <div class="box">
      <div id="listContainer"></div>
    </div> -->

    <div>
      <input type="text" id="searchInput2" placeholder="Search...">
      <div class="box">
        <div id="listContainer2"></div>
      </div>
    </div>
    <div class="test1">test1</div>
    <div class="test2">test2</div>
  </div>


  <script>
    const items = Array.from({ length: 10000 }, (_, i) => "ITEM " + (i + 1));

    const container = document.getElementById('listContainer2');
    const searchInput = document.getElementById('searchInput2');

    function renderList(filter = "") {
      container.innerHTML = "";  

      items
        .filter(item => !filter || item.includes(filter))
        .forEach(item => {
          const div = document.createElement('div');
          div.classList.add('listItem');
          div.innerText = item;
          container.appendChild(div);
        });
    }

    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value);
    });

    renderList();  

  </script>
</body>

</html> 
 ```
对比操作后，发现Cmd+F搜索的是最后cssom和dom合成的树，绘制树。

tips 虽然浏览器暂时不能直接观察到绘制树，但是`display:none`的字体会斜着展示
  