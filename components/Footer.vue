<template>
  <div class="footer">
        <NuxtLink v-for="link in links" :key="link.text" 
        :to="link.route">
            <div>
                <i class="material-icons" >{{link.icon}}</i> 
                <p>{{link.text}}</p>
            </div> 
        </NuxtLink>
  </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {text: 'Home', icon: 'home', route: '/'},
                {text: 'Categories', icon: 'dashboard', route: '/Category'},
                {text: 'Wishlist', icon: 'favorite_border', route: '/Wishlist'},
                {text: 'Account', icon: 'account_circle', route: '/Account'}
            ]
        }
    }
}
</script>

<style>
    .footer{
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
        background: white;
        box-shadow: -4px 0px 13px rgba(0,0,0,0.400);
    }
    .footer a{
        text-decoration: none;
        color: black;
        -webkit-tap-highlight-color: transparent;
    }
    .footer a.nuxt-link-exact-active{
        color: orange;
    }
    .footer div{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }
    .footer div i{
        font-size: 25px;
        margin: 0px auto 5px;
    }
</style>