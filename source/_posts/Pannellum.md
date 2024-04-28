---
title: Pannellum
categories: js-end
date: 2024-04-25 20:39:26
tags: vue js
---

Pannellum是一款基于WebGL和JavaScript的轻量级开源全景组件，能用作在网页端和移动端展示全景图片或者是全景视频。

官网地址: https://pannellum.org/
github地址: https://github.com/mpetroff/pannellum

<!-- more -->

### 特点
+ 支持不同类型的全景图(等角，部分，立方和多分辨率)
+ 轻量级、体积小(15k)
+ 基于WebGL和CSS 3D的渲染器
+ 全景标注(Hotspot)
+ 全景漫游(Tour)
+ 全景视频(Video)
+ 图片方向定位(罗盘)
+ 添加图片场景、作者信息
+ 无插件
+ 无框架
+ API
+ 压缩后仅21kB

### 兼容性
完全兼容：Firefox 10+ ，Chrome 15+，Safari 8+，Internet Explorer 11+，Edge。
不完全兼容（无法使用全屏功能）：Firefox 4+，Chrome 9+。
不兼容：Internet Explorer 10 及其早期版本。

### demo
<video src="/images/img-folder/2024/pull.mp4" controls="controls" width="500" height="300"></video>

### code

```html
<template>
  <div class="pannellum-box">
    <div id="vrBox">
      <!-- 上移 -->
      <!-- <div class="ctrl" @click="vr.setPitch(vr.getPitch() + 10)">&#9650;</div> -->
      <!-- 下移 -->
      <!-- <div class="ctrl" @click="vr.setPitch(vr.getPitch() - 10)">&#9660;</div> -->
      <!-- 左移 -->
      <!-- <div class="ctrl" @click="vr.setYaw(vr.getYaw() - 10)">&#9664;</div> -->
      <!-- 右移 -->
      <!-- <div class="ctrl" @click="vr.setYaw(vr.getYaw() + 10)">&#9654;</div> -->
      <!-- 放大 -->
      <!-- <div class="ctrl" @click="vr.setHfov(vr.getHfov() - 10)">&plus;</div> -->
      <!-- 缩小 -->
      <!-- <div class="ctrl" @click="vr.setHfov(vr.getHfov() + 10)">&minus;</div> -->
      <!-- 全屏 -->
      <!-- <div class="ctrl" @click="vr.toggleFullscreen()">&#x2922;</div> -->
    </div>
    <div class="tabs">
      <div class="tab" @click="changeScene('scene1')">客厅</div>
      <div class="tab" @click="changeScene('scene2')">主卧</div>
      <div class="tab" @click="changeScene('scene3')">次卧</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vr: null,
      list: [{
        url: '/web/examples/imgs/11.jpg',
        name: '客厅',
        // pitch属性代表热点的高度，其值从上（北极）到下（南极）范围在 -90 到 90 度之间。
        // yaw属性代表热点的方位，其值从左（西）到右（东）范围在 0 到 360 度之间。
        hotSpots: [
          // {
          //   'pitch': -12,
          //   'yaw': 170,
          //   'cssClass': 'custom-hotspot',
          //   'createTooltipFunc': this.hotspot,
          //   'createTooltipArgs': '场景1文字标注1'
          // },
          {
            'pitch': 0,
            'yaw': 0,
            'type': 'info',
            'text': '测试定位点（0,0）',
            clickHandlerFunc: () => {
              console.log('点击事件')
            }
          },
          {
            'pitch': -30,
            'yaw': -139,
            'type': 'scene',
            'cssClass': 'custom-hotspot',
            'createTooltipFunc': this.hotspot,
            'createTooltipArgs': '次卧',
            'sceneId': 'scene3'
          },
          {
            'pitch': -17,
            'yaw': -116,
            'type': 'scene',
            'cssClass': 'custom-hotspot',
            'createTooltipFunc': this.hotspot,
            'createTooltipArgs': '主卧',
            'sceneId': 'scene2'
          }
        ]
      }, {
        url: '/web/examples/imgs/22.jpg',
        name: '主卧',
        hotSpots: [
          {
            'pitch': -30,
            'yaw': 93,
            'type': 'scene',
            'text': '客厅',
            'cssClass': 'custom-hotspot',
            'createTooltipFunc': this.hotspot,
            'createTooltipArgs': '客厅',
            'sceneId': 'scene1'
          }
        ]
      }, {
        url: '/web/examples/imgs/33.jpg',
        name: '次卧',
        hotSpots: [
          {
            'pitch': -45,
            'yaw': -185,
            'type': 'scene',
            'cssClass': 'custom-hotspot',
            'createTooltipFunc': this.hotspot,
            'createTooltipArgs': '客厅',
            'sceneId': 'scene1'
          }
        ]
      }]
    }
  },
  watch: {

  },
  mounted() {
    this.getSceneList()
  },
  methods: {
    async getSceneList() {
      // const { data } = await this.$api.getSceneList()
      // this.list = data
      this.init(this.list)
    },
    // 初始化全景展示
    init(list) {
      if (!list.length) return
      const options = {}
      options.default = {
        type: 'equirectangular',
        'firstScene': 'scene1',
        // 设置切换持续时间
        'sceneFadeDuration': 3000,
        'autoLoad': true,
        'compass': true,
        'northOffset': 0
      }
      options.scenes = {}
      list.forEach((item, index) => {
        options.scenes['scene' + (index + 1)] = {
          title: item.name,
          panorama: item.url, // 全景展示图片的资源
          hotSpots: item.hotSpots
        }
      })
      this.vr = window.pannellum.viewer('vrBox', options)
      // this.vr = window.pannellum.viewer('vrBox', {
      //   'default': {
      //     'firstScene': 'scene1',
      //     // 设置切换持续时间
      //     'sceneFadeDuration': 3000,
      //     'autoLoad': true,
      //     'compass': true,
      //     'northOffset': 300
      //   },
      //   'scenes': {
      //     'scene1': {
      //       'title': '场景1',
      //       'panorama': '/web/examples/examplepano.jpg', // 全景展示图片的资源
      //       // 'author': '小宋',
      //       // 'preview': '/web/examples/examplepano.jpg', // 未点击进入全景预览前的展示图片
      //       'hotSpots': [{
      //         'pitch': -12,
      //         'yaw': 170,
      //         // 'type': 'info',
      //         // 'text': '场景1文字标注-1',
      //         'cssClass': 'custom-hotspot',
      //         'createTooltipFunc': this.hotspot,
      //         'createTooltipArgs': '场景1文字标注1'
      //         // 'image': '/web/examples/download.png'
      //       },
      //       {
      //         'pitch': -10,
      //         'yaw': -50,
      //         'type': 'info',
      //         'text': '场景1文字标注-2',
      //         'URL': 'https://github.com/mpetroff/pannellum'
      //       },
      //       {
      //         'pitch': 0,
      //         'yaw': -60,
      //         'type': 'scene',
      //         // 'text': '跳转场景2',
      //         'cssClass': 'custom-hotspot',
      //         'createTooltipFunc': this.hotspot,
      //         'createTooltipArgs': '跳转场景2',
      //         'sceneId': 'scene2'
      //       }]
      //     },
      //     'scene2': {
      //       'title': '场景2',
      //       'panorama': '/web/examples/examplepanocube0.jpg', // 全景展示图片的资源
      //       'hotSpots': [{
      //         'pitch': -12,
      //         'yaw': 170,
      //         'type': 'info',
      //         'text': '场景2文字标注-1'
      //       },
      //       {
      //         'pitch': -10,
      //         'yaw': -50,
      //         'type': 'info',
      //         'text': '场景2文字标注-2',
      //         'URL': 'https://www.baidu.com/'
      //       },
      //       {
      //         'pitch': 0,
      //         'yaw': -60,
      //         'type': 'scene',
      //         'text': '返回场景1',
      //         'sceneId': 'scene1'
      //       }]
      //     }
      //   }
      // })
    },
    // 手动切换不同的场景
    changeScene(id) {
      this.vr.loadScene(id)
    },
    // 自定义热点样式
    hotspot(hotSpotDiv, args) {
      console.log('打印', hotSpotDiv, args)
      hotSpotDiv.classList.add('custom-tooltip')
      var span = document.createElement('span')
      span.innerHTML = args
      hotSpotDiv.appendChild(span)
      span.style.width = '64px' // span.scrollWidth + 'px'
      span.style.textAlign = 'center'
      span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px'
      span.style.marginTop = -span.scrollHeight - 12 + 'px'
      var img = document.createElement('img')
      hotSpotDiv.appendChild(img)
      img.src = '/web/examples/download.png'
      img.style.width = '64px'
      img.style.height = '64px'
    }
  }
}
</script>

<style lang="scss" scoped>
.pannellum-box {
  width: 100%;
  height: 100%;
  position: relative;
  #vrBox {
    width: 100%;
    height: 100%;
  }
  .tabs {
    width: 220px;
    display: flex;
    gap: 10px;
    position: absolute;
    right: 50px;
    bottom: 10px;
    z-index: 999;
    .tab {
      width: 100px;
      height: 100px;
      background: red;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
::v-deep .custom-hotspot {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  span {
    background: rgba($color: #000000, $alpha: .6);
  }
}
</style>

```

