<template>
  <div class="combo card">
    <!-- card head: title & price -->
    <div
      class="card-header click-area d-flex justify-content-between align-items-end"
      @click="this.mealclicked"
    >
      <h5 class="card-title d-inline my-auto">{{ combo.ID }}</h5>
      <span class="price card-subtitle text-muted">{{ combo.price }}元</span>
    </div>
    <!-- card body: content & description -->
    <div class="card-body click-area d-none d-sm-block" @click="this.mealclicked">
      <p class="card-text">{{ combo.info }}</p>
    </div>
    <ul class="list-group list-group-flush d-none d-sm-flex">
      <hr />
      <li class="list-group-item">{{ combo.items }}</li>
    </ul>
    <!-- card foot: cart control -->
    <div class="toCart card-footer">
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
<!-- DOM template end here-->
<script>
import { ModalEventBus } from "./eventbus-modal";
import { CartBadgeEventBus } from "./eventbus-cart-badge";
import { Combo } from "./../models/meal";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

library.add(faPlus, faMinus);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  props: {
    combo: {
      type: Combo,
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
      ModalEventBus.$emit("meal-clicked", this.combo);
    }
  },
  watch: {
    toCartCount() {
      CartBadgeEventBus.$emit("combo-added", this.combo, this.toCartCount);

      const cartObj = JSON.parse(localStorage.getItem("cart"));
      this.toCartCount === 0
        ? delete cartObj[this.combo.ID]
        : (cartObj[this.combo.ID] =
            this.toCartCount + "," + this.combo.price * this.toCartCount);
      localStorage.setItem("cart", JSON.stringify(cartObj));
    }
  }
};
</script>

<style lang="scss">
@media (max-width: 576px) {
  .card-header {
    border-bottom: 0px;
  }
  .card-footer {
    border-top: 0px;
  }
}

.combo {
  width: 13rem;
}
.click-area {
  cursor: pointer;
}
</style>