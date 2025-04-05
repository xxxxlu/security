<template>
  <div class="payment-success">
    <b-container>
      <div class="text-center py-5">
        <b-icon icon="check-circle" font-scale="5" variant="success" class="mb-4"></b-icon>

        <h1 class="text-success mb-4">Payment Successful!</h1>
        <p class="lead mb-4">Thank you for your order. Your order has been placed and is being processed.</p>

        <div class="order-details bg-light p-4 mx-auto" style="max-width: 500px;">
          <h4 class="mb-3">Order Details</h4>
          <p><strong>Order Number:</strong> #{{ orderNumber }}</p>
          <p><strong>Date:</strong> {{ orderDate }}</p>

          <hr>

          <p>An email with your order details has been sent to your email address.</p>
          <p class="mb-0">You will receive a confirmation when your order ships.</p>
        </div>

        <div class="mt-5">
          <b-button variant="primary" to="/" class="mx-2">Continue Shopping</b-button>
          <b-button variant="outline-secondary" to="/contact" class="mx-2">Contact Support</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccessView',
  data() {
    return {
      orderNumber: Math.floor(Math.random() * 1000000) + 10000,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.payment-success {
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.order-details {
  border-radius: 8px;
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

hr {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
