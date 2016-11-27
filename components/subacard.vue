<style scoped></style>
<template>
<div v-show="page2">
    <div class="form-group"  v-bind:class="{ 'has-error': errFor.number}">
        <label class="required" for="number">{{ labels.number }}</label>
        <input id="name" type="text" name="number" v-model="number" placeholder="{{ labels.number }}" required>
        <span class="text-danger" v-if="errFor.number">{{ errFor.number }}</span>
    </div>
    <div class="form-group"  v-bind:class="{ 'has-error': errFor.expiry}">
        <label class="required" for="number">{{ labels.expiry }}</label>
        <input id="name" type="text" v-model="expiry" name="expiry" placeholder="{{ labels.expiry }}" required>
        <span class="text-danger" v-if="errFor.expiry">{{ errFor.expiry }}</span>
    </div>
    <div class="form-group"  v-bind:class="{ 'has-error': errFor.cvc}">
        <label class="required" for="number">{{ labels.cvc }}</label>
        <input id="name" type="text" v-model="cvc" name="cvc" placeholder="{{ labels.cvc }}" required>
        <span class="text-danger" v-if="errFor.cvc">{{ errFor.cvc }}</span>
    </div>
    <div class="pull-right">
        <button class="btn btn-primary" v-on:click="prevStep">上一步</button>
        <button class="btn btn-success" v-on:click="nextStep">下一步</button>
    </div>
</div>
<div v-if="isLoading">信用卡資料傳輸中，請稍等！</div>
</template>
<script>
export default {
    props: {
        page1: false,
        page2: false,
        page3: false,
        number: '',
        expiry: '',
        cvc: '',
        labels: {}
    },
    data () {
        return {
            errFor: {},
            isLoading: false
        }
    },
    // activate (done) {
    //     var Card = new card('form', {
    //         container: '.card-wrapper',
    //     });
    //     done();
    // }
    // ready () {
    //     this.createCard();
    // },
    methods: {
        createCard: function () {
            var Card = new card({
                form: '#donate-form',
                container: '.card-wrapper',
            });
        },
        prevStep: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.page1 = true;
            this.page2 = false;
            this.page3 = false;
        },
        nextStep: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var errFor = {}

            if (!this.number) {
                errFor.number = "請輸入信用卡卡號";
            } else {
                if (!/^[\d]{16}$/.test(this.number)) {
                    errFor.number = "信用卡卡號格式有誤";
                } else {
                    errFor.number = null;
                }
            }
            if (!this.expiry) {
                errFor.expiry = "請輸入信用卡到期日";
            } else {
                if (!/([\d]{2})\/([\d]{2})/.test(this.expiry)) {
                    errFor.expiry = "信用卡到期日格式有誤";
                } else {
                    errFor.expiry = null;
                }
            }
            if (!this.cvc) {
                errFor.cvc = "請輸入信用卡背面末三碼";
            } else {
                if (!/^[\d]{3}$/.test(this.cvc)) {
                    errFor.cvc = "信用卡背面末三碼格式錯誤";
                } else {
                    errFor.cvc = null;
                }
            }
            this.errFor = errFor;

            if (!errFor) {
                this.isLoading = true;
            }
            // this.isPage1 = false;
            // this.isPage2 = false;
            // this.isPage3 = true;
        }
    }
}
</script>