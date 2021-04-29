<template>
  <v-col cols="6">
    <v-alert
      outlined
      color="teal"
      class="pa-8"
    >

      <h3 class=" font-weight-regular">
        <v-progress-circular
          :size="40"
          :width="7"
          color="teal"
          indeterminate
          class="mr-5"
        ></v-progress-circular>Please wait, we're processing your orders!
      </h3>
    </v-alert>
  </v-col>
</template>

<script>
export default {
  name: 'ProcessingOrder'
}
</script>
