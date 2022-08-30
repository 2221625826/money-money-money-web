<template>
    <div>
      <UserInfo/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import UserInfo from '@/components/UserInfo.vue'
  
  export default {
    name: 'UserInfoView',
    components: {
        UserInfo
    }
  }
  </script>
  