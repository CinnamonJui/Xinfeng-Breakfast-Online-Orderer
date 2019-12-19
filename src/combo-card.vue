<template>
  <div class="combo card">
    <!-- card head: title & price -->
    <div class="card-header d-flex justify-content-between align-items-end">
      <h5 class="card-title d-inline my-auto">{{ combo.ID }}</h5>
      <span class="price card-subtitle text-muted">{{ combo.price }}元</span>
    </div>
    <!-- card body: content & description -->
    <div class="card-body">
      <p class="card-text">{{ combo.info }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <hr />
      <li class="list-group-item">{{ combo.items }}</li>
    </ul>
    <!-- card foot: cart control -->
    <div class="toCart card-footer">
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
<!-- DOM template end here-->
<script>
export default {
  props: {
    combo: Object
  },
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
.combo {
  width: 15rem;
}
</style>