---
title: uni-table 支持微信小程序的 table 组件
categories: js-end
date: 2025-10-18 16:22:53
---

微信小程序端的 table 组件，支持列、合并行、列、横向滚动条的功能。

<!-- more -->

```html
<template>
  <view>
    <!-- 正常表格 -->
    <view class="s-table" v-if="!fixedAttrNum">
      <view class="s-table-row display-flex">
        <template v-if="className === 'header-fixed-1'">
          <block v-for="(item, index) in headerData" :key="index">
            <view
              v-if="!item.childrens"
              class="s-table-row-header s-table-row-item flex1 center"
            >
              {{ item.name }}
            </view>
            <view v-else class="s-table-row-header flex2 center">
              <view class="s-table-header-lists center">{{ item.name }}</view>
              <view class="s-table-fixed-header-children">
                <view
                  v-for="(item1, index1) in item.childrens"
                  :key="index1"
                  class="s-table-row-header s-table-row-item flex1 center"
                >
                  {{ item1.name }}
                </view>
              </view>
            </view>
            <!-- <view class="s-table-row-header flex2 center">
              <view class="s-table-header-lists center">B类</view>
              <view class="s-table-fixed-header-children">
                <view class="s-table-row-header s-table-row-item flex1 center">
                  单课
                </view>
                <view class="s-table-row-header s-table-row-item flex1 center">
                  单课
                </view>
              </view>
            </view> -->
          </block>
        </template>
        <template v-else>
          <view
            class="s-table-row-header s-table-row-item flex1 center"
            v-for="(item, index) in headerData"
            :key="index"
            >{{ item }}</view
          >
        </template>
      </view>
      <view :class="list.length ? 'list-box' : 'empty list-box'">
        <template v-if="list.length">
          <view
            class="s-table-row display-flex"
            v-for="(item, index) in list"
            :key="index"
          >
            <view
              class="s-table-row-con s-table-row-item flex1 center"
              v-for="(item1, index1) in headerAttr"
              :key="index1"
            >
              <template v-if="item1 === 'image'">
                <image :src="item[item1]" mode="scaleToFill" />
              </template>
              <view v-else-if="Array.isArray(item[item1])">
                <view
                  v-for="(item2, index2) in item[item1]"
                  :key="index2"
                  class="s-table-row-item-children-item center"
                >
                  <view v-if="item2 && item2 !=null">{{ item2}}</view>
                  <view v-else>--</view>
                </view>
              </view>
              <template v-else>
                <view v-if="item[item1] && item[item1] !=null"
                  >{{ item[item1]}}</view
                >
                <view v-else>--</view>
              </template>
            </view>
          </view>
        </template>
        <view v-else>暂无数据</view>
      </view>
    </view>
    <!-- 固定表头表格 -->
    <view class="s-table-1" v-else>
      <view class="s-table-row">
        <!-- <view style="height: 100%;background: #fff;position: relative;">
          <view
            v-for="(item,index) in list"
            :key="index"
            class="s-table-row-header s-table-row-item fixed center"
            v-if="index < fixedAttrNum"
          >{{ headerData[index] }}</view>
          <view
            v-for="(item,index) in list"
            :key="index"
            :class="[index === list.length - 1 ? 'last' : '', 's-table-row-item fixed center', 'fixed' + index]"
            :style="{top: listTop[index] + 'px', height: listHeight[index] + 'px'}"
          >{{ item[headerAttr[0]] }}</view>
        </view> -->
        <view class="scrollBox">
          <view class="box headerBox">
            <!-- v-if="index >= fixedAttrNum" -->
            <view
              v-for="(item,index) in headerData"
              :key="index"
              class="s-table-row-header s-table-row-item center"
              >{{ item }}</view
            >
          </view>
          <view :class="!list.length ? 'list-box empty' : 'list-box'">
            <template v-if="list.length">
              <view
                :class="[index === list.length ? 'last' : '', 'box con', 'con' + index]"
                v-for="(item,index) in list"
                :key="index"
              >
                <view
                  v-for="(item1,index1) in headerAttr"
                  :key="index1"
                  class="s-table-row-item center"
                >
                  <view v-if="item[item1] && item[item1] !=null"
                    >{{ item[item1]}}</view
                  >
                  <view v-else>--</view>
                </view>
              </view>
            </template>
            <view v-else>暂无数据</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "UniTableS",
    props: {
      headerData: {
        type: Array,
        default: () => [],
      },
      headerAttr: {
        type: Array,
        default: () => [],
      },
      list: {
        type: Array,
        default: () => [],
      },
      fixedArr: {
        type: Array,
        default: () => [],
      },
      fixedAttrNum: {
        type: Number,
        default: 0,
      },
      className: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        listHeight: [],
        listTop: [],
      };
    },
    onLoad() {},
    onShow() {},
    mounted() {
      if (this.fixedAttrNum > 0) {
        let _self = this;
        let fixedHeaderTop = 0;
        const query = uni.createSelectorQuery().in(_self);
        query
          .select(".headerBox")
          .boundingClientRect((data) => {
            fixedHeaderTop = data.height;
          })
          .exec();
        this.list.forEach((item, index) => {
          const query = uni.createSelectorQuery().in(_self);
          query
            .select(".con" + index)
            .boundingClientRect((data) => {
              _self.listHeight.push(data.height);
              if (index === 0) {
                _self.listTop.push(fixedHeaderTop);
              } else {
                _self.listTop.push(
                  _self.listHeight[index - 1] + _self.listTop[index - 1]
                );
              }
            })
            .exec();
        });
      }
    },
    methods: {
      // handleClick() {
      //   this.$parent.handEmit();
      // }
    },
  };
</script>

<style lang="scss">
  .list-box.empty {
    width: 100%;
    min-height: 160rpx;
    text-align: center;
    line-height: 160rpx;
    color: #909399;
    // position: absolute;
    // left: 0;
    // bottom: 0;
  }
  view {
    box-sizing: border-box;
  }
  .display-flex {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
  .flex2 {
    flex: 2;
  }
  .center {
    text-align: center;
  }
  .s-table-row-item {
    word-break: break-all;
  }
  .s-table {
    width: 100%;
    border: 2rpx solid rgba(153, 153, 153, 0.2);
    border-radius: 10rpx;
    overflow: hidden;
    .s-table-row-header {
      background: #f6f8fd;
      font-size: 24rpx;
      font-weight: 500;
      color: #333333;
      &:not(:last-child) {
        border-right: 2rpx solid rgba(153, 153, 153, 0.2);
      }
    }
    .s-table-header-lists {
      padding: 20rpx;
      border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
    }
    .s-table-fixed-header-children {
      display: flex;
      align-items: center;
    }
    .s-table-row {
      width: 100%;
      .s-table-row-item {
        padding: 20rpx 0rpx;
        &:not(:last-child) {
          border-right: 2rpx solid rgba(153, 153, 153, 0.2);
        }
        image {
          width: 44rpx;
          height: 44rpx;
        }
      }
      &:not(:last-child) {
        border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
      }
    }
    .s-table-row-item-children-item {
      padding: 20rpx 0;
      // 此元素不包括第一个和最后一个
      &:first-child {
        padding-top: 0rpx;
      }
      &:last-child {
        padding-bottom: 0rpx;
      }
      &:not(:last-child) {
        border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
      }
    }
  }

  .s-table-1 {
    font-size: 24rpx;
    // line-height: 24rpx;
    font-weight: 400;
    color: #333333;
    width: 100%;
    border: 2rpx solid rgba(153, 153, 153, 0.2);
    border-radius: 10rpx;
    .s-table-row-header {
      font-size: 24rpx;
      line-height: 24rpx;
      font-weight: 500;
      color: #333333;
      background: #f6f8fd !important;
      // border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
    }
    .s-table-row {
      width: 100%;
      display: flex;
      position: relative;
      .fixed {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        border-left: 0;
        // border-right: 2rpx solid rgba(153, 153, 153, 0.2);
        border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
        &.last {
          border-bottom: 0;
        }
      }
    }
    .scrollBox {
      width: 100%;
      overflow-x: scroll;
      .box {
        display: flex;
        width: max-content;
        &:not(:nth-of-type(0)),
        &:not(:nth-last-of-type(0)) {
          border-bottom: 2rpx solid rgba(153, 153, 153, 0.2);
        }
        &.last {
          border-bottom: 0 !important;
        }
      }
    }
    .s-table-row-item {
      width: 224rpx;
      padding: 20rpx 20rpx;
      background: #ffffff;
      border-left: 2rpx solid rgba(153, 153, 153, 0.2);
      // &:not(:first-child) {
      //   border-left: 2rpx solid rgba(153, 153, 153, 0.2);
      // }
    }
  }
</style>
```

