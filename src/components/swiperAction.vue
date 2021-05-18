<template>
  <view
  @touchstart="handleTouchstart"
  @touchend="handleTouchend"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 记录开始时间，坐标
      startTime: 0,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    handleTouchstart(event) {
      // console.log("按下");
      // console.log(event.changedTouches[0].clientX);
      // console.log(event.changedTouches[0].clientY);
      // 保存开始时间和坐标
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    handleTouchend(event) {
      // console.log("离开");
      // console.log(event.changedTouches[0].clientX);
      // console.log(event.changedTouches[0].clientY);
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      // 判断按下时长
      if (endTime - this.startTime > 2000) {
        return;
      }

      // 记录方向
      let direction = "";
      if (Math.abs(endX - this.startX) > 0 && Math.abs(endY - this.startY) < 10) {
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }
      console.log(direction);
      this.$emit("swiperAction",{direction})
    },
  },
};
</script>

<style scoped>
</style>