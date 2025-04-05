<template>
  <div class="checkout-page">
    <b-container>
      <h1 class="page-title">Checkout</h1>

      <div v-if="cart.length > 0">
        <b-row>
          <b-col lg="8">
            <b-card class="mb-4">
              <h4 class="mb-3">Contact Information</h4>
              <b-form @submit.prevent="submitOrder">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="First Name" label-for="firstName">
                      <b-form-input id="firstName" v-model="form.firstName" required placeholder="First Name"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Last Name" label-for="lastName">
                      <b-form-input id="lastName" v-model="form.lastName" required placeholder="Last Name"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-form-group label="Email" label-for="email">
                  <b-form-input id="email" type="email" v-model="form.email" required placeholder="Email"></b-form-input>
                </b-form-group>

                <b-form-group label="Phone" label-for="phone">
                  <b-form-input id="phone" v-model="form.phone" required placeholder="Phone Number"></b-form-input>
                </b-form-group>

                <h4 class="mt-4 mb-3">Shipping Address</h4>
                <b-form-group label="Address" label-for="address">
                  <b-form-input id="address" v-model="form.address" required placeholder="Address"></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col md="4">
                    <b-form-group label="City" label-for="city">
                      <b-form-input id="city" v-model="form.city" required placeholder="City"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="State / Province" label-for="state">
                      <b-form-input id="state" v-model="form.state" required placeholder="State / Province"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Postal Code" label-for="postalCode">
                      <b-form-input id="postalCode" v-model="form.postalCode" required placeholder="Postal Code"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <h4 class="mt-4 mb-3">Payment Method</h4>
                <b-form-group>
                  <div class="payment-options">
                    <div 
                      v-for="option in paymentOptions" 
                      :key="option.value"
                      class="payment-option"
                      :class="{ 'selected': form.paymentMethod === option.value }"
                      @click="form.paymentMethod = option.value"
                    >
                      <img :src="option.image" :alt="option.text" class="payment-image">
                      <div class="payment-name">{{ option.text }}</div>
                    </div>
                  </div>
                </b-form-group>

                <div v-if="form.paymentMethod === 'frame'" class="payment-details">
                  <b-alert show variant="info">
                    <h5>Frame Payment Details</h5>
                    <p class="mb-1">Please complete your payment using Frame.</p>
                    <p class="mb-1">Your order will be processed once payment is confirmed.</p>
                  </b-alert>
                </div>

                <div v-if="form.paymentMethod === 'easypaisa'" class="payment-details">
                  <b-alert show variant="info">
                    <h5>EasyPaisa Payment Details</h5>
                    <p class="mb-1">Please complete your payment using EasyPaisa.</p>
                    <p class="mb-1">Your order will be processed once payment is confirmed.</p>
                  </b-alert>
                </div>

                <b-button type="submit" variant="primary" size="lg" class="mt-4">
                  Place Order
                </b-button>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="4">
            <b-card class="order-summary">
              <h4 class="mb-3">Order Summary</h4>
              <b-list-group flush>
                <b-list-group-item v-for="item in cart" :key="item.id" class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="my-0">{{ item.name }}</h6>
                    <small class="text-muted">{{ currency }}{{ item.price.toLocaleString() }} × {{ item.quantity }}</small>
                  </div>
                  <span class="text-muted">{{ currency }}{{ (item.price * item.quantity).toLocaleString() }}</span>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small v-if="form.promoCode">{{ form.promoCode }}</small>
                    <small v-else>None</small>
                  </div>
                  <span class="text-success">-{{ currency }}0</span>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between">
                  <div>
                    <h6 class="my-0">Subtotal</h6>
                  </div>
                  <strong>{{ currency }}{{ cartTotal.toLocaleString() }}</strong>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between">
                  <div>
                    <h6 class="my-0">Shipping</h6>
                  </div>
                  <strong>{{ currency }}1,000</strong>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between">
                  <div>
                    <h6 class="my-0">Total</h6>
                  </div>
                  <strong>{{ currency }}{{ (cartTotal + 1000).toLocaleString() }}</strong>
                </b-list-group-item>
              </b-list-group>

              <div class="mt-3">
                <b-form-group label="Promo code" label-for="promoCode">
                  <b-input-group>
                    <b-form-input id="promoCode" v-model="form.promoCode" placeholder="Promo code"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="secondary">Apply</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>

      <div v-else class="text-center py-5">
        <b-icon icon="cart-x" font-scale="5" variant="secondary" class="mb-4"></b-icon>
        <h3>Your cart is empty</h3>
        <p class="text-muted">You need to add items to your cart before checkout.</p>
        <b-button variant="primary" to="/" class="mt-3">
          Shop Now
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import framePng from '../assets/Frame.png'
import easypaisaPng from '../assets/easypaisa.png'

export default {
  name: 'CheckoutView',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        paymentMethod: 'frame',
        promoCode: '',
        cardNumber: '',
        cardExpiration: '',
        cardCvv: ''
      },
      paymentOptions: [
        { text: 'Frame', value: 'frame', image: framePng },
        { text: 'EasyPaisa', value: 'easypaisa', image: easypaisaPng }
      ]
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['cart', 'cartTotal'])
  },
  methods: {
    submitOrder() {
      // In a real implementation, we would submit the order to a backend
      // For now, just redirect to success page and clear cart
      this.$store.dispatch('clearCart')
      this.$router.push('/success')
    }
  }
}
</script>

<style scoped>
.order-summary {
  position: sticky;
  top: 20px;
}

.payment-card-form {
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-top: 15px;
}

.payment-options {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.payment-option {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  width: 150px;
}

.payment-option:hover {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.payment-option.selected {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}

.payment-image {
  max-width: 100%;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.payment-name {
  font-weight: bold;
}

.payment-details {
  margin-top: 15px;
}
</style>
