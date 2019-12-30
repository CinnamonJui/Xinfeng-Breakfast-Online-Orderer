<template>
  <div class="row px-1 justify-content-between">
    <div class="col m-0 my-auto click-area" @click="mealclicked">
      <h5 class="d-inline">{{item.ID}}</h5>
      <span class="text-muted">{{ item.price }}元</span>
    </div>
    <!-- item # control -->
    <div class="col-auto">
      <div class="input-group">
        <!-- item decrease -->
        <div class="cart-minus input-group-prepend">
          <button class="btn btn-danger form-control" @click="decrement">
            <font-awesome-icon icon="minus" />
            <!-- <i class="fa fa-minus"></i> -->
          </button>
        </div>
        <!-- item num, user can direct input # of items as he wishes -->
        <!-- whose value bind to 'toCartCount' -->
        <input
          type="number"
          class="item-num form-control text-center"
          min="0"
          max="50"
          v-model.number="toCartCount"
        />
        <!-- item increase -->
        <div class="cart-plus input-group-append">
          <button class="btn btn-success form-control" @click="increment">
            <font-awesome-icon icon="plus" />
            <!-- <i class="fa fa-plus"></i> -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ModalEventBus } from "./eventbus-modal";
import { CartBadgeEventBus } from "./eventbus-cart-badge";
import { Item } from "./../models/meal";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faMinus);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  props: {
    item: {
      type: Item,
      required: true
    }
  },
  data() {
    return {
      toCartCount: 0
    };
  },
  methods: {
    increment() {
      this.toCartCount < 50 ? ++this.toCartCount : null;
    },
    decrement() {
      this.toCartCount > 0 ? --this.toCartCount : null;
    },
    mealclicked() {
      ModalEventBus.$emit("meal-clicked", this.item);
    }
  },
  watch: {
    toCartCount() {
      CartBadgeEventBus.$emit("item-added", this.item, this.toCartCount);
      const cartObj = JSON.parse(localStorage.getItem("cart"));
      this.toCartCount == 0
        ? delete cartObj[this.item.ID]
        : (cartObj[this.item.ID] = this.toCartCount);
      localStorage.setItem("cart", JSON.stringify(cartObj));
    }
  }
};
</script>

<style lang="scss">
.input-group {
  width: 12rem;
  display: inline-flex;
  justify-content: center;
  & * {
    max-width: 4rem;
  }
}
.click-area {
  cursor: pointer;
}
</style>