### 重要的API
```js
this.vr = window.pannellum.viewer('vrBox', {
  'type': 'Equirectangular', // 全景展示图片方式（基本全景图配置） ①​Equirectangular 将球形的经度和纬度坐标 ②​圆柱投影 类似equirectangular，只是随着目标接近南北两极，纵向也会拉伸，两极会发生无限的纵向拉伸 ③​直线投影 主要优点在于，它把三维空间中的所有直线映射成二维网格上的直线。④​鱼眼投影 目标是创建一个扁平的网格，到该网格中心的距离大约是实际可视角度的正比关系，这样产生的图像类似于观看一个镜面的金属球。⑤​摩卡托投影 和圆柱以及equirectangular投影关系非常密切。⑥​正弦投影​目标是保持所有网格区域的面积。⑦​立体图投影​和鱼眼投影类似，但它通过随着目标远离透视中心，逐渐进行拉伸的方法，保持了更好的透视感。
  'showControls': false, // 是否显示控制按钮，默认true
  // "panorama": "img/27f75e791e1c7f88a1419e92429bd9e0.jpg", // 全景展示图片的资源
  'panorama': '/web/examples/examplepano.jpg', // 全景展示图片的资源
  'autoLoad': true, // 自动播放全景图
  // "autoRotateInactivityDelay":2000,// 点击屏幕后，两秒没有交互的话继续旋转
  // 'autoRotate': -20, // 每秒顺时针旋转两度
  'preview': '/web/examples/examplepano.jpg', // 未点击进入全景预览前的展示图片
  // 'title': '小宋测试标题', // 左下角会出现标题
  // 'author': '小宋', // 左下角会出现作者名字
  'compass': true, // 添加指南针
  'northOffset': 300, // 指定北偏移量
  // 在3d视角内以屏幕的方式展示图片，类似于vr影院中的电影屏幕
  // "haov": 160.87, //初始化水平
  // "vaov": 54.15, // 垂直视角。
  // "vOffset": 1.17, //初始垂直偏移角
  // 随着haov不断减小，相当于图片被不断压缩(如果图片可以再长一点，应该会更明显)，一屏所能展示的内容不断增多；
  // 随着haov不断增大，相当于图片被不断拉伸，一屏所能展示的内容不断减少。
  // voac是同理的，是不过改成了垂直方向。
  // vOffset：屏幕展示的形状，值越大越像个扇子
  // "hotSpotDebug": true,
  // hotSpots 热点，以全景为坐标系的固定点，可以设置链接跳转和点击事件，也可以跳转到不同的场景，该属性的值为对象，该对象有几个常用的配置项：
  // pitch 定位参数， 单位：角度 X轴（左耳到右耳）旋转（正数往上，负数往下）
  // yaw 定位参数， 单位：角度 y轴（从脚到头）旋转
  // type 热点类型，scene 场景切换热点； info 信息展示；
  // URL 以热点为链接，跳转到其他页面的`url
  // sceneId 需要切换的场景id，当 type 为 scene使用；
  'hotSpots': [
    {
      'pitch': -12,
      'yaw': 170,
      'type': 'info',
      'text': 'This is Jordan Pond, located in Acadia National Park.'
    },
    {
      'pitch': -10,
      'yaw': -50,
      'type': 'info',
      'text': 'This is a link.',
      'URL': 'https://github.com/mpetroff/pannellum'
    },
    {
      'pitch': 0,
      'yaw': -60,
      'type': 'scene',
      'text': 'Pond',
      'sceneId': 'pond'
    }
  ],
  'pond': {
    'title': 'Jordan Pond',
    'panorama': '/web/examples/examplepano.jpg',
    'hotSpots': [
      {
        'pitch': 0,
        'yaw': 100,
        'type': 'scene',
        'text': 'Pond (cube)',
        'sceneId': 'pondCube'
      }
    ]
  }
  // pitch是围绕X轴旋转
  // yaw是围绕Y轴旋转
  // roll是围绕Z轴旋转（从眼睛到后脑勺）
})
```

### 角度的设置
pitch 定位参数， 单位：角度 X轴（左耳到右耳）旋转（正数往上，负数往下）
yaw 定位参数， 单位：角度 y轴（从脚到头）旋转
type 热点类型，scene 场景切换热点； info 信息展示；

参考一下图片理解：

<img src="/images/img-folder/2024/jd.webp"> 

> 我觉得应该是可以通过设置px 像素来转化对应的角度的，但是这个转化过程我实在没有思路，所以在设置热点的定位只能手动的去试。