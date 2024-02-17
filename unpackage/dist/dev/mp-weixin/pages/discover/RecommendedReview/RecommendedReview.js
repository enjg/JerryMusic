"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "RecommendedReview",
  setup(__props) {
    common_vendor.reactive(["red", "pink"]);
    common_vendor.onMounted(() => {
      getStarpickCommentsSummary();
      generateRandomColors(10);
    });
    let listArray = common_vendor.reactive([]);
    function getStarpickCommentsSummary() {
      axios.instance.get("/starpick/comments/summary").then((response) => {
        listArray.push(...response.data.data.blocks[0].creatives);
      }).catch((error) => {
        console.error(error);
      });
    }
    var colorPalette = [
      "#7c7d92",
      "#a0768a",
      "#9c7878",
      "#967e96",
      "#9d7f77",
      "#809681",
      "#9b7781",
      "#88888a",
      "#9d9a77",
      "#9b8877",
      "#79859b",
      "#878988",
      "#77949c",
      "#78879a"
    ];
    function generateRandomColor() {
      return colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }
    let colorlist = common_vendor.reactive([]);
    function generateRandomColors(num) {
      var colors = [];
      for (var i = 0; i < num; i++) {
        colors.push(generateRandomColor());
      }
      colorlist.push(...colors);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.resources[0].resourceExtInfo.songData.album.picUrl,
            b: common_vendor.t(item.resources[0].resourceExtInfo.songData.name),
            c: common_vendor.t(item.resources[0].resourceExtInfo.songData.artists[0].name),
            d: common_vendor.t(item.uiElement.mainTitle.titleDesc),
            e: common_vendor.unref(colorlist)[index],
            f: index
          };
        }),
        b: common_assets._imports_0$13
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b7106378"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/RecommendedReview/RecommendedReview.vue"]]);
wx.createComponent(Component);
