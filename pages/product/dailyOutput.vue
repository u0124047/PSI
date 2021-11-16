<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrap_main">
      <div id="app">
        <select
          id="selectYear"
          class="form-control"
          v-model="selectedYear"
          value="selectedYear"
        >
          <option selected="selected" value="2021">2021年</option>
        </select>
        <select
          id="selectMonth"
          class="form-control"
          v-model="selectedMonth"
          value="selectedMonth"
        >
          <option value="12">12月份</option>
          <option selected="selected" value="11">11月份</option>
          <option value="10">10月份</option>
          <option value="9">9月份</option>
          <option value="8">8月份</option>
          <option value="7">7月份</option>
          <option value="6">6月份</option>
          <option value="5">5月份</option>
          <option value="4">4月份</option>
          <option value="3">3月份</option>
          <option value="2">2月份</option>
          <option value="1">1月份</option>
        </select>
        <button class="btn btn-primary" type="button" @click="refreshOutput">
          查詢
        </button>
        <button class="btn btn-primary" type="button" @click="getToday">
          今天
        </button>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs nav_date">
              <li
                class="nav-item"
                v-for="(item, itemIndex) in getFirstDayInMonth"
                :key="'nav-date-' + itemIndex"
              ></li>
              <li
                class="nav-item"
                v-for="(item, itemIndex) in getDaysInMonth"
                :key="itemIndex"
              >
                <a
                  class="nav-link"
                  :class="{ active: selectedDay == item }"
                  @click="changeDay(item)"
                  ><span
                    :class="{
                      isToday:
                        selectedMonth == today.month && item == today.day,
                    }"
                    >{{ selectedMonth }}/{{ item }}({{
                      getDayOfWeek(item)
                    }})</span
                  >
                </a>
              </li>
            </ul>
          </div>
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
                v-for="(memberId, memberIndex) in Object.keys(output)"
                :key="memberIndex"
              >
                <a
                  class="nav-link"
                  :class="{ active: visibility == memberId }"
                  @click="changeVisibility(memberId)"
                >
                  {{ members[memberId].name }}
                </a>
              </li>
              <li>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="openNewOutputItem"
                >
                  新增
                </button>
              </li>
            </ul>
          </div>
          <table class="table" id="datatable">
            <thead>
              <tr>
                <th colspan="5" style="color: orange; font-size: 26px">
                  日期 {{ selectedMonth }}/{{ selectedDay }}({{
                    getDayOfWeek(selectedDay)
                  }})
                </th>
              </tr>
              <tr>
                <th style="width: 10%">員工</th>
                <th style="width: 10%">顏色</th>
                <th style="width: 10%">重量</th>
                <th style="width: 80%">紀錄</th>
              </tr>
              <template v-for="(member, memberKey) in filterOutput">
                <tr
                  v-for="(item, colorKey, colorIndex) in member"
                  :key="'data-' + memberKey + colorIndex"
                >
                  <td>{{ members[memberKey].name }}</td>
                  <td>{{ colorKey }}</td>
                  <td>{{ sum(memberKey, colorKey) }}</td>
                  <td
                    style="
                      text-align: left;
                      padding-left: 12px;
                      display: flex;
                      flex-wrap: wrap;
                      justify-content: flex-start;
                    "
                  >
                    <div
                      v-for="(subItem, subItemKey, subItemIndex) in item"
                      :key="subItemIndex"
                      style="
                        border: 1px solid lightgray;
                        margin-right: 10px;
                        margin-bottom: 10px;
                      "
                    >
                      <button
                        type="button"
                        class="close ml-auto"
                        aria-label="Close"
                        @click="removeTodo(memberKey, colorKey, subItemKey)"
                      >
                        {{ subItem }}
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <tr>
                <th colspan="5" v-show="filterOutput.length == 0">沒有資料</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
    <div class="addOutputCard" v-show="newOutput">
      <div class="backgroud"></div>
      <div class="msg_box">
        <div class="msg_content">
          <div class="title"></div>
          <template v-for="(member, memberKey, memberIndex) in filterOutput">
            <div
              v-for="(color, colorKey, colorIndex) in member"
              :key="'content-' + memberIndex + colorIndex"
              style="text-align: left"
            >
              <span style="color: blue">{{ colorKey }}號目前累計：</span>
              <p
                style="display: inline"
                v-for="(subItem, subItemIndex) in color"
                :key="subItemIndex"
              >
                {{ subItem }}、
              </p>
            </div>
          </template>
          <hr />
          <div>
            <span style="font-size: 26px; color: blue; font-weight: bold"
              >{{ members[selectedMember].name }}{{ selectedColor }}</span
            >
            新增重量：<span
              style="font-size: 26px; color: red; font-weight: bold"
              >{{ tempWeight }}</span
            >
          </div>
          <div>
            <button
              style="width: 25%; height: 50px"
              v-for="(member, memberKey, memberIndex) in members"
              :key="memberIndex"
              @click="
                selectedMember = memberKey;
                visibility = memberKey;
              "
            >
              {{ member.name }}
            </button>
          </div>
          <div>
            <button
              style="width: 25%; height: 50px"
              v-for="(color, colorIndex) in 4"
              :key="colorIndex"
              @click="selectedColor = colorIndex + 1"
            >
              {{ colorIndex + 1 }}
            </button>
          </div>
          <div class="subTitle">
            <div>
              十<button
                style="width: 60px; height: 50px"
                v-for="(n, index) in 5"
                :key="index"
                @click="tempWeight = index * 10"
              >
                {{ index }}
              </button>
            </div>
            <div>
              個<button
                style="width: 60px; height: 50px"
                v-for="(n, index) in 10"
                :key="index"
                @click="tempWeight = tempWeight + index"
              >
                {{ index }}
              </button>
            </div>
          </div>
        </div>
        <div class="actions">
          <button @click="close" style="width: 33.333%; height: 50px">
            取消
          </button>
          <button
            @click="confirmAdd"
            style="width: 33.333%; height: 50px; color: blue"
          >
            儲存/關閉
          </button>
          <button
            @click="addMore"
            style="width: 33.333%; height: 50px; color: green"
          >
            儲存/再一筆
          </button>
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
      title: "日記帳",
    };
  },
  data() {
    return {
      today: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
      selectedYear: 110,
      selectedMonth: 11,
      selectedDay: 1,
      selectedMember: 1,
      selectedColor: 1,
      output: [],
      tempOutput: {
        date: "",
        color: 0,
        weight: 0,
      },
      visibility: 0,
      newOutput: false,
      tempWeight: 0,
      members: {
        1: { name: "美" },
        2: { name: "小玉" },
        3: { name: "玉" },
        4: { name: "鳳" },
      },
      day_list: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  methods: {
    changeDay: function (day) {
      this.selectedDay = parseInt(day);
      this.refreshOutput();
    },
    changeVisibility: function (type) {
      this.visibility = parseInt(type);
      this.refreshOutput();
    },
    openNewOutputItem: function () {
      this.newOutput = true;
    },
    refreshOutput: function () {
      this.$fetch();
    },
    close: function () {
      this.newOutput = false;
      this.tempWeight = 0;
    },
    confirmAdd: function () {
      this.newOutput = false;
      var newChildRef = DB.ref("DailyOutput")
        .child(this.selectedYear)
        .child(this.selectedMonth)
        .child(this.selectedDay)
        .child(this.selectedMember)
        .child(this.selectedColor)
        .push(this.tempWeight);
      this.tempWeight = 0;
      this.$nuxt.refresh();
    },
    addMore: function () {
      var newChildRef = DB.ref("DailyOutput")
        .child(this.selectedYear)
        .child(this.selectedMonth)
        .child(this.selectedDay)
        .child(this.selectedMember)
        .child(this.selectedColor)
        .push(this.tempWeight);
      this.tempWeight = 0;
      this.$nuxt.refresh();
    },
    removeTodo: function (memberKey, colorKey, key) {
      delete this.output[memberKey][colorKey][key];
      DB.ref("DailyOutput")
        .child(this.selectedYear)
        .child(this.selectedMonth)
        .child(this.selectedDay)
        .child(memberKey)
        .child(colorKey)
        .child(key)
        .remove();
      this.$nuxt.refresh();
    },
    getDayOfWeek(day) {
      var date = new Date(this.selectedYear, this.selectedMonth - 1, day);
      return this.day_list[date.getDay()];
    },
    getToday() {
      var today = new Date();
      this.selectedYear = parseInt(today.getFullYear());
      this.selectedMonth = String(today.getMonth() + 1).padStart(2, "0");
      this.selectedDay = String(today.getDate()).padStart(2, "0");
      this.today = {
        year: this.selectedYear,
        month: this.selectedMonth,
        day: this.selectedDay,
        dayOfWeek: today.getDay(),
      };
      this.refreshOutput();
    },
    sum: function (memberKey, colorKey) {
      return Object.values(this.filterOutput[memberKey][colorKey]).reduce(
        function (v1, v2) {
          return v1 + v2;
        }
      );
    },
  },
  async fetch() {
    var data = DB.ref("DailyOutput")
      .child(this.selectedYear)
      .child(this.selectedMonth)
      .child(this.selectedDay);

    this.output = await data.once("value", function (snapshot) {
      console.log("data num:", snapshot.numChildren());
    });

    if (this.output.exists() > 0) {
      var datago = JSON.stringify(this.output);
      this.output = JSON.parse(datago);
    } else {
      this.output = [];
    }
  },
  created() {
    this.getToday();
  },
  computed: {
    getFirstDayInMonth: function () {
      var day = new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();
      return day;
    },
    getDaysInMonth: function () {
      var date = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      return date;
    },
    filterOutput: function () {
      let visibility = this.visibility;
      if (visibility > 0) {
        Object.filter = function (mainObject, filterFunction) {
          return Object.keys(mainObject)
            .filter(function (ObjectKey) {
              return filterFunction(mainObject[ObjectKey], ObjectKey);
            })
            .reduce(function (result, ObjectKey) {
              result[ObjectKey] = mainObject[ObjectKey];
              return result;
            }, {});
        };
        return Object.filter(this.output, function (_, memberId) {
          return memberId == visibility;
        });
      } else {
        return this.output;
      }
    },
  },
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>
