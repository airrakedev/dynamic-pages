<template>
  <v-container class="dont-move">
    <v-row
      v-if="!orderSuccess && !processingOrder"
      justify="start"
      class="mt-5 dont-move"
    >
      <v-col
        cols="12"
        class="pt-0 dont-move"
      >
        <transition name="slide">
          <keep-alive>
            <component
              :is="loadedForm"
              :ref="loadedForm"
              :key="loadedForm"
              :form="form"
              @atNext="proceedToNext"
            >
              <v-progress-linear
                v-model="stepLevel"
                :color="stepperColorValue"
                height="25"
              >
                <template v-slot:default="{ value }">
                  <strong>{{stepLevel }}%</strong>
                </template>
              </v-progress-linear>
            </component>
          </keep-alive>
        </transition>
      </v-col>
    </v-row>
    <v-row
      v-if="processingOrder"
      justify="center"
    >
      <ProcessingOrder />
    </v-row>
    <v-row
      v-if="orderSuccess"
      justify="center"
    >
      <v-col cols="8">
        <ComponentTitle>
          <template #title>
            Thank You!
          </template>
          <template #description>
            I'm looking forward to doing business with you again!
          </template>
          <template #ranger>
            <div class="text-center">
              <Button
                color="teal darken-2"
                class="white--text"
                width="220"
                elevation="1"
                @click="anotherOrder"
              >
                Create Another Plan
              </Button>
            </div>
          </template>
        </ComponentTitle>
      </v-col>
    </v-row>
    <v-row
      v-if="!orderSuccess && !processingOrder"
      justify="center"
    >
      <v-col
        cols="6"
        class="text-right"
      >
        <Button
          color="teal lighten-3"
          width="100"
          large
          dark
          elevation="1"
          class="mr-2"
          v-if="stepper>0"
          @click="clickBack"
        >
          Back
        </Button>
        <Button
          color="teal darken-2"
          class="white--text"
          :width="isLastForm? '100' : '170'"
          elevation="1"
          @click="proceed"
          :disabled='!checkNext'
        >
          {{isLastForm? 'Next' : 'Complete Order'}}
        </Button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComponentTitle from '@/components/Utilities/ComponentTitle'
import ProcessingOrder from '@/components/Utilities/ProcessingOrder'
export default {
  name: 'Home',
  components: {
    ComponentTitle,
    ProcessingOrder
  },

  data () {
    return {
      wizardForm: [
        'FormPlanPicker',
        'FormUserDetails',
        'FormAddress',
        'FormReviewOrder'
      ],
      stepperColor: [
        'blue-grey',
        'warning',
        'primary',
        'teal'
      ],
      stepper: 0,
      slider: 20,
      form: {
        address: '',
        chocolate: true,
        email: '',
        name: '',
        otherTreat: false,
        password: '',
        plan: {},
        recipient: ''
      },
      isNext: false,
      processingOrder: false,
      orderSuccess: false
    }
  },
  watch: {
    stepper (val) {
      if (val == this.wizardForm.length) {
        this.stepper = this.wizardForm.length - 1
      }

      if (val < 1) {
        this.stepper = val
      }
    }
  },

  computed: {
    loadedForm () {
      return this.wizardForm[this.stepper]
    },
    stepLevel () {

      return parseInt(((+this.stepper + 1) * 100) / this.wizardForm.length)
    },
    stepperColorValue () {
      return this.stepperColor[this.stepper]
    },
    isLastForm () {
      return this.stepper < this.wizardForm.length - 1
    },
    checkNext () {
      return this.isNext
    }
  },
  methods: {
    proceedToNext (status = true) {
      this.isNext = status
    },
    clickNext () {
      this.stepper++
    },
    clickBack () {
      this.stepper--
      this.proceedToNext()
    },
    proceed () {
      if (this.isLastForm) {
        this.$refs[this.loadedForm].submit().then(data => {
          if (data) {
            this.clickNext()
            // this.isNext = false
          }
        }).catch(error => console.log(error, 'Boom error'))
      } else {
        // complete orders
        this.processingOrder = true
        setTimeout(() => {
          this.processingOrder = false
          this.orderSuccess = true
        }, 1500);
      }
    },
    anotherOrder () {
      this.processingOrder = false
      this.orderSuccess = false
      this.form = {
        address: '',
        chocolate: true,
        email: '',
        name: '',
        otherTreat: false,
        password: '',
        plan: {},
        recipient: ''
      }
      this.isNext = false
      this.stepper = 0
    }
  },
}
</script>
<style scoped>
.dont-move {
  backface-visibility: hidden;
}
.slide-leave-active,
.slide-enter-active {
  transition: 1s ease;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
  display: none;
}
/* .slide-fade-enter-active {
   transition: all 0.18s cubic-bezier(0.5, 0.5, 0.8, 0.5);
}
.slide-fade-leave-active {
   transition: all 0.015s ease;
}
.slide-fade-enter, .slide-fade-leave-to

   transform: translateY(2px);
   opacity: 0;
} */
</style>
