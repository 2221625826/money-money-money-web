<template>
    <div>
      <UserInfo/>
      <Tab :active="2"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import UserInfo from '@/components/UserInfo.vue'
  import Tab from "@/components/Tab.vue";
  export default {
    name: 'UserInfoView',
    components: {
        UserInfo,
        Tab,
    }
  }
  </script>
  