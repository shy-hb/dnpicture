<template>
  <view>
    <!-- 作者 开始 -->
    <view v-if="imgDetail.user.avatar" class="author_wrap">
      <view class="author_icon"
        ><image :src="imgDetail.user.avatar" mode="widthFix"></image
      ></view>
      <view class="author_info">
        <view class="author_name">{{ imgDetail.user.name }}</view>
        <view class="author time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <!-- 作者 结束 -->

    <!-- 大图 开始 -->
    <swiper-action @swiperAction="handleSwiperAction">
      <view class="big_img">
        <image mode="widthFix" :src="imgDetail.thumb"></image>
      </view>
    </swiper-action>
    <!-- 大图 结束 -->
    <!-- 点赞 开始 -->
    <view class="user_rank">
      <view class="rank_num">
        <text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
      </view>
      <view class="love">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 点赞 结束 -->

    <!-- 最热 开始 -->
    <view v-if="hot.length > 0" class="commmet hot">
      <view class="comment_title">
        <view class="iconfont iconhot1"></view>
        <view class="comment_text">最热评论</view>
      </view>
      <!-- 内容 -->
      <view class="comment_list">
        <view class="comment_item" v-for="item in hot" :key="item.id">
          <!-- 用户 -->
          <view class="comment_user">
            <view class="user_icon"
              ><image mode="widthFix" :src="item.user.avatar"></image
            ></view>
            <view class="user_nickname">
              <view class="user_name">{{ item.user.name }}</view>
              <view class="user_time">{{ item.cnTime }}</view>
            </view>
            <view class="user_badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <!-- 评论 -->
          <view class="comment_desc">
            <view class="comment_text">{{ item.content }}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热 结束 -->
    <!-- 最新 开始 -->
    <view v-if="comment.length > 0" class="commmet new">
      <view class="comment_title">
        <view class="iconfont iconpinglun"></view>
        <view class="comment_text">最新评论</view>
      </view>
      <!-- 内容 -->
      <view class="comment_list">
        <view class="comment_item" v-for="item in comment" :key="item.id">
          <!-- 用户 -->
          <view class="comment_user">
            <view class="user_icon"
              ><image mode="widthFix" :src="item.user.avatar"></image
            ></view>
            <view class="user_nickname">
              <view class="user_name">{{ item.user.name }}</view>
              <view class="user_time">{{ item.cnTime }}</view>
            </view>
            <view class="user_badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <!-- 评论 -->
          <view class="comment_desc">
            <view class="comment_text">{{ item.content }}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新 结束 -->

    <!-- 下载 开始 -->
    <view class="download" @click="handleDownload">
      <view class="download_btn"> 下载图片 </view>
    </view>
    <!-- 下载 结束 -->
  </view>
</template>

<script>
import SwiperAction from "@/components/swiperAction";
import moment from "moment";
moment.locale("zh-cn");
export default {
  components: {
    SwiperAction,
  },
  data() {
    return {
      imgDetail: {},
      comment: [],
      hot: [],
      index: 0,
    };
  },
  onLoad() {
    // console.log(getApp().globalData);
    // 保存数据
    const { index } = getApp().globalData;
    // 使用this.index方便修改
    this.index = index;
    this.getData();
  },
  methods: {
    getData() {
      const { list } = getApp().globalData;
      this.imgDetail = list[this.index];
      // 时间格式
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();

      // 获取评论
      this.getComments(this.imgDetail.id);
    },
    getComments(id) {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
      }).then((res) => {
        // 修改时间格式
        res.res.comment.forEach(
          (v) => (v.cnTime = moment(v.atime * 1000).fromNow())
        );
        res.res.hot.forEach(
          (v) => (v.cnTime = moment(v.atime * 1000).fromNow())
        );

        this.comment = res.res.comment;
        this.hot = res.res.hot;
      });
    },
    handleSwiperAction(e) {
      // 判断左右滑动改变index
      const { list } = getApp().globalData;
      if (e.direction == "left" && this.index < list.length - 1) {
        this.index++;
        this.getData();
      } else if (e.direction == "right" && this.index > 0) {
        this.index--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    async handleDownload() {
      await uni.showLoading({
        title: '下载中'
      })
      // 将下载文件保存到小程序内存中 tempFilePath
      const result1 = await uni.downloadFile({url: this.imgDetail.img});
      // console.log(result1);
      const { tempFilePath } = result1[1];
      // 将文件保存到本地
      const result = await uni.saveImageToPhotosAlbum({filePath: tempFilePath })
      // console.log("下载成功");
      // 停止加载
      uni.hideLoading();
      // 显示加载成功
      await uni.showToast({
        title:'下载成功'
      })
    },
  },
};
</script>

<style scoped lang="scss">
.author_wrap {
  display: flex;
  padding: 30rpx;
  .author_icon {
    padding: 0 20rpx;
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }

  .author_info {
    .author_name {
      color: #333;
      font-weight: 600;
    }

    .author.time {
      color: #ccc;
      padding: 10rpx 0;
      font-size: 24rpx;
    }
  }
}
.user_rank {
  display: flex;
  height: 85rpx;
  align-items: center;
  border-bottom: 3rpx solid #ccc;
  .rank_num {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 30rpx;
    }
  }

  .love {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 30rpx;
    }
  }
}
// 评论
.commmet {
  border-bottom: 20rpx solid #ededed;
  .comment_title {
    padding: 20rpx;
    display: flex;
    align-items: center;
    .iconfont {
      color: red;
      font-size: 50rpx;
      padding: 0 10rpx;
    }
    .comment_text {
      font-size: 30rpx;
      font-weight: 600;
    }
  }
  .comment_list {
    .comment_item {
      padding: 15rpx 0;
      border-bottom: 10rpx solid #ededed;
      .comment_user {
        display: flex;
        .user_icon {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }
        .user_nickname {
          flex: 1;
          padding-left: 15rpx;
          .user_name {
            color: #999;
            font-weight: 600;
          }

          .user_time {
            color: #666;
            font-size: 24rpx;
            padding: 5rpx 0;
            font-weight: 600;
          }
        }
        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }

      .comment_desc {
        display: flex;
        padding: 15rpx 0;
        .comment_text {
          flex: 1;
          font-weight: 600;
          padding-left: 12%;
          color: #000;
        }
        .comment_like {
          .iconfont.icondianzan {
            font-size: 30rpx;
          }
        }
      }
    }
  }
}
.new .iconpinglun {
  color: orange !important;
}
.download {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download_btn {
    height: 80%;
    width: 95%;
    background-color: $color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35rpx;
    color: #fff;
  }
}
</style>