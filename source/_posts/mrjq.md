---
title: 每日技巧
categories: jq-end
date: 2024-05-27 16:10:43
---

+ 1.模仿卡片翻转效果
+ 2.实现ChatGPT的文字输出效果

<!-- more -->

### 模仿卡片翻转效果
#### 效果
<video src="/images/img-folder/2024/mrjq/1.mp4" controls="controls" width="500" height="300"></video>

#### 实现
```html
<div class="card">
  <div class="front">前面内容</div>
  <div class="back">后面内容</div>
</div>
```

```css
.card {
  position: relative;
  width: 400px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.card:hover .front {
  transform: rotateY(-180deg);
}
.card:hover .back{
  transform: rotateY(0);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: 10px;
  backface-visibility: hidden;
  transition: all 1s ease;
}

.front {
  background-color: brown;
}

.back {
  background-color: darkcyan;
  transform: rotateY(180deg);
}
```
