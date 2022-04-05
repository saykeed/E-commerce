<template>
    <div class="bignav">
        <h2>Shopify</h2>
        <div class="links">
            <NuxtLink :to="link.route" v-for="link in links" :key="link.text">
                <i class="material-icons" >{{ link.icon }}</i>
                {{ link.text }}
            </NuxtLink>
        </div>
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
                {text: 'Account', icon: 'account_circle', route: '/Account'},
                {text: 'Cart', icon: 'shopping_cart', route: '/Cart'},
            ]
        }
    }
    
}
</script>

<style>
    .bignav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        width: 100%;
        background: white;
        box-shadow: 4px 0px 13px rgba(0, 0, 0, 0.524);
        padding: 0 3%;
    }
    .links{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .links a{
        text-decoration: none;
        color: rgba(0, 0, 0, 0.575);
        padding: 10px;
    }
    .links a:hover{
        background: rgba(0, 0, 0, 0.111);
        border-radius: 10px;
    }
    .links a.nuxt-link-exact-active{
        color: orange;
    }
    .links a i{
        vertical-align: middle;
    }
    
</style>