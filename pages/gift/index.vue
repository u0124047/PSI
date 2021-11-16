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
              <li
                class="nav-item"
                v-for="(category, index) in categories"
                :key="index"
              >
                <a
                  class="nav-link"
                  :class="{ active: visibility == category.value }"
                  @click="changeVisibility(category.value)"
                  >{{ category.title }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9999 }"
                  @click="changeVisibility(9999)"
                  style="color: red"
                  >我的最愛</a
                >
              </li>
            </ul>
          </div>
          <table class="table" id="datatable">
            <thead>
              <tr></tr>
              <tr>
                <th style="width: 5%">No.</th>
                <th style="width: 20%">商品圖片</th>
                <th style="width: 25%">商品名稱</th>
                <th style="width: 45%">商品內容</th>
                <th style="width: 10%">價錢</th>
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
                <td>
                  <span
                    v-show="item.price == 1000"
                    style="
                      color: ForestGreen;
                      font-weight: 500;
                      font-size: 20px;
                    "
                    >{{ item.price | currency }}</span
                  >
                  <span
                    v-show="item.price == 2000"
                    style="color: DodgerBlue; font-weight: 500; font-size: 20px"
                    >{{ item.price | currency }}</span
                  >
                  <span
                    v-show="item.price == 3000"
                    style="color: DarkOrange; font-weight: 500; font-size: 20px"
                    >{{ item.price | currency }}</span
                  >
                  <span
                    v-show="item.price == 5000"
                    style="color: Tomato; font-weight: 500; font-size: 20px"
                    >{{ item.price | currency }}</span
                  >
                </td>
                <!-- <td>{{ item.value }}</td>
                <td>{{ item.note }}</td> -->
                <td style="text-align: right">
                  <a v-show="!checkLike(key)" @click="likeTheItem(key, true)"
                    >加入我的最愛
                  </a>
                  <a
                    v-show="checkLike(key)"
                    @click="likeTheItem(key, false)"
                    style="color: red"
                    >取消我的最愛
                  </a>
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
            <span>共有 {{ Object.values(getGifts).length }} 筆</span>
          </div>
        </div>
      </div>
      <button @click="topFunction" id="topBtn" title="TOP">Top</button>
    </div>
  </div>
</template>

<script>
import { DB } from "~/services/fireinit.js";
export default {
  head() {
    return {
      title: "2022新春伴手禮",
    };
  },
  data() {
    return {
      categories: [
        { title: "1000", value: 1000, words: [] },
        { title: "2000", value: 2000, words: [] },
        { title: "3000", value: 3000, words: [] },
        { title: "5000", value: 5000, words: [] },

        { title: "牛", value: 8001, words: ["牛"] },
        { title: "豬", value: 8002, words: ["豬"] },
        { title: "雞", value: 8003, words: ["雞"] },
        { title: "帝王蟹", value: 8004, words: ["帝王蟹"] },
        { title: "龍蝦", value: 8005, words: ["龍蝦"] },
        { title: "燒肉", value: 8006, words: ["燒肉"] },
        { title: "海鮮", value: 8007, words: ["海鮮", "魚"] },
        { title: "烏魚子", value: 8008, words: ["烏魚子"] },
        { title: "佛跳牆", value: 8009, words: ["佛跳牆"] },
        { title: "火鍋", value: 8010, words: ["火鍋"] },
        { title: "巧克力", value: 8011, words: ["巧克力"] },
        { title: "橄欖油", value: 8012, words: ["橄欖油"] },
        { title: "麵", value: 8013, words: ["麵"] },
        { title: "酒", value: 8014, words: ["酒"] },
        { title: "茶", value: 8015, words: ["紅茶", "烏龍茶"] },
        { title: "素", value: 8016, words: ["素"] },
        { title: "年菜", value: 8017, words: ["年菜"] },
        { title: "禮盒", value: 8018, words: ["禮盒", "禮箱"] },
        { title: "套餐", value: 8019, words: ["套餐"] },

        { title: "鴻海", value: 9001, words: ["鴻海"] },
        { title: "王品", value: 9002, words: ["王品", "石二鍋", "青花驕"] },
        { title: "米其林", value: 9003, words: ["米其林"] },
        { title: "海底撈", value: 9004, words: ["海底撈"] },
        { title: "阿霞飯店", value: 9005, words: ["阿霞飯店"] },
        { title: "黑毛屋", value: 9006, words: ["黑毛屋"] },
        { title: "喜來登", value: 9007, words: ["喜來登"] },
        { title: "老協珍", value: 9008, words: ["老協珍"] },
        { title: "寬心園", value: 9009, words: ["寬心園"] },
        { title: "鼎泰豐", value: 9010, words: ["鼎泰豐"] },
        { title: "黑橋牌", value: 9011, words: ["黑橋牌"] },
        { title: "天香樓", value: 9012, words: ["天香樓"] },
        { title: "快車肉乾", value: 9013, words: ["快車肉乾"] },
      ],

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
      if (this.likes.indexOf(key) > -1) {
        let index = this.likes.indexOf(key);
        this.likes.splice(index, 1);
      } else {
        this.likes.push(key);
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
    scrollFunction() {
      var topbutton = document.getElementById("topBtn");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.style.display = "block";
      } else {
        topbutton.style.display = "none";
      }
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  async fetch() {
    if (this.visibility > 0 && this.visibility < 8000) {
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
    if (!sessionStorage["likes"]) {
      sessionStorage["likes"] = [];
    } else {
      this.likes = sessionStorage["likes"].split(",");
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.scrollFunction);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  computed: {
    getGifts: function () {
      switch (true) {
        case this.visibility == 9999:
          let likes = this.likes;
          Object.filter = function (mainObject, filterFunction) {
            return Object.keys(mainObject)
              .filter(function (ObjectKey) {
                return filterFunction(mainObject[ObjectKey], ObjectKey);
              })
              .sort(function order(key1, key2) {
                return likes.indexOf(key1) > likes.indexOf(key2) ? 1 : -1;
              })
              .reduce(function (result, ObjectKey) {
                result[ObjectKey] = mainObject[ObjectKey];
                return result;
              }, {});
          };
          return Object.filter(this.gifts, function (_, key) {
            return likes.indexOf(key) > -1;
          });
        case this.visibility > 8000:
          Object.filter = function (mainObject, filterFunction) {
            return Object.keys(mainObject)
              .filter(function (ObjectKey) {
                return filterFunction(mainObject[ObjectKey]);
              })
              .reduce(function (result, ObjectKey) {
                result[ObjectKey] = mainObject[ObjectKey];
                return result;
              }, {});
          };
          var row = 0;
          let categories = this.categories;
          categories.forEach((element, index) => {
            if (element.value === this.visibility) {
              row = index;
            }
          });
          return Object.filter(this.gifts, function (gift) {
            var value = 0;
            let pattern = categories[row].words;
            pattern.forEach(function (word) {
              value =
                value +
                (gift.name.includes(word) || gift.content.includes(word));
            });
            return value === 1;
          });
        default:
          return this.gifts;
      }
    },
  },
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>
