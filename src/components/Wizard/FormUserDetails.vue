<template>
  <v-row
    justify="center"
    class="dont-move"
  >
    <v-col
      cols="6"
      class="pt-0 dont-move"
    >
      <ComponentTitle>
        <template #title>
          Create Account
        </template>
        <template #description>
          Create an acccount or log in to order your liquid gold subscription
        </template>
        <template #ranger>
          <slot></slot>
        </template>
      </ComponentTitle>

      <v-row class="mt-8">
        <v-col class="mb-8">
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="2"
              class="text-right blue-grey--text text-darken-2 font-weight-medium"
            >
              Email
            </v-col>
            <v-col
              cols="10"
              class="pb-0"
            >
              <v-text-field
                class="pt-0"
                v-model="form.email"
                :error-messages="emailErrors"
                :disabled="loginStatus"
                placeholder="Email"
                solo
                hide-details="auto"
                required
                @keyup.prevent="checkUserEmail"
                @blur="$v.form.email.$touch()"
              >
              </v-text-field>
              <v-progress-linear
                v-if="checkEmailProgress && !$v.form.email.$invalid"
                color="warning"
                indeterminate
                rounded
                height="6"
                class="mt-2"
              ></v-progress-linear>
            </v-col>

          </v-row>
          <v-row
            justify="center"
            align="center"
            v-if="isLoggedIn"
          >
            <v-col
              cols="12"
              class="text-right py-0 pr-5"
            >
              <a
                href="#"
                class="blue-grey--text font-weight-medium"
                tabindex="-1"
                @click="loggedOut"
              >Not Me?</a>
            </v-col>
          </v-row>
          <v-row
            class="pt-2"
            justify="center"
            align="center"
            v-if="!$v.form.email.$invalid && !checkEmailProgress && (isUserExisting || checkEmailInDb)"
          >
            <v-col
              cols="2"
              class="text-right blue-grey--text text-darken-2 font-weight-medium"
            >
              Password
            </v-col>
            <v-col
              cols="10"
              class="pb-0"
            >
              <v-text-field
                v-model="form.password"
                :error-messages="passwordErrors"
                :type="showPassword? 'text' : 'password'"
                :disabled="loginStatus"
                placeholder="password"
                :append-icon="!showPassword? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="showPassword = !showPassword"
                solo
                required
                hide-details="auto"
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
            v-if="!checkEmailProgress && (checkEmailInDb && !$v.form.email.$invalid)"
          >
            <v-col class="text-right">
              <Button
                color="teal"
                class="white--text"
                @click="login"
                :disabled="isLoggedIn"
              >
                <v-progress-circular
                  v-if="loginStatus"
                  :width="3"
                  color="teal darken-2"
                  indeterminate
                  class="mr-2"
                ></v-progress-circular>
                Login
              </Button>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
            v-if="isUserExisting && !checkEmailProgress"
          >
            <v-col
              cols="2"
              class="mb-5 text-right blue-grey--text text-darken-2 font-weight-medium"
            >
              Name
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="form.name"
                :error-messages="nameErrors"
                solo
                placeholder="Name"
                hide-details="auto"
                required
                @keyup="submitUserDetails"
                @blur="$v.form.name.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- </form> -->
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
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'FormUserDetails',
  components: {
    ComponentTitle,
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: {
        required,
        checkPassword () {
          return !this.wrongPassword
        }
      }
    }
  },
  props: {
    form: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    isUserExisting: false,
    checkEmailInDb: false,
    wrongPassword: false,
    checkEmailProgress: false,
    loginStatus: false,
    showPassword: false,
    isLoggedIn: false
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Must be valid e-mail')
      !this.$v.form.email.required && errors.push('Email is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required && errors.push('Password required')
      !this.$v.form.password.checkPassword && errors.push('Password is incorrect.')
      return errors
    },
  },
  methods: {
    ...mapActions(['checkEmail', 'checkAccount']),

    checkUserEmail (event) {
      this.checkEmailProgress = false
      this.isUserExisting = false
      this.checkEmailInDb = false
      this.$v.$reset()
      this.moveNext(false)
      this.form.name = ""
      this.form.password = ""

      if (event.key === 'Enter') {
        this.validateUserEmail()
      }
    },
    validateUserEmail () {
      // check if validation got dirty
      this.$v.form.email.$touch()
      // check email is valid
      if (this.$v.form.email.$invalid) {
        this.checkEmailProgress = true
        return
      }
      this.checkEmailProgress = true
      this.checkEmail(this.form.email)
        .then(checkEmail => {
          this.checkEmailInDb = true
          this.isUserExisting = false
          this.checkEmailProgress = false
        })
        .catch(error => {
          this.isUserExisting = true
          this.checkEmailInDb = false
          this.checkEmailProgress = false
        })
    },
    submitUserDetails (e) {
      if (e.key === "Enter") {
        this.$v.form.name.$touch()

        if (this.$v.form.name.$invalid) {
          this.moveNext(false)
          return
        } else {
          this.$emit('atNext')
        }
      }
    },
    login () {
      this.$v.$reset()
      this.$v.$touch()
      if (!this.$v.form.email.$invalid && this.$v.form.password.required) {
        const { email, password } = this.form
        this.loginStatus = true
        this.moveNext(false)
        this.checkAccount({ email, password })
          .then(data => {
            this.loginStatus = false
            this.wrongPassword = false
            // check if user is already login then disabled the login button
            this.isLoggedIn = true
            Object.assign(this.form, data)
            this.moveNext()
          })
          .catch(err => {
            this.wrongPassword = true
            this.loginStatus = false
            // reset the form contents
            this.form.name = ''
          })
      }
    },
    loggedOut () {
      const clearData = {
        email: '',
        name: '',
        password: ''
      }
      if (this.isLoggedIn) {
        // disabled the Next Button
        this.moveNext(false)
        // clear the previous data
        Object.assign(this.form, clearData)
        // enable Login Button
        this.isLoggedIn = false
      }
    },
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.moveNext(false)
        this.validateUserEmail()
        return Promise.reject("Validation fails")
      } else {
        return Promise.resolve(this.form)
      }
    },
    moveNext (status = true) {
      this.$emit('atNext', status)
    }
  }
}
</script>


<style scoped>
.dont-move {
  backface-visibility: hidden;
}
</style>