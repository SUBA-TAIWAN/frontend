<style scoped>
@media screen and (max-width:480px) {
    #logo, #logo img {
        max-width: 180px;
        padding-left: 1%;
    }
}

@media screen and (max-width:767px) and (min-width:481px) {
    #logo, #logo img {
        max-width: 220px;
        padding-left: 1%;
    }
}

@media screen and (min-width:768px) {
    #logo, #logo img {
        max-width: 300px;
    }
}

#logo img {
    position: relative;
    top: 10px;
    z-index: 1;
}
</style>

<template>
<div class="container" id="content">
        
    <div id="header">
        <div id="logo">
            <a href="/index" target="_self">
                <img src="/img/logo/fscuba.jpg" alt="東吳企管文教基金會">
            </a>
        </div>
    </div>

    <subamainnav></subamainnav>
    <subamarquee></subamarquee>
    <subabreadcrumb v-bind:links="breadcrumbLinks"></subabreadcrumb>
    <router-view></router-view>
    <subaerror v-bind:is-error="isError"></subaerror>
</div>
</template>

<script>
import subamainnav from './subamainnav.vue'
import subamarquee from './subamarquee.vue'
import subabreadcrumb from './subabreadcrumb.vue'
import subaerror from './subaerror.vue'

export default {
    components: {
        subamainnav, subamarquee, subabreadcrumb, subaerror
    },
    data () {
        return {
            isError: false,
            breadcrumbLinks: [],
        };
    },
    events: {
        handleError (error) {
            this.isError = error;
        },
        updateBreadcrumb (links) {
            this.breadcrumbLinks = links;
        }
    }
}
</script>