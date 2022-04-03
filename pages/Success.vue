<template>
  <div class="success">
      <div class="middle" v-if="success">
          <img src="@/assets/img/payment.svg" alt="success_payment svg">
            <h2>Payment Successful!!!</h2>
            <p>Your payment was successful!</p>
            <p>Your order will soon be at the specified location</p>
            <NuxtLink class="backToCart" to="/">
                <i class="material-icons" >keyboard_arrow_left</i>Return Home
            </NuxtLink>
      </div>
      <Loading 
        v-else
      />
  </div>
</template>

<script>
export default {
    layout: 'nonav',
    data() {
        return {
            reference: this.$route.query.reference,
            success: true
        }
    },
    method: {
        async checkPaymentStatus() {
            const options = {
                method: 'GET',
                headers: {
                //Accept: 'application/json',
                // 'Content-Type': 'application/json',
                Authorization: 'Bearer sk_test_27002a3d2b0750fe0dab8afc4e4305b2516d9969'
                }
            }

            await fetch('https://api.paystack.co/transaction/verify/' + this.reference, options)
            .then(response => response.json())
            .then(response => paymentStatus(response))
            .catch(err => console.error(err));
        },
        paymentStatus(res) {
            if (res.data.status === 'success') {
                this.success = true
            } else {
                alert('payment failed')
                this.$router.push('/')
            }
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
    div.success{
        position: relative;
        height: 100vh;
        width: 100vw;
    }
    .middle{
        width: 80%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .middle img{
        width: 80%;
    }
    .middle h2{
        margin: 20px auto;
    }
    .middle p{
        color: rgba(0, 0, 0, 0.437);
        margin: 5px auto;
    }
    .middle a{
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background: orange;
        text-decoration: none;
        margin: 10px auto;
        border-radius: 5px;
    }
    .middle a i{
        vertical-align: middle;
    }
</style>