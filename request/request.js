// 引入基准路径
import { BASE_URL } from "../request/urls.js"
export const request = (params) => {
  // 设置遮罩
  wx.showLoading({
    title: '正在加载中',
    mask: true
  })
  // 配合promise
  return new Promise(function (resolve, reject) {
    wx.request({
      ...params,
      url: BASE_URL + params.url,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err);
      },
      // 结束
      complete: () => {
        // 关闭遮罩
        wx.hideLoading();
      }
    })
  })
}