<!-- 
    重定向
 -->
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const { params, query } = useRoute()
const { path } = params
useRouter().replace({ path: '/' + path, query }).catch((err) => {
    console.warn(err)
})


</script>
