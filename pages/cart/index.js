import { request } from "../../request/request.js"
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cars: [],
    totalmoney:0,
    totalnum:0,
    isallcheck:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取购物车数据

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
    const cars = wx.getStorageSync("cars") || []
    this.setData({
      cars
    })
    console.log(this.data.cars)
    this.gettotalmoney(cars)
  },
  // 计算总金额
  gettotalmoney(cars){
    let totalnum=0
    let totalmoney=0
    let isallcheck=true
 
    cars.forEach(v=>{
      if (v.checked){
        totalnum+=v.num
        totalmoney += v.num * v.goods_price
      }else{
        isallcheck=false
      }
    })
    this.setData({
      totalmoney, totalnum, isallcheck, cars
    })
    console.log(totalmoney)
    wx.setStorageSync("cars", cars)
  },
  // 点击选中
  handleCheck(e){
    const index = e.target.dataset.index
    const cars = wx.getStorageSync("cars")||[]
    cars[index].checked = !cars[index].checked
    console.log(cars[index].checked)
    this.gettotalmoney(cars)
  },
  // 点击全选
  handleCheckall(){
    let { cars, isallcheck } = this.data
    isallcheck = !isallcheck
    cars.forEach(v => v.checked = isallcheck);
    this.gettotalmoney(cars)
    this.setData({
      isallcheck
    })
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