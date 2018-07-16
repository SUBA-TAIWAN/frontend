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
    <div class="alert alert-success" role="alert" v-if="empty(errs)">
        <p>請填入下表資料</p>
        <p><mark>*</mark>為必填欄位</p>
    </div>
    <div class="alert alert-danger" role="alert" v-if="!empty(errs)">
        <div class="pull-right">
            <button type="button" class="close" aria-label="Close" v-on:click.prevent="closeAlert"><span v-bind:aria-hidden="true">&times;</span></button>
        </div>
        <ul class="list-unstyled" v-for="err in errs">
            <li><span class="glyphicon glyphicon-info-sign"></span>{{ err }}</li>
        </ul>
    </div>
    <div class="panel-body">
        <div id="donate-form" class="form-horizontal">
            <div class="form-group" v-bind:class="{ 'has-error': errFor.firstName}">
                <label class="control-label required" for="d-first-name">{{ labels.firstName }}</label>
                <input id="d-first-name" class="form-control" type="text" v-bind:placeholder="labels.firstName" v-model="donation.firstName" required>
                <span class="text-danger small" v-if="errFor.firstName"><span class="glyphicon glyphicon-info-sign">{{ errFor.firstName }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.lastName}">
                <label class="control-label required" for="d-last-name">{{ labels.lastName }}</label>
                <input id="d-last-name" class="form-control" type="text" v-bind:placeholder="labels.lastName" v-model="donation.lastName" required>
                <span class="text-danger small" v-if="errFor.lastName"><span class="glyphicon glyphicon-info-sign">{{ errFor.lastName }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.classIn}">
                <label class="control-label" for="d-class-in">{{ labels.classIn }}<span><span class="glyphicon glyphicon-question-sign"></span>日105B</span></label>
                <input id="d-class-in" class="form-control" type="text" v-bind:placeholder="labels.classIn" v-model="donation.classIn">
                <span class="text-danger small" v-if="errFor.classIn"><span class="glyphicon glyphicon-info-sign">{{ errFor.classIn }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.officePhone}">
                <label class="control-label" for="d-office-phone">{{ labels.officePhone }}</label>
                <input id="d-office-phone" class="form-control" type="text" v-bind:placeholder="labels.officePhone" v-model="donation.officePhone">
                <span class="text-danger small" v-if="errFor.officePhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.officePhone }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.homePhone}">
                <label class="control-label" for="d-home-phone">{{ labels.homePhone }}</label>
                <input id="d-home-phone" class="form-control" type="text" v-bind:placeholder="labels.homePhone" v-model="donation.homePhone">
                <span class="text-danger small" v-if="errFor.homePhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.homePhone }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.cellPhone}">
                <label class="control-label required" for="d-cell-phone">{{ labels.cellPhone }}</label>
                <input id="d-cell-phone" class="form-control" type="text" v-bind:placeholder="labels.cellPhone" v-model="donation.cellPhone" required>
                <span class="text-danger small" v-if="errFor.cellPhone"><span class="glyphicon glyphicon-info-sign">{{ errFor.cellPhone }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.email}">
                <label class="control-label required" for="d-email">{{ labels.email }}</label>
                <input id="d-email" class="form-control" type="email" v-bind:placeholder="labels.email" v-model="donation.email" required>
                <span class="text-danger small" v-if="errFor.email"><span class="glyphicon glyphicon-info-sign">{{ errFor.email }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.address}">
                <label class="control-label" for="d-address">{{ labels.address }}</label>
                <input id="d-address" class="form-control" type="text" v-bind:placeholder="labels.address" v-model="donation.address">
                <span class="text-danger small" v-if="errFor.address"><span class="glyphicon glyphicon-info-sign">{{ errFor.address }}</span></span>
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
                <input id="d-invoice-address" class="form-control" type="text" v-bind:placeholder="labels.invoiceAddress" v-model="donation.invoiceAddress" required>
                <span class="text-danger small" v-if="errFor.invoiceAddress"><span class="glyphicon glyphicon-info-sign">{{ errFor.invoiceAddress }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.invoiceTitle}">
                <label class="control-label required" for="d-invoice-title">{{ labels.invoiceTitle }}</label>
                <input id="d-invoice-title" class="form-control" type="text" v-bind:placeholder="labels.invoiceTitle" v-model="donation.invoiceTitle" required>
                <span class="text-danger small" v-if="errFor.invoiceTitle"><span class="glyphicon glyphicon-info-sign">{{ errFor.invoiceTitle }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.purpose}">
                <label class="control-label required" for="d-purpose">{{ labels.purpose }}</label>
                <select id="d-purpose" class="form-control" v-model="donation.purpose">
                    <option value="">請選擇</option>
                    <option v-for="purp in purpose" v-bind:value="purp.value">{{ purp.name }}</option>
                </select>
                <p class="text-danger small" v-if="errFor.purpose"><span class="glyphicon glyphicon-info-sign">{{ errFor.purpose }}</span></p>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.purposeDetail}">
                <label class="control-label" for="d-purpose-detail">{{ labels.purposeDetail }}</label>
                <input id="d-purpose-detail" class="form-control" type="text" v-bind:placeholder="labels.purposeDetail" v-model="donation.purposeDetail">
                <span class="text-danger small" v-if="errFor.purposeDetail"><span class="glyphicon glyphicon-info-sign">{{ errFor.purposeDetail }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.money}">
                <label class="control-label required" for="d-money">{{ labels.money }}</label>
                <input id="d-money" class="form-control" type="text" v-bind:placeholder="labels.money" v-model="donation.money" required>
                <span class="text-danger small" v-if="errFor.money"><span class="glyphicon glyphicon-info-sign">{{ errFor.money }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.cardType}">
                <label class="control-label required" for="d-card-type">{{ labels.cardType }}</label>
                <select id="d-card-type" class="form-control" v-model="donation.cardType">
                    <option value="">請選擇</option>
                    <option v-for="type in cardType" v-bind:value="type.value">{{ type.name }}</option>
                </select>
                <span class="text-danger small" v-if="errFor.cardType"><span class="glyphicon glyphicon-info-sign">{{ errFor.cardType }}</span></span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': errFor.approve}">
                <div class="checkbox">
                    <label>
                        <input id="d-approve" type="checkbox" v-model="donation.approve">同意東吳企管文教基金會網站的<router-link v-bind:to="{name: 'page', params: {title: '隱私權政策'}}">隱私權政策</router-link>
                    </label>
                    <p class="text-danger small" v-if="errFor.approve"><span class="glyphicon glyphicon-info-sign">{{ errFor.approve }}</span></p>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary pull-right" v-bind:class="{ 'disable' : isButtonLock }" v-on:click.prevent="donate">確認</button>
            </div>
        </div>
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
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'
import matches from 'validator/lib/matches'

