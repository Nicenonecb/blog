---
title: 'String可迭代协议及实现Number可迭代协议'
date: '2021-04-25'
tag: 'tech'
---


JavaScript 中，有一个名为 "迭代器协议" 的规范，允许对象定义或定制其迭代行为。这意味着可以使用 `for...of` 循环迭代这些对象。

而 "可迭代协议" 是构建在迭代器协议之上的，使得对象能够被 `for...of` 结构迭代。为了满足此协议，对象必须有一个名为 `Symbol.iterator` 的方法（通常标记为 `@@iterator`）。

### String 和 `@@iterator`

字符串是一个字符序列。经常的需求之一是能够遍历一个字符串的每一个字符。因此，为了使这一操作更为简单和直观，字符串实现了 `@@iterator` 方法。

示例：
```javascript
for (let char of 'hello') {
  console.log(char);  // 输出：h e l l o
}
```

### Number 和 `@@iterator`

数字是标量值，不是组合或集合。我们通常不会考虑“遍历”一个数字的所有部分，因为它是一个单一的、不可分的实体。因此，数字类型没有实现 `@@iterator` 方法，因为它没有明确的、普遍的用例需要这样做。

### Number实现可迭代协议

在这个对象上实现一个 `Symbol.iterator` 方法。这个方法需要返回一个迭代器对象，该对象有一个名为 `next` 的方法。`next` 方法在每次调用时都应该返回一个具有两个属性（`value` 和 `done`）的对象。


```javascript
Number.prototype[Symbol.iterator] = function() {
    let current = this;
    let digits = [];

    // 将数字的每一位存储到 digits 数组中
    while (current !== 0) {
        digits.push(current % 10);
        current = Math.floor(current / 10);
    }
    digits = digits.reverse(); // 使 digits 数组正序

    let index = 0;
    return {
        next() {
            if (index === digits.length) {
                return { done: true }; // 迭代完成
            }
            return { value: digits[index++], done: false };
        }
    };
};

for (let digit of 12345) {
    console.log(digit); // 输出：1 2 3 4 5
}

```

给 `Number.prototype` 添加了一个 `Symbol.iterator` 方法。这使得所有的数字都有了这个方法。此方法返回一个迭代器对象，它每次都迭代数字的下一位。

注意：直接修改内建对象的原型（如 `Number.prototype`）可能会导致与现有或未来代码的冲突


### 总结

不是所有对象类型都需要或应该实现可迭代协议。选择哪些对象类型应该实现它取决于语言设计者对如何最自然地使用该类型的看法。对于字符串，遍历其字符是有意义的，但对于数字，这样做通常没有意义。