<style scoped>
div {
    background: #68250A;
    width:100%;
    height:40px;
    list-style:none;
    position: relative;
    z-index: 2;
    border-bottom: 5px #FFFF19 solid;
}

ul {
    margin: 0 auto;
    background: #68250A;
    max-width: 1024px;
    height:35px;
    list-style:none;
    padding-left: 0px;
    position: relative;
    z-index:2;
}

ul li {
    float: right;
    height:20px;
    margin-left: 10px;
}

a {
    padding: 5px;
    color: #fff;
    margin-left: 15px;
    font-size:15px;
    display:block;
    float: right;
}

a:visited, a:linked {
    color: #fff;
}

a:hover {
    background: #78351a;
}
</style>

<template>
<div id="topnav" v-show="isTopNavFetched">
    <ul>
        <li v-for="topitem in topitems">
            <a href="{{topitem.url}}" target="{{topitem.target}}" aria-label="{{topitem.content}}">{{topitem.content}}</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data () {
        return {
            topitems: [],
            isTopNavFetched: false,
        }
    },
    activate (done) {
        this.fetchTopMenu(done);
    },
    // ready () {
    //    
    // },
    methods: {
        fetchTopMenu (done) {
            this.$http.get('get/list/topmenu').then((response) => {
                var data = response.data;
                if (data.success === true) {
                    this.topitems = data.msg.top;
                    this.isTopNavFetched = true;
                    done();
                } else {
                    // console.warn('Error in list top menu');
                }
            }, (error) => {
                // console.warn('Error in list top menu');
            });
        }
    }
};
</script>