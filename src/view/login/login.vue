<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" :loginLoading='loading'>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loginLoading='loading'></login-form>
          <p class="login-tip">烟感管理系统</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ username, password }) {
      this.loading = true
      this.handleLogin({ username, password }).then(res => {
        this.loading = false
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        }).catch(err=>{
          this.loading = false
        })
      }).catch(err=>{
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
