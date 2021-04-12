import Vue from 'vue'
import PlanMenuComponent from '@/components/Wizard/FormChildComponent/PlanMenuComponent'
import Button from '@/components/Utilities/Button'
import LayoutAppbar from '@/components/Layout/LayoutAppBar'

const components = {
   FormPlanPicker: () => import(/* webpackChunkName: 'FormPlanPicker' */ '@/components/Wizard/FormPlanPicker.vue'),
   FormUserDetails: () => import(/* webpackChunkName: 'FormUserDetails' */ '@/components/Wizard/FormUserDetails.vue'),
   FormAddress: () => import(/* webpackChunkName: 'FormAddress' */ '@/components/Wizard/FormAddress.vue'),
   FormReviewOrder: () => import(/* webpackChunkName: 'FormReviewOrder' */ '@/components/Wizard/FormReviewOrder.vue'),
   PlanMenuComponent,
   Button,
   LayoutAppbar
}

export default Vue.use({
   install: Vue => {
      Object.keys(components).forEach(key => {
         Vue.component(key, components[key])
      })
   }
})

