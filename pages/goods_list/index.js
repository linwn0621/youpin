// pages/goods_list/index.js
import { request } from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 传递tabs组件数据
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      }, {
        id: 1,
        value: "销量",
        isActive: false
      }, {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],

    goods: []
  },
  // 设置默认页码和一页数量
  QueryParams: {
    // 页码
    pagenum: 1,
    // 一页数量
    pagesize: 10
  },
  totalPages:0,
  // 获取页面数据
  async getGoodsList() {
    const GoodsList = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    console.log(GoodsList)
    // 计算总共有多少页向上取整
    this.totalPages = Math.ceil(GoodsList.total / this.QueryParams.pagesize)
    this.setData({
      // 给数组追加数据,上拉加载时前面的数据才不会刷新
      goods: [...this.data.goods, ...GoodsList.goods]
    })
    // console.log(this.data.goods)
    // 请求完成关闭下拉
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取商品cid
    if (options.cid) {
      this.QueryParams["cid"] = options.cid
    }
    if (options.query){
      this.QueryParams["query"] = options.query
    }
    this.getGoodsList()



  },
  // 获取子组件传递的值
  handleTabsChange(e) {
    console.log(e.detail, 2)
    this.setData({
      tabs: e.detail
    })
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
    this.setData({
      goods: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.totalPages)
// 判断总页数和当前页数
    if (this.totalPages > this.QueryParams.pagenum){
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }else{
      wx.showToast({
        title: "没有了",
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})