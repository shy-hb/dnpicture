<template>
  <scroll-view enable-flex scroll-y class="home_category">
    <navigator
     class="category_item"
      v-for="item in category" 
      :key="item.id"
      :url="`/pages/imgCategory/index?id=${item.id}`"
      >
      <image mode="aspectFill" :src="item.cover"></image>
      <view class="itme_name">{{ item.name }}</view>
    </navigator>
  </scroll-view>
</template>

<script>
export default {
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类",
    });
  },
  data() {
    return {
      category: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category",
      }).then((res) => {
        // console.log(res);
        this.category = res.res.category;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home_category {
  height: calc(100vh - 45px);
  display: flex;
  flex-wrap: wrap;
  .category_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    position: relative;
    image {
      height: 240rpx;
    }

    .itme_name {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50rpx;
      font-size: 35rpx;
      color: #fff;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
      background-image: linear-gradient(to right top, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
    }
  }
}
</style>