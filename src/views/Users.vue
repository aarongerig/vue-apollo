<template>
  <div>
    <user-form />
    <user-list />
  </div>
</template>

<script>
import UserForm from '@/components/UserForm';
import UserList from '@/components/UserList'

export default {
  components: {
    UserForm,
    UserList
  }
}
</script>
