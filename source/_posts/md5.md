---
title: 加密算法介绍
categories: js-end
date: 2022-10-10 13:30:03
tags: js 加密
---

在信息安全越来越受重视的今天，前端的各种加密也变得更加重要。通常跟服务器的交互中，为保障数据传输的安全性，避免被人抓包篡改数据，除了 https 的应用，还需要对传输数据进行加解密。
### 目前常见的加密算法可以分成三类
1) 对称加密算法：AES、…

2) 非对称加密算法：RSA、…

3) Hash 算法：MD5、…
<!-- more -->

### 对称加密算法
对称加密(也叫私钥加密)指加密和解密使用相同密钥的加密算法。它要求发送方和接收方在安全通信之前，商定一个密钥。对称算法的安全性依赖于密钥，泄漏密钥就意味着任何人都可以对他们发送或接收的消息解密，所以密钥的保密性对通信的安全性至关重要。
#### 特点
* 优点：算法公开、计算量小、加密速度快、加密效率高。
* 缺点：在数据传送前，发送方和接收方必须商定好密钥，然后双方保存好密钥。如果一方的密钥被泄露，那么加密信息也就不安全了
* 使用场景：本地数据加密、https 通信、网络传输等
##### AES
AES：高级加密标准(Advanced Encryption Standard)为最常见的对称加密算法(微信小程序加密传输就是用这个加密算法的)。

<img src="/images/img-folder/2022/aes.png">

密钥：用来加密明文的密码。密钥为接收方与发送方协商产生，但不可以直接在网络上传输，否则会导致密钥泄漏，通常是通过非对称加密算法加密密钥，然后再通过网络传输给对方，或者直接面对面商量密钥。密钥是绝对不可以泄漏的，否则会被攻击者还原密文，窃取数据。
在项目中需要用到 AES 加密时，可以使用开源的 js 库：[crypto-js](https://github.com/brix/crypto-js)

```javascript
var CryptoJS = require('crypto-js');
var data = { id: 1, text: 'Hello World' };
// 加密生成密文
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_key_syb').toString();
// 解密得到明文
var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret_key_syb');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
```

### 非对称加密算法
非对称加密算法需要两个密钥：公开密钥（publickey:简称公钥）和私有密钥（privatekey:简称私钥）。公钥与私钥是一对，如果用公钥对数据进行加密，只有用对应的私钥才能解密。因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。
#### 特点
* 优点：非对称加密与对称加密相比其安全性更好
* 缺点：加密和解密花费时间长、速度慢，只适合对少量数据进行加密。
* 使用场景：https 会话前期、CA 数字证书、信息加密、登录认证等

#### RSA
RSA 加密算法是非对称加密算法最常见的一种。RSA 是 1977 年由 Ron Rivest、Adi Shamir 和 Leonard Adleman 一起提出的。RSA 就是他们三人姓氏开头字母拼在一起组成的。

<img src="/images/img-folder/2022/rsa.png">

在项目中需要用到 RSA 加密时，可以使用开源的 js 库：[jsencrypt](https://github.com/travist/jsencrypt)

```javascript
// 使用公钥加密
var publicKey = 'public_key_123';
var encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);
var encrypted = encrypt.encrypt('Hello World');
// 使用私钥解密
var privateKey = 'private_key_123';
var decrypt = new JSEncrypt();
decrypt.setPrivateKey(privateKey);
var uncrypted = decrypt.decrypt(encrypted);
```

### Hash 算法
Hash，一般翻译做“散列”，也有直接音译为“哈希”的，就是把任意长度的输入（又叫做预映射， pre-image），通过散列算法，变换成固定长度的输出，该输出就是散列值。这种转换是一种压缩映射，也就是，散列值的空间通常远小于输入的空间，不同的输入可能会散列成相同的输出，而不可能从散列值来唯一的确定输入值。

简单的说就是一种将任意长度的消息压缩到某一固定长度的消息摘要的函数。

#### 特点
+ 优点：不可逆、易计算、特征化
+ 缺点：可能存在散列冲突
+ 使用场景：文件或字符串一致性校验、数字签名、鉴权协议

#### MD5
MD5 是比较常见的 Hash 算法，对于 MD5 而言，有两个特性是很重要的，第一：明文数据经过散列以后的值是定长的；第二：是任意一段明文数据，经过散列以后，其结果必须永远是不变的。前者的意思是可能存在有两段明文散列以后得到相同的结果，后者的意思是如果我们散列特定的数据，得到的结果一定是相同的。

比如在登录时将密码进行 md5 加密再传输给服务器，服务器中的密码也是用 md5 加密后存储的，那么只要验证加密后的密文是否一致则可。

在项目中需要用到 MD5 加密时，可以使用开源的 js 库：[JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)
```javascript
// 使用公钥加密
var hash = md5('Hello World');
// b10a8db164e0754105b7a99be72e3fe5
```

### Base64 编码
Base64 编码只是一种编码格式并不是加密算法，它可用于在 HTTP 环境下传递较长的标识信息。

#### 特点
+ 可以将任意的二进制数据进行 Base64 编码
+ 数据加密之后，数据量会变大，变大 1/3 左右
+ 编码后有个非常显著的特点，末尾有个=号
+ 可进行反向解码
+ Base64 编码具有不可读性

现代浏览器都提供了 Base64 编码、解码方法，btoa() 和 atob()

```javascript
var enc = window.btoa('Hello World');
// SGVsbG8gV29ybGQ=
var str = window.atob(enc);
// Hello World
```

