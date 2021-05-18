<template>
  <view v-if="Object.keys(album).length > 0">
    <!-- 背景图片 开始 -->
    <view class="album_bg_wrap">
      <!-- 背景图 -->
      <image mode="widthFix" :src="album.cover"></image>
      <!-- 信息 -->
      <view class="album_info">
        <view class="album_name">{{ album.name }}</view>
        <view class="album_btn"><text>关注专辑</text></view>
      </view>
    </view>
    <!-- 背景图片 结束 -->

    <!-- 专辑作者 开始 -->
    <view class="album_author_wrap">
      <view class="author_info">
        <image :src="album.user.avatar"></image>
        <view class="author_name">{{ album.user.name }}</view>
      </view>
      <view class="author_desc">
        <text>
          {{ album.desc }}
        </text>
      </view>
    </view>
    <!-- 专辑作者 结束 -->

    <!-- 列表渲染 开始 -->
    <view class="album_list">
      <view v-for="(item, index) in wallpaper" :key="item.id" class="album_item">
        <get-detail :list="wallpaper" :index="index">
          <image
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></image>
        </get-detail>
      </view>
    </view>
    <!-- 列表渲染 结束 -->
  </view>
</template>

<script>
import GetDetail from "@/components/getDetail";
export default {
  components: {
    GetDetail,
  },
  data() {
    return {
      parmas: {
        limit: 30,
        order: "new",
        skip: 0,
        // 第一次请求
        first: 1,
      },
      id: -1,
      album: {},
      wallpaper: [],
      isMore: true,
    };
  },
  onLoad(option) {
    // console.log(option);
    // 获取id
    this.id = option.id;
    // this.id = "5e5cf679e7bce739db1281e4";
    // this.id = "5e26a5d3e7bce7393fd169fb";
    // this.id = "607e8459e7bce70c027b9a0f";
    // this.id = "5d5f8e45e7bce75ae7fb8278";
    this.getList();
  },
  // 上拉加载更多
  onReachBottom() {
    if (this.isMore) {
      this.parmas.skip += this.parmas.limit;
      this.parmas.first = 0;
      this.getList();
    } else {
    }
  },
  methods: {
    // 获取数据
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.parmas,
      }).then((res) => {
        console.log(res);
        // 存放数据
        if (Object.keys(this.album).length === 0) {
          this.album = res.res.album;
        }

        if (res.res.wallpaper.length === 0) {
          this.isMore = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        this.wallpaper = [...this.wallpaper, ...res.res.wallpaper];
      });
    },
  },
};
</script>

<style scoped lang="scss">
.album_bg_wrap {
  position: relative;
  image {
  }

  .album_info {
    width: 100%;
    padding: 0 15rpx;
    position: absolute;
    bottom: 30rpx;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .album_name {
      margin-left: 30rpx;
      font-size: 40rpx;
      color: #fff;
    }

    .album_btn {
      background-color: #e43f7e;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      height: 60rpx;
      width: 152rpx;
      text {
      }
    }
  }
}
.album_author_wrap {
  padding: 10rpx;
  .author_info {
    display: flex;
    padding: 15rpx 0;
    image {
      height: 50rpx;
      width: 50rpx;
    }
    .author_name {
      font-size: 30rpx;
    }
  }
  .author_desc {
  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>