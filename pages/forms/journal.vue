<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrap_main">

<div id="app">
  <select id="selectYear" class="form-control" v-model="journalYear" value="journalYear">
    <option selected="selected" value=110>110年度</option>
  </select>
  <select id="selectMonth" class="form-control" v-model="journalMonth" value="journalMonth">
    <option selected="selected" value=7>7月份</option>
    <option value=6>6月份</option>
    <option value=5>5月份</option>
    <option value=4>4月份</option>
    <option value=3>3月份</option>
    <option value=2>2月份</option>
    <option value=1>1月份</option>
  </select>

  <div class="input-group mb-3">
    <div>
      <table class="table">
        <thead>
          <tr>
            <th style="width: 10%;">日</th>
            <th style="width: 15%;">買賣</th>
            <th style="width: 15%;">進銷</th>
            <th style="width: 15%;">品名</th>
            <th style="width: 15%;">數量</th>
            <th style="width: 15%;">單位</th>
            <th style="width: 15%;">單價</th>
            <th style="width: 15%;">金額</th>
            <th style="width: 5%;"></th>
          </tr>     
          <tr>
            <td><input type="text" class="form-control" placeholder="日" v-model="journalDay"></td>
            <td><select id="selectCD" class="form-control" v-model="tempJournal.CD" value="tempJournal.CD" >
              <option value="D">賣出</option>
              <option selected="selected" value="C">買入</option></select></td>
            <td><select id="selectType" class="form-control" v-model="tempJournal.type" value="tempJournal.type">
                <option selected="selected" value=1>廢料</option>
                <option value=2>進貨</option></select></td>
            <td><select id="selectTitle" class="form-control" v-model="tempJournal.title" value="tempJournal.title">
                <option selected="selected" value="廢料">廢料</option>
                <option value="大白料">大白料</option>
                <option value="色料">色料</option>
                <option value="垃圾袋">垃圾袋</option></select></td>
            <td><input type="text" class="form-control" placeholder="單位" v-model="tempJournal.num"></td>
            <td><select id="selectUnit" class="form-control" v-model="tempJournal.unit" value="KG">
                <option selected="selected" value="KG">KG</option></select></td>
            <td><input type="text" class="form-control" placeholder="單價" v-model="tempJournal.unitPrice"></td>
            <td>{{jurnalAmount | currency }}</td>
            <td><div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="addJournal">新增</button>
              </div></td>
          </tr>   
        </thead>
      </table>
    </div>
  </div>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="{ 'active' : visibility == 0 }" @click="visibility = 0">全部</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ 'active' : visibility == 1 }" @click="visibility = 1">佳佳廢料</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ 'active' : visibility == 2 }" @click="visibility = 2">佳佳進貨</a>
        </li>
        <li>
          <button class="btn btn-primary" type="button" @click="exportJournal">下載</button>
        </li>
      </ul>
    </div>
    <table class="table" id="datatable">
        <thead>
          <tr>
            <th colspan="9">{{journalYear}}年{{journalMonth}}月份 {{visibility == 0 ? '佳佳交易明細' : visibility == 1 ? '佳佳廢料明細' : '佳佳進貨明細'}}
            </th>
          </tr>
          <tr>
            <th>No.</th>
            <th>日期</th>
            <th>品名</th>
            <th>數量</th>
            <th>單位</th>
            <th>單價</th>
            <th>賣出</th>
            <th>買入</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in filterJournals" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.date}}</td>
            <td>{{item.title}}</td>
            <td style="text-align: right;">{{item.num | currency }}</td>
            <td>{{item.unit}}</td>
            <td>{{item.unitPrice}}</td>
            <td style="text-align: right;">{{item.CD == 'D' ? item.amount : 0.0 | currency }}</td>
            <td style="text-align: right;">{{item.CD == 'C' ? item.amount : 0.0 | currency }}</td>
            <td style="text-align: right;"><button type="button" class="close ml-auto" aria-label="Close" @click="removeTodo(item.id)">
              <span aria-hidden="true">&times;</span>
            </button></td>           
          </tr>
          <tr style="border-top: solid;">
            <td></td>
            <td></td>
            <td>小計</td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right;">{{subTotalOfDebit | currency | dollarSign }}</td>
            <td style="text-align: right;">{{subTotalOfCredit | currency | dollarSign }}</td>       
            <td></td>
          </tr>
          <tr style="border-top: solid;border-bottom: double;">
            <td></td>
            <td></td>
            <td>總計</td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right;">{{total>=0 ? total : 0.0 | currency | dollarSign }}</td>
            <td style="text-align: right;">{{!(total>=0) ? Math.abs(total) : 0.0 | currency | dollarSign }}</td>
            <td></td>         
          </tr>
        </thead>
      </table>
    <div class="card-footer d-flex justify-content-between">
      <span>共有 {{filterJournals.length}} 筆</span>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import {db} from '~/plugins/firebase.js'
