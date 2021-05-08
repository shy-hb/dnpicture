export default (parmas) => {
  // 加载中
  uni.showLoading({
    title: "加载中"
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...parmas,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
       }
    })
  })
}