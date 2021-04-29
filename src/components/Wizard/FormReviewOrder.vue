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
              <h3>Subscription</h3>
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
                  <h3 class="mb-1 blue-grey--text">
                    {{form.plan.packageTitle}}
                  </h3>
                  <h5 class="blue-grey--text text--darken-2 font-weight-medium">
                    {{form.plan.packageDescription}}
                  </h5>
                </template>
                <template v-slot:package-price>
                  <h1 class="font-weight-bold display-3 text-center blue-grey--text">
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
                      4pcs. Single Origin Chocolate <span class="font-weight-bold">(+$4/month)</span>
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
                      Another delicious treat <span class="font-weight-bold">(+$2/month)</span>
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
                  <h4 class="teal--text">
                    {{form.name}}
                  </h4>
                  <span class="blue-grey--text">
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
      singleOriginChocolate: false,
      singleOriginChocolatePrice: 4,
      deliciousTreat: false,
      deliciousTreatPrice: 2,
      addOn: {
        singleOriginChocolatePrice: 0,
        deliciousTreatPrice: 0
      }
    }
  },
  watch: {
    singleOriginChocolate: {
      immediate: true,
      handler (newVal, oldVal) {
        let addOnValue = 0
        if (newVal) {
          addOnValue = +this.singleOriginChocolatePrice
        }
        if (oldVal != undefined && oldVal) {
          addOnValue = -this.singleOriginChocolatePrice
        }
        this.form.plan.packagePrice += addOnValue

        this.addOn.singleOriginChocolatePrice = addOnValue > 0 ? addOnValue : 0
        // this.form.plan.addOn = this.addOn

      }
    },
    deliciousTreat: {
      immediate: true,
      handler (newVal, OldVal) {
        let addOnValue = 0
        if (newVal) {
          addOnValue = +this.deliciousTreatPrice
        }
        if (OldVal != undefined && OldVal) {
          addOnValue = -this.deliciousTreatPrice
        }
        this.form.plan.packagePrice += addOnValue
        this.addOn.deliciousTreatPrice = addOnValue > 0 ? addOnValue : 0
      }
    },
    addOn: {
      deep: true,
      immediate: true,
      handler () {
        this.form.addOn = this.addOn
      }
    }

  },
}
</script>

<style>
</style>