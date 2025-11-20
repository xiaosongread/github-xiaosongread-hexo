---
title: node 解决美团商品迁移抖音小店
categories: js-end
date: 2025-11-20 23:54:15
---

最近开了一家线上的鲜花店，我媳妇在美团上传了 1800 多件商品，大概耗时一周，我给他准备迁移到抖音小店，但是抖音后台居然没有批量上传，我发现最重要的几个字段是商品图片，名称，价格，所以：

1. 从美团获取商品列表，使用程序将所有的商品，图片，名称，价格等字段提取出来，生成 json 文件。
2. 将 josn 文件中的 url,filename,price,按照 filename-price 的格式，根据 url 下载下来。

#### 从美团后台页面，抓取 json 文件

<!-- more -->

```js
var elements = document.querySelectorAll(
  ".roo-tableNew-row.roo-tableNew-row-level-0"
);
var images = [];

elements.forEach(function (element) {
  // 安全地获取图片元素
  var imgElement = element.querySelector("img");
  // 安全地获取文本元素
  var textElement = element.querySelector(
    ".src-pages-ProductList-components-ProductTable-components-ProductInfo-Name-index_name span"
  );
  var price = element.querySelector(".src-components-UnitNumber-index_number");

  // 只有当两个元素都存在时才处理
  if (imgElement && textElement) {
    var imgSrc = imgElement.src;
    var textContent = textElement.textContent || textElement.innerText;
    var priceContent = price.textContent || textElement.innerText;

    var obj = {
      url: imgSrc,
      text: textContent,
      price: priceContent,
    };

    images.push(obj);
  }
});

console.log(JSON.stringify(images));
```

<img src="/images/img-folder/node1.jpg">

#### 将抓取的文件 按照指定的格式下载到本地文件夹中

```js
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// 图片数据数组
const imageData = [
  {
    url: "http://p0.meituan.net/shangouproductapi/1a819ba723050197535a538fe746c5d1414536.jpg@54w",
    text: "【健康常乐】1枝蓝绣球9枝粉玫瑰6枝白玫瑰混搭桔梗尤加利叶花束送妈妈送长辈生日鲜花花束",
    price: "99",
  },
  {
    url: "http://p0.meituan.net/shangouproductapi/6f20053c801c1a16140b02f807769b77216961.jpg@54w",
    text: "【美好祝福】10朵粉玫瑰桔梗绿菱草紫罗兰混搭鲜花送长辈送妈妈送领导送老师生日鲜花",
    price: "92",
  },
  {
    url: "http://p0.meituan.net/shangouproductapi/781b2018bc222463a8ff6b5099f44ec5243922.jpg@54w",
    text: "【暖居如意】17朵红玫瑰混搭8朵卡布奇诺玫瑰花抱抱桶花束生日鲜花礼物乔迁搬新家开业送朋友",
    price: "125",
  },
];
// 创建图片存储目录
const imageDir = "./downloaded_images";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// 下载图片函数
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    const file = fs.createWriteStream(dest);

    const request = protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`请求失败: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve(dest);
      });
    });

    request.on("error", (error) => {
      fs.unlink(dest, () => reject(error));
    });

    file.on("error", (error) => {
      fs.unlink(dest, () => reject(error));
    });
  });
}

// 生成安全的文件名
function generateSafeFilename(text, index) {
  // 移除特殊字符，保留中文和英文
  let safeName = text.replace(/[<>"/\\|?*\s]/g, "");
  // 截取前30个字符，避免文件名过长
  // safeName = safeName.substring(0, 30);
  // 由于原始数据中没有price字段，使用索引作为price的替代
  return `${safeName}-${index}.jpg`;
}

// 主函数
async function main() {
  console.log("开始下载图片...");
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < imageData.length; i++) {
    const item = imageData[i];
    const filename = generateSafeFilename(item.text, item.price);
    const destPath = path.join(imageDir, filename);

    try {
      await downloadImage(item.url, destPath);
      console.log(`下载成功: ${filename}`);
      successCount++;
    } catch (error) {
      console.error(`下载失败: ${item.url} - ${error.message}`);
      failCount++;
    }

    // 避免请求过于频繁
    if (i < imageData.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n下载完成!`);
  console.log(`成功: ${successCount} 张`);
  console.log(`失败: ${failCount} 张`);
}

// 运行程序
main().catch((error) => {
  console.error("程序执行出错:", error);
});
```

使用说明：

1. 将上述代码保存为 imageDownloader.js 文件
2. 在命令行中运行： node imageDownloader.js
3. 程序会自动创建 downloaded_images 文件夹并下载所有图片
4. 图片将按照 text-index.jpg 的格式命名（由于原始数据中没有价格字段，使用索引作为替代）
   注意事项：

- 代码会自动处理 http 和 https 协议
- 会过滤文件名中的特殊字符，确保文件名合法
- 限制了文件名长度，避免文件系统限制问题
- 添加了错误处理，即使某些图片下载失败，程序也会继续执行
- 设置了请求间隔，避免对服务器造成过大压力
  如果原始数据中有价格字段，可以将 generateSafeFilename 函数中的索引替换为价格即可。

<img src="/images/img-folder/node2.png">
