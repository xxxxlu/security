<template>
  <div class="home">
    <b-container>
      <!-- Hero Section -->
      <b-jumbotron
        header="CCTV Camera Price in Pakistan"
        lead="We are Providing Best CCTV Camera Price in Pakistan. We Deals in Security Surveillance Solutions, Attendance Machines, Video Door Phones and All Other Security Products for Residential and Commercial Use in Very Affordable Prices."
        bg-variant="light"
        class="mb-4"
      >
        <b-button variant="primary" to="/contact" class="mr-2">Contact Us</b-button>
      </b-jumbotron>

      <!-- Featured Categories -->
      <h2 class="section-title">Our Products</h2>
      <b-row class="mb-5">
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm">
            <div class="feature-icon mb-3">
              <b-icon icon="camera-video" font-scale="3" variant="primary" />
            </div>
            <h4>CCTV Packages</h4>
            <p>Explore our CCTV packages for reliable and affordable security solutions!</p>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm">
            <div class="feature-icon mb-3">
              <b-icon icon="lightning" font-scale="3" variant="primary" />
            </div>
            <h4>Electric Fence</h4>
            <p>Secure your property with our powerful electric fence solutions!</p>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm">
            <div class="feature-icon mb-3">
              <b-icon icon="sun" font-scale="3" variant="primary" />
            </div>
            <h4>Solar Panels</h4>
            <p>Power your home with our efficient solar panel solutions!</p>
          </b-card>
        </b-col>
      </b-row>

      <!-- Products -->
      <h2 class="section-title">CCTV Camera Packages</h2>
      <b-row>
        <b-col v-for="product in products" :key="product.id" md="4" class="mb-4">
          <b-card
            no-body
            class="product-card h-100 overflow-hidden"
          >
            <div class="p-3">
              <router-link :to="'/product/' + product.id">
                <b-img :src="product.image" :alt="product.name" fluid class="product-img" />
              </router-link>
              <router-link :to="'/product/' + product.id" class="text-dark">
                <h5>{{ product.name }}</h5>
              </router-link>
              <div class="mb-2">
                <span class="price">{{ currency }}{{ product.price.toLocaleString() }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price ml-2">
                  {{ currency }}{{ product.originalPrice.toLocaleString() }}
                </span>
              </div>
              <b-button variant="primary" class="mr-2" @click="addToCart(product)">Add to Cart</b-button>
              <b-button variant="outline-primary" :to="'/product/' + product.id">View Details</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Testimonials -->
      <h2 class="section-title mt-5">What Our Customers Say</h2>
      <b-row>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm">
            <blockquote class="blockquote mb-0">
              <p>Exceptional service and top-notch quality CCTV systems. The installation was smooth and clean.</p>
              <footer class="blockquote-footer">
                <small>Rashid from Lahore</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm">
            <blockquote class="blockquote mb-0">
              <p>Impressed with the professionalism and commitment to customer satisfaction. Easy to operate and perfectly installed.</p>
              <footer class="blockquote-footer">
                <small>Kamran from Islamabad</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm">
            <blockquote class="blockquote mb-0">
              <p>Fantastic experience! The team was very knowledgeable and helped me choose the perfect system for my needs.</p>
              <footer class="blockquote-footer">
                <small>Zainab from Karachi</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products'])
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', { product, quantity: 1 })
      this.$bvToast.toast(`${product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.feature-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
