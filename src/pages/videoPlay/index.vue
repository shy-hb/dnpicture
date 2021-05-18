<template>
  <swiper-action>
    <view class="video_play">
      <!-- 背景图 开始 -->
      <image :src="videoObj.img"></image>
      <!-- 背景图 结束 -->
      <!-- 工具栏 开始 -->
      <view class="video_tools">
        <view
          @click="handleMuted"
          :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']"
        ></view>
        <view class="iconfont iconzhuanfa">
          <button open-type="share"></button>
        </view>
      </view>
      <!-- 工具栏 结束 -->
      <!-- 视频 开始 -->
      <view class="video_wrap">
        <video enable-progress-gesture :muted="muted" objectFit="fill" :src="videoObj.video"></video>
      </view>
      <!-- 视频 结束 -->
      <!-- 下载 开始 -->
      <view class="download">
        <view class="download_btn" @click="handleDownload">下载高清</view>
      </view>
      <!-- 下载 结束 -->
    </view>
  </swiper-action>
</template>

<script>
import swiperAction from "@/components/swiperAction";
export default {
  components: {
    swiperAction,
  },
  data() {
    return {
      videoObj: {},
      muted: false,
    };
  },
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted;
    },
    async handleDownload() {
      // 加载中效果
      await uni.showLoading({
        title: "下载中",
      });
      const { tempFilePath } = (
        await uni.downloadFile({ url: this.videoObj.video })
      )[1];
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      });
      uni.hideLoading();
      await uni.showToast({
        title: "下载成功",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.video_play {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    filter: blur(20rpx);
    z-index: -1;
  }
  .video_tools {
    display: flex;
    justify-content: flex-end;
    height: 80rpx;
    margin-top: 10rpx;
    .iconfont {
      width: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 40rpx;
      margin-right: 20rpx;
    }
    .iconzhuanfa {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .video_wrap {
    display: flex;
    justify-content: center;
    margin-top: 50rpx;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }
  .download {
    display: flex;
    justify-content: center;
    .download_btn {
      height: 80rpx;
      width: 360rpx;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      margin-top: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 40rpx;
      border: 1rpx solid #fff;
    }
  }
}
</style>