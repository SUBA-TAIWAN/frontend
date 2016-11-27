<style scoped>
@media screen and (max-width: 767px) {
    #mainnav {
        background: #fff;
        position: initial;
        margin-bottom: 0;
    }

    .navbar-wrapper {
        min-width: 100%;
        min-height: 100%;
        background: rgba(125,125,125,0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
    }

    .navbar-collapse {
        width: 250px;
        background: #fff;
        min-height: 100%;
        border-top: none;
        border-right: 2px solid #e7e7e7;
        position: fixed;
        top: 0;
        left: 0;
    }
}

@media screen and (min-width: 768px) {
    #mainnav {
        background: #fff;
        position: initial;
        margin-bottom: 0;
    }

    .navbar-wrapper {
        display: block;
    }
}
</style>

<template>
<nav id="mainnav" class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
        <button  type="button" class="navbar-toggle" v-on:click="toggleCollapse">
            <span class="sr-only">Toggle navigation</span>
        </button>
    </div>
        
    <div class="collapse navbar-wrapper" v-bind:class="{'collapse': isCollapse}" v-if="isMainNavFetched" v-on:click="toggleCollapse">
        <div class="navbar-collapse">
            <ul class="nav navbar-nav navbar-left">
                <li v-for="mainitem in mainitems">
                    <a class="linkpjax" href="{{mainitem.url}}" target="{{mainitem.target}}" aria-label="{{mainitem.content}}">{{mainitem.content}}</a>
                </li>
                <li class="dropdown" v-for="dropitem in dropitems" v-bind:class="{'open': isOpen}">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-label="{{dropitem.parent.content}}" v-on:click="toggleDropdown">
                        {{dropitem.parent.content}}<b class="caret"></b>
                    </a>
                    <span class="dropdown-arrow"></span>
                    <ul class="dropdown-menu">
                        <li v-for="child in dropitem.children">
                            <a href="{{child.url}}" target="{{child.target}}" aria-label="{{child.content}}">{{child.content}}</a>
                        </li>
                    </ul>
                </li>
             </ul>
         </div>
     </div>
</nav>
</template>

<script>
export default {
    data () {
        return {
            mainitems: [],
            dropitems: [],
            isMainNavFetched: false,
            isOpen: false,
            isCollapse: true
        }
    },
    activate (done) {
        this.fetchMainMenu(done);
    },
    // ready () {
    //     this.fetchMainMenu();
    // }, 
    methods: {
        fetchMainMenu: function (done) {
            this.$http.get('get/list/mainmenu').then((response) => {
                var data = response.data;
                if (data.success === true) {
                    this.mainitems = data.msg.main;
                    this.dropitems = data.msg.drop;
                    this.isMainNavFetched = true;
                    done();
                } else {
                    // console.warn('Error in main nav');
                }
            }, (error) => {
                // console.warn('Error in main nav');
            });
        },
        toggleDropdown: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.isOpen === false) {
                this.isOpen = true;
            } else {
                this.isOpen = false;
            }
        },
        toggleCollapse: function (e) {
            if (this.isCollapse === false) {
                this.isCollapse = true;
            } else {
                this.isCollapse = false;
            }
        },
    }
}
</script>