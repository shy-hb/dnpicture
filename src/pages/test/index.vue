<template>
  <view class="test">
    <swiper-action class="action">
      <view class="abc">abc</view>
    </swiper-action>
  </view>
</template>

<script>
  import swiperAction from "@/components/swiperAction"
  export default {
    components: {
      swiperAction
    }
  }
</script>

<style scoped>
  .test {
    width: 100vw;
    height: 100vh;
    background-color: skyblue;
  }
  .action {
    width: 100vw;
    height: 100vh;
    background-color: pink;
  }
</style>