// 引入基准路径
import { BASE_URL } from "../request/urls.js"
export const request = (params) => {
  // 设置遮罩
  wx.showLoading({
    title: '正在加载中',
    mask: true
  })
  // 取出请求头
  // let {header} = params
 
  let header = { ...params.header };
  console.log(123, header)
  if (params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync("token");
  }
  // 配合promise
  return new Promise(function (resolve, reject) {
    wx.request({
      ...params,
      header: header,
      url: BASE_URL + params.url,
      success: (res) => {
        resolve(res.data.message)
        // console.log(123123,res)
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