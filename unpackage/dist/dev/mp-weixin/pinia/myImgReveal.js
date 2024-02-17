"use strict";
const common_vendor = require("../common/vendor.js");
const useMyImgReveal = common_vendor.defineStore("myImgReveal", () => {
  common_vendor.ref("");
  common_vendor.reactive([]);
  function postImg(event, Array) {
    common_vendor.wx$1.previewImage({
      current: event,
      // 当前显示的图片链接  
      urls: Array
    });
  }
  return {
    postImg
  };
});
exports.useMyImgReveal = useMyImgReveal;
