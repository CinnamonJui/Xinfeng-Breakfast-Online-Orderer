<template>
  <!-- item of specific type-->
  <div class="row">
    <div class="col-12">
      <!-- item control -->
      <button
        class="item-control btn btn-dark btn-block text-left my-2 position-sticky sticky-top"
        data-toggle="collapse"
        :data-target="`#${type}`"
      >{{ type }}</button>
      <!-- item panel -->
      <ul class="container-fluid list-group collapse" :id="type">
        <li class="list-group list-group-item p-1" v-for="(item, index) in items" :key="index">
          <item-single-row :item="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ItemSingleRow from "./item-single-row.vue";

export default {
  props: {
    items: Array,
    type: String
  },
  components: { ItemSingleRow }
};
</script>
