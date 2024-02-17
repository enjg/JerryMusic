"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getPlaylistCatlist();
    });
    let listArray = common_vendor.reactive([]);
    let sortObj = common_vendor.reactive({});
    function getPlaylistCatlist() {
      axios.instance.get("/playlist/catlist").then((res) => {
        Object.assign(sortObj, res.data.categories);
        listArray.push(...res.data.sub);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistTabDetails/index?name=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerReturn()),
        b: common_vendor.f(common_vendor.unref(sortObj), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.f(common_vendor.unref(listArray), (items, indexs, i1) => {
              return {
                a: common_vendor.t(items.name),
                b: common_vendor.o(($event) => routerPush(items.name), indexs),
                c: indexs,
                d: items.category == index
              };
            }),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21834798"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlaylistTag/index.vue"]]);
wx.createPage(MiniProgramPage);
