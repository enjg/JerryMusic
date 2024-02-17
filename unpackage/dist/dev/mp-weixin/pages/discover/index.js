"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (SearchBox + GarouselMap + sort + RecommendedPlaylist + Leaderboard + RecommendedReview + LatestAlbum)();
}
const GarouselMap = () => "../module/GarouselMap.js";
const sort = () => "./sort/sort.js";
const RecommendedPlaylist = () => "./RecommendedPlaylist/RecommendedPlaylist.js";
const SearchBox = () => "./SearchBox/SearchBox.js";
const Leaderboard = () => "./Leaderboard/Leaderboard.js";
const LatestAlbum = () => "./LatestAlbum/LatestAlbum.js";
const RecommendedReview = () => "./RecommendedReview/RecommendedReview.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-157e4766"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/index.vue"]]);
wx.createPage(MiniProgramPage);
