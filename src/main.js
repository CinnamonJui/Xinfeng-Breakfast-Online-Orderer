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

    fetch('./php/XBS_validate_login.php', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(res => res.text())
      .then(username => {
        if (username) {
          this.isLogin = true;
          this.username = username;
        }
      })

  },
});

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
