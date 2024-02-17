"use strict";
const common_vendor = require("../common/vendor.js");
const useMyUser = common_vendor.defineStore("myUser", () => {
  let cookie = common_vendor.ref(null);
  let profile = common_vendor.reactive({});
  return {
    cookie,
    profile
  };
});
exports.useMyUser = useMyUser;
