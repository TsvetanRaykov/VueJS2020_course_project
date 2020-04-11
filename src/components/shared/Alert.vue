<template>
  <v-alert dense outlined type="error" @input="onClose" dismissible>{{text}}</v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false
    }
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
