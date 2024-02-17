"use strict";
const common_vendor = require("../common/vendor.js");
const useMySearch = common_vendor.defineStore("mySearch", () => {
  let SearchText = common_vendor.ref("");
  let DefaultSearch = common_vendor.ref("");
  let SearchTF = common_vendor.ref(-1);
  let Tips = common_vendor.ref(-1);
  common_vendor.watch(() => SearchText.value, (newValue) => {
    if (newValue == "") {
      SearchTF.value = -1;
      Tips.value = -1;
    }
  });
  common_vendor.watch(() => SearchTF.value, (newValue) => {
    if (newValue == 1) {
      Tips.value = -1;
    }
  });
  common_vendor.watch(() => Tips.value, (newValue) => {
    if (newValue == 1) {
      SearchTF.value = -1;
    }
  });
  return {
    SearchText,
    DefaultSearch,
    SearchTF,
    Tips
  };
});
exports.useMySearch = useMySearch;
