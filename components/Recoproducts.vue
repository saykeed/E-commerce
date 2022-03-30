<template>
    <div class="recoproducts">
        <NuxtLink :to="`/Details/${product.id}`">
            <div class="recoproductsImgBox">
                <img :src="product.image" alt="">
            </div>
        </NuxtLink>
        <p class="title">{{ product.title }}</p>
        <p class="price">${{ product.price }} <i @click="addToCart(product.id)" class="material-icons">shopping_cart</i></p> 
        <i class="material-icons wish" @click="favControl(product.id)">{{ wish }}</i>
    </div>
    
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            fav: false
        }
    },
    methods: {
        // functions that saves to local storage
        saveToLS (id) {
            let oldData = JSON.parse(localStorage.getItem('favorites'))
            oldData.push(id)
            
            localStorage.setItem('favorites', JSON.stringify(oldData))
        },
        // function that deletes from local storage
        deleteFromLS (id) {
            let favs = JSON.parse(localStorage.getItem('favorites'))
            localStorage.setItem('favorites', JSON.stringify(favs.filter(favId => favId !== id)))
        },
        // function that controls whether to add or delete from local storage
        favControl(id) {
            if (!localStorage.getItem('favorites')) {
                localStorage.setItem('favorites', '[]')
            }
            let favs = JSON.parse(localStorage.getItem('favorites'))
            if (favs.includes(id)) {
                this.deleteFromLS(id)
                this.fav = false
            } else {
                this.saveToLS(id)
                this.fav = true
            }
            
        },


        // section for adding to cart functions

        // functions that saves to local storage
        saveToCartLS (id) {
            
            let oldData = JSON.parse(localStorage.getItem('cart'))
            oldData.push(id)
            
            localStorage.setItem('cart', JSON.stringify(oldData))
        },
        addToCart(id) {
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', '[]')
            }
            let carted = JSON.parse(localStorage.getItem('cart'))
            if (carted.includes(id)) {
                alert('this product has been added to cart')
            } else {
                this.saveToCartLS(id)
            }
            
        },
    },
    computed: {
        wish() {
            if (this.fav) {
                return 'favorite'
            } else {
                return 'favorite_border'
            }
        }
    },
    mounted() {
        let favs = JSON.parse(localStorage.getItem('favorites'))
        if (favs !== null && favs.includes(this.product.id)) {
            this.fav = true
        } else {
            this.fav = false
        }
    }

}
</script>

<style>
div.recoproducts{
    width: 46%;
    margin: 3% 2%;
    position: relative;
    padding: 5px;
}
.recoproducts i.wish{
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(250, 250, 250, 0.159);
    transition: all .5s ease-in-out
}
.recoproducts i.wish:active{
    background: transparent;
    animation: stagger 1s ease-in-out;
}

@keyframes stagger{
    0%{transform: translateY(0)}
    20%{transform: translateY(10px)}
    40%{transform: translateY(-20px)}
    60%{transform: translateY(0px)}
    80%{transform: translateY(0px)}
    100%{transform: translateY(0px)}
}
.recoproductsImgBox{
    width: 100%;
    height: 200px;
    overflow: hidden;
}
.recoproducts img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s ease-in-out;
}
.recoproducts img:hover{
   transform: scale(1.2);
}
.recoproducts p.title{
    margin: 5px 0;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.recoproducts .price{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.recoproducts .price i{
    vertical-align: middle;
}
</style>