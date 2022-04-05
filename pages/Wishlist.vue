<template>
    <div class="wishlist">
        <Loading 
            v-if="loader"
        />
        <Wishproduct
            v-for="product in products"
            :key="product.id"
            :product="product"
            @reloadCart="reloadCart"
        />
        <Emptycart 
            v-if="emptywish"
        />
    </div>
</template>

<script>
export default {
    layout: 'default',
    data() {
        return {
            products: [],
            loader: true,
            emptywish: false
        }
    },
    methods: {
        async fetchCart(id) {
            this.products.push(
                await fetch('https://fakestoreapi.com/products/' + id).then(res => res.json())
            )
            this.loader = false
        },
        loadCart() {
            if (!localStorage.getItem('favorites')) {
                localStorage.setItem('favorites', '[]')
            }
            let favs = JSON.parse(localStorage.getItem('favorites'))
            if(favs.length) {
                for (let i = 0; i < favs.length; i++) {
                    this.fetchCart(favs[i])
                }
            } else{
                this.emptywish = true
                this.loader = false
            }
            
        },
        reloadCart(id) {
            this.products = this.products.filter(item => item.id != id)
            if(!this.products.length) {
                this.emptywish = true
            }
        }
    },
    mounted() {
        this.loadCart()
    }

    
}



</script>

<style>
    .wishlist{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
    }




    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>

