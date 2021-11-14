<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrap_main">
      <div id="app">
        <div class="input-group mb-3">
          <div>
            <!-- <table class="table">
              <thead>
                <tr>
                  <th style="width: 10%">商品編號＊</th>
                  <th style="width: 10%">商品名稱＊</th>
                  <th style="width: 15%">商品內容＊</th>
                  <th style="width: 15%">價格＊</th>
                  <th style="width: 15%">市值</th>
                  <th style="width: 15%">備註</th>
                  <th style="width: 5%"></th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品編號"
                      v-model="tempGift.no"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品名稱"
                      v-model="tempGift.name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品內容"
                      v-model="tempGift.content"
                    />
                  </td>
                  <td>
                    <select
                      id="selectUnit"
                      class="form-control"
                      v-model="tempGift.price"
                    >
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="3000">3000</option>
                      <option value="5000">5000</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="市價"
                      v-model="tempGift.value"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="備註"
                      v-model="tempGift.note"
                    />
                  </td>
                  <td>
                    <div class="input-group-append">
                      <button
                        class="btn btn-primary"
                        type="button"
                        @click="addGift"
                      >
                        新增
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table> -->
          </div>
        </div>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 0 }"
                  @click="changeVisibility(0)"
                  >全部</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 1000 }"
                  @click="changeVisibility(1000)"
                  >1000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 2000 }"
                  @click="changeVisibility(2000)"
                  >2000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 3000 }"
                  @click="changeVisibility(3000)"
                  >3000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 5000 }"
                  @click="changeVisibility(5000)"
                  >5000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8001 }"
                  @click="changeVisibility(8001)"
                  >牛</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8002 }"
                  @click="changeVisibility(8002)"
                  >豬</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8003 }"
                  @click="changeVisibility(8003)"
                  >雞</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8004 }"
                  @click="changeVisibility(8004)"
                  >帝王蟹</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8005 }"
                  @click="changeVisibility(8005)"
                  >龍蝦</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8006 }"
                  @click="changeVisibility(8006)"
                  >燒肉</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8007 }"
                  @click="changeVisibility(8007)"
                  >海鮮</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8008 }"
                  @click="changeVisibility(8008)"
                  >烏魚子</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8009 }"
                  @click="changeVisibility(8009)"
                  >佛跳牆</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8010 }"
                  @click="changeVisibility(8010)"
                  >火鍋</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8011 }"
                  @click="changeVisibility(8011)"
                  >巧克力</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8012 }"
                  @click="changeVisibility(8012)"
                  >橄欖油</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8013 }"
                  @click="changeVisibility(8013)"
                  >麵</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8014 }"
                  @click="changeVisibility(8014)"
                  >酒</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8015 }"
                  @click="changeVisibility(8015)"
                  >茶</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8016 }"
                  @click="changeVisibility(8016)"
                  >素</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8017 }"
                  @click="changeVisibility(8017)"
                  >年菜</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8018 }"
                  @click="changeVisibility(8018)"
                  >禮盒</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 8019 }"
                  @click="changeVisibility(8019)"
                  >套餐</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9001 }"
                  @click="changeVisibility(9001)"
                  >鴻海</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9002 }"
                  @click="changeVisibility(9002)"
                  >王品</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9003 }"
                  @click="changeVisibility(9003)"
                  >米其林</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9004 }"
                  @click="changeVisibility(9004)"
                  >海底撈</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9005 }"
                  @click="changeVisibility(9005)"
                  >阿霞飯店</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9006 }"
                  @click="changeVisibility(9006)"
                  >黑毛屋</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9007 }"
                  @click="changeVisibility(9007)"
                  >喜來登</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9008 }"
                  @click="changeVisibility(9008)"
                  >老協珍</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9009 }"
                  @click="changeVisibility(9009)"
                  >寬心園</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9010 }"
                  @click="changeVisibility(9010)"
                  >鼎泰豐</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9011 }"
                  @click="changeVisibility(9011)"
                  >黑橋牌</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9012 }"
                  @click="changeVisibility(9012)"
                  >天香樓</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9013 }"
                  @click="changeVisibility(9013)"
                  >快車肉乾</a
                >
              </li>
            </ul>
          </div>
          <table class="table" id="datatable">
            <thead>
              <tr>
                <th style="width: 5%">No.</th>
                <th style="width: 10%">商品圖片</th>
                <th style="width: 20%">商品名稱</th>
                <th style="width: 50%">商品內容</th>
                <th style="width: 10%">價錢</th>
                <th style="width: 5%"></th>
              </tr>
              <tr v-for="(item, key, index) in getGifts" :key="index">
                <td>{{ item.no }}</td>
                <td>
                  <img
                    :src="`./img/gift/${item.price}_${item.no}.jpg`"
                    alt=""
                  />
                </td>
                <td style="text-align: left; font-weight: 700">
                  {{ item.name }}
                </td>
                <td style="text-align: left; font-weight: 400">
                  <p v-html="item.content"></p>
                </td>
                <td>{{ item.price | currency }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.note }}</td>
                <td style="text-align: right">
                  <!-- <a v-show="!checkLike(key)" @click="likeTheItem(key, true)"
                    ><img src="~/img/icon/heart.png" alt="" />
                  </a>
                  <a v-show="checkLike(key)" @click="likeTheItem(key, false)"
                    ><img src="~/img/icon/heart_red.png" alt="" />
                  </a> -->
                  <!-- <button
                    type="button"
                    class="close ml-auto"
                    aria-label="Close"
                    @click="removeTodo(key)"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button> -->
                </td>
              </tr>
            </thead>
          </table>
          <div class="card-footer d-flex justify-content-between">
            <span>共有 {{ Object.values(gifts).length }} 筆</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DB } from "~/services/fireinit.js";
