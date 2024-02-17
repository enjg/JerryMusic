"use strict";
const common_vendor = require("./common/vendor.js");
const instance = common_vendor.axios.create({
  adapter: common_vendor.mpAdapter,
  baseURL: "https://mu-api.yuk0.com",
  timeout: 5e3
  // 设置你的接口地址
});
exports.instance = instance;
