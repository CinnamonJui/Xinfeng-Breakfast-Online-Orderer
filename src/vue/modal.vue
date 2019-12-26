<template>
  <div class="modal fade" id="meal-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <h5 class="d-inline">{{ meal.ID }}</h5>
            <span class="text-muted">{{ meal.price }}元</span>
          </div>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="this.imgSrc" class="d-block w-100" />
              </div>
            </div>
          </div>
          <div>{{ meal.info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ModalEventBus } from "./eventbus-modal";
import $ from "jquery";
import { Meal, Item, Combo } from "./../models/meal";

export default {
  props: {},
  data() {
    return {
      meal: Meal,
      _modal: Object
    };
  },
  methods: {
    mealclicked(meal) {
      this.meal = meal;
      this._modal.modal("show");
    }
  },
  computed: {
    isItem() {
      return this.meal instanceof Item;
    },
    imgSrc() {
      return `./images/${this.isItem ? "item" : "combo"}/${this.meal.ID}.jpg`;
    }
  },
  created() {
    ModalEventBus.$on("meal-clicked", this.mealclicked);
  },
  mounted() {
    this._modal = $(this.$el);
  },
  beforeDestroy() {
    this._modal.$off("meal-clicked", this.mealclicked);
  }
};
</script>

<style lang="scss">
.modal.fade {
  transition: opacity 0.03s ease-in-out;
}
</style>