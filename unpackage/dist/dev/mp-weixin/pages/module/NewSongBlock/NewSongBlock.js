"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
if (!Math) {
  (NewSongBj + SongBlockTwo + load)();
}
const load = () => "../load.js";
const NewSongBj = () => "../NewSongBj.js";
const SongBlockTwo = () => "../SongBlockStyle/SongBlockTwo.js";
const _sfc_main = {
  __name: "NewSongBlock",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    common_vendor.onMounted(() => {
      if (Props.message.index == Props.message.sort && !listArray.length) {
        getTopSong(Props.message.content.type);
      }
    });
    let listArray = common_vendor.reactive([]);
    common_vendor.watch(() => Props.message.sort, (newValue) => {
      if (Props.message.index == newValue && !listArray.length) {
        getTopSong(Props.message.content.type);
      }
    });
    function getTopSong(types) {
      axios.instance.get("/top/song", {
        params: {
          type: types
        }
      }).then((res) => {
        listArray.push(...res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function SongClick(lisArray) {
      myPlayBack.PostAddSongList(listArray);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: Props.message.content.name == "全部"
      }, Props.message.content.name == "全部" ? {} : {}, {
        b: Props.message.content.name == "华语"
      }, Props.message.content.name == "华语" ? {} : {}, {
        c: Props.message.content.name == "欧美"
      }, Props.message.content.name == "欧美" ? {} : {}, {
        d: Props.message.content.name == "韩国"
      }, Props.message.content.name == "韩国" ? {} : {}, {
        e: Props.message.content.name == "日本"
      }, Props.message.content.name == "日本" ? {} : {}, {
        f: common_assets._imports_0,
        g: common_vendor.t(common_vendor.unref(listArray).length),
        h: common_assets._imports_1,
        i: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "241009a2-1-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                mv: item.mvid,
                ar: item.artists,
                fee: item.fee,
                hr: null,
                sq: null,
                al: item.album,
                img: item.album.blurPicUrl,
                id: item.id,
                index
              }
            })
          };
        }),
        j: !common_vendor.unref(listArray).length
      }, !common_vendor.unref(listArray).length ? {} : {}, {
        k: common_vendor.o(($event) => SongClick(common_vendor.unref(listArray)))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-241009a2"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/NewSongBlock/NewSongBlock.vue"]]);
wx.createComponent(Component);
