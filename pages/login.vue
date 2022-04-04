<template>
  <div class="login">
      <Loading 
        v-if="loader"
      />
      <div class="loginHeader">
          <i class="material-icons" @click="$router.back()">chevron_left</i>
          <p>Welcome Back</p>
          <NuxtLink to="/" class="loginHome"><i class="material-icons">home</i></NuxtLink>
      </div>
      <div class="loginwrap">
            <p>Log in with</p>
            <div class="loginBtn">
                <div><img src="@/assets/img/google_svg.png" alt=""></div>
                <div><img src="@/assets/img/facebook_logo.jpg" alt=""></div>
            </div>
            <p>Or Continue with Email</p>
            <form class="loginForm" @submit.prevent="login">
                <p>Email Address</p>
                <input type="email" name="email" v-model="email" required>
                <p>Password</p>
                <div class="passwordBox">
                    <input type="password" name="password" v-model="password" ref="passwordInput" required>
                    <i class="material-icons" @click="togglePasswordVisibility">remove_red_eye</i>
                </div>
                <button>Log In</button>
            </form>
            <p class="already">Don't have an account? <NuxtLink to="/signup">Sign Up</NuxtLink></p>
      </div>
  </div>
</template>

<script>
export default {
    layout: 'nonav',
    data() {
        return{
            loader: false,
            email: '',
            password: ''
        }
    },
    methods: {
        regUser(user) {
            this.$router.go(-1)
        },
        regError(err) {
            alert(err)
        },
        async login() {
            this.loader = true
            await this.$fire.authReady()
            await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                this.loader = false
                this.regUser(user)
            })
            .catch(err => {
                this.loader = false
                this.regError(err)
            })
        },
        togglePasswordVisibility() {
            let x = this.$refs.passwordInput
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    }
}
</script>

<style scoped>
    .login{
        height: 100vh;
        width: 90%;
        margin: 0 auto;
    }
    .loginHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        margin: 20px auto;
    }
    .loginHeader i{
        cursor: pointer;
    }
    a.loginHome{
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
    .loginwrap{
        margin: 50px auto;
        width: 100%;
        text-align: center;
    }
    .loginBtn {
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loginBtn div{
        width: 70px;
        height: 70px;
        border-radius: 70px;
        border: 1px solid rgba(0, 0, 0, 0.138);
        margin: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loginBtn div img{
        width: 60%;
    }
    .loginForm{
        margin: 20px auto;
        width: 100%;
        text-align: left;
    }
    .loginForm p{
        font-size: 12px;
        margin: 20px 0 5px;
    }
    .loginForm input{
        width: 100%;
        height: 40px;
        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, 0.131);
        outline: none;
        padding: 15px;
    }
    .passwordBox{
        position: relative;
        width: 100%;
        height: fit-content;
    }
    .passwordBox input{
        width: 100%;
    }
    .passwordBox i{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
    .loginForm button{
        width: 100%;
        padding: 10px;
        background: rgb(0, 195, 255);
        border: none;
        border-radius: 20px;
        margin: 15px auto;
        color: white;
    }
</style>