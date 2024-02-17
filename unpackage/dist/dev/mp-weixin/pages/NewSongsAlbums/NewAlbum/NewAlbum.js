"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
if (!Math) {
  AlbumBlack();
}
const AlbumBlack = () => "../../module/AlbumBlack.js";
const _sfc_main = {
  __name: "NewAlbum",
  setup(__props) {
    common_vendor.onMounted(() => {
      getAlbum();
      getAlbumList();
    });
    let listArray = common_vendor.reactive([]);
    function getAlbum() {
      axios.instance.get("/album/new", {
        params: {
          limit: 50,
          area: "ALL"
        }
      }).then((res) => {
        listArray.push(...res.data.albums);
      }).catch((err) => {
        console.error(err);
      });
    }
    let DigitalAlbumListArray = common_vendor.reactive([]);
    function getAlbumList() {
      axios.instance.get("/album/list", {
        params: {
          limit: 3
        }
      }).then((res) => {
        DigitalAlbumListArray.push(...res.data.products);
        console.log(DigitalAlbumListArray);
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(DigitalAlbumListArray), (item, index, i0) => {
          return {
            a: "e58dd8d2-0-" + i0,
            b: common_vendor.p({
              message: {
                sort: 1,
                img: item.coverUrl,
                name: item.albumName,
                id: item.albumId,
                artists: [{
                  name: item.artistName
                }]
              }
            }),
            c: index
          };
        }),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "e58dd8d2-1-" + i0,
            b: common_vendor.p({
              message: {
                sort: 2,
                img: item.picUrl,
                name: item.name,
                id: item.id,
                artists: item.artists
              }
            }),
            c: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e58dd8d2"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/NewSongsAlbums/NewAlbum/NewAlbum.vue"]]);
wx.createComponent(Component);
