// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件传递数据
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectid:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      // console.log(e.currentTarget.dataset.id)
// console.log(this.data.tabs)
      // 循环tabs当tabs中id和选中id相同时isActive为true
      const selectid = e.currentTarget.dataset.id;
      let { tabs } = this.data;
      tabs.map(v => v.id == selectid ? v.isActive = true : v.isActive = false);
      this.setData({
        tabs
      })
      // 传递新的tabs数据给父组件
      this.triggerEvent("tabsChange",tabs)
    }
  }
})
