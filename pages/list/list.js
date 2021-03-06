//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    books: [],
    content: ''
  },
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://www.zhangtt.cn/library/searchBook?search=' + options.keyword,
      success: function (res) {
        if (res.data.length > 0){
          self.setData({
            books: res.data
          });
        }
      }
    })
  },
  showDetail: function(e){
    if (this.data.detailsMode == 'detailsComplete')
      this.setData({
        detailsMode: 'detailsLess'
      })
    else
      this.setData({
        detailsMode: 'detailsComplete'
      })
  },
  bindItemTap: function(e){
    wx.request({
      url: 'https://www.zhangtt.cn/library/getBookDetails?id=' + e.currentTarget.dataset.id,
      success: function(res){

        wx.showModal({
          title: '详情',
          content: res.data[0].details,
        })

      }
    })
  }
})
