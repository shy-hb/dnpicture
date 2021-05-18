<template>
  <view>
    <view class="video_tab">
      <view class="video_tab_title">
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
      <view class="video_tab_content">
        <view v-if="current < 4"><video-main :urlObj="{url: items[current].url, params: items[current].parmas}"></video-main></view>
        <view v-if="current === 4"><video-category></video-category></view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import videoCategory from "./videoCategory"
import videoMain from "./videoMain"
  export default {
    components: {
      uniSegmentedControl,
      videoCategory,
      videoMain
    },
    data() {
    return {
      items: [
        { title: "推荐", url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured", parmas:{limit:30, skip:0, order:'hot'} },
        { title: "娱乐", url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a", parmas:{limit:30, skip:0, order:'new'} },
        { title: "最新", url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp", parmas:{limit:30, skip:0, order:'new'} },
        { title: "热门", url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp", parmas:{limit:30, skip:0, order:'hot'} },
        { title: "分类", url: "http://157.122.54.189:9088/videoimg/v1/videowp/category", parmas:{}  },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  }
</script>

<style lang="scss">
.video_tab {
  .video_tab_title {
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
}
</style>