<template>
  <div class="signup">
      <Loading  v-if="loader" />
      <div class="signupHeader">
          Create Account
          <i class="material-icons" @click="$router.back()">close</i>
      </div>
      <div class="signupWrap">
            <p>Sign Up with:</p>
            <div class="signupBtn">
                <div @click="signupGoogle"><img src="@/assets/img/google_svg.png" alt=""></div>
                <div @click="signupFacebook"><img src="@/assets/img/facebook_logo.jpg" alt=""></div>
            </div>
            <p>Or Continue with Email:</p>
            <form class="signupForm" @submit.prevent="register">
                <p>Full Name</p>
                <input type="text" name="fullname" v-model="fullname" required>
                <p>Email Address</p>
                <input type="email" name="email" v-model="email" required>
                <p>Profile Picture</p>
                <input type="file" name="profilePic" @change="getPhoto" required>
                <p>Password</p>
                <input type="password" name="password" v-model="password" required>
                <button :disabled="imageDone == false">Create Account</button>
            </form>
            <p class="already">Already have an account? <NuxtLink to="/login"> Log in</NuxtLink></p>
            
      </div>
  </div>
</template>

<script>
export default {
    layout: 'nonav',
    data() {
        return{
            fullname: '',
            email: '',
            profilePic: '',
            password: '',
            imageDone: false,
            loader: false
        }
    },
    methods: {
        loginUser() {
            alert('account created successful')
            this.$router.push('/')
        },
        async regUser(user) {
            await this.$fire.authReady()
            await this.$fire.auth.onAuthStateChanged((user) => {
                if(user) {
                        user.updateProfile({
                        displayName: this.fullname, 
                        photoURL: this.profilePic
                    }).then(() => {
                        console.log('updated')
                        this.loginUser()
                    })
                    .catch(err => console.log(err))
                } else {
                    console.log('no user found')
                }
            })
        },
        regError(err) {
            alert(err)
            //console.log(err)
        },
        async getPhoto(e) {
            let photo = e.target.files[0]
            let dateInstance = new Date().getTime()
            await this.$fire.storageReady()
            await this.$fire.storage.ref(photo.name +'_'+ dateInstance).put(photo)
            this.$fire.storage.ref(photo.name +'_'+ dateInstance).getDownloadURL()
            .then(url => {
                this.profilePic = url
                this.imageDone = true
            })
            .catch(err => console.log(err))


            
        },
        async register() {
            this.loader = true
            await this.$fire.authReady()
            await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                this.regUser(user)
                this.loader = false
            })
            .catch((err) => {
                this.regError(err)
                this.loader = false
            })
            
        },
        async signupGoogle() {
            this.loader = true
            await this.$fire.authReady()
            let provider = new this.$fireModule.auth.GoogleAuthProvider()
            await this.$fire.auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result.user.displayName)
                this.loginUser()
                this.loader = false
            })
            .catch((err) => {
                console.log(err)
                this.loader = false
            })
        },
        async signupFacebook() {
            this.loader = true
            await this.$fire.authReady()
            let provider = new this.$fireModule.auth.FacebookAuthProvider()
            await this.$fire.auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                this.loginUser()
                this.loader = false
            }).catch((err) => {
                console.log(err)
                this.loader = false
            })
        }
    }
}
</script>

<style scoped>

.signup{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    height: 100vh;
    position: relative;
}
.signupHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: black;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
.signupHeader i{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3%;
    cursor: pointer;
}
.signupWrap{
    width: 100%;
    margin-top: 100px;
}
.signupBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto 50px;
}
.signupBtn div{
    width:70px;
    height: 70px;
    border-radius: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.152);
    margin: 0 10px;
    cursor: pointer;
}
.signupBtn img{
    width: 60%;
}
.signupForm{
    text-align: left;
    margin: 60px auto 20px;
}
.signupForm p{
    font-size: 12px;
    margin: 20px 0 5px;
}
.signupForm input{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.131);
    outline: none;
    padding: 15px;
}
.signupForm button{
    width: 100%;
    padding: 10px;
    background: rgb(0, 195, 255);
    border: none;
    border-radius: 20px;
    margin: 15px auto;
    color: white;
}
.signupForm button:disabled{
    background: rgba(0, 0, 0, 0.256);
    color: rgba(0, 0, 0, 0.435);
    cursor:not-allowed;
}
.signup p.already{
    color: rgba(0, 0, 0, 0.535);
}
.signup p.already a{
    color: red;
}



/*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>


