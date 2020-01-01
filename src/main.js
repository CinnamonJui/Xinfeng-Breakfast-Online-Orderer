import 'bootstrap';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './main.scss';
import Vue from 'vue';
library.add(faShoppingCart)
dom.i2svg()
localStorage.setItem('cart', '{}')

// Log in&out control
new Vue({
  el: "#user-action",
  data: {
    isLogin: false,
    username: 'undefined',
  },
  methods: {
    logout() {
      localStorage.removeItem('cart')
      fetch('./php/XBS_validate_login.php?logout=true');
      location.reload();
    },
  },
  created() {
    const cartButton = document.getElementById('cart')
    fetch('./php/XBS_validate_login.php', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(res => res.text())
      .then(username => {
        if (username) {
          this.isLogin = true;
          this.username = username;
          cartButton.addEventListener('click', e => {
            e.preventDefault()
            window.location = './購物車.html'
          })
          return
        }
        // issue #12
        import(/* webpackChunkName: "Swal" */ 'sweetalert2')
          .then(({ default: Swal }) => {
            cartButton.addEventListener('click', (e) => {
              e.preventDefault()
              Swal.fire({
                icon: 'error',
                title: '你／妳還沒登入唷～',
              })
            })
          })
      })
  },
});

// Cart-badge, improve UX
import { CartBadgeEventBus } from './vue/eventbus-cart-badge'
new Vue({
  el: '#cart-badge',
  data: {
    combos: new Map(),
    items: new Map(),
    makeVueReactToMapFlag: true
    // Vue 2.X can't react to Map now
  },
  computed: {
    totalMeal() {
      // weird I know
      this.makeVueReactToMapFlag

      // Feel ninja? I get you six covered
      return [this.combos, this.items]// [Map, Map]
        .map(mapObj => Array.from(mapObj.values())) // [[1, 2], [2, 4]]
        .map(arr => arr.reduce((preVal, curVal) => preVal + curVal, 0)) // [3, 6]
        .reduce((preVal, curVal) => preVal + curVal) // 9
    },
    totalPrice() {
      // weird I know x 2
      this.makeVueReactToMapFlag
      let sum = 0

      sum += Array.from(this.combos.entries())
        .map(entry => {
          let [meal, count] = entry
          return meal.price * count
        })
        .reduce((preVal, curVal) => preVal + curVal, 0)

      sum += Array.from(this.items.entries())
        .map(entry => {
          let [meal, count] = entry
          return meal.price * count
        })
        .reduce((preVal, curVal) => preVal + curVal, 0)

      return sum
    }
  },
  created() {
    CartBadgeEventBus.$on('item-added', (item, count) => {
      if (count === 0)
        this.items.delete(item)
      else
        this.items.set(item, count)

      this.makeVueReactToMapFlag = !this.makeVueReactToMapFlag
    })
    CartBadgeEventBus.$on('combo-added', (combo, count) => {
      if (count === 0)
        this.combos.delete(combo)
      else
        this.combos.set(combo, count)

      this.makeVueReactToMapFlag = !this.makeVueReactToMapFlag
    })
  },
  beforeDestroy() {
    CartBadgeEventBus.$off('combo-added')
    CartBadgeEventBus.$off('item-added')
  }
})

import ComboCard from './vue/combo-card.vue';
import ItemCard from './vue/item-card.vue';
import Modal from './vue/modal.vue'
import { Combo, Item } from './models/meal'

new Vue({
  el: '#combo-panel',
  data: {
    combos: []
  },
  components: { ComboCard },
  created() {
    fetch('./php/XBS_combos.php', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(combos => {
        for (const combo of combos) {
          this.combos.push(new Combo(combo))
        }
      })
  }
});

new Vue({
  el: '#items',
  data: {
    items: {}
  },
  components: { ItemCard },
  created() {
    fetch('./php/XBS_items.php', {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(items => {
        for (const item of items) {
          if (!this.items.hasOwnProperty(item.type)) {
            // Be aware: Change-Detection-Caveats
            // Use vanilla js to set property won't make it reactive
            Vue.set(this.items, [item.type])
            this.items[item.type] = []
          }
          this.items[item.type].push(new Item(item))
        }
      })
  }
})

new Vue({
  el: '#modal',
  components: { Modal }
})
