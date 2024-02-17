"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myUser = require("../../pinia/myUser.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myShare = require("../../pinia/myShare.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (SongBlockTwo + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MoreDetails = () => "../module/MoreDetails.js";
const SongBlockTwo = () => "../module/SongBlockStyle/SongBlockTwo.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myUser = pinia_myUser.useMyUser();
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myMore = pinia_myMore.useMyMore();
    const myShare = pinia_myShare.useMyShare();
    common_vendor.onMounted(() => {
      getRecommendSongs(myUser.cookie);
    });
    let listArray = common_vendor.reactive([]);
    function getRecommendSongs(cookies) {
      axios.instance.get("/recommend/songs", {
        params: {
          cookie: cookies
        }
      }).then((res) => {
        listArray.push(...res.data.data.dailySongs);
      }).catch((error) => {
        console.error(error);
      });
    }
    function getCurrentMonth() {
      var date = /* @__PURE__ */ new Date();
      var month = date.getMonth() + 1;
      return month;
    }
    function getCurrentDay() {
      var date = /* @__PURE__ */ new Date();
      var day = date.getDate();
      return day;
    }
    function Click(lisArray) {
      myPlayBack.PostAddSongList(listArray);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(common_assets._imports_0$9),
        b: common_vendor.t(getCurrentDay()),
        c: common_vendor.t(getCurrentMonth()),
        d: common_assets._imports_0$4,
        e: common_vendor.t(common_vendor.unref(listArray).length),
        f: common_assets._imports_1,
        g: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "0e083416-0-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                index,
                mv: item.mv,
                ar: item.ar,
                fee: item.fee,
                hr: item.hr,
                sq: item.sq,
                al: item.al,
                img: item.al.picUrl,
                id: item.id
              }
            })
          };
        }),
        h: common_vendor.o(($event) => Click(common_vendor.unref(listArray))),
        i: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        j: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e083416"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DailyRecommendation/index.vue"]]);
wx.createPage(MiniProgramPage);
