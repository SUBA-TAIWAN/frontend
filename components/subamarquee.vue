<style scoped>
div {
    background: #68250A;
    height: 2.5em;
    width: 100%;    
    font-size:1em;
    margin: 0 0 5px 0; 
    overflow: hidden;
    z-index: 1;
}

ul {
    width: 100%;
    max-height: 2.5em;
    position: relative;
    white-space: nowrap;
    top: 0;
    padding: 6px 0;
    margin: 0;
    /*-webkit-animation: 10s marquee ease infinite alternate;
    animation: 10s marquee ease infinite alternate;*/
}

ul li {
    padding-left: 5px;
    min-width: 10%;
    display: inline-block;
    position: relative;
    left: auto;
    color: #fff;
    transition: left 4s ease-in-out;
}

/*#marquee-content:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
}*/

a {
    padding: 5px;
    margin: 0;
    color: #fff;
}

a:hover {
    background: #78351a;
}
</style>

<template>
<div id="marquee">  
    <ul id="marquee-content">
        <li class="hidden-print" v-for="marquee in marquees" v-show="isMarqueeFetched">
            <a href="{{marquee.link}}" target="{{marquee.target}}" aria-label="{{marquee.content}}">{{marquee.content}}</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data () {
        return {
            marquees: [],
            isMarqueeFetched: false,
            timer: null
        }
    },
    activate (done) {
        this.fetchMarquee(done);
    },
    ready () {
        this.timer = this.run(4000);
    },
    detached () {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    },
    methods: {
        fetchMarquee: function (done) {
            this.$http.get('get/list/marquee').then((response) => {
                var data = response.data;
                if (data.success === true) {
                    this.marquees = data.msg;
                    this.isMarqueeFetched = true;
                    done();
                } else {
                }
            }, (error) => {
            });
        },
        run: function (time) {
            var parent = this.$el.children[0],
                children = parent.children,
                now = 0,
                left = 0;

            return window.setInterval(function () {
                var childrenLength = children.length;
                
                if (now > 0) {
                    left -= now * children[now-1].clientWidth;
                }
                for (var i=0; i<childrenLength; i++) {
                    children[i].style.left = left + 'px';
                }
                if (now < (childrenLength-4)) {
                    now += 1;
                } else {
                    now = 0;
                    left = 0;
                }
            }, time);
        }
    }
}
</script>