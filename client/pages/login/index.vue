<template>
  <div>
    <main class="c-main c-login">
      <c-hero>
        <div class="c-login__main ">
          <div class="c-login__container">
            <div class="c-login">
              <div class="c-login__form-header-wrapper">
                <div class="c-login__form-header u-flex u-align-items-center u-justify-center">
                  <!--<img :src="org.logo_url" style="height: 36px;" v-if="org.logo_url">-->
                  <!--<span v-else>{{org.name}} </span>-->
                  <span class="u-mt-small">
                    登录到您的账户
                  </span>
                </div>
              </div>
              <form @submit.prevent="handleSubmit">
                <div class="c-card c-login__form">
                  <div class="c-login__form-userdata">
                    <label for="identifier">用户名</label>
                    <input
                      id="identifier"
                      v-model="form.identifier"
                      v-validate="'required'"
                      name="email"
                      class="form-text-input"
                      :class="{'input': true, 'is-error': errors.has('user_login') }"
                      type="text"
                      placeholder="在这里输入用户名"
                      :disabled="disabled"
                    >

                    <div class="c-login__form-password">
                      <label for="password">密码</label>
                      <input
                        id="password"
                        v-model="form.password"
                        v-validate="'required|min:6'"
                        type="password"
                        autocapitalize="off"
                        autocomplete="off"
                        class="form-text-input "
                        name="user_pass"
                        :class="{'is-error': errors.has('ACCOUNT_ERROR')}"
                        :disabled="disabled"
                      >
                      <form-input-validation
                        v-show="errors.has('ACCOUNT_ERROR')"
                        :is-error="errors.has('ACCOUNT_ERROR')"
                      >
                        {{ errors.first('ACCOUNT_ERROR') }}
                      </form-input-validation>
                    </div>
                  </div>

                  <div class="c-login__form-action">
                    <button
                      type="submit"
                      class="c-button c-form-button is-primary"
                      :class="disabled ? 'is-busy' : 'is-primary'"
                      :disabled="disabled"
                    >
                      登录
                    </button>
                  </div>
                </div>
                <div class="c-login__form-social">
                  <div class="c-login__form-social-divider">
                    <span>或</span>
                  </div>
                  <div class="c-card">
                    <div class="c-login__social">
                      <div class="c-login__social-buttons">
                        <div class="c-social-buttons__button-container">
                          <button class="c-social-buttons__button c-button">
                            <span class="c-social-buttons__service-name">使用微信登录</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </c-hero>

      <div class="c-login__links">
        <a
          href="action=lostpassword"
          rel="external"
        >忘记密码？</a>
        <a
          href=""
          rel="external"
          class="logged-out-form__back-link"
        >
          <svg
            class="gridicon gridicons-arrow-left needs-offset-y"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </g>
          </svg>
          返回
        </a>
      </div>
    </main>
  </div>
</template>


<script>
  import FormInputValidation from '../../components/forms/form-input-validation'
  import CHero from '~/components/hero'

  export default {
    layout: 'logged-out',
    middleware: ['auth'],
    components: {
      CHero,
      FormInputValidation
    },
    data() {
      return {
        options: {
          auth: false
        },
        loginHasError: false,
        form: {
          identifier: '',
          password: ''
        },
        errmsg: '',
        disabled: false
      }
    },
    computed: {
      // orgId () {
      //   return this.$store.state.org.id
      // },
      // org () {
      //   return this.$store.state.org.detail.data
      // },
      isLogin() {
        return this.$auth.state.loggedIn
      },
      redirect() {
        return (
          this.$route.query.redirect &&
          decodeURIComponent(this.$route.query.redirect)
        )
      },
      user() {
        return this.$auth.state.user
      }
      // logo_url () {
      //   return this.org.logo_url === undefined || null ? '../assets/img/logo.png' : this.org.logo_url
      // }
    },
    mounted() {
    },
    methods: {
      handleSubmit() {
        this.$validator.validateAll()
          .then(async (result) => {
            if (result) {
              this.disabled = true
              this.$auth.login({
                data: {
                  'identifier': this.form.identifier,
                  'password': this.form.password,
                }
              }).then(async () => {
                // console.log('Successfully connected')
                // this.$auth.user()
                console.log(this.isLogin);
                this.$toast.success('Successfully connected')
              }).catch(err => {
                // console.log(err)
                this.errors.add('ACCOUNT_ERROR', '糟糕，验证失败！', 'server');
                this.disabled = false

              })
            }
          })

      }
    }
  }
</script>
