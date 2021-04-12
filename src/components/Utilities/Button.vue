<template>
   <v-btn
      large
      v-on="$listeners"
      v-bind="$attrs"
   >
      <slot></slot>
   </v-btn>
</template>

<script>
export default {
   name: 'Button',
   inheritAttrs: false
}
</script>
