<template>
   <v-row justify="center">
      <v-col
         cols="6"
         class="pt-0"
      >
         <ComponentTitle>
            <template #title>
               Confirm your order
            </template>
            <template #description>
               Where almost there!
            </template>
            <template #ranger>
               <slot></slot>
            </template>
         </ComponentTitle>

         <v-row>
            <v-col>
               <v-card
                  class="pa-4"
                  elevation="1"
               >
                  <v-card-text>
                     <h4>Subscription</h4>
                     <span>We'll send you carefully selected coffee every month.</span>
                  </v-card-text>
                  <v-card-text class="px-5">
                     <PlanMenuComponent elevation="1">
                        <template v-slot:package>
                           <h1 class="py-8">
                              {{form.plan.packageDeal}}
                           </h1>
                        </template>
                        <template v-slot:package-description>
                           <h3 class="mb-1">
                              {{form.plan.packageTitle}}
                           </h3>
                           <h5 class="blue-grey--text text--darken-2 font-weight-medium">
                              {{form.plan.packageDescription}}
                           </h5>
                        </template>
                        <template v-slot:package-price>
                           <h1 class="font-weight-bold display-3 text-center">
                              <span class="display-1">$</span>{{form.plan.packagePrice}}
                           </h1>
                        </template>
                     </PlanMenuComponent>
                  </v-card-text>
                  <v-card-text>
                     <h4>
                        Level up your box
                     </h4>
                     <span>
                        Treat yourself by leveling up your monthly box.
                     </span>
                     <div class="ml-5 mt-3">
                        <v-checkbox
                           v-model="singleOriginChocolate"
                           class="mt-1"
                           hide-details
                           dense
                        >
                           <template v-slot:label>
                              <span class="body-2 blue-grey--text text--darken-2">
                                 4pcs. Single Origin Chocolate (+$4/month)
                              </span>
                           </template>
                        </v-checkbox>
                        <v-checkbox
                           v-model="deliciousTreat"
                           class="mt-1 caption"
                           hide-details
                           dense
                        >
                           <template v-slot:label>
                              <span class="body-2 blue-grey--text text--darken-2">
                                 Another delicious treat (+$2/month)
                              </span>
                           </template>
                        </v-checkbox>
                     </div>
                  </v-card-text>
                  <v-card-text>
                     <v-row>
                        <v-col cols="8">
                           <h4>
                              Delivery
                           </h4>
                           <span>
                              Your first Liquid Gold Box is right around the corner
                           </span>
                        </v-col>
                        <v-col cols="4">
                           <h4>
                              {{form.name}}
                           </h4>
                           <span>
                              {{form.address}}
                           </span>
                        </v-col>
                     </v-row>
                  </v-card-text>
               </v-card>
            </v-col>
         </v-row>
      </v-col>
   </v-row>
</template>

<script>
// COMPONENTS
import ComponentTitle from '@/components/Utilities/ComponentTitle'

// APP
import PlanMenuComponent from './FormChildComponent/PlanMenuComponent'
export default {
   name: 'FormReviewOrder',
   components: {
      PlanMenuComponent,
      ComponentTitle
   },
   props: {
      form: {
         type: Object,
         required: true
      },
   },
   data () {
      return {
         singleOriginChocolate: 4,
         deliciousTreat: 2
      }
   },
}
</script>

<style>
</style>