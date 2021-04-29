<template>
  <v-row justify="center">
    <v-col
      cols="6"
      class="pt-0"
    >
      <ComponentTitle>
        <template #title>
          Delivery Details
        </template>
        <template #description>
          Where should we send your freshly roasted coffee beans?
        </template>
        <template #ranger>
          <slot></slot>
        </template>
      </ComponentTitle>

      <v-row class="mt-5">
        <v-col>
          <form
            action=""
            class="px-0"
          >
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="2"
                class=" text-right blue-grey--text text-darken-2 font-weight-medium"
              >
                Name
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="form.name"
                  :error-messages="nameErrors"
                  placeholder="name"
                  solo
                  :hide-details="!$v.form.name.$dirty"
                  required
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()"
                ></v-text-field>
              </v-col>

              <v-col
                cols="2"
                class="mb-5 text-right blue-grey--text text-darken-2 font-weight-medium"
              >
                Address
              </v-col>
              <v-col
                cols="10"
                class="pb-0"
              >
                <v-textarea
                  v-model="form.address"
                  placeholder="Address"
                  solo
                ></v-textarea>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// COMPONENTS
import ComponentTitle from '@/components/Utilities/ComponentTitle'

// APP
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'FormAddress',
  mixins: [validationMixin],
  components: {
    ComponentTitle,
  },
  props: {
    form: {
      type: Object,
      required: true
    },
  },
  validations: {
    form: {
      name: { required }
    }
  },
  data: () => ({


  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Name is required.')
      return errors
    },
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return Promise.reject(this.nameErrors)
      } else {
        return Promise.resolve(this.form)
      }
    }
  },

}
</script>
