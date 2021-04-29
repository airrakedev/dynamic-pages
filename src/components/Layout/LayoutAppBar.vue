<template>
  <v-app-bar
    app
    color="teal lighten-2"
    dark
    elevation="1"
  >
    <div class="d-flex align-center">
      <slot name="app-logo"></slot>
      <slot name="app-title"></slot>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>

</template>

<script>
export default {
  name: 'LayoutAppbar'
}
</script>
