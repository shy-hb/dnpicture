<template>
  <scroll-view
    class="album_scroll_view"
    scroll-y
    @scrolltolower="handleToLower"
  >
    <!-- 轮播图 开始 -->
    <view class="album_swiper">
      <!-- 
        1.autoplay 轮播
        2.indicator-dots 指示器
        3.circular 衔接轮播
       -->
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图 结束 -->

    <!-- 列表 开始 -->
    <view class="album_wrap">
      <navigator
       v-for="item in album" 
       :key="item.id"
        class="album_item"
        :url="`/pages/album/index?id=${item.id}`"
        >
        <view class="album_img">
          <image mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="album_info">
          <view class="album_name">{{ item.name }}</view>
          <view class="album_desc">{{ item.desc }}</view>
          <view class="album_attention"><text>+关注</text></view>
        </view>
      </navigator>
    </view>
    <!-- 列表 结束 -->
  </scroll-view>
</template>

<script>
export default {
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑",
    });
    this.getList();
  },
  data() {
    return {
      parmas: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      album: [],
      banner: [],
      isMore: true,
    };
  },
  methods: {
    // 获取数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.parmas,
      }).then((res) => {
        // console.log(res);
        if (this.banner.length === 0) {
          this.banner = res.res.banner;
        }
        if (res.res.album.length === 0) {
          this.isMore = false
          return;
        }
        this.album = [...this.album, ...res.res.album];
        // console.log(this.album);
        // console.log(this.banner);
      });
    },
    // 下拉加载
    handleToLower() {
      if (this.isMore) {
        this.parmas.skip += this.parmas.limit;
        this.getList();
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
.album_scroll_view {
  height: calc(100vh - 45px);
}
.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album_wrap {
  padding: 10rpx;
  .album_item {
    border-bottom: 1rpx solid #ccc;
    padding: 20rpx 10rpx;
    display: flex;
    .album_img {
      flex: 1;
      image {
        height: 200rpx;
        width: 200rpx;
      }
    }
    .album_info {
      flex: 2;
      overflow: hidden;
      .album_name {
        padding: 10rpx 0;
        color: #000;
        font-size: 30rpx;
      }
      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .album_attention {
        padding: 20rpx;
        display: flex;
        justify-content: flex-end;
        text {
          font-size: 30rpx;
          color: $color;
          border: 1px solid $color;
        }
      }
    }
  }
}
</style>