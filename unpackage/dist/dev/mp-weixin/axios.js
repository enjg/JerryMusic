"use strict";
const common_vendor = require("./common/vendor.js");
let url = "";
const instance = common_vendor.axios.create({
  adapter: common_vendor.mpAdapter,
  baseURL: url,
  timeout: 5e3
  // 设置你的接口地址
});
exports.instance = instance;
