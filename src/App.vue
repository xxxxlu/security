<template>
  <div id="app">
    <header class="main-header">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-container>
          <b-navbar-brand to="/">
            <strong>Security Experts</strong>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse" />

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/" exact>Home</b-nav-item>
              <b-nav-item to="/contact">Contact Us</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/cart">
                <b-icon icon="cart" font-scale="1.2" />
                <span v-if="cartCount" class="cart-count">{{ cartCount }}</span>
                Cart
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="bg-primary text-white py-4 mt-5">
      <b-container>
        <b-row>
          <b-col md="4">
            <h5>Stay in Touch</h5>
            <p>Follow us on social media for the latest updates</p>
            <div class="social-links">
              <a href="#" class="text-white mr-3"><b-icon icon="facebook" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="twitter" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="instagram" /></a>
            </div>
          </b-col>
          <b-col md="4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><router-link to="/" class="text-white">Home</router-link></li>
              <li><router-link to="/contact" class="text-white">Contact Us</router-link></li>
            </ul>
          </b-col>
          <b-col md="4">
            <h5>Contact Us</h5>
            <p><b-icon icon="envelope" /> info@securityexperts.pk</p>
            <p><b-icon icon="geo-alt" /> Badshahi Complex 6, Lahore, Pakistan</p>
          </b-col>
        </b-row>
        <hr class="bg-white mt-4">
        <div class="text-center">
          <p>&copy; Copyright © 2025 | Powered by Data Network Solutions.</p>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('initializeProducts')
  }
}
</script>

<style>
.main-header {
  margin-bottom: 20px;
}

.cart-count {
  display: inline-block;
  background-color: #fff;
  color: #007bff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  margin-left: 5px;
  margin-right: 5px;
}

footer {
  margin-top: 50px;
}

.social-links a {
  font-size: 1.5em;
  transition: opacity 0.3s;
}

.social-links a:hover {
  opacity: 0.8;
}
</style>
