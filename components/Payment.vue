<template>
  <div class="paymentModal">
      <Loading 
        v-if="loader"
      />
      <i class="material-icons" @click="closePaymentModal">close</i>
      <div class="payment">
            <h3>Shipping</h3>
            <div class="summary">
                <div class="contact">
                    <p>Contact</p>
                    <h4>{{ email }}</h4>
                    <h4>{{ tel }}</h4>
                </div>
                <hr>
                <div class="contact">
                    <p>Ship to</p>
                    <h4>{{address}}, {{city}}, {{state}}, {{country}}</h4>
                </div>
                <hr>
                <div class="shippingMethod">
                    <p>Shipping method</p>
                    <h4>Standard <span>$20.58</span></h4>
                </div>
            </div>
            <div class="proceedPayment" @click="launchPayment">
                Proceed to pay NGN {{ toPay }}
            </div>
            <p>At a conversion rate of NGN {{ rate }}</p>
            <p v-if="error">{{ error }}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['address', 'city', 'state', 'country', 'tel', 'email', 'totalAmount'],
    data() {
        return {
            rate: null,
            loader: false,
            error: ''
        }
    },
    methods: {
        closePaymentModal() {
            this.$emit('closePaymentModal')
        },
        async launchPayment() {
            let num = parseInt(this.toPay)
            console.log(num, this.toPay)
            const options = {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer sk_test_27002a3d2b0750fe0dab8afc4e4305b2516d9969'
                },
                body: JSON.stringify({
                    email: this.email,
                    amount: num * 100,
                    callback_url: 'https://saykeedshopify.netlify.app/success/'
                    //'https://saykeedshopify.netlify.app/success/'
                })
            
            };

            await fetch('https://api.paystack.co/transaction/initialize', options)
            .then(response => response.json())
            .then(response => {
                console.log('hy',response)
                window.location.href = response.data.authorization_url
            })
            .catch(err => console.error(err));
        },//window.location.href = 
        async getCurrentRate() {
            this.loader = true
            await fetch('https://v6.exchangerate-api.com/v6/ce120fade5e1d2663e949d9d/pair/USD/NGN')
            .then(response => response.json())
            .then(data => {
                this.rate = data.conversion_rate.toFixed(2)
                this.loader = false
            })
            .catch(err => {
                this.loader = false
                console.log(err)
                alert('Error: Could not fetch dollar conversion rate at this moment')
                this.error = 'Could not fetch dollar conversion rate at this moment'
            })
        } 
    },
    computed: {
        toPay() {
            if(this.rate) {
                return (this.totalAmount * this.rate).toFixed(2)
            }
        }
    },
    mounted() {
        this.getCurrentRate()
    }
}
</script>

<style scoped>
    .paymentModal{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.854);
        color: white;
        position: fixed;
        top:0;
        left: 0;
    }
    .paymentModal i{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.211);
        cursor: pointer;
    }
    .payment{
        background: white;
        width: 90%;
        max-width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        color: black;
        padding: 10px;
    }
    .payment h3{
        margin: 10px auto 20px;
    }
    .summary{
        border: 1px solid rgba(0, 0, 0, 0.256);
        border-radius: 10px;
        padding: 15px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 250px;
    }
    .summary hr{
        border: 1px solid rgba(0, 0, 0, 0.294);
    }
    .summary p{
        color: rgba(0, 0, 0, 0.622);
    }
    .shippingMethod h4{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .proceedPayment{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background: orange;
        border-radius: 10px;
        margin: 20px auto;
        cursor: pointer;
    }
    

    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>