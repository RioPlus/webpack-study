<template>
  <div class="hello">
    <h1 style="font-size: 20px">{{ msg }}</h1>
    <h2>国际化测试： {{ $t("message.getCode") }}</h2>
    <button @click="changeLang">中英切换</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <div class="box">
      {{ msg }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  async created() {
    // 测试跨域，proxy代理
    const url =
      "/music/splcloud/fcgi-bin/gethotkey.fcg?_=1653318556424&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=1&uin=0&g_tk_new_20200303=5381&g_tk=5381&hostUin=0";
    const { data } = await axios.get(url);
    console.log(data);
  },

  async mounted() {
    // 测试mock数据
    axios
      .post("/user/list", {
        name: "张三",
        age: "14",
      })
      .then((res) => {
        console.log("res==> " + JSON.stringify(res.data));
      });
  },
  methods: {
    // 测试中英文切换
    changeLang() {
      if (this.$i18n.locale === "cn") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "cn";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  font-size: 20px;
}
</style>
