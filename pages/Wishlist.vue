<template>
    <div class="wishlist">
        <Loading 
            v-if="!products.length"
        />
        <Wishproduct
            v-for="product in products"
            :key="product.id"
            :product="product"
            @reloadCart="reloadCart"
        />
    </div>
</template>

<script>
export default {
    layout: 'default',
    data() {
        return {
            products: []
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
        },
        reloadCart(id) {
            this.products = this.products.filter(item => item.id != id)
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

