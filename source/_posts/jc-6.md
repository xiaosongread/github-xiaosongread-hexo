---
title: vue 组件之间通信
categories: gc-end
date: 2019-04-27 18:32:52
tags: vue 组件
---

vue 的组件在vue框架中是特别重要的一个环节，在大型的项目中，组件显的相当的重要，这样在后期特别好维护，一块内容就是一个组件，随时随地的删除和修改不同的组件，接下来我想写一篇vuex 集中管理状态，所以在之前先简单的介绍一下vue组件之间的相互传参方式。

```shell
父传子：Props
子传父：子：$emit(eventName)  父$on(eventName)
父访问子：ref
非父子组件通信:https://vuefe.cn/guide/components.html#非父子组件通信
vue2.0 移除：1.$dispatch() 2.$broadcast() 3.events
```

<!-- more -->
select.vue

```javascript
<template>
    <div class="select" id="app">
      <select-input @upup="setData" :msgfromfather="value"></select-input>
      <list v-if="showList" @getValue="getValueData"></list>
    </div>
</template>

<script>
import selectInput from '@/components/selectInput'
import list from '@/components/list'

export default{
  created(){

  },
  mounted(){

  },
  data(){
    return {
      showList: false,
      value:""
    }
  },
  computed: {

  },
  methods: {
    setData(msg) {
      this.showList = msg
    },
    getValueData(msg,msg1){
      console.log("触发了这个事件了:",msg,msg1)
      this.value = msg
      this.showList = msg1
    }
  },
  components: {
    selectInput,
    list
  }
}
</script>
```

selectInput.vue

```javascript
<template>
    <div class="selectInput">
      <input type="text" placeholder="请输入搜索关键字" class="searchInput" @click="up" :value="msgfromfather"/>
      <button class="searchBtn">搜索</button>
    </div>
</template>

<script>
export default {
  data(){
    return {
      showList: true
    }
  },
  created(){

  },
  props: ['msgfromfather'],
  computed: {},
  methods: {
    up() {
      this.$emit('upup',this.showList); //主动触发upup方法，
    }
  }
}
</script>
```

list.vue

```javascript
<template>
    <ul class="selectList">
      <li v-for="historyItem in history" @click="getData(historyItem)">{{historyItem}}</li>
    </ul>
</template>

<script>
export default {
  created(){
    //组件二接受
//    Hub.$on('change', (msg) => { //Hub接收事件
//      console.log(msg)
//    });
  },
  data() {
    return {
      hidden:false,
      history:['html','css','css3','js','vue','react','php','java']
    }
  },
  computed: {},
  methods: {
    getData(value){
      console.log(value)
      this.$emit('getValue',value,this.hidden); //主动触发upup方法，
    }
  }
}
</script>
```
## 以上例子主要使用了父子组件之间的相互传递

---

### 父传子：

父组件定义一个变量

```html
<select-input @upup="setData" :msgfromfather="value"></select-input>
```

子组件props接受并回显

```javascript
<input type="text" placeholder="请输入搜索关键字" class="searchInput" @click="up" :value="msgfromfather"/>
export default {
  data(){
    return {
      showList: true
    }
  },
  created(){

  },
  props: ['msgfromfather'],
  computed: {},
  methods: {
    up() {
      this.$emit('upup',this.showList); //主动触发upup方法，
    }
  }
}

```

### 子传父

子组件点击事件$emit触发父组件的事件，父组件事件中接受传递过来的数据

#### 子组件

```html
<li v-for="historyItem in history" @click="getData(historyItem)">{{historyItem}}</li>
methods: {
  getData(value){
    console.log(value)
    this.$emit('getValue',value,this.hidden); //主动触发upup方法，
  }
}
```

#### 父组件

```html
<list v-if="showList" @getValue="getValueData"></list>
getValueData(msg,msg1){
  console.log("触发了这个事件了:",msg,msg1)
  this.value = msg
  this.showList = msg1
}
```

> 1.2.3.0新增的语法糖2.这种就不涉及到通过方法去操控父组件中的data改变，而是利用子传父的思想，把props中的属性值和父组件中的data形成捆绑，利用$emit改变子组件的data，变相改变了父组件中的data

```javascript
<div id="app">
    {{count}}    <!--子组件用来传递父组件的方法-->
    <my-Com2 v-bind:parent-Count.sync = 'count'></my-Com2>
</div>

<template id="com">
    <!--在组件内部特意定义了一个触发父组件方法的点击事件-->
    <button @click="changeParent">操作父组件的子组件方法</button>
</template>

<script>
    let myCom2 = {        
        template:'#com',
        data(){            
        return {                
            title:'子组件',
            }
        },        
        // 父传子
        props:['parentCount'],        
        methods:{          
            // 用来专门触发父组件方法子组件，用来触发$emit
            changeParent(){                
                // 根据上面的介绍原则等号左面的属于子组件的右面属于父组件
                // 将父子组件data 都绑定在一起，改变子组件就是改变了父组件
                this.$emit('update:parentCount',1000)
            }
        },
    };    
    var vm = new Vue({        
        el: '#app',        
        data:{          
            count:0,
        },        
        components:{            
            // 在外部声明变量，使用代码简洁
            myCom2,
        }
    });
</script>
```

---

### 兄弟组件之间的通信

> 如果2个组件不是父子组件那么如何通信呢？这时可以通过eventHub来实现通信. 
所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.

```html
let Hub = new Vue(); //创建事件中心
```

组件1触发:   

```html
<div @click="eve"></div>methods: {
    eve() {
        Hub.$emit('change','hehe'); //Hub触发事件
    }
}
```

组件2触发:

```html
<div></div>
created() {
    Hub.$on('change', () => { //Hub接收事件        this.msg = 'hehe';
    });
}
```

这样就实现了非父子组件之间的通信了.原理就是把Hub当作一个中转站！