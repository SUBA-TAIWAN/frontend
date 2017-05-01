<style scoped>
.alert mark {
    padding: 2px 6px;
    font-size: 85%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}
.required:after {
    content: "\002A";
    color: red;
}
.panel-body {
    margin: 0;
}
.donate-pills.active {
    background: #337ab7;
    color: #fff;
    font-weight: 900;
    padding: 10px 15px; 
}
.checkbox {
    padding: 0;
}
</style>

<template>

<div class="panel">
    <!--div class="panel-heading">
        <div class="col-md-4">
            <div class="donate-pills" v-bind:class="{ 'active': isPage1}">
                <p>第一步：</p>
                <p>填寫基本資料</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="donate-pills" v-bind:class="{ 'active': isPage2}">
                <p>第二步：</p>
                <p>填寫信用卡資料</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="donate-pills" v-bind:class="{ 'active': isPage3}">
                <p>捐款成功</p>
            </div>
        </div>
    </div-->
    <div class="alert alert-success" role="alert" v-if="empty(errs)">
        <p>請填入下表資料</p>
        <p><mark>*</mark>為必填欄位</p>
    </div>
    <div class="alert alert-danger" role="alert" v-if="!empty(errs)">
        <div class="pull-right">
            <button type="button" class="close" aria-label="Close" v-on:click="closeAlert"><span aria-hidden="true">&times;</span></button>
        </div>
        <ul class="list-unstyled" v-for="err in errs">
            <li><span class="glyphicon glyphicon-info-sign"></span>{{ err }}</li>
        </ul>
    </div>
    <div class="panel-body">
        <form id="donate-form" class="form-horizontal"  method="POST" v-on:submit="donate">
            <div class="form-group" v-bind:class="{ 'has-error': errFor.firstName}">
                <label class="control-label required" for="d-first-name">{{ labels.firstName }}</label>
                <input id="d-first-name" class="form-control" type="text" placeholder="{{ labels.firstName }}" v-model="donation.firstName" required>
                <span class="text-danger small" v-if="errFor.firstName"><span class="glyphicon glyphicon-info-sign">{{ errFor.firstName }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.lastName}">
                <label class="control-label required" for="d-last-name">{{ labels.lastName }}</label>
                <input id="d-last-name" class="form-control" type="text" placeholder="{{ labels.lastName }}" v-model="donation.lastName" required>
                <span class="text-danger small" v-if="errFor.lastName"><span class="glyphicon glyphicon-info-sign">{{ errFor.lastName }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.classIn}">
                <label class="control-label" for="d-class-in">{{ labels.classIn }}<span><span class="glyphicon glyphicon-question-sign"></span>日105B</span></label>
                <input id="d-class-in" class="form-control" type="text" placeholder="{{ labels.classIn }}" v-model="donation.classIn">
                <span class="text-danger small" v-if="errFor.classIn"><span class="glyphicon glyphicon-info-sign">{{ errFor.classIn }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.officePhone}">
                <label class="control-label" for="d-office-phone">{{ labels.officePhone }}</label>
                <input id="d-office-phone" class="form-control" type="text" placeholder="{{ labels.officePhone }}" v-model="donation.officePhone">
                <span class="text-danger small" v-if="errFor.officePhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.officePhone }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.homePhone}">
                <label class="control-label" for="d-home-phone">{{ labels.homePhone }}</label>
                <input id="d-home-phone" class="form-control" type="text" placeholder="{{ labels.homePhone }}" v-model="donation.homePhone">
                <span class="text-danger small" v-if="errFor.homePhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.homePhone }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.cellPhone}">
                <label class="control-label required" for="d-cell-phone">{{ labels.cellPhone }}</label>
                <input id="d-cell-phone" class="form-control" type="text" placeholder="{{ labels.cellPhone }}" v-model="donation.cellPhone" required>
                <span class="text-danger small" v-if="errFor.cellPhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.cellPhone }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.email}">
                <label class="control-label required" for="d-email">{{ labels.email }}</label>
                <input id="d-email" class="form-control" type="email" placeholder="{{ labels.email }}" v-model="donation.email" required>
                <span class="text-danger small" v-if="errFor.email"><span class="glyphicon glyphicon-info-sign">{{ errFor.email }}</span>
            </div>
            <!-- <div class="form-group" v-bind:class="{ 'has-error': errFor.postNumber}">
                <label class="control-label" for="d-post-number">{{ labels.postNumber }}</label>
                <input id="d-post-number" class="form-control" type="text" placeholder="{{ labels.postNumber }}" v-model="donation.postNumber">
                <span class="text-danger small" v-if="errFor.postNumber"><span class="glyphicon glyphicon-info-sign">{{ errFor.postNumber }}</span>
            </div> -->
            <div class="form-group" v-bind:class="{ 'has-error': errFor.address}">
                <label class="control-label" for="d-address">{{ labels.address }}</label>
                <input id="d-address" class="form-control" type="text" placeholder="{{ labels.address }}" v-model="donation.address">
                <span class="text-danger small" v-if="errFor.address"><span class="glyphicon glyphicon-info-sign">{{ errFor.address }}</span>
            </div>
            <div class="form-group">
                <div class="checkbox">
                    <label>
                        <input id="d-same-with-address" type="checkbox" v-model="donation.sameWithAddress">{{ labels.sameWithAddress }}
                    </label>
                </div>
            </div>
            <!-- <div class="form-group" v-bind:class="{ 'has-error': errFor.invoicePostNumber}">
                <label class="control-label" for="d-invoice-post-number">{{ labels.invoicePostNumber }}</label>
                <input id="d-invoice-post-number" class="form-control" type="text" placeholder="{{ labels.invoicePostNumber }}" v-model="donation.invoicePostNumber">
                <span class="text-danger small" v-if="errFor.invoicePostNumber"><span class="glyphicon glyphicon-info-sign">{{ errFor.invoicePostNumber }}</span>
            </div> -->
            <div class="form-group" v-bind:class="{ 'has-error': errFor.invoiceAddress}">
                <label class="control-label required" for="d-invoice-address">{{ labels.invoiceAddress }}</label>
                <input id="d-invoice-address" class="form-control" type="text" placeholder="{{ labels.invoiceAddress }}" v-model="donation.invoiceAddress" required>
                <span class="text-danger small" v-if="errFor.invoiceAddress"><span class="glyphicon glyphicon-info-sign">{{ errFor.invoiceAddress }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.invoiceTitle}">
                <label class="control-label required" for="d-invoice-title">{{ labels.invoiceTitle }}</label>
                <input id="d-invoice-title" class="form-control" type="text" placeholder="{{ labels.invoiceTitle }}" v-model="donation.invoiceTitle" required>
                <span class="text-danger small" v-if="errFor.invoiceTitle"><span class="glyphicon glyphicon-info-sign">{{ errFor.invoiceTitle }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.money}">
                <label class="control-label required" for="d-money">{{ labels.money }}</label>
                <input id="d-money" class="form-control" type="number" placeholder="{{ labels.money }}" v-model="donation.money" required>
                <span class="text-danger small" v-if="errFor.money"><span class="glyphicon glyphicon-info-sign">{{ errFor.money }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.cardType}">
                <label class="control-label required" for="d-card-type">{{ labels.cardType }}</label>
                <select id="d-card-type" class="form-control" v-model="donation.cardType">
                    <option value="">請選擇</option>
                    <option v-for="type in cardType" v-bind:value="type.value">{{ type.name }}</option>
                </select>
                <span class="text-danger small" v-if="errFor.cardType"><span class="glyphicon glyphicon-info-sign">{{ errFor.cardType }}</span>
            </div>
            <!--div class="form-group"  v-bind:class="{ 'has-error': errFor.number}">
                <label class="control-label required" for="number">{{ labels.number }}</label>
                <input id="name" class="form-control" type="text" name="number" v-model="number" placeholder="{{ labels.number }}" required>
                <span class="text-danger small" v-if="errFor.number"><span class="glyphicon glyphicon-info-sign">{{ errFor.number }}</span>
            </div>
            <div class="form-group"  v-bind:class="{ 'has-error': errFor.expiry}">
                <label class="control-label required" for="number">{{ labels.expiry }}</label>
                <input id="name" class="form-control" type="text" v-model="expiry" name="expiry" placeholder="{{ labels.expiry }}" required>
                <span class="text-danger small" v-if="errFor.expiry"><span class="glyphicon glyphicon-info-sign">{{ errFor.expiry }}</span>
            </div>
            <div class="form-group"  v-bind:class="{ 'has-error': errFor.cvc}">
                <label class="control-label required" for="number">{{ labels.cvc }}</label>
                <input id="name" class="form-control" type="text" v-model="cvc" name="cvc" placeholder="{{ labels.cvc }}" required>
                <span class="text-danger small" v-if="errFor.cvc"><span class="glyphicon glyphicon-info-sign">{{ errFor.cvc }}</span>
            </div-->
            <!--div>
               <subarecaptcha id:="suba-recaptcha" sitekey:="6Lf-fQoTAAAAALwTvjcSjkIT70BNKxKMS38M8rM-"></subarecaptcha>
            </div-->
            <div class="form-group" v-bind:class="{ 'has-error': errFor.approve}">
                <div class="checkbox">
                    <label>
                        <input id="d-approve" type="checkbox" v-model="donation.approve">同意東吳企管文教基金會網站的<a v-link="{name: 'page', params: {title: '隱私權政策'}}">隱私權政策</a>
                    </label>
                    <p class="text-danger small" v-if="errFor.approve"><span class="glyphicon glyphicon-info-sign">{{ errFor.approve }}</p>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary pull-right" v-bind:class="{ 'disable' : isButtonLock }" v-on:click="donate">確認</button>
            </div>

            <!--div class="alert alert-success" role="alert" v-if="isPage3">
                <h1>捐款成功</h1>
            </div-->
        </form>
        <form id="order-form" v-if="!empty(order)" class="hidden" method="POST" v-bind:action="url.auth">
            <input type="hidden" name="merID" v-model="order.merID">
            <input type="hidden" name="MerchantID" v-model="order.MerchantID">
            <input type="hidden" name="TerminalID" v-model="order.TerminalID">
            <input type="hidden" name="MerchantName" v-model="order.MerchantName">
            <input type="hidden" name="lidm" v-model="order.lidm">
            <input type="hidden" name="purchAmt" v-model="order.purchAmt">
            <input type="hidden" name="LocalDate" v-model="order.LocalDate">
            <input type="hidden" name="LocalTime" v-model="order.LocalTime">
            <input type="hidden" name="reqToken" v-model="order.reqToken">
            <input type="hidden" name="enCodeType" v-model="order.enCodeType">
            <input type="hidden" name="isSynchronism" v-model="order.isSynchronism">
            <input type="hidden" name="lagSelect" v-model="order.lagSelect">
            <input type="hidden" name="AuthResURL" v-model="url.AuthResURL">
            <button id="order-submit" >傳送</button>
        </form>
    </div>
