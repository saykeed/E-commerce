<template>
  <div class="checkIndex">
      <Payment 
        v-if="showPaymentModal"
        @closePaymentModal="closePaymentModal"
        :tel="tel"
        :email="email"
        :address="address"
        :city="city"
        :state="state"
        :country="country"
        :totalAmount="subtotal + shipping"
      />

      <Loading 
        v-if="!cart.length"
      />
      <h1>Shopify</h1>
      <div class="orderSummary">
          <div class="orderSummaryHeader">
              <p @click="toggleShowOrder">
                <i class="material-icons" >shopping_cart</i> 
                Show Order Summary
                <i class="material-icons" >{{ summaryArrow }}</i>
                </p>
              <h3>${{ totalPayable }}</h3>
          </div>
          <div v-show="showOrder" class="orderSummaryWrapper">
              <Ordersummary 
                v-for="product in cart"
                :key="product.id"
                :product="product"
                @updatePrice="updatePrice"
              />
              <div class="calculation">
                <p>Subtotal <span>${{ subtotal }}</span></p>
                <p>shipping <span>${{ shipping }}</span></p>
                <div class="total">
                  <p>Total</p>
                  <h2>${{ totalPayable }}</h2>
                </div>
              </div>
          </div>
            
      </div>
      <div class="payerInfo">
        <h3>Contact Information</h3>
        <form class="payerForm" @submit.prevent="toSummary">
          <input required v-model="email" type="email" placeholder="Email Address" >
          <input required v-model="tel" type="number" placeholder="Phone Number">
          <input required v-model="fullname" type="text" placeholder="Name" >
          <select required v-model="country" @change="loadStates" id="select">
            <option value="" selected>Select Country</option>
            <option 
            v-for="country in countries"
            :key="country.code"
            :value="country.code"
            >{{ country.name }}</option>
          </select>
          <select required v-model="state" id="select">
            <option value="" selected>Select State</option>
            <option 
            v-for="state in states"
            :key="state.name"
            :value="state.name"
            >{{ state.name }}</option>
          </select>
          <input required v-model="city" type="text" placeholder="City">
          <input required v-model="address" type="text" placeholder="Address">
          <button>Continue to summary</button>
        </form>
      </div>
      <NuxtLink class="backToCart" to="/Cart">
        <i class="material-icons" >keyboard_arrow_left</i>Return to cart
      </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'nonav',
  data() {
    return{
      data: this.$route.query.user,
      cart: [],
      subtotal: 0,
      shipping: 20.58,
      countries: null,
      states: null,
      showPaymentModal: false,
      showOrder: false,
      email: this.$route.query.user.email,
      fullname: this.$route.query.user.displayName,
      tel: null,
      country: null,
      state: null,
      city: null,
      address: null,
    }
  },
  methods: {
      toggleShowOrder() {
        this.showOrder = !this.showOrder
      },
      closePaymentModal() {
        this.showPaymentModal = false
      },
      async fetchOrderSummary(id) {
          this.cart.push(
              await fetch('https://fakestoreapi.com/products/' + id).then(res => res.json())
          )
      },
      loadOrderSummary() {
          let carted = JSON.parse(localStorage.getItem('cart'))
          for (let i = 0; i < carted.length; i++) {
              this.fetchOrderSummary(carted[i])
          }
      },
      getCountries() {
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query{
                  countries {
                    name
                    code
                  }
              }
            `
          })
        }

        fetch('https://countries.trevorblades.com/', options)
        .then(res => res.json())
        .then(data => this.countries = data.data.countries)
        .catch(err => console.log(err))
      },
      getStates(code) {
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query{
                  country(code: "${code}") {
                    states{
                      name
                    }
                  }
              }
            `
          })
        }

        fetch('https://countries.trevorblades.com/', options)
        .then(res => res.json())
        .then(data => this.states = data.data.country.states)
        .catch(err => console.log(err))
      },
      loadStates(e) {
        const code = e.target.value
        this.getStates(code)
      },
      toSummary() {
        this.showPaymentModal = true
      },
      updatePrice(price) {
        this.subtotal += price
      }
  },
  mounted() {
      this.loadOrderSummary()
      this.getCountries()
  },
  computed: {
    summaryArrow() {
      if(!this.showOrder) {
        return 'keyboard_arrow_down'
      } else {
        return 'keyboard_arrow_up'
      }
    },
    totalPayable() {
      return (Number(this.subtotal) + Number(this.shipping)).toFixed(2)
    }
  }

}
</script>

<style scoped>
    .checkIndex{
      box-sizing: border-box;
      text-align: center;
      position: relative;
    }
    .orderSummaryWrapper{
      text-align: left;
      padding: 0 20px;
    }
    .orderSummaryHeader{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin: 20px auto;
      border-top: 1px solid orange;
      border-bottom: 1px solid orange;
      padding: 0 20px;
    }
    .orderSummaryHeader i{
      vertical-align: middle;
    }
    .orderSummaryHeader p{
      cursor: pointer;
    }
    
    .calculation p{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .calculation .total{
      height: 40px;
      margin: 15px auto;
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
    
    .payerInfo{
      text-align: left;
      padding: 0 20px;
    }
    .payerInfo h3{
      text-align: left;
    }
    .payerForm input, .payerForm #select{
      width: 100%;
      height: 40px;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.259);
      margin: 10px auto;
    }
    .payerForm button{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background: orange;
      border: none;
      border-radius: 10px;
    }
    .backToCart{
      color: orange;
      display: block;
      text-decoration: none;
      margin-top: 10px;
    }
    .backToCart i{
      vertical-align: middle;
    }
    
    



    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
    

</style>