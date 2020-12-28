<template>
  <ul>
    <li v-for="rocket in rockets" :key="rocket.id">
      <h2>{{rocket.name}}</h2>
      <p>{{rocket.description}}</p>
      <p><strong>$ {{rocket.costPerLaunch}}</strong></p>
    </li>
  </ul>
</template>

<script>
import gql from 'graphql-tag'

const query = gql`
query getRockets {
  rockets {
    id
    name
    description
    costPerLaunch: cost_per_launch
  }
}`

export default {
  name: 'RocketList',

  apollo: {
    rockets: {
      query
    }
  }
};
</script>

<style scoped>

</style>
