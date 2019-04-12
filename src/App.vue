<template>
  <a-locale-provider :locale="zh_CN">
    <router-view/>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data () {
    return {
      zh_CN,
    }
  }
}
</script>

