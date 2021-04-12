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

      <v-btn
         href="https://github.com/vuetifyjs/vuetify/releases/latest"
         target="_blank"
         text
      >
         <v-icon>mdi-heart</v-icon>
      </v-btn>
   </v-app-bar>

</template>

<script>
export default {
   name: 'LayoutAppbar'
}
</script>
