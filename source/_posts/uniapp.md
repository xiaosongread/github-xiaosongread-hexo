---
title: uniapp 使用vue.js注意事项
categories: js-end
date: 2024-06-22 10:27:08
---

uni-app 在发布到H5时支持所有vue的语法；发布到App和小程序时，由于平台限制，无法实现全部vue语法。

相比Web平台， Vue.js 在uni-app中使用差异主要集中在两个方面：

+ 新增：uni-app 除了支持Vue实例的生命周期，还支持应用生命周期以及页面生命周期。
+ 受限：相比web平台，在小程序和App端部分功能受限，具体如下：

#### 全局配置
+ 非H5端不支持 Vue.config.devtools
+ 非H5端不支持 Vue.config.keyCodes
+ 非H5端不支持 Vue.config.performance

<!-- more -->

#### 全局API
+ 非H5端不支持 Vue.nextTick
+ 小程序不支持 Vue.directive
+ 小程序不支持 Vue.filter
+ 小程序不支持 Vue.compile

#### 选项
+ 非H5端不支持 el
+ 非H5端不支持 template
+ 非H5端不支持 render
+ 非H5端不支持 renderError
+ 小程序不支持 directives
+ 非H5端不支持 delimiters
+ 非H5端不支持 functional
+ 小程序不支持 model
+ 小程序不支持 inheritAttrs
+ 非H5端不支持 comments
#### 生命周期
+ 小程序端不支持 activated
+ 小程序端不支持 deactivated

#### 实例属性
+ 非H5端不支持 vm.$el
+ 小程序不支持 vm.$isServer
+ 小程序不支持 vm.$attrs
+ 小程序不支持 vm.$listeners

#### 实例方法
+ 非H5端不支持 vm.$mount()

#### 模板指令
+ 小程序不支持 v-html
+ 小程序不支持 v-pre
+ 非H5端不支持 v-cloak
+ 小程序不支持 v-once
+ 小程序不支持传入一个对象的所有property，即: v-bind="object"

#### 特殊属性
+ 小程序不支持 is
+ 非H5端不支持 classObject 和 styleObject 语法。
+ 非H5端（非自定义组件编译模式）暂不支持在自定义组件上使用Class与Style绑定。

#### 内置组件
+ 小程序不支持 component
+ 非H5不支持 transition
+ 非H5不支持 transition-group
+ 非H5不支持 keep-alive

#### CSS
+ 小程序不支持:root，应该使用 page；page 编译到H5会变成 uni-page-body 元素

#### 事件
+ vue3中移除了.native 修饰符，编译器无法预知 click 是要触发原生事件，还是组件的自定义事件，故并未转换成小程序的 tap 事件；故小程序端自定义组件无法监听click事件，需要在组件内部把click事件emit出去，或者只监听tap事件。

#### 其他
+ 小程序不支持 svg
+ 小程序不支持 多个根节点
+ 微信/QQ/百度/抖音小程序，自定义组件在渲染时会比App/H5端多一级节点
+ 小程序有虚拟节点的概念，有的小程序的自定义组件在渲染时会比App/H5多一级节点，通过 virtualHost 可以 设置是否需要这个虚拟节点；把 virtualHost 设为 false，再把 mergeVirtualHostAttributes 设为 true，就可以有贴近 vue 的开发体检。