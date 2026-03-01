---
title: websoket.js
categories: js-end
date: 2026-01-21 17:30:20
---

Im 消息-公用文件

<!-- more -->

```js
// WebSocket相关变量声明
let accessToken = ""; // 用户访问令牌
let messageCallBack = null; // 消息接收回调函数
let closeCallBack = null; // 连接关闭回调函数
let connectCallBack = null; // 连接成功回调函数
let isConnect = false; // WebSocket连接状态
let rec = null; // 重连定时器引用
let lastConnectTime = new Date(); // 上次连接时间
let socketTask = null; // WebSocket任务对象
let wsurl = ""; // 保存ws地址用于重连
let reconnectTimer = null; // 重连定时器引用
let reconnectCount = 0; // 重连次数
const MAX_RECONNECT_COUNT = 10; // 最大重连次数
const RECONNECT_INTERVAL = 5000; // 重连间隔（毫秒）

/**
 * 建立WebSocket连接
 * @param {string} url - WebSocket服务器地址
 * @param {string} token - 用户访问令牌
 */
let connect = (url, token) => {
  wsurl = url; // 保存WebSocket地址
  accessToken = token; // 保存访问令牌

  // 如果已连接，则直接返回
  if (isConnect) {
    return;
  }

  heartCheck.clear(); // 清除之前的心跳检查
  lastConnectTime = new Date(); // 更新最后连接时间

  // 创建WebSocket连接
  socketTask = uni.connectSocket({
    url: wsurl,
    success: (res) => {
      console.log("WebSocket创建成功");
      isConnect = true; // 更新连接状态
      reconnectCount = 0; // 重置重连计数
    },
    fail: (e) => {
      console.log(e);
      console.log("WebSocket连接失败，10s后重连");
      // 连接失败时，10秒后重试
      setTimeout(() => {
        connect(wsurl, accessToken);
      }, 10000);
    },
  });

  // 监听连接打开事件
  socketTask.onOpen((res) => {
    console.log("WebSocket-监听连接打开事件");
    isConnect = true; // 更新连接状态
    reconnectCount = 0; // 重置重连计数

    // 发送登录命令
    let loginInfo = {
      cmd: 0, // 登录命令标识
      data: {
        accessToken: accessToken,
      },
    };

    socketTask.send({
      data: JSON.stringify(loginInfo),
    });
  });

  // 监听消息接收事件
  socketTask.onMessage((res) => {
    let sendInfo = JSON.parse(res.data); // 解析接收到的消息

    if (sendInfo.cmd == 0) {
      // 登录成功命令
      heartCheck.start(); // 开始心跳检查
      connectCallBack && connectCallBack(); // 调用连接成功回调
      console.log("WebSocket登录成功");
    } else if (sendInfo.cmd == 1) {
      // 心跳响应命令
      // 重新开启心跳定时
      heartCheck.reset();
    } else {
      // 其他消息转发出去
      console.log("websocket-接收到消息", sendInfo);
      messageCallBack && messageCallBack(sendInfo.cmd, sendInfo.data);
    }
  });

  // 监听连接关闭事件
  socketTask.onClose((res) => {
    console.log("WebSocket-onClose-连接关闭", res);
    isConnect = false; // 更新连接状态
    socketTask = null; // 清空引用
    closeCallBack && closeCallBack(res); // 调用连接关闭回调

    // 如果不是正常关闭（代码不是1000），则尝试重连
    if (res.code !== 1000 && wsurl) {
      handleReconnect();
    }
  });

  // 监听连接错误事件
  socketTask.onError((e) => {
    console.log("ws-错误-onError:", e);
    close(1006); // 关闭连接，错误代码1006表示异常关闭
    isConnect = false; // 更新连接状态
    socketTask = null; // 清空引用
    closeCallBack && closeCallBack(e); // 调用连接关闭回调
  });
};

/**
 * WebSocket重连函数 在app.vue中调用了，当有了登录信息的时候调用
 * @param {string} wsurl - WebSocket服务器地址
 * @param {string} accessToken - 用户访问令牌
 */
let reconnect = (wsurl, accessToken) => {
  // 如果有未关闭的连接，先关闭它
  if (socketTask) {
    socketTask.close(3099); // 3099为自定义关闭代码，表示重连关闭
  }
  console.log("尝试重新连接");

  // 如果已连接，则不再重连
  if (isConnect) {
    return;
  }

  // 计算距离上次连接的时间差，确保至少间隔10秒重连，避免频繁重连
  let timeDiff = new Date().getTime() - lastConnectTime.getTime();
  let delay = timeDiff < 10000 ? 10000 - timeDiff : 0;

  // 清除之前的重连定时器
  rec && clearTimeout(rec);

  // 设置新的重连定时器
  rec = setTimeout(function () {
    connect(wsurl, accessToken); // 执行连接操作
  }, delay);
};

/**
 * 关闭WebSocket连接
 * @param {number} code - 关闭代码（参考WebSocket规范）
 */
let close = (code) => {
  // 如果未连接或没有socketTask，则直接返回
  if (!isConnect || !socketTask) {
    return;
  }

  // 关闭WebSocket连接
  socketTask.close({
    code: code, // 关闭代码
    complete: (res) => {
      // 关闭完成回调
      isConnect = false; // 更新连接状态
      socketTask = null; // 清空socketTask引用
      heartCheck.clear(); // 清除心跳检查
      console.log("关闭websocket连接");
    },
    fail: (e) => {
      // 关闭失败回调
      console.log("关闭websocket连接失败", e);
      isConnect = false; // 更新连接状态
      socketTask = null; // 清空socketTask引用
    },
  });
};

/**
 * WebSocket心跳机制管理对象
 * 用于维持WebSocket连接的稳定性，定期发送心跳包并监听响应
 */
let heartCheck = {
  timeout: 20000, // 心跳发送间隔（毫秒），这里设置为20秒
  timeoutObj: null, // 心跳定时器引用

  /**
   * 发送心跳包
   * 只有在连接状态下才发送心跳
   */
  start: function () {
    if (isConnect) {
      // console.log('发送WebSocket心跳')
      // 构造心跳消息
      let heartBeat = {
        cmd: 1, // 心跳命令标识
        data: {}, // 心跳数据，可为空
      };
      // 发送心跳消息
      sendMessage(JSON.stringify(heartBeat));
    }
  },

  /**
   * 重置心跳定时器
   * 当接收到服务器消息时调用，避免误判连接断开
   */
  reset: function () {
    clearTimeout(this.timeoutObj); // 清除现有定时器
    // 设置新的定时器，在指定时间后再次发送心跳
    this.timeoutObj = setTimeout(() => heartCheck.start(), this.timeout);
  },

  /**
   * 清除心跳定时器
   * 当连接关闭或需要停止心跳时调用
   */
  clear: function () {
    clearTimeout(this.timeoutObj); // 清除定时器
    this.timeoutObj = null; // 清空定时器引用
  },
};

/**
 * 处理WebSocket重连逻辑
 * 实现指数退避策略，避免频繁重连，并限制最大重连次数
 */
function handleReconnect() {
  // 检查是否达到最大重连次数
  if (reconnectCount >= MAX_RECONNECT_COUNT) {
    console.error("达到最大重连次数，停止重连");
    return;
  }

  // 增加重连次数
  reconnectCount++;
  // 计算重连延迟时间（指数退避策略），最大不超过30秒
  const delay = Math.min(RECONNECT_INTERVAL * reconnectCount, 30000);

  console.log(`${reconnectCount}秒后尝试第${reconnectCount}次重连...`);

  // 清除之前的重连定时器
  clearTimeout(reconnectTimer);

  // 设置新的重连定时器
  reconnectTimer = setTimeout(() => {
    // 只有在未连接且有WebSocket地址时才尝试重连
    if (!isConnect && wsurl) {
      console.log(`开始第${reconnectCount}次重连`);
      connect(wsurl, accessToken); // 执行连接操作
    }
  }, delay);
}

/**
 * 发送WebSocket消息
 * @param {string|object} message - 要发送的消息，可以是字符串或对象
 * @returns {boolean} - 消息发送是否成功
 */
let sendMessage = (message) => {
  // 检查连接状态和socketTask是否存在
  if (!isConnect || !socketTask) {
    console.error("WebSocket未连接，消息发送失败");
    return false;
  }

  try {
    // 发送消息
    socketTask.send({
      // 如果消息是对象，则转换为JSON字符串
      data: typeof message === "object" ? JSON.stringify(message) : message,
      success: () => {
        isConnect = true; // 更新连接状态
        console.log("消息发送成功", message);
        return true;
      },
      fail: (err) => {
        isConnect = false; // 更新连接状态
        console.error("消息发送失败:", err);
        // 发送失败时尝试重连
        handleReconnect();
        return false;
      },
    });
  } catch (error) {
    console.error("消息发送异常:", error);
    return false;
  }
};

/**
 * 设置WebSocket连接成功回调函数
 * @param {function} callback - 连接成功时触发的回调函数
 */
let onConnect = (callback) => {
  connectCallBack = callback;
};

/**
 * 设置WebSocket消息接收回调函数
 * @param {function} callback - 接收消息时触发的回调函数，参数为(cmd, data)
 */
let onMessage = (callback) => {
  messageCallBack = callback;
};

/**
 * 设置WebSocket连接关闭回调函数
 * @param {function} callback - 连接关闭时触发的回调函数，参数为关闭原因
 */
let onClose = (callback) => {
  heartCheck.clear();
  closeCallBack = callback;
};

/**
 * 获取WebSocket连接状态
 * @returns {boolean} - 当前连接状态，true表示已连接，false表示未连接
 */
let getConnectStatus = () => {
  return isConnect;
};

// 导出方法
export {
  connect,
  reconnect,
  close,
  sendMessage,
  onConnect,
  onMessage,
  onClose,
  getConnectStatus,
  isConnect,
};
```
