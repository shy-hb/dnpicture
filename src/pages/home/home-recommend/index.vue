<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommend.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <navigator
        v-for="item in recommend"
        :key="item.id"
        class="recommend_item"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 推荐结束 -->

    <!-- 月份开始 -->
    <view class="months_wrap">
      <view class="months_title_wrap">
        <view class="months_title_info">
          <view class="months_info">
            <text> {{ months.MM }} / </text>
            {{months.DD}}
          </view>
          <view class="months_text"> {{ months.title }} </view>
        </view>
        <view class="months_more">更多 ></view>
      </view>
      <view class="months_content">
        <view
          v-for="(item, index) in months.items"
          :key="item.id"
          class="months_item"
        >
          <get-detail :list="months.items" :index="index">
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            ></image>
          </get-detail>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->

    <!-- 热门 开始 -->
    <view class="hots_wrap">
      <view class="hots_title"><text>热门</text></view>
      <view class="hots_content">
        <view v-for="(item, index) in hots" :key="item.id" class="hots_item">
          <get-detail :list="hots" :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </get-detail>
        </view>
      </view>
    </view>
    <!-- 热门 结束 -->
  </scroll-view>
</template>

<script>
import moment from "moment";

import GetDetail from "@/components/getDetail";
export default {
  components: {
    GetDetail,
  },
  data() {
    return {
      recommend: [],
      months: [],
      hots: [],
      params: {
        // 获取几条
        limit: 30,
        // 关键字
        order: "hot",
        // 跳过几条
        skip: 0,
      },
      isMore: true,
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "首页",
    });
    // 请求数据
    this.getList();
  },
  methods: {
    // 获取数据
    getList() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params,
      }).then((res) => {
        // console.log(res.res);
        if (res.res.vertical.length === 0) {
          this.isMore = false;
          return;
        }
        if (this.recommend.length === 0) {
          this.recommend = res.res.homepage[1].items;
          this.months = res.res.homepage[2];
          // 月份转化
          this.months.MM = moment(this.months.stime).format("MM");
          this.months.DD = moment(this.months.stime).format("DD");
        }
        // 热门
        // 拼接数组
        this.hots = [...this.hots, ...res.res.vertical];
        // console.log(this.hots);
      });
    },
    handleToLower() {
      if (this.isMore) {
        // 1.修改参数
        this.params.skip += this.params.limit;
        // 2.发送请求
        this.getList();
        // 3.hots数组累加
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommend_view {
  height: calc(100vh - 45px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.months_title_wrap {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  padding: 20rpx;
  .months_title_info {
    display: flex;
    .months_info {
      font-size: 30rpx;
      color: $color;
      text {
        font-size: 36rpx;
      }
    }

    .months_text {
      font-size: 36rpx;
      color: #666;
      margin-left: 30rpx;
    }
  }

  .months_more {
    color: $color;
    font-size: 25rpx;
  }
}
.months_content {
  display: flex;
  flex-wrap: wrap;
  .months_item {
    width: 33.33%;
    border: 5rpx solid #fff;
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      font-size: 30rpx;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hots_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>