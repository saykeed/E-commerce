<template>
  <div class="cart">
      <div class="cartHeader">
          <i class="material-icons" @click="$router.back()">arrow_back</i>
          Cart
      </div>
      <Loading 
        v-if="fetchLoader"
      />

      <Emptycart 
        v-if="emptycart"
      />
      
      <div class="cartWrap" v-if="cart.length">
          <div class="cartedProducts" >
              <Cartpro
                v-for="product in cart" :key="product.id"
                :product="product"
                @updatePrice="updatePrice"
                @addUpdatePrice="updatePrice"
                @minusUpdatePrice="minusUpdatePrice"
                @removeItem="removeItem"
              />
          </div>
          <div class="totalBox">
              <p>Total: <span>$ {{ totalPriceRounded }}</span></p>
              <button @click="completeOrder" class="completeOrder">
                Complete Your Order
              </button>
          </div>
      </div>
      
      <Loading 
        v-if="completeLoader"
      />
  </div>
</template>

<script>
export default {
  layout: 'nonav',
  data() {
    return{
      cart: [],
      totalPrice: 0,
      fetchLoader: true,
      completeLoader: false,
      emptycart: false
      
    }
  },
  methods: {
    async fetchCart(id) {
        this.cart.push(
            await fetch('https://fakestoreapi.com/products/' + id)
            .then(res => res.json())
            .catch(err => {console.log(err)})
        )
        this.fetchLoader = false
    },
    loadCart() {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', '[]')
        }
        let carted = JSON.parse(localStorage.getItem('cart'))
        if(carted.length) {
          for (let i = 0; i < carted.length; i++) {
              this.fetchCart(carted[i])
          }
        } else {
          this.fetchLoader = false
          this.emptycart = true
        }
        
    },
    updatePrice(price) {
      this.totalPrice += price
    },
    minusUpdatePrice(price) {
      this.totalPrice -= price
    },
    removeItem(id) {
      this.cart = this.cart.filter(item => item.id != id)
      if(!this.cart.length) [
          this.emptycart = true
      ]
    },
    loadPayment(user) {
      this.completeLoader = false
      this.$router.push({ path: '/Checkout/', query: {
        user: user
      } })
    },
    async completeOrder() {
      this.completeLoader = true
        await this.$fire.authReady()
        await this.$fire.auth.onAuthStateChanged((user) => {
            if (!user) {
              this.completeLoader = false
              alert('You need to login')
              this.$router.push('/login')
            } else {
              this.loadPayment(user)
            }
        })
    }
  },
  computed: {
    totalPriceRounded() {
      if(this.totalPrice) {
        return this.totalPrice.toFixed(2)
      } else {
        return 0
      }
      
    }
  },
  mounted() {
      this.loadCart()
  }
}
</script>

<style scoped>
  .cart{
    background: rgba(0, 0, 0, 0.065);
    position: relative;
  }
  .cartHeader{
    height: 50px;
    width: 100%;
    background: black;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cartHeader i{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .cartedProducts {
    margin-top: 50px;
    padding: 10px;
    width: 100%;
  }
  .totalBox{
    background: white;
    padding: 10px;
  }
  .totalBox p{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: 20px;
  }
  .totalBox p span{
    color: orange;
  }
  .totalBox .completeOrder{
    height: 40px;
    width: 100%;
    background: orange;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    margin: 20px auto;
    cursor: pointer;
  }
  .butLoader {
    width: 40px;
    height: 40px;
  }





  /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>