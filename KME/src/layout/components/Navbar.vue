<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <span class="cursor mg-r-10" @click="logoutIndex">注销</span>
      <span class="mg-r-10 cursor wx-plat">
        <img src="../../assets/images/common/codeSmall.png" alt />
        <span>微信公众号平台</span>
        <span class="wx-plat-content">
          <img src="../../assets/images/common/coedBig.jpg" style="width:110px;height:110px" alt />
        </span>
      </span>
      <span class="time">{{ this.dateTime }}</span>
      <span class="elipse">
        <router-link to="/notifications/notificationsList">
          <span class="message">
            <span
              v-if="this.warnDev!=0"
            >{{ this.warnDev>99?this.warnDev = "99+" : this.warnDev=this.warnDev }}</span>
          </span>
        </router-link>
        <img src="../../assets/images/common/person.png" alt @click="personal" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
// import { setInterval } from "timers";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      timeout: "",
      timer: null,
      warnDev: 0,
      dateTime: this.getCurrentTime() // 当前时间
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
   
  },
  mounted() {
    this.dataTIime()
    this.alarmList();
  },
  created() {
  },
  beforeDestroy() {
    // 在vue实例销毁前，清除定时器
    if (this.timer) {
      console.log("定时器停止");
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    toggleSideBar() {
      // alert(this.Cookies.get('sidebarStatus'))
      this.$store.dispatch("app/toggleSideBar");
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
      console.log(this.$store.state.isCollapse);
    },
    dataTIime(){
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
      this.dateTime = this.getCurrentTime()
        this.dataTIime()
    }, 1000)
    },
    personal() {
      this.$router.push({
        name: "personalInfo"
      });
    },

    getCurrentTime() {
      const date = new Date();
      const mouth = parseInt(date.getMonth() + 1);
      const dateDay = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const showMonth = mouth < 10 ? "0" + mouth : mouth;
      const showDay = dateDay < 10 ? "0" + dateDay : dateDay;
      const showHour = hours < 10 ? "0" + hours : hours;
      const showMinutes = minutes < 10 ? "0" + minutes : minutes;
      const showSeconds = seconds < 10 ? "0" + seconds : seconds;
      const datetimeType =
        date.getFullYear() +
        "-" +
        showMonth +
        "-" +
        showDay +
        " " +
        showHour +
        ":" +
        showMinutes +
        ":" +
        showSeconds; // yyyy-MM-dd 00:00:00格式日期
      return datetimeType;
    },
    alarmList() {
      this.$ajax({
        url: $$("/monitor/statistics"),
        method: "get"
      }).then(res => {
        if (res.data.status === 200) {
          this.warnDev = res.data.data.warningAlarmRecored;
        }
      });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    logoutIndex() {
      this.$store.dispatch("user/logout").then(() => {
        console.log("注销至登录页面")
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 51px;
  /*overflow: hidden;*/
  position: relative;
  background: #171e2d;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    color: #b2bdcd;
    span {
      &:nth-of-type(1) {
        font-size: 14px;
      }
      &.cursor {
        &:hover {
          color: #00a0e9;
        }
      }
    }
    .wx-plat {
      position: relative;
      .wx-plat-content {
        position: absolute;
        display: none;
        left: 0;
        top: 30px;
        z-index: 4;
      }
      img {
        vertical-align: middle;
      }
      &:hover {
        .wx-plat-content {
          display: inline-block;
        }
      }
    }
    > .time {
      font-size: 12px;
      color: #b2bdcd;
    }
    .elipse {
      display: inline-block;
      width: 70px;
      height: 24px;
      border-radius: 10px;
      background: #1a2d49;
      vertical-align: middle;
      white-space: nowrap;
      .message {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 19px;
        background: url("../../assets/images/common/message.png");
        background-size: cover;
        margin: 4px auto auto 6px;
        vertical-align: top;
        cursor: pointer;
        margin-right: 5px;
        span {
          position: absolute;
          right: -4px;
          top: -5px;
          display: inline-block;
          width: 24px;
          height: 12px;
          border-radius: 50px;
          background: #00a0e9;
          color: white;
          font-size: 12px;
          line-height: 12px;
          text-align: center;
        }
      }
      img {
        width: 30px;
        height: 30px;
        cursor: pointer;
        transform: translate(0, -4px);
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
