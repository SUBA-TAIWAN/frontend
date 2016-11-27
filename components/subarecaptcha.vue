<style scoped></style>
<template></template>
<script>
export default{
    // data () {
    //     return {
    //         sitekey: "",
    //         theme: "light",
    //         type: "image",
    //         size: "normal",
    //         tabindex: "0",
    //         callback: "recaptchaCallback",
    //         expiredCallback: "",
    //         language: "zh-TW",
    //     }
    // },
    props: {
        id: "",
        sitekey: "",
        theme: "light",
        type: "image",
        size: "normal",
        tabindex: "0",
        callback: "recaptchaCallback",
        expiredCallback: "",
        language: "zh-TW"
    },
    activate (done) {
        this.renderRecaptcha(done);
    },
    // ready () {
    //     this.renderRecaptcha();
    // },
    methods () {
        renderRecaptcha: function (done) {
            done();
            var callback = function () {
                grecaptcha.render(this.id, {
                  'sitekey' : this.sitekey,
                  'theme' : this.theme,
                  'type' : this.type,
                  'size' : this.size,
                  'tableindex' : this.tabindex,
                  'callback' : this.callback,
                  'expired-callback' : this.expiredCallback,
                });
            };
            window.recaptchaCallback = callback;
            require(["https://www.google.com/recaptcha/api.js?onload=recaptchaCallBack&render=explicit&hl="]);
        }
    }
};
</script>