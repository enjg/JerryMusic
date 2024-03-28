"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const pinia_myUser = require("../../../pinia/myUser.js");
const _sfc_main = {
  __name: "RecommendedPlaylist",
  setup(__props) {
    const myUser = pinia_myUser.useMyUser();
    getRecommendResource();
    let listArray = common_vendor.reactive([]);
    common_vendor.watch(() => myUser.cookie, (newValue) => {
      listArray.length = 0;
      getRecommendResource(newValue);
    });
    function getRecommendResource(cookies) {
      let time = Date.now();
      axios.instance.get("/recommend/resource", {
        params: {
          limit: 9,
          timestamp: time,
          cookie: cookies
        }
      }).then((res) => {
        listArray.push(...res.data.recommend);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatNumber(number) {
      if (number >= 1e8) {
        return Math.floor(number / 1e8) + "亿";
      } else if (number >= 1e5 && number < 1e8) {
        return Math.floor(number / 1e4) + "万";
      } else {
        return number.toString();
      }
    }
    let ClickId = common_vendor.ref(null);
    function routerPush(event) {
      ClickId.value = event;
      setTimeout(function() {
        ClickId.value = null;
        common_vendor.index.navigateTo({
          url: `/pages/PlaylistDetails/index?id=${event}`
        });
      }, 100);
    }
    function routerPushTwo(center) {
      common_vendor.wx$1.navigateTo({
        url: center
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerPushTwo("/pages/SongList/index")),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(formatNumber(item.playcount)),
            b: common_vendor.unref(ClickId) == item.id ? 1 : "",
            c: item.picUrl,
            d: common_vendor.t(item.name),
            e: common_vendor.o(($event) => routerPush(item.id), index),
            f: index
          };
        }),
        c: common_assets._imports_0$11,
        d: common_assets._imports_0$11,
        e: common_vendor.o(($event) => _ctx.clisc())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6f715fc"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/RecommendedPlaylist/RecommendedPlaylist.vue"]]);
wx.createComponent(Component);
