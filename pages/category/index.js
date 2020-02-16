// pages/category/index.js
import{request}from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    categories:[],
    // 右边数据
    rightContent:[],
    // 默认选中第一个
    selectIndex: 0,
    scroll_top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 点击分类

  onLoad: function (options) {

  },
  handleCategoryClick(e) {
  
    const index = e.currentTarget.dataset.index
    const scroll_top = 0;
    // console.log(rightContent)
    this.setData({
      rightContent: this.data.categories[index].children,
      selectIndex: index,
      scroll_top: scroll_top
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
     // 取出cata判断本地储存是否有数据
     let cata=wx.getStorageSync("cata")
   
     if(!cata){
       this.getcategory()
     }else{
      //  判断数据是否超时
       if (Date.now() - cata.time > 1000 * 10){
         this.getcategory()
       }else{
         let categories = cata.data
         const rightContent=categories[0].children;
         const selectIndex = 0;
         this.setData({
           categories, rightContent, selectIndex
         })
       }

     }
 
  },
  // 获取分类数据
  async getcategory() {
    const categories = await request({
      url: "/categories"
    })
    const rightContent = categories[0].children;
    const selectIndex = 0;
    console.log(categories)
    wx.setStorageSync("cata", {
      time:Date.now(),
      data: categories
    })
    this.setData({
      categories, rightContent, selectIndex
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