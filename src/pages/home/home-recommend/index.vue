<template>
  <view>
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <view v-for="item in recommend" :key="item.id" class="recommend_item">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
    <!-- 推荐结束 -->

    <!-- 月份开始 -->
    <view class="months_wrap">
      <view class="months_title_wrap">
        <view class="months_title_info">
          <view class="months_info">
            <text> {{months.MM}} </text>
            months.DD
          </view>
          <view class="months_text"> {{months.title}} </view>
        </view>
        <view class="months_more">更多 ></view>
      </view>
      <view class="months_content">
        <view v-for="item in months.items" :key="item.id" class="months_item">
          <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)"></image>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->
  </view>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      recommend: [],
      months: [],
    };
  },
  mounted() {
    this.request({
      url: "http://service.picasso.adesk.com/v3/homepage/vertical",
      limit: 30,
      order: "hot",
      skip: 0,
    }).then((res) => {
      this.recommend = res.res.homepage[1].items;
      this.months = res.res.homepage[2];
      this.months.MM = moment(this.months.stime).format("MM");
      this.months.DD = moment(this.months.stime).format("DD");
    });
  },
};
</script>

<style scoped lang="scss">
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
</style>