```html
<template>
  <view class="table">
    <view class="tableM">
      <uni-table-s
        :list="listData"
        :headerData="headerData"
        :headerAttr="headerAttr"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        :list="listData1"
        :headerData="headerData"
        :headerAttr="headerAttr"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        className="header-fixed-1"
        :list="listData2"
        :headerData="headerData1"
        :headerAttr="headerAttr1"
      >
      </uni-table-s>
    </view>
    <view class="tableM">
      <uni-table-s
        :headerData="headerData2"
        :headerAttr="headerAttr2"
        :list="listData2"
        :fixedAttrNum="fixedAttrNum"
      ></uni-table-s>
    </view>
  </view>
</template>

<script>
  import uniTableS from "../components/uni-table-s/uni-table-s.vue";
  export default {
    data() {
      return {
        headerData: ["研究方向", "初试科目", "备注"],
        headerAttr: ["name", "list", "remark"],
        headerData1: [
          {
            name: "年份",
          },
          {
            name: "A类",
            childrens: [{ name: "单科(满分=100)" }, { name: "单科(满分>100)" }],
          },
          {
            name: "B类",
            childrens: [{ name: "单科(满分=100)" }, { name: "单科(满分>100)" }],
          },
        ],
        headerAttr1: ["name", "list", "age", "sex", "remark"],
        listData: [
          {
            name: "张三封",
            list: ["计算机网络", "计算机组成原理", "操作系统"],
            remark: "备注1",
          },
          {
            name: "李四",
            list: ["计算机网络", "计算机组成原理", "操作系统"],
            remark: "备注2",
          },
        ],
        listData2: [
          {
            name: "张三封",
            list: "bb",
            age: "2000000000000000000000",
            sex: "男",
            remark: "备注1",
          },
          {
            name: "李四",
            list: "cc",
            age: "20",
            sex: "男",
            remark: "备注2",
          },
        ],
        listData1: [
          {
            name: "张三封",
            list: "bb",
            age: "20",
            sex: "男",
            remark: "备注1",
          },
          {
            name: "李四",
            list: "cc",
            age: "20",
            sex: "男",
            remark: "备注2",
          },
        ],
        fixedAttrNum: 1, // 固定列的个数
        headerData2: ["排名", "姓名", "性别", "城市", "职业"], // 表头
        headerAttr2: ["id", "name", "sex", "city", "job"], // 对应表头的字段
        fixedArr2: ["id"], // 固定列的字段
        listData2: [
          {
            // 传参
            id: "网三",
            name: "张三张三张三张三张三张三",
            age: 12,
            sex: "男",
            job: "务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农务农",
            city: "北京",
          },
          {
            id: "网四",
            name: "00000000000000000000",
            age: 12,
            sex: "男",
            job: "务农",
            city: "北京",
          },
        ],
      };
    },
    components: { uniTableS },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .table {
    padding: 30rpx;
  }
  .tableM {
    margin-bottom: 20rpx;
  }
</style>
```

<img src="/images/img-folder/unitable.png">
