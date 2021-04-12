<template>
   <v-progress-linear
      v-model="slider"
      color="blue-grey"
      height="25"
   >
      <template v-slot:default="{ value }">
         <strong>{{ Math.ceil(value) }}%</strong>
      </template>
   </v-progress-linear>
</template>

<script>
export default {
   name: 'RangeSlider'
}
</script>

<style lang="scss" scoped>
</style>