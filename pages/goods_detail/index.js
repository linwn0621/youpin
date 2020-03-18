// 收藏功能 
// 1. 点击收藏图标的时候 
//   a. 从本地缓存中查看一下是否已经收藏
//    a.1 如果已经收藏 取消收藏 图标就恢复未选中状态 
//    a.2 如果没有收藏 那么就标记收藏 图标就显示选中状态
// 2. 如果你是重新进入到这个页面的，那么此时你就要判断一下，商品是否已经
// 收藏在本地，如果已经收藏，图片显示选中状态；如果未收藏，未选中状态。

// 底部工具栏的实现
// 1. 点击 联系客服 =》 调用系统的客服功能 =》 button open-type=contact
// 2. 点击 购物车 => 跳转到购物车 页面 /pages/cart/index
// 3. 点击 加入购物车   备注：购物车是使用本地缓存来存储购物车数据
//    a. 如果该商品已经点击 加入购物车 一次 此时 应该是 购物车里面该商品数量 加一
//    b. 如果该商品没有被加入过 添加到本地缓存中 同时设置购物车中 该商品数量为1
// 4. 点击 立即购买 => 跳转到支付页面 /pages/pay/index

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
  // 点击加入购物车
  handlecar(e){
    const cars = wx.getStorageSync("cars")||[];
    const index = cars.findIndex(v => v.goods_id === this.data.Goodsdetail.goods_id)
    if (index===-1){
      this.data.Goodsdetail.num=1
      this.data.Goodsdetail.checked=true
      cars.push(this.data.Goodsdetail)
    }else{
      cars[index].num++
    }
    wx.setStorageSync("cars", cars);
    wx.showToast({
      title: '加入购物车成功',
      icon: "success",
      mask: true
    })
    console.log(e)
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