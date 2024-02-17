"use strict";
const common_vendor = require("../common/vendor.js");
const useMyShare = common_vendor.defineStore("myShare", () => {
  let ShowTF = common_vendor.ref(false);
  let ShareSort = common_vendor.ref(null);
  let id = common_vendor.ref(null);
  let ShareContentSort = common_vendor.ref(null);
  function ShareSortPost(sort) {
    ShareSort.value = sort;
  }
  function SharePost(sort, ids) {
    console.log(sort, ids);
    ShareContentSort.value = sort;
    id.value = ids;
    PostShow();
  }
  function PostShow() {
    ShowTF.value = !ShowTF.value;
  }
  return {
    ShowTF,
    PostShow,
    ShareSort,
    id,
    ShareContentSort,
    SharePost,
    ShareSortPost
  };
});
exports.useMyShare = useMyShare;
