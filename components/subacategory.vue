<style scoped></style>

<template>
<!--subabreadcrumb v-ref:breadcrumb></subabreadcrumb-->
<div class="news-page list-group" v-show="isCategoryFetched"> 
    <a class="list-group-item" v-link="{name: 'news', params: {title: item.title}}" target="_self" v-for="item in list" >
        <h6 class="list-group-item-heading>">
            <!--span class="glyphicon glyphicon-th-list"></span-->[{{item.ct}}]-{{item.title}}
        </h6>
        <p class="list-group-item-content"></p>
    </a>
</div>
<subapagination v-bind:count="count"></subapagination>
</template>

<script>
import subapagination from './subapagination.vue'

export default {
    components: {
        subapagination,
    },
    data () {
        return {
            list: [],
            cache: [],
            title: '',
            isCategoryFetched: false,
            now: 1,
            count: 0,
            limit: 15,
        }
    },
    route: {
        data (transition) {
            var now = this.$cookie.get(transition.to.params.title);
            if (now !== null) {
                this.now = now;
            }
            this.title = transition.to.params.title;
            this.fetchPagination();
            
            this.$http.get('get/category/'+this.title+'/'+this.limit+'/'+this.now).then((response) => {
                var data = response.data;
                if (data.success === true) {
                    this.list = data.msg;
                    this.cache[this.now] = data.msg;
                    this.isCategoryFetched = true;
                    this.$dispatch('handleError', false);
                    this.$dispatch('updateBreadcrumb', [{
                         obj: {
                             name: 'category',
                             params: {
                                title: this.title,
                            }
                         },
                         content: this.title,
                    }]);
                } else {
                    this.$dispatch('handleError', true);
                }
            }, (error) => {
                this.$dispatch('handleError', true);
            });
        }
    },
    events: {
        updatePageNow (now) {
            var cached = this.cache[now];

            this.$cookie.set(this.title, now, 1);

            if (cached !== undefined) {
                this.list = cached;
            } else {
                this.now = now;
                this.$http.get('get/category/'+this.title+'/'+this.limit+'/'+this.now).then((response) => {
                    var data = response.data;
                    
                    if (data.success === true) {
                        this.list = this.cache[now] = data.msg;
                    } else {
                        // 
                    }
                }, (error) => {
                    // 
                });
            }
        },
        updatePageLimit (limit) {}
    },
    methods: {
        fetchCategory: function () {
            this.$http.get('get/category/'+this.title+'/'+this.limit+'/'+this.now).then((response) => {
                var data = response.data;
                if (data.success === true) {
                    return data.msg;
                } else {
                    return false;
                }
            }, (error) => {
                return false;
            });
        },
        fetchPagination: function () {
            this.$http.get('get/pagination/'+this.title+'/'+this.limit).then((response) => {
                var data = response.data;
                if (data.success === true) {
                    this.count = data.msg;
                }
            }, (error) => {
                //
            });
        }
    },
    // watch: {
    //     count (val, oldVal) {
    //         this.$refs.pagination.count = val;
    //     },
    // }
}
</script>