</div>
</template>

<script>
// import subarecaptcha from './subarecaptcha.vue'
// import subacard from './subacard.vue'

export default {
    components: {
    //     subacard
    //     subarecaptcha
    },
    // route () {},
    data () {
        return {
            errFor: {},
            errs: [],
            donation: {
                firstName: "",
                lastName: "",
                // classType: "",
                // className: "",
                // classYear: "",
                classIn: "",
                // studentType: "",
                officePhone: "",
                homePhone: "",
                cellPhone: "",
                email: "",
                // postNumber: "",
                address: "",
                money: "",
                sameWithAddress: false,
                invoiceAddress: "",
                invoiceTitle: "",
                // invoicePostNumber: "",
                cardType: "",
                approve: false,
                // number: '',
                // expiry: '',
                // cvc: '',
            },
            labels: {
                firstName: "姓",
                lastName: "名",
                isAlumni: "畢業於東吳大學企業管理學系",
                classIn: "畢業系級",
                officePhone: "連絡電話(O)",
                homePhone: "連絡電話(H)",
                cellPhone: "連絡電話(手機)",
                email: "電子信箱",
                address: "地址",
                // postNumber: "地址郵遞區號",
                money: "金額",
                sameWithAddress: "同上面地址",
                invoiceAddress: "收據寄送地址",
                invoiceTitle: "收據抬頭",
                // invoicePostNumber: "收據郵遞區號",
                cardType: "卡片類型",
                // number: "信用卡號碼",
                // expiry: "信用卡到期日",
                // cvc: '信用卡背面末三碼'
            },
            cardType: [{
                name: "一般",
                value: 0
            }, {
                name: "台灣金融卡",
                value: 1
            }, {
                name: "銀聯卡",
                value: 2
            }
            // , {
            //     name: "台灣行動支付",
            //     value: 3
            // }
            ],
            order: {
                merID: "",
                MerchantID: "",
                TerminalID: "",
                MerchantName: "",
                customize: "",
                lidm: "",
                purchAmt: "",
                CurrencyNote: "",
                AutoCap: 0,
                PayType: 0,
                LocalDate: "",
                LocalTime: "",
                reqToken: "",
                enCodeType: "UTF-8",
                timeoutDate: "",
                timeoutTime: "",
                timeoutSecs: "",
                isSynchronism: 0,
                lagSelect: 0
            },
            url: {
                auth: '',
                AuthResURL: ''
            },
            isButtonLock: false
        }
    },
    ready () {
        this.$dispatch('updateBreadcrumb', [{
            obj: {
                name: 'donate'
            },
            content: '捐款',
        }]);
    },
    methods: {
        validate: function () {
            var errFor = {};
            var count = 0;

            if (!this.donation.firstName) {
                errFor.firstName = '請輸入姓';
            } else {
                if (/[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.firstName)) {
                    errFor.firstName = '姓含有其他字元';
                } else {
                    errFor.firstName = null;
                }
            }
            if (!this.donation.lastName) {
                errFor.lastName = '請輸入名';
            } else {
                if (/[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.lastName)) {
                    errFor.lastName = '名含有其他字元';
                } else {
                    errFor.lastName = null;
                }
            }
            // if (this.donation.classIn) {
            //     if (!/^(日|夜|碩|碩專)([\d]{2,3})([A-E]?)$/.test(this.donation.classIn)) {
            //         errFor.classIn = '畢業系級輸入錯誤';
            //     } else {
            //         errFor.classIn = null;
            //     }
            // }
            if (!this.donation.email) {
                errFor.email = '請輸入電子信箱';
            } else {
                errFor.email = null;
            }
            if (this.donation.officePhone && !/^[\d]*$/.test(this.donation.officePhone)) {
                errFor.officePhone = "連絡電話(O)只能輸入數字";
            } else {
                errFor.officePhone = null;
            }
            if (this.donation.homePhone && !/^[\d]*$/.test(this.donation.homePhone)) {
                errFor.homePhone = "連絡電話(H)只能輸入數字";
            } else {
                errFor.homePhone = null;
            }
            if (!this.donation.cellPhone) {
                errFor.cellPhone = '請輸入連絡電話(手機)';
            } else {
                if (!/^09([\d]{8})*$/.test(this.donation.cellPhone)) {
                    errFor.cellPhone = "連絡電話(手機)輸入錯誤";
                } else {
                    errFor.cellPhone = null;
                }
            }
            // if (this.donation.postNumber && !/^[\d]*$/.test(this.donation.postNumber)) {
            //     errFor.postNumber = "地址郵遞區號只能輸入數字";
            // } else {
            //     errFor.postNumber = null;
            // }
            if (this.donation.address && /[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.address)) {
                errFor.address = '地址含有其他字元';
            } else {
                errFor.address = null;
            }
            if (!this.donation.invoiceAddress) {
                errFor.invoiceAddress = '請輸入收據寄送地址';
            } else {
                if (/[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.invoiceAddress)) {
                    errFor.invoiceAddress = '收據寄送地址含有其他字元';
                } else {
                    errFor.invoiceAddress = null;
                }
            }
            if (!this.donation.invoiceTitle) {
                errFor.invoiceTitle = '請輸入收據抬頭';
            } else {
                if (/[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.invoiceTitle)) {
                    errFor.invoiceTitle = '收據抬頭含有其他字元';
                } else {
                    errFor.invoiceTitle = null;
                }
            }
            // if (!this.donation.invoicePostNumber) {
            //     errFor.invoicePostNumber = '請輸入收據寄送地址郵遞區號';
            // } else {
            //     if (!/^[\d]*$/.test(this.donation.invoicePostNumber)) {
            //         errFor.invoicePostNumber = "收據寄送地址郵遞區號輸入錯誤";
            //     } else {
            //         errFor.invoicePostNumber = null;
            //     }
            // }
            // if (this.donation.invoicePostNumber) {
            //     if (!/^[\d]*$/.test(this.donation.invoicePostNumber)) {
            //         errFor.invoicePostNumber = "收據寄送地址郵遞區號輸入錯誤";
            //     } else {
            //         errFor.invoicePostNumber = null;
            //     }
            // }
            if (!this.donation.money) {
                errFor.money = '請輸入金額';
            } else {
                if (!/^[\d]*$/.test(this.donation.money)) {
                    errFor.money = "金額只能輸入數字";
                } else {
                    errFor.money = null;
                }
            }
            if ((this.donation.cardType === "") || (this.donation.cardType === undefined)){
                errFor.cardType = '請選擇卡片類型';
            } else {
                if ((this.donation.cardType < 0) || (this.donation.cardType > 3)) {
                    console.log(this.donation.cardType);
                    errFor.cardType = "卡片類型選擇錯誤";
                } else {
                    errFor.cardType = null;
                }
            }
            // if (!this.number) {
            //     errFor.number = "請輸入信用卡卡號";
            // } else {
            //     if (!/^[\d]{16}$/.test(this.number)) {
            //         errFor.number = "信用卡卡號格式有誤";
            //     } else {
            //         errFor.number = null;
            //     }
            // }
            // if (!this.expiry) {
            //     errFor.expiry = "請輸入信用卡到期日";
            // } else {
            //     if (!/([\d]{2})\/([\d]{2})/.test(this.expiry)) {
            //         errFor.expiry = "信用卡到期日格式有誤";
            //     } else {
            //         errFor.expiry = null;
            //     }
            // }
            // if (!this.cvc) {
            //     errFor.cvc = "請輸入信用卡背面末三碼";
            // } else {
            //     if (!/^[\d]{3}$/.test(this.cvc)) {
            //         errFor.cvc = "信用卡背面末三碼格式錯誤";
            //     } else {
            //         errFor.cvc = null;
            //     }
            // }
            if (this.donation.approve == false) {
                errFor.approve = '請確定閱讀並同意財團法人東吳企管文教基金會網站的隱私權政策';
            } else {
                errFor.approve = null;
            }

            for (var i in errFor) {
                if (errFor[i] != null) {
                    count += 1;
                }
            }

            this.errFor = errFor;
            return (count === 0);
        },
        donate: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.isButtonLock = true;

            if (this.validate()) {
                var data = new FormData();

                data.append('donation', JSON.stringify(this.donation));

                this.$http.post('donation', data).then((response) => {
                    var data = response.data;

                    if (data.success) {
                        if (data.order) {
                            this.order = data.order;
                        }
                        if (data.url &&
                            data.url.auth && 
                            data.url.AuthResURL &&
                            (/https:\/\/www\.focas\.fisc\.com\.tw.+/.test(data.url.auth))
                            ) {
                            this.url = data.url;
                        }
                    }
                }).catch((response) => {
                    var error = response.data;

                    if (error.success === false) {
                        if (error.errFor) {
                            this.errFor = errFor;
                            return ;
                        }
                    }
                    if (error.code) {
                        // console.log(error.code);
                    }
                    if (error.msg) {
                        // console.log(error.msg);
                    }
                }).then(() => {
                    this.isButtonLock = false;
                    // console.log('Donation complete redirect to CH bank!');
                });
            } else {
                this.errs.push('表單資料有誤，請修改後再重新傳送！');
                this.isButtonLock = false;
            }
        },
        closeAlert: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.errs = [];
        },
        empty: function (data) {
            return (data.length <= 0);
        }
    },
    watch: {
        'donation.sameWithAddress': function (newVal, oldVal) {
            if (newVal === true) {
                this.donation.invoiceAddress = this.donation.address;
                // this.donation.invoicePostNumber = this.donation.postNumber;
            }
        },
        'url.AuthResURL': function (url, oldUrl) {
            if (url.length > 0) {
                var form = document.getElementById('order-form');

                form.submit();
            }
        }
    }
}
</script>