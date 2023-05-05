---
title: 一些关于使用axios的心得
categories: gc-end
date: 2022-11-12 13:30:03
tags: vscode github
---

### 带cookie请求
axios默认是请求的时候不会带上cookie的，需要通过设置withCredentials: true来解决。

#### 全局设置

<!-- more -->

```js
import axios from 'axios';
axios.defaults.withCredentials=true;
```

#### 局部设置
如不想全局设置，在需要传递 Cookie/Session 的 axios 请求中加入以下代码 "withCredentials:true" 即可。

```js
axios.get(url,  { params: val },{ withCredentials: true }).then(function (response) {}).catch(function (error) {});
```

设置完 "withCredentials:true" 后，你会发现还不能正常访问，因为启用 "withCredentials" 之后，服务器的响应头 "Access-Control-Allow-Origin" 不能设置为通配符 " * ",不然会一直报错。 需要后端改下请求头，这里以node为例：

```js
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
```

### 使post请求发送的是formdata格式数据

+ 首先必须设置请求头

```javascript
//可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
```

+ 其次再发送之前需要处理一下数据

```javascript
//可以通过这种方式给axios设置的默认请求头

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
// Do whatever you want to transform the data
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]
```

### 拦截器

```
你可以截取请求或响应在被 then 或者 catch 处理之前。

举个小例子：发ajax请求的时候需要有一个loading动画，而在请求回来之后需要把loading动画关掉，就可以使用这个拦截器来实现。
```

```js
//添加请求拦截器
axios.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})
 
//添加响应拦截器
axios.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})
 
//如果不想要这个拦截器也简单，可以删除拦截器
var myInterceptor = axios.interceptors.request.use(function () {/*...*/})
axios.interceptors.request.eject(myInterceptor)

```

### ps.另外附上自己在项目中使用axios的方式
```js
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getAuthInfo } from '@/utils/auth' //, getLocal
import router from '../router'

// 创建axios实例
const nocodeList = ['welthub/applet/getActivityQrCode']
const service = axios.create({
  timeout: 200000 // 请求超时时间
})
// 当前请求池剩余数量
let REQUEST_POOL_SIZE = 0

/**
 *有新的请求调用该方法，请求池数量+1，发出显示loading的事件
 */
function AddRequest() {
  REQUEST_POOL_SIZE += 1
  store.dispatch('ToggleLayoutLoading', true)
}
/**
 *请求结束，完成或者失败都要调用该方法，代表请求完成了一个，并且对请求池的剩余数量进项判断，小于0或者等于0的时候说明当前请求队列已经完成，发出隐藏loding的事件
 */
function RemoveRequest() {
  REQUEST_POOL_SIZE -= 1
  if (REQUEST_POOL_SIZE <= 0) {
    REQUEST_POOL_SIZE = 0
    setTimeout(() => {
      store.dispatch('ToggleLayoutLoading', false)
    }, 300)
  }
}

// request拦截器
service.interceptors.request.use(
  config => {
    var authInfo = getAuthInfo()
    if (authInfo) {
      config.headers = Object.assign({}, config.headers, authInfo)
    }
    if (config.headers.responseType) {
      config.responseType = config.headers.responseType
    }
    // config.headers.joinType = getLocal('joinType')
    // 在接口里边可以配置header的hideLoading，true,隐藏接口的显示loading界面
    if (!config.headers.hideLoading) {
      AddRequest()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    RemoveRequest()
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非1是抛错 可结合自己业务进行修改
     */
    // 隐藏loading
    RemoveRequest()
    const url = response.config.url
    const res = response.data
    const hasNocode = nocodeList.some(k => url.indexOf(k) > -1)
    if (hasNocode) {
      return res
    }
    res.code = Number(res.code)
    if (res.code !== 1) {
      // 4002:非法的token; 4003 oken 过期了token验证失败
      if (res.code === 4003 || res.code === 4004) {
        if (router.currentRoute.path !== '/login') {
          MessageBox.confirm(
            '你已被登出，可以取消继续留在该页面，或者重新登录',
            '确定登出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
      } else {
        Message({
          showClose: true,
          message: res.desc,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject()
    } else {
      return response.data
    }
  },
  error => {
    RemoveRequest()
    var errorMsg
    if (error.response) {
      const { data } = error.response
      const { errors, message } = data
      if (errors instanceof Array) {
        errorMsg = []
        errors.forEach(function(t) {
          errorMsg.push(t.defaultMessage)
        })
        errorMsg = errorMsg.join(',')
      } else if (errors instanceof Object) {
        errorMsg = errors.defaultMessage || message
      } else {
        errorMsg = data.error || message || data
      }
    } else {
      errorMsg = error.message
    }
    Message({
      message: errorMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
```
