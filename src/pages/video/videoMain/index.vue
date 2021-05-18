<template>
  <scroll-view 
  scroll-y
   enable-flex 
   class="video_main"
   @scrolltolower="handleScrolltolower"
   >
    <view @click="handleClick(item)" class="video_item" v-for="item in videowp" :key="item.id">
      <image mode="widthFix" :src="item.img"></image>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    urlObj: Object,
  },
  data() {
    return {
      videowp: [],
      isMore: true
    };
  },
  watch: {
    urlObj() {
      // console.log(this.urlObj);
      this.videowp = [];
      this.isMore = true
      this.getList();
    },
  },
  mounted() {
    // console.log(this.urlObj);
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: this.urlObj.url,
        data: this.urlObj.params,
      }).then((res) => {
        // console.log(res);
        if (res.res.videowp.length === 0) {
          this.isMore = false;
          return;
        }
        this.videowp = [...this.videowp,...res.res.videowp];
      });
    },
    handleScrolltolower() {
      if(this.isMore) {
        this.urlObj.params.skip += this.urlObj.params.limit;
        this.getList();
      }else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
    },
    handleClick(item) {
      // console.log(item);
      // 将视频数据存到全局
      getApp().globalData.video = item;
      // 跳转
      uni.navigateTo({
        url: "/pages/videoPlay/index"
      })
    }
  },
};
</script>

<style scoped lang="scss">
.video_main {
  height: calc(100vh - 45px);
  display: flex;
  flex-wrap: wrap;
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
    }
  }
}
</style>