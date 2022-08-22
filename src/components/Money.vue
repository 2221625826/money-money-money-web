<template>
  <div class="root">
    <var-app-bar title="标题" />
    <div class="button">
      <var-button class="date" @click="yearMonth = true" color="pink">
        <b> {{ this.year }} 年 {{ this.month }} 月 </b>
        <var-icon name="menu-down" :size="26" />
      </var-button>
      <var-button class="add" color="green">
        <var-icon name="plus" :size="26" />
      </var-button>
    </div>

    <var-list
      :finished="this.list.finished"
      v-model:loading="this.list.loading"
      @load="load"
    >
      <var-cell
        :key="item"
        v-for="item in list.items"
        :border="true"
        @click="showDetail(item)"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.payTime }}</p>
        <p>{{ isReverse(item.reverse) }} ¥：{{ item.amount }} 元</p>
      </var-cell>
    </var-list>

    <var-popup position="bottom" v-model:show="dateShow">
      <var-date-picker v-model="form.payTime" shadow>
        <template #year="{ year }">
          <span>{{ year }}年</span>
        </template>
        <template #date="{month, date }">
          <span>{{ month }}月{{ date }}日</span>
        </template></var-date-picker
      >
    </var-popup>
    <var-popup position="bottom" v-model:show="yearMonth">
      <var-picker :columns="columns" @confirm="chooseMonth" />
    </var-popup>
    <var-popup position="bottom" v-model:show="itemDetail">
      <var-form ref="form">
        <var-input v-model="form.title" />
        <var-input v-model="form.amount" />
        <var-select v-model="form.reverse">
          <var-option label="支出" :value="true" />
          <var-option label="收入" :value="false" />
        </var-select>
        <var-select v-model="form.categoryId">
          <var-option
            v-for="(category, index) in categorys"
            :label="category"
            :key="index"
            :value="index"
          />
        </var-select>
        <var-input v-model="form.remark" />
      </var-form>
      <var-input readonly v-model="form.payTime" @click="dateShow = true" />
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
      year: 0,
      month: 0,
      list: ref({
        loading: false,
        finished: false,
        page: 1,
        pageSize: 10,
        items: [
          {
            id: 0,
            title: "地铁票",
            amount: 100,
            reverse: true,
            categoryId: 0,
            remark: "hahahahaha",
            payTime: "2022-08-16",
          },
        ],
      }),
      categorys: ref(["111","222"]),
      sum: ref({
        in: 0,
        out: 0,
      }),
      form: {},
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
      this.list.finished = true;
      return;
      setTimeout(() => {
        this.year = Number(this.date.substring(0, 4));
        this.month = Number(this.date.substring(5));
        this.$axios.post("/money/list", this.list).then((res) => {
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
    showDetail: function (item) {
      this.itemDetail = true;
      this.form = item;
    },
    getSum: function () {
      this.$axios
        .get("/money/sum", { year: this.year, month: this.month })
        .then((res) => {
          if (res.code != 200 || res.data == null) {
            alert(res.msg);
          } else {
            this.sum = res.data;
          }
        });
    },
    chooseMonth: function (texts, indexes) {
      console.log(this.year + "-" + this.month);
      this.year = Number(texts[0]);
      this.month = Number(texts[1]);
      this.yearMonth = false;
      console.log(this.year + "-" + this.month);
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  height: 780px;
}
.date {
  display: inline-flex;
}

.date * {
  font-size: 20px;
  margin: auto;
}

.add {
  min-width: 15%;
  min-height: 25%;
}

.button {
  display: flex;
  width: 100%;
  height: 13%;
  align-items: center;
  justify-content: space-around;
}
</style>
