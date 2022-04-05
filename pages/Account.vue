<template>
  <div class="account">
    
    <!-- <div class="accountHeader">
      <p>Profile</p>
    </div> -->

    <Loading 
      v-if="loader"
    />
    <div v-else class="accountWrap">
      <div class="accountHolder">
        <div class="accountImg">
          <img :src="img" alt="User image">
        </div>
        <p>{{ fullname }}</p>
        <p>{{ email }}</p>
      </div>
      <div class="accountInfoTab">
        <p>My Account</p>
      </div>

      <div class="accountOptions" v-for="option in options" :key="option.text">
        <p> <i class="material-icons">{{ option.icon }}</i> {{ option.text }}</p>
        <i class="material-icons">chevron_right</i>
      </div>
        <p @click="logout" class="logout"> <i class="material-icons">exit_to_app</i>Log out</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      options: [
        {text: 'Your wishlists', icon: 'favorite_border'},
        {text: 'Order History', icon: 'history'},
        {text: 'Saved Addresses', icon: 'location_on'},
        {text: 'Payment details', icon: 'credit_card'},
        {text: 'Need help? Contact us', icon: 'help'}
      ],
      fullname: '',
      email: '',
      img: '',
      loader: true
    }
  },
  methods: {
    async logout() {
      await this.$fire.authReady()
      await this.$fire.auth.signOut()
      .then(user => alert('logout succesfully'))
      .catch(err => alert(err))
    },
    getUserData(data) {
      this.loader = false
      this.fullname = data.displayName
      this.email = data.email
      this.img = data.photoURL
    },
    async checkUser() {
        await this.$fire.authReady()
        await this.$fire.auth.onAuthStateChanged((user) => {
            if (!user) {
              this.$router.push('/login')
            } else {
              this.getUserData(user)
            }
        })
        
    }
  },
  mounted() {
    this.checkUser()
  }
}
</script>

<style scoped>
  .account{
    position: relative;
  }
  .accountHeader{
    text-align: center;
  }
  .accountWrap{
    width: 80%;
    margin: 80px auto 60px;
    
  }
  .accountHolder{
    text-align: center;
    margin: 0px auto;
  }
  .accountHolder .accountImg{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    border: 1px solid rgba(0, 0, 0, 0.323);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
  }
  .accountImg img{
    width: 90%;
    height: 90%;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
  .accountHolder p{
    margin: 10px auto;
  }
  .accountImg i{
    font-size: 80px;
  }
  .accountInfoTab{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.172);
    border-radius: 20px;
    margin: 30px auto;
  }
  .accountInfoTab p{
    text-align: center;
    width: 50%;
  }
  .accountOptions{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px auto;
    cursor: pointer;
  }
  .accountOptions i{
    vertical-align: middle;
    font-size: 24px;
  }
  .accountOptions p i{
    margin-right: 10px;
  }
  .accountWrap .logout i{
    vertical-align: middle;
    font-size: 24px;
    margin-right: 10px;
  }
  .accountWrap .logout{
    margin: 15px auto;
    cursor: pointer;
  }
  



  /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>