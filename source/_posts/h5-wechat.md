---
title:  H5支付完整demo及问题总结
categories: gc-end
date: 2021-12-19 13:30:03
tags: 支付
---

#### 参考链接：https://pay.weixin.qq.com/wiki/doc/api/index.html

1.开通H5支付，注意：在申请时填写的域名必须和调起H5支付访问的页面一样！
2.跟小程序支付类似，拿到公众号的appId, 商户号、商户秘钥.

### H5支付采坑问题记录：
当所有参数准备好，并调用接口时，返回MWEB_URL如下：
MWEB_URL= https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx20161110163838f231619da20804912345&package=1037687096

访问该链接，出现以下错误：

<img src="/images/img-folder/2021/10.png">

原因：商户侧统一下单传的终端IP(spbill_create_ip)与用户实际调起支付时微信侧检测到的终端IP不一致导致的，

（在网上找了各种各样的方法，获取本地真实的ip，全都无效，问题依旧如此）
### 解决方法：要获取spbill_create_ip。在前端js中引入了搜狐的js库，
```
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
```

document.write(returnCitySN["cip"]+','+returnCitySN["cname"]);

这条语句即可拿到手机端的真实ip,returnCitySN["cip"]将该值作为参数传到后台，作为spbill_create_ip的值调起微信支付接口。

当前调起微信支付的域名和申请H5授权的域名不一致时会出现如下图所示：

<img src="/images/img-folder/2021/11.png">

原因：当前调起微信支付的域名和申请H5授权的域名不一致。
### 解决方法：将该项目放到域名服务器上，并使得调起支付的访问链接的域名和H5授权的域名一致！
1.解决以上两个问题后，不能在浏览其中访问返回的MWEB_URL，而是要通过前端类似于window.location.href=”MWEB_URL”去调用。
① 不能直接在手机微信端，必须在手机浏览器上调用。会提示“系统繁忙，请稍后再试”

<img src="/images/img-folder/2021/12.png">



