---
title: vue 兼容ueditor，图片上传，不依靠后端配合
categories: js-end
date: 2024-11-09 13:10:32
---

找了很多写过的文章，也具体试验过都写的不太完整，这款编辑器借用Vue提供的语法糖实现了数据的双向绑定，不用你自己去getContent或setContent。

对比其他的富文本编辑器，Ueditor的功能相对来说是最强的，对于在Vue中集成Ueditor想必还是有这个需求的。

下面具体说下如何在Vue中集成Ueditor以及在后端如何进行配置提供上传功能。

### 准备工作
#### 从Ueditor官网上下载Ueditor完整源码以及Jsp版本

目录结构：将下载好的Ueditor完整源码解压

<img src="/images/img-folder/2024/u1.jpg">

#### 开始安装 vue-ueditor-wrap 插件

```
npm install vue-ueditor-wrap --save
```

##### 创建公用组件
myUeditor.vue

```html
<template>
  <div>
    <input
      type="file"
      id="inputPic"
      class="icon-font icon-ai-up-img"
      accept="image/png, image/gif, image/jpeg"
      @change="update($event)" style="display:none;"/>
    <vue-ueditor-wrap
      ref="editor"
      @ready="ready"
      @beforeInit="addCustomButtom"
      v-model="contents"
      :config="myConfig">
    </vue-ueditor-wrap>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import request from '@/utils/request'
import {
  defaultMixins
} from '@/mixins/index.js'
export default {
  name: 'myUeditor',
  mixins: [defaultMixins],
  watch: {
    contents(newVal) {
      // this.$emit('update', newVal)
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    },
    value: {
      handler(newVal) {
        this.contents = newVal
      },
      deep: true
    }
  },
  props: {
    value: ''
  },
  data () {
    return {
      contents: this.value || '',
      ueditor:{},
      imageUrl: '',
      myConfig: {
        zIndex: 999999,//有层级问题可以设置zIndex
        initialFrameWidth: 820,
        initialFrameHeight: 600,

        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 420, // 初始容器高度
        initialFrameWidth: '100%', // 初始容器宽度
        UEDITOR_HOME_URL: '/UEditor/',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '/prod-api/common/upload',// `/prod-api/common/upload`,//后端配置的上传接口（接口返回配置只需要一个oobj，不需要外层内容）
        //上传图片地址
        // uploadUrl: process.env.VUE_APP_BASE_API + "/prod-api/common/upload",
        // UEDITOR_HOME_URL: process.env.NODE_ENV == 'test' ? '/kjyl-doctor-web/ue/' : process.env.NODE_ENV ==
            // 'production' ? '/syyx/ue/' : process.env.NODE_ENV == 'development' ? '/ue/' : '/kjyl-doctor-web/ue/',
        // UEDITOR_HOME_URL : process.env.NODE_ENV != 'development' || process.env.NODE_ENV != 'test'?'/syyx/ue/':'/ue/',
        // UEDITOR_HOME_URL: '/ue/',
        // UEDITOR_HOME_URL : '/syyx/ue/',
        token: 'Bearer ' + getToken(),
        toolbars: [
          [
            "fullscreen", "source", "|",
            "undo", "redo", "|",
            "bold", "italic", "underline", "fontborder", "strikethrough", "superscript", "subscript", "removeformat", "formatmatch", "blockquote", "pasteplain", "|",
            "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist", "selectall", "cleardoc", "|",
            "customstyle", "paragraph", "fontfamily", "fontsize", "|",
            "justifyleft", "justifycenter", "justifyright", "justifyjustify", "|",
            'emotion', "imagenone", "imageleft", "imageright", "imagecenter", "|",
            "horizontal", "date", "time", "|",
            'inserttable',
            // 'insertimage'
          ],
        ],
      },
    }
  },
  methods: {
    ready(instance) {
      this.ueditor = instance;
      console.log("instance", instance);
    },
    // 上传图片
    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      // let config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "Authorization": 'Bearer ' + getToken(),
      //    }
      // };
      // //添加请求头
      // this.$axios.post(process.env.VUE_APP_BASE_API + "/common/upload", param, config).then(response => {
      //   console.log('response', response)
      //   // this.imageUrl=response.data.data.realPath;
      //   // this.form.body=`<img src=${this.imageUrl}>`+this.form.body;
      // });
      let aa = request({
        url: "/common/upload",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": 'Bearer ' + getToken(),
        },
        method: 'post',
        data: param
      }).then(response => {
        this.ueditor.focus(); // 获取光标位置
        this.ueditor.execCommand("inserthtml", `<img src='${this.COS_HTTPS_EDIT + response.fileName}'>`);
      })
    },
    addCustomButtom(editorId) {
      window.UE.registerUI('test-button', function (editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
              execCommand: function () {
                  // editor.execCommand('inserthtml', `<img src='${this.imageUrl}'>`);
              }
          });
          // 创建一个 button
          var btn = new window.UE.ui.Button({
              // 按钮的名字
              name: uiName,
              // 提示
              title: '上传图片',
              // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
              cssRules: "background-position: -726px -77px;')",
              // 点击时执行的命令
              onclick: function () {
                  // 这里可以不用执行命令，做你自己的操作也可
                  // editor.execCommand(uiName);
                  document.getElementById('inputPic').click()
              }
          });
          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener('selectionchange', function () {
              var state = editor.queryCommandState(uiName);
              if (state === -1) {
                  btn.setDisabled(true);
                  btn.setChecked(false);
              } else {
                  btn.setDisabled(false);
                  btn.setChecked(state);
              }
          });
          // 因为你是添加 button，所以需要返回这个 button
          return btn;
      }, 100/* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */);
    },
  }
}
</script>

```

##### main.js

```js
import ueditor from '@/components/myUeditor'
Vue.component('ueditor', ueditor)
```

##### 引用使用
```html
<ueditor v-model="form.body" />
```