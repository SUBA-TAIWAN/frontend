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
    <div class="alert alert-success" role="alert">
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
            <div class="form-group">
                <div class="checkbox">
                        <label>
                            <input id="d-is-alumin" type="checkbox" v-model="isAlumni">{{ labels.isAlumni }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.classType}" v-if="isAlumni">
                <label class="control-label required" for="d-class-type">{{ labels.classType }}</label>
                <select id="d-class-type" class="form-control" v-model="donation.classType">
                    <option value="day">日間部</option>
                    <option value="night">夜間部</option>
                </select>
                <span class="text-danger small" v-if="errFor.classType"><span class="glyphicon glyphicon-info-sign">{{ errFor.classType }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.studentType}" v-if="isAlumni">
                <label class="control-label required" for="d-class-type">{{ labels.studentType }}</label>
                <select id="d-class-type" class="form-control" v-model="donation.studentType">
                    <option value="0">學士班</option>
                    <option value="1">碩士班</option>
                    <option value="2">碩士在職班</option>
                </select>
                <span class="text-danger small" v-if="errFor.studentType"><span class="glyphicon glyphicon-info-sign">{{ errFor.studentType }}</span>
            </div>
            <!--div class="form-group" v-bind:class="{ 'has-error': errFor.className}">
                <label class="control-label required" for="d-class-name">{{ labels.className }}</label>
                <input id="d-class-name" class="form-control" type="text" placeholder="{{ labels.className }}" v-model="donation.className" required>
                <span class="text-danger small" v-if="errFor.className"><span class="glyphicon glyphicon-info-sign">{{ errFor.className }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.classYear}">
                <label class="control-label required" for="d-class-year">{{ labels.classYear }}</label>
                <input id="d-class-year" class="form-control" type="text" placeholder="{{ labels.classYear }}" v-model="donation.classYear" required>
                <span class="text-danger small" v-if="errFor.classYear"><span class="glyphicon glyphicon-info-sign">{{ errFor.classYear }}</span>
            </div-->
            <div class="form-group" v-bind:class="{ 'has-error': errFor.classIn}" v-if="isAlumni">
                <label class="control-label required" for="d-class-in">{{ labels.classIn }}<span><span class="glyphicon glyphicon-question-sign"></span>105B</span></label>
                <input id="d-class-in" class="form-control" type="text" placeholder="{{ labels.classIn }}" v-model="donation.classIn" required>
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
                <label class="control-label" for="d-cell-phone">{{ labels.cellPhone }}</label>
                <input id="d-cell-phone" class="form-control" type="text" placeholder="{{ labels.cellPhone }}" v-model="donation.cellPhone">
                <span class="text-danger small" v-if="errFor.cellPhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.cellPhone }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.email}">
                <label class="control-label required" for="d-email">{{ labels.email }}</label>
                <input id="d-email" class="form-control" type="email" placeholder="{{ labels.email }}" v-model="donation.email" required>
                <span class="text-danger small" v-if="errFor.email"><span class="glyphicon glyphicon-info-sign">{{ errFor.email }}</span>
            </div>
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
            <div class="form-group"  v-bind:class="{ 'has-error': errFor.number}">
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
            </div>
            <div>
               <!--subarecaptcha id:="suba-recaptcha" sitekey:="6Lf-fQoTAAAAALwTvjcSjkIT70BNKxKMS38M8rM-"></subarecaptcha-->
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.approve}">
                <div class="checkbox">
                    <label>
                        <input id="d-approve" type="checkbox" v-model="donation.approve">同意東吳企管文教基金會網站的<a v-link="{name: 'page', params: {title: '隱私權政策'}}">隱私權政策</a>
                    </label>
                    <p class="text-danger small" v-if="errFor.approve"><span class="glyphicon glyphicon-info-sign">{{ errFor.approve }}</p>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary pull-right" v-on:click="donate">確認</button>
            </div>

            <!--div class="alert alert-success" role="alert" v-if="isPage3">
                <h1>捐款成功</h1>
            </div-->
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
                classType: "",
                className: "",
                classYear: "",
                classIn: "",
                studentType: "",
                officePhone: "",
                homePhone: "",
                cellPhone: "",
                email: "",
                address: "",
                money: "",
                sameWithAddress: false,
                invoiceAddress: "",
                invoiceTitle: "",
                approve: false,
                number: '',
                expiry: '',
                cvc: '',
            },
            labels: {
                firstName: "姓",
                lastName: "名",
                isAlumni: "畢業於東吳大學企業管理學系",
                classInfo: "系級資料",
                classType: "系所類別",
                className: "系所名稱",
                classYear: "系所年度",
                classIn: "畢業系級",
                studentType: "身份別",
                officePhone: "連絡電話(O)",
                homePhone: "連絡電話(H)",
                cellPhone: "連絡電話(手機)",
                email: "電子信箱",
                address: "地址",
                money: "金額",
                sameWithAddress: "同上面地址",
                invoiceAddress: "收據寄送地址",
                invoiceTitle: "收據抬頭",
                number: "信用卡號碼",
                expiry: "信用卡到期日",
                cvc: '信用卡背面末三碼'
            },
            isAlumni: false,
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
            if (this.isAlumni) {
                if (!this.donation.classType) {
                    errFor.classType = '請選擇系所類別';
                } else {
                    if (!/^(day|night)$/.test(this.donation.classType)) {
                        errFor.classType = '請選擇系所類別';
                    } else {
                        errFor.classType = null;
                    }
                }
                if (!this.donation.studentType) {
                    errFor.studentType = '請選擇身分別';
                } else {
                    if (!/[0-2]/.test(this.donation.studentType)) {
                        errFor.studentType = '請選擇身分別';
                    } else {
                        errFor.studentType = null;
                    }
                }
                // if (!this.donation.className) {
                //     errFor.className = '請輸入系所名稱';
                // } else {
                //     if (/[\`~!@#$\%\^\&\\\*\(\)_\-+=|{\]\["';:\/}?><\.,]/g.test(this.donation.className)) {
                //         errFor.className = '系所名稱含有其他字元';
                //     } else {
                //         errFor.className = null;
                //     }
                // }
                // if (!this.donation.classYear) {
                //     errFor.classYear = '請輸入系所年度';
                // } else {
                //     if (!/^[\d]*$/.test(this.donation.classYear)) {
                //         errFor.classYear = '系所年度只接受數字';
                //     } else {
                //         errFor.classYear = null;
                //     }
                // }
                if (!this.donation.classIn) {
                    errFor.classIn = '請輸入畢業系級';
                } else {
                    // if (!/^[\d]*$/.test(this.donation.classIn)) {
                    //     errFor.classIn = '畢業班級只接受數字';
                    // } else {
                            errFor.classIn = null;
                    // }
                }
            }
            if (!this.donation.email) {
                errFor.email = '請輸入電子信箱';
            } else {
                errFor.email = null;
            }
            if (!this.donation.invoiceAddress) {
                errFor.invoiceAddress = '請輸入發票地址';
            } else {
                errFor.invoiceAddress = null;
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
            if (!this.donation.money) {
                errFor.money = '請輸入金額';
            } else {
                if (!/^[\d]*$/.test(this.donation.money)) {
                    errFor.money = "請輸入數字";
                } else {
                    errFor.money = null;
                }
            }
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
            if (this.donation.approve == false) {
                errFor.approve = '請確定閱讀並同意財團法人東吳企管文教基金會網站的隱私權政策';
            } else {
                errFor.approve = null;
            }
            this.errFor = errFor;
            return (!errFor) ? true : false;
        },
        donate: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (this.validate()) {
                console.log('Success and submit form');
            } else {
                this.errs.push('表單資料有誤，請修改後再重新傳送！')
                console.log('Validate failed');
            }
            return ;
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
            }
        },
        // 'errs' : function (val) {
        // }
    }
}
</script>