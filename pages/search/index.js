// 引入请求文件
import { request } from "../../request/request.js"
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    searchlist: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取输入框的值
  handleInputChange(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  // 点击搜索
  async handleClick() {
    // 如果没内容则提示
    if (!this.data.inputVal) {
      wx.showToast({
        title: '商品名称不能为空',
        icon: "none"
      })
      return false;
    } else {
      // 有数据则发请求
      const searchlist = await request({
        url: "/goods/search",
        data: {
          query: this.data.inputVal
        }
      })
    
      // 判断是否有数据没有数据提示
      if (searchlist.goods.length === 0) {
        wx.showToast({
          title: '查无数据',
          icon: "none"
        })
      }
      this.setData({
        searchlist: searchlist.goods
      })
      console.log(this.data.searchlist, 1)
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