import { request } from "../../request/request.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Goodsdetail: {},
    // 设置默认收藏条件
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getGoodsdetail(options)

  },
  // 获取商品详情数据
  async getGoodsdetail(e) {
    const Goodsdetail = await request({
      url: "/goods/detail",
      data: e
    })
    // 判断本地储存中有没有收藏
    const collect = wx.getStorageSync("collect") || []
    const isCollect = collect.some(v => v.goods_id === Goodsdetail.goods_id)
    this.setData({
      Goodsdetail, isCollect
    })
    console.log(Goodsdetail)
  },
  // 点击图片放大
  handleCilck(e) {
    const {
      pics,
      img
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: pics.map(v => v.pics_big_url) // 需要预览的图片http链接列表
    })
    console.log(e.target)

  },
  // 点击收藏时
  handleshoucang() {
    // 获取本地存储
    let collect = wx.getStorageSync("collect") || []
    console.log(collect)
    // 判断商品id是否在本地存储中
    let index = collect.findIndex(v => v.goods_id === this.data.Goodsdetail.goods_id);
    console.log(index)
    if (index != -1) {
      collect.splice(index, 1)
      this.setData({
        isCollect: false
      })
      wx.showToast({
        title: '取消成功',
        icon: "success",
        mask: true
      })
      wx.setStorageSync("collect", collect)
    } else {
      collect.push(this.data.Goodsdetail)
      this.setData({
        isCollect: true
      })
      wx.showToast({
        title: '收藏成功',
        icon: "success",
        mask: true
      })
      wx.setStorageSync("collect", collect)
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