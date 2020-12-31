<template>
  <div v-if="rocket">
    <h2>{{rocket.name}}</h2>
    <p>{{rocket.description}}</p>
    <p><strong>$ {{rocket.costPerLaunch}}</strong></p>
  </div>
</template>

<script>
import { GET_ROCKET } from '@/queries'

export default {
  name: 'RocketItem',

  apollo: {
    rocket: {
      query: GET_ROCKET,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
};
</script>
