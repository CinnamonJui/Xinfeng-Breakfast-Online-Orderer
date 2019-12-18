import indexScss from './main.scss';
import Vue from 'vue';
import 'bootstrap';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


// Log in&out control
new Vue({
  el: "#user-action",
  data: {
    isLogin: false,
    username: 'undefined',
  },
  methods: {
    logout() {
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
import ComboCard from './combo-card.vue';
import ItemCard from './item-card.vue';


class Combo {
  constructor({ ID, price, picture, items, info }) {
    this.ID = ID;
    this.price = price;
    this.picture = picture;
    this.items = items;
    this.info = info;
  }
}
class Item {
  constructor({ ID, type, price, picture, info }) {
    this.ID = ID;
    this.type = type;
    this.price = price;
    this.picture = picture;
    this.info = info;
  }
}
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

let really = new Vue({
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

