<template>
  <span>
    <v-badge
      v-if="count"
      color="info"
      :content="count"
      offset-x="15"
      offset-y="37"
      bottom
      overlap
    >
      <slot> </slot>
    </v-badge>
    <slot v-else></slot>
  </span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: false
    }
  }
};
</script>

<style></style>
