<template>
  <div class="cart-page">
    <b-container>
      <h1 class="page-title">Shopping Cart</h1>

      <div v-if="cart.length > 0">
        <b-table
          striped
          hover
          responsive
          :items="cartItems"
          :fields="fields"
        >
          <template #cell(product)="data">
            <div class="d-flex align-items-center">
              <b-img :src="data.item.image" :alt="data.item.name" width="80" class="mr-3"></b-img>
              <div>
                <router-link :to="'/product/' + data.item.id" class="font-weight-bold">
                  {{ data.item.name }}
                </router-link>
              </div>
            </div>
          </template>

          <template #cell(price)="data">
            {{ currency }}{{ data.item.price.toLocaleString() }}
          </template>

          <template #cell(quantity)="data">
            <b-form-spinbutton
              v-model="data.item.quantity"
              min="1"
              :max="data.item.stock"
              @change="updateQuantity(data.item.id, data.item.quantity)"
              class="quantity-control"
            ></b-form-spinbutton>
          </template>

          <template #cell(total)="data">
            {{ currency }}{{ (data.item.price * data.item.quantity).toLocaleString() }}
          </template>

          <template #cell(actions)="data">
            <b-button variant="danger" size="sm" @click="removeFromCart(data.item.id)">
              <b-icon icon="trash"></b-icon> Remove
            </b-button>
          </template>
        </b-table>

        <div class="cart-summary mt-4">
          <b-row>
            <b-col md="6" offset-md="6">
              <b-card bg-variant="light">
                <h4>Cart Summary</h4>
                <hr>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span class="font-weight-bold">{{ currency }}{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span class="font-weight-bold">{{ currency }}1,000</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="h5">Total:</span>
                  <span class="h5 font-weight-bold">{{ currency }}{{ (cartTotal + 1000).toLocaleString() }}</span>
                </div>
                <div class="d-grid">
                  <b-button variant="primary" to="/checkout" class="btn-block">
                    Proceed to Checkout
                  </b-button>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <b-icon icon="cart-x" font-scale="5" variant="secondary" class="mb-4"></b-icon>
        <h3>Your cart is empty</h3>
        <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
        <b-button variant="primary" to="/" class="mt-3">
          Continue Shopping
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return {
      fields: [
        { key: 'product', label: 'Product' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'total', label: 'Total' },
        { key: 'actions', label: '' }
      ]
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['cart', 'cartTotal']),
    cartItems() {
      return this.cart.map(item => ({
        ...item,
        total: item.price * item.quantity
      }))
    }
  },
  methods: {
    updateQuantity(productId, quantity) {
      this.$store.dispatch('updateCartItemQuantity', { productId, quantity })
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId)
      this.$bvToast.toast('Product removed from cart.', {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.quantity-control {
  width: 100px;
}

.cart-summary {
  margin-bottom: 2rem;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
