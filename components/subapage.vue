<style>
.page {
    margin-top: 30px;
}

.date {
    float: right;
    margin-right: 20px;
}

.page table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
}

.page table td, .project table th {
    padding: 10px;
    border-bottom-color: #f2f2f2;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}

.page table tbody tr:nth-child(2n) {
    background: #f5f5f5;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .8);
    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset;
    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset;
}

.page table th {
    text-align: left;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
    background-image: -ms-linear-gradient(#f5f5f5, #eee);
    background-color: #eee;
}

.page table th:first-child {
    border-radius: 6px 0 0;
    -moz-border-radius: 6px 0 0;
    -webkit-border-radius: 6px 0 0;
}

.page table th:last-child {
    border-radius: 0 6px 0 0;
    -moz-border-radius: 0 6px 0 0;
    -webkit-border-radius: 0 6px 0 0;
}

.page table th:only-child {
    border-radius: 6px 6px 0 0;
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px 6px 0 0;
}

.page table tfoot td {
    border-top-color: #fff;
    border-bottom-color: currentColor;
    border-top-width: 2px;
    border-bottom-width: 0;
    border-top-style: solid;
    border-bottom-style: none;
    background-color: #EEE;
    line-height: 10px;
}

.page table tfoot td:first-child {
    border-radius: 0 0 0 6px;
    -moz-border-radius: 0 0 0 6px;
    -webkit-border-radius: 0 0 0 6px;
}

.page table tfoot td:last-child {
    border-radius: 0 0 6px;
    -moz-border-radius: 0 0 6px;
    -webkit-border-radius: 0 0 6px;
}

.page table tfoot td:only-child {
    -moz-border-radius: 0 0 6px 6px;
}

.page .content img {
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
}
</style>

<template>
<div class="{{ page.title }} page" v-show="isPageFetched">
    <div class="title">
        <h4>{{ page.title }}</h4>
    </div>
    <div class="content">
        {{{ page.content }}}
    </div>
    <hr/>
    <div class="date">
        <p>更新時間:{{ page.ut }}</p>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            page: {},
            isPageFetched: false,
        }
    },
    route: {
        data (transition) {
            this.$http.get('get/page/'+transition.to.params.title).then((response) => {
                var data = response.data,
                    title = transition.to.params.title;
                if (data.success === true) {
                    this.page = data.msg;
                    this.isPageFetched = true;
                    this.$dispatch('handleError', false);
                    this.$dispatch('updateBreadcrumb', [{
                        obj: {
                            name: 'page',
                            params: {
                                 title: title,
                            }
                        },
                        content: title,
                    }]);
                } else {
                    this.$dispatch('handleError', true);
                }
            }, (error) => {
                this.$dispatch('handleError', true);
            });
        }
    }
}
</script>