export default {
  data () {
    return {
      errFor: {},
      errs: [],
      donation: {
        firstName: '',
        lastName: '',
        classIn: '',
        officePhone: '',
        homePhone: '',
        cellPhone: '',
        email: '',
        address: '',
        money: '',
        sameWithAddress: false,
        invoiceAddress: '',
        invoiceTitle: '',
        cardType: '',
        purpose: '',
        purposeDetail: '',
        approve: false
      },
      labels: {
        firstName: '姓',
        lastName: '名',
        isAlumni: '畢業於東吳大學企業管理學系',
        classIn: '畢業系級',
        officePhone: '連絡電話(O)',
        homePhone: '連絡電話(H)',
        cellPhone: '連絡電話(手機)',
        email: '電子信箱',
        address: '地址',
        money: '金額',
        sameWithAddress: '同上面地址',
        invoiceAddress: '收據寄送地址',
        invoiceTitle: '收據抬頭',
        cardType: '卡片類型',
        purpose: '捐助款項用途',
        purposeDetail: '捐助款項用途說明',
      },
      cardType: [{
        name: '一般',
        value: '0'
      }, {
        name: '銀聯卡',
        value: '2'
      }],
      purpose: [{
        name: '東吳文教基金會專款',
        value: '0'
      }, {
        name: '東吳企管 EMBA 聯誼會專款',
        value: '1'
      }, {
        name: '東吳企管五十週年系慶餐會費用',
        value: '2'
      }],
      order: {
        merID: '',
        MerchantID: '',
        TerminalID: '',
        MerchantName: '',
        customize: '',
        lidm: '',
        purchAmt: '',
        CurrencyNote: '',
        AutoCap: 0,
        PayType: 0,
        LocalDate: '',
        LocalTime: '',
        reqToken: '',
        enCodeType: 'UTF-8',
        timeoutDate: '',
        timeoutTime: '',
        timeoutSecs: '',
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
  mounted () {
    this.$emit('updateBreadcrumb', [{
      obj: {
        name: 'donate'
      },
      content: '捐款'
    }])
  },
  methods: {
    validate: function () {
      var errFor = {}
      var count = 0
      var reg = /[`~!@#$%^&\\*()_\-+=|{\]["';:\/}?><.,]/g
      var addrReg = /[`~!@#$%^&\\*()_+=|{\]["';:\/}?><.,]/g

      if (isEmpty(this.donation.firstName)) {
        errFor.firstName = '請輸入姓'
      } else {
        if (matches(this.donation.firstName, reg)) {
          errFor.firstName = '姓含有其他字元'
        } else {
          errFor.firstName = null
        }
      }
      if (isEmpty(this.donation.lastName)) {
        errFor.lastName = '請輸入名'
      } else {
        if (matches(this.donation.lastName, reg)) {
          errFor.lastName = '名含有其他字元'
        } else {
          errFor.lastName = null
        }
      }
      if (isEmpty(this.donation.email)) {
        errFor.email = '請輸入電子信箱'
      } else {
        if (!isEmail(this.donation.email)) {
          errFor.email = '電子信箱格式錯誤'
        } else {
          errFor.email = null
        }
      }
      if (!isEmpty(this.donation.officePhone) && !isNumeric(this.donation.officePhone)) {
        errFor.officePhone = '連絡電話(O)只能輸入數字'
      } else {
        errFor.officePhone = null
      }
      if (!isEmpty(this.donation.homePhone) && !isNumeric(this.donation.homePhone)) {
        errFor.homePhone = '連絡電話(H)只能輸入數字'
      } else {
        errFor.homePhone = null
      }
      if (isEmpty(this.donation.cellPhone)) {
        errFor.cellPhone = '請輸入連絡電話(手機)'
      } else {
        if (!matches(this.donation.cellPhone, /^09([\d]{8})*$/)) {
          errFor.cellPhone = '連絡電話(手機)輸入錯誤'
        } else {
          errFor.cellPhone = null
        }
      }
      if (!isEmpty(this.donation.address) && matches(this.donation.address, addrReg)) {
        errFor.address = '地址含有其他字元'
      } else {
        errFor.address = null
      }
      if (isEmpty(this.donation.invoiceAddress)) {
        errFor.invoiceAddress = '請輸入收據寄送地址'
      } else {
        if (matches(this.donation.invoiceAddress, addrReg)) {
          errFor.invoiceAddress = '收據寄送地址含有其他字元'
        } else {
          errFor.invoiceAddress = null
        }
      }
      if (isEmpty(this.donation.invoiceTitle)) {
        errFor.invoiceTitle = '請輸入收據抬頭'
      } else {
        if (matches(this.donation.invoiceTitle, reg)) {
          errFor.invoiceTitle = '收據抬頭含有其他字元'
        } else {
          errFor.invoiceTitle = null
        }
      }
      if (isEmpty(this.donation.purpose)) {
        errFor.purpose = '請選擇捐助款項用途'
      } else {
        if (!isNumeric(this.donation.purpose) || (this.donation.purpose < 0) || (this.donation.purpose > 2)) {
          errFor.purpose = '捐助款項用途選擇錯誤'
        } else {
          errFor.purpose = null
        }
      }
      if (!isEmpty(this.donation.purposeDetail) && matches(this.donation.purposeDetail, reg)) {
        errFor.purposeDetail = '捐助款項用途說明含有其他字元'
      } else {
        errFor.purposeDetail = null
      }
      if (isEmpty(this.donation.money)) {
        errFor.money = '請輸入金額'
      } else {
        if (!isNumeric(this.donation.money)) {
          errFor.money = '金額只能輸入數字'
        } else {
          var money = parseInt(this.donation.money)

          if (money <= 0) {
            errFor.money = '金額必須大於零'
          } else {
            errFor.money = null
          }
        }
      }
      if (isEmpty(this.donation.cardType)) {
        errFor.cardType = '請選擇卡片類型'
      } else {
        if (!isNumeric(this.donation.cardType) || (this.donation.cardType < 0) || (this.donation.cardType > 3)) {
          errFor.cardType = '卡片類型選擇錯誤'
        } else {
          errFor.cardType = null
        }
      }
      if (this.donation.approve === false) {
        errFor.approve = '請確定閱讀並同意財團法人東吳企管文教基金會網站的隱私權政策'
      } else {
        errFor.approve = null
      }

      for (var i in errFor) {
        if (errFor[i] != null) {
          count += 1
        }
      }

      this.errFor = errFor
      return (count === 0)
    },
    donate: function () {
      this.isButtonLock = true

      if (this.validate()) {
        this.errs = []
        var data = new FormData()

        data.append('donation', JSON.stringify(this.donation))

        this.$http.post('/donation', data).then((response) => {
          var data = response.data

          if (data.success) {
            if (data.order) {
              this.order = data.order
            }
            if (data.url &&
              data.url.auth &&
              data.url.AuthResURL &&
              matches(data.url.auth, /https:\/\/www\.focas\.fisc\.com\.tw.+/)
              ) {
              this.url = data.url
            }
          }
        }).catch((response) => {
          var error = response.data

          if (error.success && error.success === false) {
            errs = []
            errs.push('表單資料有誤')
            errs.push('請修改後再次傳送')
            this.errs = errs

            if (error.errFor) {
              this.errFor = errFor
              return
            }
          } else {
            this.errs = ['發生錯誤']
          }
        }).then(() => {
          this.isButtonLock = false
        })
      } else {
        errs = []
        errs.push('表單資料有誤')
        errs.push('請修改後再次傳送')
        this.errs = errs
        this.isButtonLock = false
      }
    },
    closeAlert: function () {
      this.errs = []
    },
    empty: function (data) {
      return data !== undefined && data.length <= 0
    }
  },
  watch: {
    'donation.sameWithAddress': function (newVal, oldVal) {
      if (newVal === true) {
        this.donation.invoiceAddress = this.donation.address
      }
    },
    'url.AuthResURL': function (url, oldUrl) {
      if (url.length > 0) {
        var form = document.getElementById('order-form')

        if (form) {
          this.$nextTick(function () {
            form.submit()
          })
        }
      }
    }
  }
}
</script>
