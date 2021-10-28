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
          <option selected="selected" value="110">110年度</option>
        </select>
        <select
          id="selectMonth"
          class="form-control"
          v-model="selectedMonth"
          value="selectedMonth"
        >
          <option value="12">12月份</option>
          <option value="11">11月份</option>
          <option selected="selected" value="10">10月份</option>
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
        <button class="btn btn-primary" type="button" @click="refreshOutput">查詢</button>
        
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item" v-for="(item, index) in dates" :key="index">
                    <a class="nav-link" :class="{ active: selectedDay == item}" @click="changeDay(item)">{{selectedMonth}}/{{item}}</a>
                </li>
            </ul>
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: visibility == 0}" @click="changeVisibility(0)">全部</a>
                </li>
                <li class="nav-item" v-for="(item, index) in output" :key="index">
                    <a class="nav-link" :class="{ active: visibility == index+1}" @click="changeVisibility(index+1)">{{item.name}}</a>
                </li>
                <li>
                    <button class="btn btn-primary" type="button" @click="openNewOutputItem">新增</button>
                </li>
            </ul>
          </div>
          <table class="table" id="datatable">
            <thead>
              <tr>
                <th colspan="5">{{selectedMonth}}/{{selectedDay}}</th>
              </tr>
              <tr>
                <th style="width: 5%">員工</th>
                <th style="width: 5%">顏色</th>
                <th style="width: 10%">重量</th>
                <th style="width: 80%">紀錄</th>
              </tr>
              <tr v-for="(item, index) in filterOutput" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.weight }}</td>
                <td style="text-align: left;padding-left: 12px;display: flex;flex-wrap: wrap;">
                  <div v-for="(subItem, index) in item.records" :key="index" style="padding: 0px 10px;border: 1px solid gray;margin-right: 10px;margin-bottom: 10px;">
                    {{ subItem}}
                    <button type="button" class="close ml-auto" aria-label="Close" @click="refreshOutput">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </td>
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
                <div v-for="(color, color_index) in 4" :key="color_index" style="text-align: left;"><span style="color: blue;">{{color_index+1}}號目前累計：</span>
                    <p style="display: inline;" v-for="(subItem, index) in recordsOf(getIndexOfRow(output[selectedMember-1].no, color_index+1))" :key="index">{{subItem}}、</p>
                </div>
                <hr>
                <div><span style="font-size: 26px; color: blue;font-weight: bold;">{{output[selectedMember-1].name}}{{selectedColor}}</span> 新增重量：<span style="font-size: 26px; color: red;font-weight: bold;">{{tempWeight}}</span></div>
                <div>員工<button style="width: 50px; height: 50px;" v-for="(item, index) in output" :key="index" @click="selectedMember = index+1">{{item.name}}</button></div>
                <div>顏色<button style="width: 50px; height: 50px;" v-for="(color, color_index) in 4" :key="color_index" @click="selectedColor = color_index+1">{{color_index+1}}</button></div>
                <div class="subTitle">
                    <div>十<button style="width: 32px; height: 50px;" v-for="(n,index) in 10" :key="index" @click="tempWeight=index*10">{{index}}</button></div>
                    <div>個<button style="width: 32px; height: 50px;" v-for="(n,index) in 10" :key="index" @click="tempWeight=tempWeight+index">{{index}}</button></div>
                </div>
            </div>
            <div class="actions">
                <button @click="close" style="width: 33.333%; height: 50px;">取消</button>
                <button @click="confirmAdd" style="width: 33.333%; height: 50px; color: blue;">儲存/關閉</button>
                <button @click="addMore" style="width: 33.333%; height: 50px; color: green;">儲存/再一筆</button>
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
      selectedYear: 110,
      selectedMonth: 10,
      selectedDay: 1,
      selectedMember: 1,
      selectedColor: 1,
      dates: ['1','2','3','4','5'],
      output: [
            {
                no: 1,
                name: '美',
                output_records: [
                    {
                    date: '10/1',
                    color: 1,
                    weight: 79,
                    records: [21, 17, 21, 20],
                    },
                    {
                    date: '10/1',
                    color: 2,
                    weight: 404,
                    records: [18, 22, 22, 18, 21, 19, 20, 23, 22, 21, 25, 22, 21, 24, 21, 20,21, 24, 20,],
                    },
                    {
                    date: '10/1',
                    color: 3,
                    weight: 0,
                    records: [],
                    },
                    {
                    date: '10/1',
                    color: 4,
                    weight: 86,
                    records: [22, 21, 20, 23],
                }]
            },
            {
                no: 2,
                name: '玉',
                output_records: [
                    {
                    date: '10/1',
                    color: 1,
                    weight: 64,
                    records: [23, 21, 20],
                    },
                    {
                    date: '10/1',
                    color: 2,
                    weight: 241,
                    records: [21, 20, 20, 23, 24, 21, 23, 20, 23, 24, 22],
                    },
                    {
                    date: '10/1',
                    color: 3,
                    weight: 0,
                    records: [],
                    },
                    {
                    date: '10/1',
                    color: 4,
                    weight: 56,
                    records: [19, 20, 17],
                    }
                ]
            },
            {
                no: 3,
                name: '小玉',
                output_records: [
                    {
                    date: '10/1',
                    color: 1,
                    weight: 101,
                    records: [17, 20, 23, 20, 21],
                    },
                    {
                    date: '10/1',
                    color: 2,
                    weight: 331,
                    records: [22, 20, 22, 24, 24, 20, 22, 24, 23, 20, 19, 22, 24, 22, 23],
                    },
                    {
                    date: '10/1',
                    color: 3,
                    weight: 0,
                    records: [],
                    },
                    {
                    date: '10/1',
                    color: 4,
                    weight: 95,
                    records: [21, 20, 20, 19, 15],
                    }
                ]
            },
            {
                no: 4,
                name: '滿',
                output_records: [
                    {
                    date: '10/1',
                    color: 1,
                    weight: 49,
                    records: [14, 15, 20],
                    },
                    {
                    date: '10/1',
                    color: 2,
                    weight: 431,
                    records: [24, 24, 21, 23, 20, 19, 18, 21, 21, 22, 18, 20, 24, 22, 20, 19, 20, 18, 20, 17, 20],
                    },
                    {
                    date: '10/1',
                    color: 3,
                    weight: 0,
                    records: [],
                    },
                    {
                    date: '10/1',
                    color: 4,
                    weight: 40,
                    records: [21, 19],
                    }
                ]
            }
          ],
      tempOutput: {
        no: 0,
        date: '',
        color: 0,
        weight: 0,
        records: [],
      },
      visibility: 0,
      newOutput: false,
      tempWeight: 0,
    };
  },
  methods: {
    changeDay: function(day) {
        this.selectedDay = parseInt(day);
    },
    changeVisibility: function(type) {
        this.visibility = type;
    },
    openNewOutputItem: function() {
        this.newOutput = true;
    },
    refreshOutput: function() {
    },
    close: function() {
        this.newOutput = false;
        this.tempWeight = 0;
        this.tempWeights = [];
    },
    confirmAdd: function() {
        this.newOutput = false;
        this.output[this.selectedMember-1].output_records[this.selectedColor-1].records.push(this.tempWeight);
        this.tempWeight = 0;
        this.tempWeights = 0;
    },
    addMore: function() {
        this.output[this.selectedMember-1].output_records[this.selectedColor-1].records.push(this.tempWeight);
        this.tempWeight = 0;
    },
    recordsOf: function(row) {
        if (row == null) {
            return [];
        } else {
            return this.filterOutput[row].records;
        }
    },
    getIndexOfRow: function(no, colorIndex) {
        var row = null;
        this.filterOutput.forEach(function (value, i) {
            if (value.no == no && value.color == colorIndex) {
                row = i;
            }
        })
        return row;
    }
  },
  computed: {
    filterOutput: function() {
        var records = [];
        for(var i = 0; i < this.output.length; i++){
            for(var k = 0; k < this.output[i].output_records.length; k++){
                var record = this.output[i].output_records[k];
                record.name = this.output[i].name;
                record.no = this.output[i].no;
                records.push(record);
            }
        }
        if (this.visibility>0) {
            return records.filter(item=>item.date==(this.selectedMonth+'/'+this.selectedDay)).filter(item=>item.no==this.visibility)
        } else {
            return records.filter(item=>item.date==(this.selectedMonth+'/'+this.selectedDay));
        }
    }
  }
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>
