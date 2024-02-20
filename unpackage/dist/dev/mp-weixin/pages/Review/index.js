"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Math) {
  reviewBlock();
}
const reviewBlock = () => "../module/reviewBlock.js";
const _sfc_main = {
  __name: "index",
  props: {
    type: String,
    id: String,
    content: String
  },
  setup(__props) {
    const Props = __props;
    let sortType = common_vendor.ref(1);
    let time = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, 1, time.value);
    });
    common_vendor.watch(() => sortType.value, (newValue) => {
      time.value = null;
      commentListArray.length = 0;
      getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, sortType.value, time.value);
    });
    function JsonStringObj(event) {
      return JSON.parse(event);
    }
    let commentListArray = common_vendor.reactive([]);
    function getCommentNew(ids, types, pageNos, pageSizes, sortTypes, cursors) {
      axios.instance.get("/comment/new", {
        params: {
          id: ids,
          type: types,
          pageNo: pageNos,
          pageSize: pageSizes,
          sortType: sortTypes,
          cursor: cursors
        }
      }).then((res) => {
        console.log(res.data);
        commentListArray.push(...res.data.data.comments);
        console.log(sortTypes, cursors, "详情");
        if (sortTypes == 3) {
          console.log(cursors);
          time.value = res.data.data.comments[res.data.data.comments.length - 1].time;
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    function handleScrollToUpper() {
      console.log("头部");
    }
    function handleScrollToLower() {
      console.log("底部");
      getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, sortType.value, time.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: Props.type == 0
      }, Props.type == 0 ? {
        c: JsonStringObj(Props.content).al.picUrl,
        d: common_vendor.t(JsonStringObj(Props.content).name),
        e: common_vendor.t(JsonStringObj(Props.content).alia[0]),
        f: common_vendor.t(JsonStringObj(Props.content).ar[0].name)
      } : {}, {
        g: Props.type == 3
      }, Props.type == 3 ? {
        h: JsonStringObj(Props.content).picUrl,
        i: common_vendor.t(JsonStringObj(Props.content).name),
        j: common_vendor.f(JsonStringObj(Props.content).artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < JsonStringObj(Props.content).artists.length - 1
          }, index < JsonStringObj(Props.content).artists.length - 1 ? {} : {});
        })
      } : {}, {
        k: Props.type == 2
      }, Props.type == 2 ? {
        l: JsonStringObj(Props.content).coverImgUrl,
        m: common_vendor.t(JsonStringObj(Props.content).name),
        n: common_vendor.t(JsonStringObj(Props.content).creator.nickname)
      } : {}, {
        o: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 1 : sortType = 1),
        p: common_vendor.unref(sortType) == 1 ? 1 : "",
        q: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 2 : sortType = 2),
        r: common_vendor.unref(sortType) == 2 ? 1 : "",
        s: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 3 : sortType = 3),
        t: common_vendor.unref(sortType) == 3 ? 1 : "",
        v: common_vendor.f(common_vendor.unref(commentListArray), (item, index, i0) => {
          return {
            a: index,
            b: "6bb6a698-0-" + i0,
            c: common_vendor.p({
              event: item
            })
          };
        }),
        w: common_vendor.o(handleScrollToUpper),
        x: common_vendor.o(handleScrollToLower)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bb6a698"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Review/index.vue"]]);
wx.createPage(MiniProgramPage);
