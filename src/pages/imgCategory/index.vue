<template>
  <view>
    <view class="category_tab">
      <view class="category_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :current="current"
            :values="items.map((v) => v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <scroll-view @scrolltolower="handelScrolltolower" enable-flex scroll-y class="category_tab_content">
        <view class="category_item" v-for="item in vertical" :key="item.id">
          <image mode="widthFix" :src="item.img"></image>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" },
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      id: 0,
      vertical: [],
      isMore: true
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.getList();
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      } else {
        // 防止多次点击重置skip
        return;
      }
      // 改变order
      this.params.order = this.items[e.currentIndex].order;
      // 重置skip
      this.params.skip = 0;
      this.vertical = [];
      // 再次请求数据
      this.getList();
    },
    // 获取数据
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params,
      }).then((res) => {
        // console.log(res);
        if(res.res.vertical.length === 0) {
          this.isMore = false;
          return;
        }
        this.vertical = [...this.vertical,...res.res.vertical];
      });
    },
    // 分页，下拉加载更多
    handelScrolltolower() {
      // 判断是否还有数据
      if(this.isMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
    }
  },
};
</script>

<style lang="scss">
.category_tab {
  .category_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translateY(-55%);
    }
  }
  .category_tab_content {
    height: calc(100vh - 45px);
    display: flex;
    flex-wrap: wrap;
    .category_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>