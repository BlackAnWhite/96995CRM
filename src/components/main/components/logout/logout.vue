<template>
  <div class="user-logout">
    <Tooltip content="退出登录" placement="bottom">
      <Icon @click.native="handleClick" type="md-log-out" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Logout',
  props: {
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user-logout .ivu-tooltip-rel{
  height: 64px;
  line-height: 56px;
  i{
    cursor: pointer;
  }
}
</style>
