
<template>
    <div>user</div>
</template>

<script setup>
  import UserService from '@/servers/user'
  let res = await UserService.getUserInfo(12345)
  console.log(res)
  // let res_post = await UserService.setUserInfo({name: 'zhangsan'})
  // console.log(res_post)
</script>
