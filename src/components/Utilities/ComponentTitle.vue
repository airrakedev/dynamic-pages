<template>
   <v-row class="mb-5">
      <v-col cols="12">
         <h1 class="text-center">
            <slot name="title">
            </slot>
         </h1>
         <h2 class="text-center font-weight-light px-8">
            <slot name="description">
            </slot>
         </h2>
      </v-col>
      <v-col cols="12">
         <slot name="ranger"></slot>
      </v-col>
   </v-row>
</template>

<script>
export default {
   name: 'ComponentTitle'
}
</script>
