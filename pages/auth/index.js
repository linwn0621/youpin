// pages/auth/index.js
import {
  request
} from "../../request/request.js"
import { login } from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleUserInfo(e) {
    console.log(e);
    try {
      //通过button 获取到的参数信息
      // encryptedData, iv, rawData, signature
      let {
        encryptedData, iv, rawData, signature
      } = e.detail;
      //通过 wx.login 获取 code 参数
      // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
      let { code } = await login();
      //console.log(code);
      //发请求 获取token 数据 
      const res = await request({
        url: "/users/wxlogin",
        method: "POST", //post
        data: {
          encryptedData, iv, rawData, signature, code
        }
      });

      
      wx.setStorageSync("token", res.token)
      wx.navigateBack({
        delta: -1
      })
      // console.log(code)
    } catch (e) {
      console.log(e)
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})