<template>
   <v-app>
      <LayoutAppbar>
         <template v-slot:app-logo>
            <v-img
               alt="Vuetify Logo"
               class="shrink mr-2"
               contain
               src="@/assets/coffee-cup.svg"
               transition="scale-transition"
               width="50"
            />
         </template>
         <template v-slot:app-title>
            <h2 class="font-weight-light teal--text text--darken-4 title">Morning Coffee</h2>
         </template>
      </LayoutAppbar>

      <v-container
         class="mt-8 pt-8 teal lighten-5"
         fill-height
         fluid
      >
         <router-view :key="$route.path">

         </router-view>
      </v-container>
   </v-app>
</template>

<script>

export default {
   name: 'App',

   data: () => ({
      //
   }),
};
</script>
