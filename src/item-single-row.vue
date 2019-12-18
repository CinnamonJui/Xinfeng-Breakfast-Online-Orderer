<template>
  <div class="row px-1 justify-content-between">
    <div class="col m-0 my-auto">
      <h5 class="d-inline">{{item.ID}}</h5>
      <span class="text-muted">{{ item.price }}元</span>
    </div>
    <!-- item # control -->
    <div class="col-auto">
      <div class="input-group">
        <!-- item decrease -->
        <div class="cart-minus input-group-prepend">
          <button class="btn btn-danger form-control" @click="decrement">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <!-- item num, user can direct input # of items as he wishes -->
        <!-- whose value bind to 'toCartCount' -->
        <input
          type="number"
          class="item-num form-control text-center"
          min="0"
          max="50"
          v-model="toCartCount"
        />
        <!-- item increase -->
        <div class="cart-plus input-group-append">
          <button class="btn btn-success form-control" @click="increment">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["item"],
  data() {
    return {
      toCartCount: 0
    };
  },
  methods: {
    increment() {
      this.toCartCount < 50 ? ++this.toCartCount : null;
      this.$emit("item-to-cart");
    },
    decrement() {
      this.toCartCount > 0 ? --this.toCartCount : null;
      this.$emit("item-to-cart");
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
</style>