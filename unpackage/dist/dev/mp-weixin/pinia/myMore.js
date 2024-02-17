"use strict";
const common_vendor = require("../common/vendor.js");
const useMyMore = common_vendor.defineStore("myMore", () => {
  let TF = common_vendor.ref(false);
  let id = common_vendor.ref(null);
  return {
    TF,
    id
  };
});
exports.useMyMore = useMyMore;