import Header from "~/components/Header.vue";
import axios from 'axios'
export default {
  head(){
    return{
      title: '日記帳'
    }
  },
  data() {
    return {
      journalYear: 110,
      journalMonth: 7,
      journalDay: 9,
      journals: [],
      tempJournal: {
        id: "",
        date: "",
        title: "廢料",
        num: 0.0,
        unit: "KG",
        unitPrice: 0.0,
        amount: 0.0,
        type: 1,
        CD: "C",
      },
      visibility: 0,
    };
  },
  filters: {
    dollarSign: function (n) {
      return `$ ${n}`
    },
    currency: function(n) {
      return parseFloat(n).toFixed().replace(/./g, function(c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      });
    }
  },
  methods: {
    addJournal: function() {
        if (!this.journalDay) {
            return alert('請選則日期');
        } else if (!this.tempJournal.title) {
            return alert('請輸入品名');
        } else if (!this.tempJournal.num) {
            return alert('請輸入數量');
        } else if (!this.tempJournal.unitPrice) {
            return alert('請輸入單價');
        }
        this.tempJournal.date = this.journalMonth + "/" + this.journalDay;
        console.log(this.tempJournal)
        var newChildRef = db.ref("Journals").push(this.tempJournal);
        if (newChildRef.key != "") {
          alert('建立成功');
        }
        this.tempJournal.id = newChildRef.key;
        this.journals.push(this.tempJournal);
        this.journals.splice();
        this.tempJournal = {
            id: '',
            date: '',
            title: this.tempJournal.title,
            num: 0.0,
            unit: 'KG',
            unitPrice: 0.0,
            amount: 0.0,
            type: this.tempJournal.type,
            CD: this.tempJournal.CD
        }
    },
    removeTodo: function(key) {
      this.journals.splice(this.journals.findIndex(obj=> obj.id === key), 1);
      db.ref("Journals").child(key).remove();
    },
    exportJournal: function() {
      var filename = this.journalYear + "年" + this.journalMonth + "月份" + (this.visibility == 0 ? '佳佳交易明細' : this.visibility == 1 ? '佳佳廢料明細' : '佳佳進貨明細') + '.xlsx'
    	var wb = XLSX.utils.table_to_book(document.getElementById('datatable'));
			XLSX.writeFile(wb, filename);
    }
  },
  async asyncData(journals){
  try {
      const res = await axios.get('https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app/Journals.json');
      var _journals = []; 
       
      for (var prop in res.data) {
        var journalObj = res.data[prop]
        journalObj.id = prop
        _journals.push(journalObj);
        _journals.splice();
      }   
      return {
        journals: _journals
      };
    } catch(e) {
      return journals.error(e);
    }
  },
  // async fetch() {
  //   var ref = db.ref("Journals");
  //   this.journals = await ref.once('value', function(snapshot) {
  //     var journal = [];
  //     snapshot.forEach(function(item) {             
  //       journal.push(item.val());
  //       journal.splice();
  //     })
  //     return journal
  //   })
  // },
  computed: {
    jurnalAmount: function() {
        let amount = this.tempJournal.num * this.tempJournal.unitPrice;
        this.tempJournal.amount = parseFloat(amount);
        return amount;
    },
    subTotalOfDebit: function() {
      return Object.values(this.filterJournals).filter(item => item.CD=='D').reduce((sum, item) => sum + item.amount, 0.0);
    },
    subTotalOfCredit: function() {
      return Object.values(this.filterJournals).filter(item => item.CD=='C').reduce((sum, item) => sum + item.amount, 0.0);
    },
    total: function() {
      return this.subTotalOfDebit - this.subTotalOfCredit;
    },
    filterJournals: function() {
        switch (this.visibility) {
          case 1:
            return Object.values(this.journals).filter(item => item.type == 1)
          case 2:
            return Object.values(this.journals).filter(item => item.type == 2)
          default:
            return Object.values(this.journals)
        }
    }
  }
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>