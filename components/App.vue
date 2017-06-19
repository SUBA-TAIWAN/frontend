<style scoped>
</style>

<template>
<subatopnav></subatopnav>
<subasidebar></subasidebar>
<subacontent></subacontent>
<subafooter></subafooter>
</template>

<script>
import subatopnav from './subatopnav.vue'
import subasidebar from './subasidebar.vue'
import subacontent from './subacontent.vue'
import subafooter from './subafooter.vue'

export default {
    components: {
        subatopnav, subasidebar, subacontent, subafooter
    },
    watch: {
        'appTitle' (val, oldVal) {
        }
    },
    replace: false
}
</script>