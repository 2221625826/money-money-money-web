<template>
  <div class="root">
    <var-app-bar class="bar" title="MoneyMoneyMoney" title-position="center">
      <template #right>
        <var-button text color="transparent" @click="deleteBatch"
          >删除</var-button
        >
      </template>
    </var-app-bar>
    <var-space justify="space-around" align="center" style="height: 100px">
      <var-button type="primary" @click="yearMonth = true">
        <var-space align="center" justify="space-around">
          <b style="font-size: 20px">
            {{ this.year }} 年 {{ this.month }} 月
          </b>
          <var-icon name="menu-down" :size="26" />
        </var-space>
      </var-button>
      <var-button type="primary" class="add" @click="showAdd">
        <var-icon name="plus" :size="26" />
      </var-button>
    </var-space>

    <var-list
      :finished="this.list.finished"
      v-model:loading="this.list.loading"
      @load="load"
    >
      <var-cell :key="item" v-for="item in list.items" :border="true">
        <h2 @click="showDetail(item)">{{ item.title }}</h2>
        <p>{{ item.payTime }}</p>
        <p>{{ isReverse(item.reverse) }} ¥：{{ item.amount }} 元</p>
        <var-checkbox-group ref="group" v-model="deleteIds" v-if="showDelete">
          <var-checkbox :checked-value="item.id">删除</var-checkbox>
        </var-checkbox-group>
      </var-cell>
    </var-list>

    <var-popup position="bottom" v-model:show="dateShow">
      <var-date-picker v-model="form.payTime" shadow>
        <template #year="{ year }">
          <span>{{ year }}年</span>
        </template>
        <template #date="{ month, date }">
          <span>{{ month }}月{{ date }}日</span>
        </template></var-date-picker
      >
    </var-popup>

    <var-popup position="bottom" v-model:show="yearMonth">
      <var-picker :columns="columns" @confirm="chooseMonth" />
    </var-popup>

    <var-popup position="bottom" v-model:show="itemDetail">
      <var-app-bar color="blue" class="bar">
        <template #left>
          <div @click="itemDetail = false">取消</div>
        </template>
        <template #right>
          <div @click="add">确认</div>
        </template>
      </var-app-bar>
      <var-form ref="form" style="margin-bottom: 10px">
        <var-row align="flex-end" justify="center">
          <var-col :span="4" class="label">标题：</var-col>
          <var-col :span="18">
            <var-input v-model="form.title" />
          </var-col>
        </var-row>
        <var-row align="flex-end" justify="center">
          <var-col :span="4" class="label">金额：</var-col>
          <var-col :span="18">
            <var-input v-model="form.amount" />
          </var-col>
        </var-row>
        <var-row align="flex-end" justify="center">
          <var-col :span="8" class="label">支出/收入：</var-col>
          <var-col :span="14">
            <var-select v-model="form.reverse">
              <var-option label="支出" :value="true" />
              <var-option label="收入" :value="false" />
            </var-select>
          </var-col>
        </var-row>
        <var-row align="flex-end" justify="center">
          <var-col :span="4" class="label">类别：</var-col>
          <var-col :span="18">
            <var-select v-model="form.categoryId">
              <var-option
                v-for="category in categorys"
                :label="category.name"
                :key="category.id"
                :value="category.id"
              />
            </var-select>
          </var-col>
        </var-row>
        <var-row align="flex-end" justify="center">
          <var-col :span="4" class="label">备注：</var-col>
          <var-col :span="18">
            <var-input v-model="form.remark" />
          </var-col>
        </var-row>
        <var-row align="flex-end" justify="center">
          <var-col :span="6" class="label">支付时间：</var-col>
          <var-col :span="16">
            <var-input readonly v-model="form.payTime" @click="dateShow = true" />
          </var-col>
        </var-row>
      </var-form>
    </var-popup>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Money",
  props: {
    msg: String,
  },
  data() {
    return {
      year: 2022,
      month: 8,
      list: ref({
        loading: false,
        finished: false,
        page: 1,
        pageSize: 7,
        items: [{"id":1,"title":"晚饭","amount":33.59,"reverse":true,"categoryId":1,"remark":"测试","payTime":"2022-09-03"},{"id":2,"title":"喵喵喵","amount":123.00,"reverse":true,"categoryId":1,"remark":"招招","payTime":"2022-09-03"}],
      }),
      categorys: {},
      sum: ref({
        in: 0,
        out: 0,
      }),
      form: {},
      deleteIds: ref([]),
      showDelete: ref(false),
      dateShow: ref(false),
      yearMonth: ref(false),
      itemDetail: ref(false),
      columns: ref([
        Array.from({ length: 130 }).map((_, index) => index + 1970),
        Array.from({ length: 12 }).map((_, index) => index + 1),
      ]),
    };
  },
  methods: {
    load: function () {
      this.list.loading = false;
      setTimeout(() => {
        let request = {
          page: this.list.page,
          pageSize: this.list.pageSize,
          year: this.year,
          month: this.month,
        };
        this.$axios.post("/money/list", request).then((res) => {
          if (res.code != 200 || res.data == null) {
            alert(res.msg);
          } else {
            this.list.items = this.list.items.concat(res.data.result);
            this.list.loading = false;
            if (res.data.pagination.page >= res.data.pagination.totalPage) {
              this.list.finished = true;
            } else {
              this.list.page = this.list.page + 1;
            }
          }
        });
      }, 1000);
    },
    showAdd: function () {
      this.form = {};
      this.itemDetail = true;
    },
    chooseMonth: function (texts) {
      this.year = Number(texts[0]);
      this.month = Number(texts[1]);
      this.yearMonth = false;
      this.refreshList();
    },
    refreshList: function () {
      this.list.finished = false;
      this.list.page = 1;
      this.list.items = [];
      this.load();
    },
    showDetail: function (item) {
      this.itemDetail = true;
      this.form = item;
    },
    getCategorys: function () {
      this.$axios.get("/money/getCategory", null).then((res) => {
        if (res.code != 200 || res.data == null) {
          alert(res.msg);
        } else {
          this.categorys = res.data;
        }
      });
    },
    getSum: function () {
      let request = {
        year: this.year,
        month: this.month,
      };
      this.$axios.get("/money/sum", request).then((res) => {
        if (res.code != 200 || res.data == null) {
          alert(res.msg);
        } else {
          this.sum = res.data;
        }
      });
    },
    add: function () {
      this.$axios.post("/money/add", this.form).then((res) => {
        if (res.code != 200 || res.data == null) {
          alert(res.msg);
        }
      });
      if (this.form.id == undefined) {
        this.refreshList();
      }
      this.itemDetail = false;
    },
    deleteBatch: function () {
      if (this.showDelete && this.deleteIds.length > 0) {
        this.$axios
        .post("/money/batchDelete", {
          year: this.year,
          month: this.month,
          ids: this.deleteIds,
        })
        .then((res) => {
          if (res.code != 200 || res.data == null) {
            alert(res.msg);
          } else {
            this.refreshList();
          }
        });
      }
      this.showDelete = !this.showDelete;
    },
  },
  computed: {
    isReverse: function () {
      return (reverse) => {
        if (reverse) {
          return "支出";
        } else {
          return "收入";
        }
      };
    },
  },
  mounted() {
    this.getCategorys();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  min-width: 15%;
  min-height: 25%;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 18px;
}
</style>

