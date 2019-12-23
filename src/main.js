import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import './main.scss';
import Vue from 'vue';
import $ from 'jquery';

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
      $.get('./php/XBS_validate_login.php?logout=true');
      location.reload();
    },
  },
  created() {
    $.get('./php/XBS_validate_login.php', (data) => {
      if (data) {
        console.log(data);
        this.isLogin = true;
        this.username = data;
      }
    });
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
    $.getJSON('./php/XBS_combos.php')
      .then(rep => {
        for (const combo of rep)
          this.combos.push(new Combo(combo))
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
    $.getJSON('./php/XBS_items.php').then(rep => {
      for (const item of rep) {
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
