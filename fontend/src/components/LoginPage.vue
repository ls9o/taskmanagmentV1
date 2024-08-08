<template>
  <div class="container-xl">
    <h1>Login</h1>
    <div>username</div>
    <div><input type="text"></div>
    <div>password</div>
    <div><input type="text"></div>
    <span>remeber me <input type="checkbox"></span>
    <button class="btn btn-success">Login</button>
    <div>Sign-up</div>
    <div>forgot-pass</div>
  </div>
</template>

<script>
export default {
  data() {
    return{

    }
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;

      if (username === 'admin' && password === 'password') {
        localStorage.setItem('user',JSON.stringify({ username: 'admin '}));

        this.$router.push('/')
      }else {
        alert('ชื่อผู้ใช้หรือรหัสไม่ถูกต้อง')
      }
    }
  }
}
</script>

<style>

</style>