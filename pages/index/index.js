//index.js
// 引入请求库
import { request } from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_list: [],
    catitems: [],
    floorData: [],
    str:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getswiperlist(),
      this.getcatitems()
    this.getfloorData()
  },
  // 获取轮播图数据
  async getswiperlist() {
    const swiper_list = await request({
      url: "/home/swiperdata"
    })
    console.log("轮播图",swiper_list)
    this.setData({
      swiper_list
    })

  },
  // 获取分类数据
  async getcatitems() {
    const catitems = await request({
      url: "/home/catitems"
    })
    this.setData({
      catitems
    })
    
  },
  // 获取楼层数据
  async getfloorData() {
    let floorData = await request({
      url: "/home/floordata"
    })
   floorData.map(
      v=>{
        // console.log(v)
        v.product_list.map(v1=>{
          v1.navigator_url=v1.navigator_url.slice(0,17)+"/index"+v1.navigator_url.slice(17)
        })
      }
    )

    this.setData({
      floorData
    })
    // console.log(floorData)
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
