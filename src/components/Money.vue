<template>
  <div class="root">
    <var-app-bar title="标题" />
    <div class="button">
      <var-button class="date" @click="dateShow = true" color="pink">
        <b>
          {{ this.date.substring(0, 4) }} 年 {{ this.date.substring(5) }} 月
        </b>
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
      <var-cell :key="item" v-for="(item) in list.items" :border="true" @click="showDetail(item)">
        <h2>{{ item.title }}</h2>
        <p>{{ item.payTime }}</p>
        <p>{{ isReverse(item.reverse) }} ¥：{{ item.amount }} 元</p>
      </var-cell>
    </var-list>

    <var-popup position="bottom" v-model:show="dateShow">
      <var-date-picker type="month" v-model="date" shadow />
    </var-popup>
    <var-popup position="bottom" v-model:show="itemDetail" >
      <var-form ref="form" :readonly="readonly">
        <var-input
        v-model="form.title"
      />
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
      date: ref("2022-08"),
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
            payTime: "2022年08月16日",
          },
        ],
      }),
      sum: ref({
        in: 0,
        out: 0,
      }),
      form: {},
      dateShow: ref(false),
      itemDetail: ref(false),
      readonly: true,
    };
  },
  methods: {
    load: function () {
      this.list.loading = false;
      this.list.finished = true;
      return; //无后端开发
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
    showDetail: function(item) {
      this.itemDetail = true;
      this.form = item;
    }
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
