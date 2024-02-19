---
title: mathtype
categories: js-end
date: 2024-02-19 14:49:15
---

富文本编辑器集成数学公式的解决方案，并且在小程序中显示。

解决的问题： 1.直接用 latex 写公式，在小程序中直接显示。 2.富文本编辑数学公式，在小程序中显示。

<!-- more -->

### 一、katex 在小程序中显示

#### 原数据：

```
已知$f(x)$满足$\mathop {\lim }\limits_{x \to {\rm{1}}} \frac{{f\left( x \right)}}{{\ln x}} = 1$，则
```

#### 如何解析？

1.先将数据通过字符窜 `$` 进行分割，得到一个数组。 2.然后将数组中的每个元素如果是文字或者符号的话，给他定义为 chinese 类型，否则就是公式。 3.将 `chinese` 类型的元素通过 uv-parse 来渲染。 4.将 `formula` 类型的元素通过 rich-text 来渲染。 5.`formula` 类型的元素 通过 [katex-mini](https://github.com/xiaosongread/katex-mini) 来解析。

```js
mathFormulaFn(parsedString) {
  if (!parsedString) return
  let parsedArray = []
  if (parsedString.indexOf('<p>') == -1) {
    console.log('爬的数据')
    parsedArray = parsedString.split("$")
  } else {
    // parsedString = parsedString.replace(/<p>/g, '').replace(/<\/p>/g, '')
    console.log('富文本数据', parsedString)
    return parsedString
  }
  parsedArray = parsedArray.filter(item => item != '')
  var reg = /[\u4e00-\u9fa5\uff01-\uffff]/; // 定义中文的Unicode范围
  let arr = []
  if (parsedArray.length > 0) {
    parsedArray.forEach(item => {
      let obj = {}
      if (!reg.test(item)) { // 公式
        obj.type = 'formula'
        obj.nodes = parse(item, {
          throwError: true,
          displayMode: true,
        })
      } else {
        obj.type = 'chinese'
        obj.nodes = item
      }
      arr.push(obj)
    })
  }
  return arr
}
```

#### 渲染后的效果：

<img src="/images/img-folder/2024/1.jpg">

### 二、副文本编辑数学公式，在小程序中显示

#### 1.使用 MathJAX 插件

<img src="/images/img-folder/2024/2.png">

> 可以看到，这种方式对不熟悉 Latex 的人很不友善，直接 pass

#### 2.使用 wiris 的 MathType 插件

<img src="/images/img-folder/2024/3.png">

> 这种方式的最大缺点是 wiris 服务器在国外，光加载出来至少耗费 5 分钟时间，毫无用户体验可言，直接 pass

#### 3.在 tinymce 中嵌入 ueditor

<img src="/images/img-folder/2024/4.png">
<img src="/images/img-folder/2024/5.png">

毫无疑问，第 3 中方式最合适的解决方案

##### 问题解决

<img src="/images/img-folder/2024/6.png">
<img src="/images/img-folder/2024/7.png">

其中公式的识别是通过正则匹配来识别下面的代码来实现的

```
  <img src="{{生成的base64地址}}" data-latex="{{生成的latex代码}}">
```

##### 集成主要的几点

1.demo 的地址：http://tinymce.ax-z.cn/demos/demo-classic.php
2.tiny 编辑器的版本要在 5,我就是因为没有注意这一点，纠结了半天，最后才发现是版本的问题
文档：http://tinymce.ax-z.cn/more-plugins/kityformula-editor.php 3.报错：

```
Failed to load plugin: kityformula-editor from url plugins/kityformula-editor/plugin.min.js
```

解决方法：
在 public 文件夹下新建 tinymce 文件夹，在该文件夹下继续进新建 piugins 文件夹，将解压后的 kityformula-editor 文件夹放进去，修改里面的 plugin.js 和 plugin.min.js
找到里面的 baseUrl，修改为

```
var baseURL = '/tinymce/plugins/kityformula-editor/kityFormula.html';
```

然后在 tinymce 的配置（init）里添加

```
external_plugins: {
  'kityformula-editor': '/tinymce/plugins/kityformula-editor/plugin.min.js',
}
```

集成的参考文章：

[tinymce 富文本数学公式插件](https://blog.csdn.net/m0_73997007/article/details/127101630)
[vue 项目中富文本增加数学公式遇到的问题暨富文本的本地化](https://blog.csdn.net/hjin_/article/details/135526902)
[tinymce 中文文档](http://tinymce.ax-z.cn/more-plugins/kityformula-editor.php)

其他解决方案文档：
[mathType](https://demo.wiris.com/integrations/tinymce/?language=zh-tw)
[TinyCE 结合插件 MathType(wiris)](https://blog.csdn.net/qq_35008624/article/details/99081721)
[CKEditor](https://ckeditor.com/mathtype/#demo-mathtype)
