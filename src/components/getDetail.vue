<template>
  <view @click="clickHandle">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    props: {
      list: Array,
      index: Number
    },
    methods: {
      clickHandle() {
        // 传递数据
        getApp().globalData.list = this.list;
        getApp().globalData.index = this.index;
        uni.navigateTo({
          url: "/pages/imgDetail/index"
        })
      }
    }
  }
</script>

<style scoped>
  
</style>