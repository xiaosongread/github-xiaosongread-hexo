---
title: video 常用api和播放器插件-vue
categories: js-end
date: 2019-10-30 10:04:21
---

1.[播放/暂停](#播放/暂停)   
2.[播放进度控制](#播放进度控制)   
3.[音量控制](#音量控制)   
4.[全屏控制](#全屏控制)   

<!-- more -->

<img src="/images/img-folder/video.png"> 

## 播放/暂停   
api：
```api
<!-- 语法 -->
audio|video.play()
<!-- 定义和用法 -->
play() 方法开始播放当前的音频或视频。
<!-- 实例 -->
var myVideo=document.getElementById("video1");
function playVid()
{
  myVideo.play();
}
function pauseVid()
{
  myVideo.pause();
}
```

```javascript
play () {
  if (!this.videoState.play) {
    this.videoState.play = true
    this.videoDom.play()
  } else {
    this.videoState.play = false
    this.videoDom.pause()
  }
},
```
## 播放进度控制   
api：
```api
<!-- 语法 -->
audio|video.duration
<!-- 定义和用法 -->
duration 属性返回当前音频/视频的长度，以秒计。   
如果未设置音频/视频，则返回 NaN (Not-a-Number)。   
```

```api
<!-- 语法 -->
audio|video.currentTime="seconds"
<!-- 定义和用法 -->
currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。   
当设置该属性时，播放会跳跃到指定的位置。   
```

```javascript
this.videoDom.addEventListener('loadedmetadata', () => { // 获取视频总时长
  console.log('时长', this.videoDom.duration)
  this.duration = this.timeTranslate(this.videoDom.duration)
})
this.videoDom.addEventListener('timeupdate', () => { // 监听视频播放过程中的时间
  if (!this.videoState.startPlay) this.videoState.startPlay = true
  const percentage = 100 * this.videoDom.currentTime / this.videoDom.duration
  this.videoPro.style.width = percentage + '%'
  this.videoPoint.style.left = percentage - 1 + '%'
  this.currentTime = this.timeTranslate(this.videoDom.currentTime)
})

timePrograssDown (ev) {
  this.timeStartL = this.videoYlPoint.offsetLeft
  this.timeMoveStartL = ev.pageX
  this.timeFlag = true
  console.log('开始')
},
timePrograssMove (ev) {
  if (!this.timeFlag) return
  const timeLineWidth = this.videoTimeLine.offsetWidth
  const timePointWidth = this.videoPoint.offsetWidth
  const moveNum = ev.pageX - this.timeMoveStartL
  if (moveNum < 0 || moveNum > (timeLineWidth - timePointWidth)) return
  this.videoPoint.style.left = moveNum + 'px'
  if (!moveNum) return
  this.videoDom.currentTime = this.videoDom.duration * (moveNum / timeLineWidth)
  this.currentTime = this.timeTranslate(this.videoDom.currentTime)
  // console.log('移动', this.duration, moveNum, timeLineWidth, this.duration * (moveNum / timeLineWidth))
},
timePrograssUp (ev) {
  this.timeFlag = false
}
```
## 音量控制  
api：
```api
<!-- 语法 -->
volumechange 事件在音频/视频（audio/video）的音量发生改变时触发。   
该事件被引用的情况:1)提高或降低音量   
2)静音或取消静音   
```

```api
<!-- 语法 -->
audio|video.volume=volumevalue   
规定音频/视频的当前音量。必须是介于 0.0 与 1.0 之间的数字。   
1)1.0 是最高音量（默认）   
2)0.5 是一半音量 （50%）   
3) 0.0 是静音
```

```javascript
this.videoDom.addEventListener('volumechange', () => {
  const percentage = this.videoDom.volume * 100
  console.log('yinliang', percentage)
})

handleVolPrograssDown (ev) {
  this.videoYlPointCurrent = ev.pageY
  this.ylMovePointStartY = this.videoYlPoint.offsetTop
  this.videoYlPointFlag = true
},
handleVolPrograssMove (ev) {
  if (!this.videoYlPointFlag) return
  const moveY = this.videoYlPointCurrent - ev.pageY
  this.videoYlPointTop = this.ylMovePointStartY - moveY
  if (this.videoYlPointTop > 90 || this.videoYlPointTop < 0) return
  this.videoYlPoint.style.top = this.videoYlPointTop + 'px'
  this.videoYlIng.style.height = (90 - this.videoYlPointTop) + 'px'
  this.videoDom.volume = ((90 - this.videoYlPointTop) / 100).toFixed(1)
},
handleVolPrograssUp (ev) {
  this.videoYlPointFlag = false
},
```
## 全屏控制   
```javascript
handleScreen () { // 全屏操作
  this.videoState.screenState = !this.videoState.screenState
  if (this.videoState.screenState) {
    this.fullScreen()
  } else {
    this.exitFullscreen()
  }
},
fullScreen () {
  let ele = document.documentElement
  if (ele.requestFullscreen) {
    ele.requestFullscreen()
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen()
  } else if (ele.webkitRequestFullScreen) {
    ele.webkitRequestFullScreen()
  }
  this.$refs['custom-video_container'].style.width = '100%'
  this.$refs['custom-video_container'].style.height = '100%'
},
exitFullscreen () {
  let de = document
  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  }
  this.$refs['custom-video_container'].style.width = '500px'
  this.$refs['custom-video_container'].style.height = '300px'
},
```

## 源码   
https://github.com/xiaosongread/vue-pc-cli

## 参考   
https://juejin.im/post/5daef8b6e51d4524e60e0f6a#heading-7   
https://github.com/yuelinghunyu/blog-demo/tree/master/video-player   

> 效果有点糙，优化空间还很大。