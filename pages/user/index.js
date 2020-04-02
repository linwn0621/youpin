import {
  getUserInfo
} from "../../utils/asyncWx.js"
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userInfo = wx.getStorageSync("userInfo") || {}
    this.setData({
      userInfo
    })
  },
  // 登录
  handleUserInfo(e) {
    try {
      // console.log(e);
      //1. 放到this.data中
      this.setData({
        userInfo: e.detail.userInfo
      })
      //2. 存到 storage中 页面初始化的时候 可以获取
      wx.setStorageSync("userInfo", e.detail.userInfo);
    } catch (e) {
      console.log(e)
    }

  },
  // 电话
  handlePhone(){
    wx.makePhoneCall({
      phoneNumber: '4008517517'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})