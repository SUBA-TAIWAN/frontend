<style scoped>
.detail_page {
    min-height: 300px;
    margin: 20px 0;
}

.detail_page .title {
    font-size: 26px;
    font-weight: 700;
    padding: 10px 0;
}

.detail_page .create_time {
    margin-top: 10px;
    font-size: 18px;
}

.detail_page .detail_content, .detail_page .detail_file {
    margin-top: 30px;
    line-height: 25px;
}

.detail_content img {
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 90%;
}

.detail_page, #scu_comment {
    background: #fdfdfd;
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 20px;
}

#scu_comment {
    margin: 10px 0 10px 0;
}
</style>

<template>
<div class="detail_page" id="scu-fb" v-show="isNewsFetched">
    <div class="detail_header">
        <div class="title">{{story.title}}</div>
        <div class="create_time">
            <p>發表時間：{{story.ct}}</p>
            <p>更新時間：{{story.ut}}</p>
        </div>
        <div class="fb-share-button" data-href="{{story.url}}" data-layout="button_count"></div>
        <div class="fb-like" data-href="https://www.facebook.com/scubaalumni" data-layout="standard" data-action="like" data-show-faces="false"></div>
        <div class="fb-follow" data-href="https://www.facebook.com/scubaalumni" data-layout="standard" data-show-faces="false"></div>
    </div>
    <div class="detail_content">{{{story.content}}}</div>
    
    <div id="scu_comment" class="hidden">
        <div class="fb-comments" data-href="{{story.url}}" data-width="100%" data-numposts="5"></div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            story: {},
            isNewsFetched: false,
        }
    },
    route: {
        data (transition) {
            this.$http.get('get/story/'+transition.to.params.title).then((response) => {
                var data = response.data,
                    title = transition.to.params.title;
                if (data.success === true) {
                    this.story = data.msg;
                    this.isNewsFetched = true;
                    this.$dispatch('handleError', false);
                    this.$dispatch('updateBreadcrumb', [{
                        obj: {
                            name: 'news',
                            params: {
                                 title: title,
                            }
                        },
                        content: title,
                    }]);
                } else {
                    this.$dispatch('handleError', true);
                    // console.warn('Error in story');
                }
            }, (error) => {
                this.$dispatch('handleError', true);
                // console.warn('Error in story');
            });
        }
    },
}
</script>