export default {
  head() {
    return {
      title: "2022 春年菜伴手禮",
    };
  },
  data() {
    return {
      likes: [],
      gifts: [],
      tempGift: {
        id: "",
        no: null,
        name: "",
        content: "",
        price: 1000,
        note: "",
        value: 0,
        like: false,
      },
      visibility: 0,
    };
  },
  filters: {
    dollarSign: function (n) {
      return `$ ${n}`;
    },
    currency: function (n) {
      return parseFloat(n)
        .toFixed()
        .replace(/./g, function (c, i, a) {
          return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    },
  },
  methods: {
    changeVisibility: function (type) {
      this.visibility = parseInt(type);
      this.refreshJournals();
    },
    addGift: function () {
      if (!this.tempGift.name) {
        return alert("請輸入商品名稱");
      } else if (!this.tempGift.content) {
        return alert("請輸入內容");
      } else if (!this.tempGift.price) {
        return alert("請輸入價格");
      }
      var newChildRef = DB.ref("Gift").push(this.tempGift);

      var tmpket = newChildRef.key;
      this.tempGift.id = tmpket;
      this.gifts[tmpket] = this.tempGift;
      this.tempGift = {
        id: "",
        no: null,
        name: "",
        content: "",
        price: this.tempGift.price,
        note: "",
        value: 0,
        like: false,
      };
      this.$nuxt.refresh();
    },
    checkLike: function (key) {
      return this.likes.indexOf(key) > -1;
    },
    likeTheItem: function (key, value) {
      if (value) {
        this.likes.push(key);
      } else {
        let index = this.likes.indexOf(key);
        this.likes.splice(index, 1);
      }
      sessionStorage.setItem("likes", this.likes);
      this.$nuxt.refresh();
    },
    removeTodo: function (key) {
      delete this.gifts[key];
      DB.ref("Gift").child(key).remove();

      this.$nuxt.refresh();
    },
    refreshJournals() {
      this.$fetch();
    },
  },
  async fetch() {
    if (this.visibility > 8000) {
      var data = DB.ref("Gift");
    } else if (this.visibility > 0) {
      var data = DB.ref("Gift").orderByChild("price").equalTo(this.visibility);
    } else {
      var data = DB.ref("Gift");
    }
    this.gifts = await data.once("value", function (snapshot) {
      console.log("data num:", snapshot.numChildren());
    });

    if (this.gifts.exists() > 0) {
      var datago = JSON.stringify(this.gifts);
      this.gifts = JSON.parse(datago);
    } else {
      this.gifts = [];
    }
  },
  mounted() {
    // if (!sessionStorage["likes"]) {
    //   sessionStorage["likes"] = [];
    // } else {
    //   this.likes = sessionStorage["likes"].split(",");
    // }
  },
  computed: {
    getGifts: function () {
      // if (this.visibility === 9999) {
      //   return Object.values(this.gifts).filter((item, key, index) => {
      //       console.log("item:"+key+"index:"+index)
      //       return this.likes.indexOf(item.key) > -1
      //   });
      // } else
      switch (this.visibility) {
        case 8001:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("牛") || item.content.includes("牛");
          });
          break;
        case 8002:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("豬") || item.content.includes("豬");
          });
          break;
        case 8003:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("雞") || item.content.includes("雞");
          });
          break;
        case 8004:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("帝王蟹") || item.content.includes("帝王蟹")
            );
          });
          break;
        case 8005:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("龍蝦") || item.content.includes("龍蝦");
          });
          break;
        case 8006:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("燒肉") || item.content.includes("燒肉");
          });
          break;
        case 8007:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("海鮮") || item.content.includes("海鮮") || item.name.includes("魚") || item.content.includes("魚")
            );
          });
          break;
        case 8008:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("烏魚子") || item.content.includes("烏魚子")
            );
          });
          break;
        case 8009:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("佛跳牆") || item.content.includes("佛跳牆")
            );
          });
          break;
        case 8010:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("火鍋") || item.content.includes("火鍋");
          });
          break;
        case 8011:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("巧克力") || item.content.includes("巧克力")
            );
          });
          break;
        case 8012:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("橄欖油") || item.content.includes("橄欖油")
            );
          });
          break;
        case 8013:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("麵") || item.content.includes("麵");
          });
          break;
        case 8014:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("酒") || item.content.includes("酒");
          });
          break;
        case 8015:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("茶") || item.content.includes("茶") || item.name.includes("烏龍") || item.content.includes("烏龍")
            );
          });
          break;
        case 8016:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("素") || item.content.includes("素");
          });
          break;
        case 8017:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("年菜") || item.content.includes("年菜");
          });
          break;
        case 8018:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("禮盒") || item.content.includes("禮盒") || item.name.includes("禮箱") || item.content.includes("禮箱")
            );
          });
          break;
        case 8019:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("套餐") || item.content.includes("套餐");
          });
          break;
        case 9001:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("鴻海") || item.content.includes("鴻海");
          });
          break;
        case 9002:
          return Object.values(this.gifts).filter((item) => {
            return item.name.includes("王品") || item.content.includes("王品") || item.name.includes("石二鍋") || item.content.includes("石二鍋");
          });
          break;
        case 9003:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("米其林") || item.content.includes("米其林")
            );
          });
          break;
        case 9004:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("海底撈") || item.content.includes("海底撈")
            );
          });
          break;
        case 9005:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("阿霞飯店") || item.content.includes("阿霞飯店")
            );
          });
          break;
        case 9006:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("黑毛屋") || item.content.includes("黑毛屋")
            );
          });
          break;
        case 9007:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("喜來登") || item.content.includes("喜來登")
            );
          });
          break;
        case 9008:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("老協珍") || item.content.includes("老協珍")
            );
          });
          break;
        case 9009:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("寬心園") || item.content.includes("寬心園")
            );
          });
          break;
        case 9010:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("鼎泰豐") || item.content.includes("鼎泰豐")
            );
          });
          break;
        case 9011:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("黑橋牌") || item.content.includes("黑橋牌")
            );
          });
          break;
        case 9012:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("天香樓") || item.content.includes("天香樓")
            );
          });
          break;
        case 9013:
          return Object.values(this.gifts).filter((item) => {
            return (
              item.name.includes("快車肉乾") ||
              item.content.includes("快車肉乾")
            );
          });
          break;
        default:
          return this.gifts;
          break;
      }
    },
  },
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>
