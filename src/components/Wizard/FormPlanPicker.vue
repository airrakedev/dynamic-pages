<template>
   <v-row
      justify="center"
      v-on="$listeners"
      v-bind="$attrs"
   >
      <v-col
         cols="6"
         class="pt-0"
      >
         <ComponentTitle>
            <template #title>
               Coffee Plans
            </template>
            <template #description>
               We travel the world to source the very best single origin coffee for you
            </template>
            <template #ranger>
               <slot></slot>
            </template>
         </ComponentTitle>
         <template v-for="plan in planner">
            <PlanMenuComponent
               elevation="1"
               :key="plan.packageTitle"
               @click="selectPlan(plan)"
               :selected="plan.packageDeal===selectedPlan.packageDeal"
            >
               <template v-slot:package>
                  <h1 class="py-8">
                     {{plan.packageDeal}}
                  </h1>
               </template>
               <template v-slot:package-description>
                  <h3 class="mb-1">
                     {{plan.packageTitle}}
                  </h3>
                  <h5 class="blue-grey--text text--darken-2 font-weight-medium">
                     {{plan.packageDescription}}
                  </h5>
               </template>
               <template v-slot:package-price>
                  <h1 class="font-weight-bold display-3 text-center">
                     <span class="display-1">$</span>{{plan.packagePrice}}
                  </h1>
               </template>
            </PlanMenuComponent>
         </template>
         <v-row v-if="error">
            <v-col cols="12">
               <v-alert type="error">
                  {{errorMessage}}
               </v-alert>
            </v-col>
         </v-row>
      </v-col>
   </v-row>

</template>

<script>
import PlanMenuComponent from './FormChildComponent/PlanMenuComponent'
import ComponentTitle from '@/components/Utilities/ComponentTitle'
export default {
   name: 'FormPlanPicker',
   inheritAttrs: false,
   components: {
      PlanMenuComponent,
      ComponentTitle
   },
   props: {
      form: {
         type: Object,
         required: true
      }
   },
   data () {
      return {
         planner: [
            {
               packageDeal: '250g',
               packageTitle: 'The Single',
               packageDescription: 'One bag of freshly roasted coffee beans delivered to your house every month',
               packagePrice: 19
            },
            {
               packageDeal: '500g',
               packageTitle: 'The Curious',
               packageDescription: 'Two different types of freshly roasted coffee every month',
               packagePrice: 29
            }, {
               packageDeal: '1kg',
               packageTitle: 'The Addict',
               packageDescription: 'Two bags of two different types of freshly roasted coffee every month.',
               packagePrice: 49
            }
         ],
         selectedPlan: this.form.plan,
         error: false,
         errorMessage: ''
      }
   },
   methods: {
      selectPlan (plan) {
         this.selectedPlan = plan
         this.$emit('atNext')
      },
      submit () {
         console.log(this.selectedPlan, 'plan picker submit')
         if (Object.keys(this.selectedPlan).length < 1) {
            this.error = true
            this.errorMessage = 'Please select a plan before continuing.'
            return Promise.reject(this.errorMessage)
         }
         // process form
         this.form.plan = this.selectedPlan
         return Promise.resolve(this.form)
      }
   },
   // watch: {
   //    'form.plan': {
   //       deep: true,
   //       immediate: true,
   //       handler (data) {
   //          console.log(data, 'watching')
   //       }
   //    }
   // },
   mounted () {
      if (Object.keys(this.form.plan).length > 0) {
         this.$emit('atNext')
      }
   },
}
</script>
