<template>

<div class="signin">
    <b-container>
        <b-row>
            <b-col lg="5" class="greeting">
                <transition name="slide-fade">
                    <div v-if="currentState == 0">
                        <h1>Getting things ready...</h1>
                        <b-spinner />
                    </div>                    
                </transition>
                <transition name="slide-fade">
                    <div v-if="currentState == 1 || currentState == 2">
                        <h1>Welcome!</h1>
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div v-if="currentState == 3">
                        <h1>Go check your email.</h1>
                        <p>To save time, here are some popular providers:</p>
                        <b-button variant="primary" href="https://mail.google.com">GMail</b-button>&nbsp;
                        <b-button variant="primary" href="https://outlook.office365.com">Outlook (O365)</b-button>&nbsp;
                        <b-button variant="primary" href="https://outlook.com">Outlook</b-button>
                    </div>
                </transition>
            </b-col>

            <b-col lg="1" v-bind:class="{welcomeCol: currentState != 0}" class="d-none d-lg-block">
            </b-col>

            <transition name="fade">
                <b-col lg="6" v-if="currentState !== 0" class="signinForm">
                    <b-card>
                        <b-form @submit="onSubmit">
                            <b-form-group
                                label="Email address"
                                label-for="input-email"
                                description="We'll send you a magic link to sign in."
                            >
                                <b-form-input v-bind:disabled="isFormDisabled" id="input-1" v-model="form.email" type="email" required placeholder="someone@somewhere.org" />
                            </b-form-group>
                            <b-button v-bind:disabled="isFormDisabled" type="submit" variant="primary">Submit</b-button>
                            &nbsp;
                            <transition name="fade">
                                <b-spinner v-if="currentState == 2" variant="info" small />
                            </transition>
                        </b-form>
                    </b-card>

                    <p class="poweredBy">Powered by <a class="poweredByLink" href="https://github.com/Sentimentron/authenticatron">Authenticatron</a></p>

                </b-col>
            </transition>
        </b-row>
    </b-container>
</div>

</template>


<script lang="ts">

import Vue from 'vue';

enum LoginState {
    Preparing,
    EnteringData,
    SendingData,
    WaitingForEmail,
}

export default Vue.extend({
  name: 'signin',
  methods: {
      async onSubmit(evt: Event) {
          evt.preventDefault();
          this.currentState = LoginState.SendingData;
          // Simulate the backend for a sec
            setTimeout(() => {
                this.currentState = LoginState.WaitingForEmail;
            }, 750);
      },
  },
  computed: {
      isFormDisabled(): boolean {
          return this.currentState !== LoginState.EnteringData;
      },
  },
  mounted() {
    // Simulate the backend for a sec
    setTimeout(() => {
        this.currentState = LoginState.EnteringData;
    }, 750);
  },
  data() {
      return {
          currentState: LoginState.Preparing,
          loading: false,
          form: {
              email: '',
          },
      };
  },
});

</script>

<style scoped>
.signin {
    width: 100%;
    margin-top: 2em;
    padding-top: 5em;
}
.welcomeCol {
    border-right:  2px solid;
    border-image-source: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(200,255,255,0.9) 40%, rgba(255, 255, 255, 0.4));
    border-image-slice: 1;
    border-radius: 1px;
}
.poweredBy {
    padding-top: 2em;
    font-size: 90%;
}

.signinForm {
    padding-top:2em;
}

a.poweredByLink {
    color: rgb(47, 185, 123);
    font-weight: bold;
}

@media only screen and (max-width: 600px) {
    .signin {
        padding-top: 1em;
    }
    .greeting {
        padding-bottom: 1em;
    }
}

</style>