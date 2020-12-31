<template>
  <form @submit.prevent="submit">
    <fieldset>
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
      >
      <input
        v-model="twitter"
        type="text"
        placeholder="Twitter"
        required
      >
      <select
        v-model="rocket"
        required
      >
        <option
          :value="null"
          :selected="true"
        >Choose Rocket</option>
        <option
          v-for="rocket in rockets"
          :value="rocket.name"
          :key="rocket.id"
        >{{rocket.name}}</option>
      </select>
      <button type="submit">Send</button>
    </fieldset>
  </form>
</template>

<script>
import uuidv4 from 'uuid/v4'
import { GET_ROCKETS, GET_USERS } from '@/queries';
import { INSERT_USER } from '@/mutations'

export default {
  name: 'UserForm',

  apollo: {
    rockets: {
      query: GET_ROCKETS
    }
  },

  data() {
    return {
      name: '',
      twitter: '',
      rocket: ''
    }
  },

  methods: {
    submit() {
      const { name, twitter, rocket } = this.$data;
      const id = uuidv4();

      this.$apollo.mutate({
        mutation: INSERT_USER,
        variables: {
          id,
          name,
          twitter,
          rocket
        },
        update: (cache, { data: { insert_users } }) => {
          const [newUser] = insert_users.returning;
          const data = cache.readQuery({ query: GET_USERS });

          data.users.unshift(newUser);
          data.users.pop();

          cache.writeQuery({ query: GET_USERS, data });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          insert_users: {
            __typename: 'users_mutation_response',
            returning: [
              {
                __typename: 'users',
                id: -1,
                name,
                twitter,
                rocket
              }
            ]
          }
        }
      })
      .then((data) => {
        console.log('User added:', data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        Object.assign(this.$data, {
          name: '',
          twitter: '',
          rocket: ''
        })
      });
    }
  }
};
</script>
