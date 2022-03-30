<template>
    <div class="wishlist">
        <Wishproduct
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    layout: 'default',
    data() {
        return {
            products: [],
            favId: []
        }
    },
    methods: {
        async fetchCart(id) {
            this.products.push(
                await fetch('https://fakestoreapi.com/products/' + id).then(res => res.json())
            )
        },
        loadCart() {
            let favs = JSON.parse(localStorage.getItem('favorites'))
            for (let i = 0; i < favs.length; i++) {
                this.fetchCart(favs[i])
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
    }
</style>


/*  



*/