<template>
   <v-row justify="center">
      <v-col cols="12">
         <v-card
            v-bind="$attrs"
            v-on="$listeners"
            class="overflow-hidden"
            :class="activePlan"
         >
            <v-row
               class="px-3"
               align="center"
            >
               <v-col
                  cols="3"
                  class="text-center teal darken-1"
               >
                  <slot name="package"></slot>
               </v-col>
               <v-col cols="6">
                  <slot name="package-description"></slot>
               </v-col>
               <v-col cols="3">
                  <slot name="package-price"></slot>
               </v-col>
            </v-row>
         </v-card>
      </v-col>
   </v-row>
</template>

<script>
export default {
   name: 'PlanMenuComponent',
   inheritAttrs: false,
   props: {
      selected: {
         type: Boolean,
         default: false
      },
   },
   computed: {
      activePlan () {
         return this.selected ? 'teal lighten-4' : ''
      }
   },

}
</script>
