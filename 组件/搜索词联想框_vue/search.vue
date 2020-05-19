<template>
  <div class="search-box" @mouseleave="clearResp">
    <input class="search-txt" type="text" name placeholder="Type to search" v-model="searchInput" />
    <a class="search-btn" href="#">
      <i class="iconfont">&#xe603;</i>
    </a>
    <ul class="search-keywords" v-show="returnKeyWords">
      <li class="keywords-item" v-for="keyword in returnKeyWords" :key="keyword">
        <a :href="searchBaseURL + keyword" class="keywords-value" target="_blank">{{ keyword }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      returnKeyWords: [],
      searchInput: "",
      inputTimer: undefined,
      searchBaseURL: "https://www.baidu.com/s?ie=utf-8&wd="
    };
  },
  mounted() {
    window.jsonpCallback = resp => {
      this.returnKeyWords = resp.s;
    };
  },
  methods: {
    clearResp() {
      (this.searchInput = ""), (this.returnKeyWords = []);
    }
  },
  watch: {
    searchInput() {
      if (this.inputTimer) {
        clearTimeout(this.inputTimer);
      }
      this.inputTimer = setTimeout(() => {
        $.ajax({
          dataType: "jsonp",
          url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
          data: {
            wd: this.searchInput,
            cb: "jsonpCallback"
          }
        });
        this.inputTimer = undefined;
      }, 1000);
    }
  }
};
</script>

<style scoped>
@import "./assets/iconfont.css";
@import "./assets/reset.css";

.search-box {
  position: absolute;
  top: 0%;
  left: 0%;
  background: #d63031;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
}

.search-box i {
  font-weight: bold;
  font-size: 24px;
}

.search-box:hover > .search-txt {
  width: 240px;
  padding: 0 6px;
}
.search-box:hover > .search-btn {
  background: white;
}
.search-btn {
  color: #d63031;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  text-decoration: none;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
  text-indent: 8px;
}

.search-keywords {
  position: absolute;
  margin: 0px;
  padding: 0px;
  width: 240px;
  bottom: 0px;
  left: 25px;
  transform: translateY(100%);
  border-radius: 4px;
}

.keywords-item {
  list-style: none;
  height: 35px;
  width: 100%;
  line-height: 35px;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  background-color: #d63031;
  border-top: 1px solid #2d3436;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.keywords-value {
  color: #fff;
  text-decoration: none;
}
.keywords-value:hover {
  text-shadow: 1px 1px 2px #fff;
}
</style>