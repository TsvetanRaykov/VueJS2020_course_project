<template>
  <v-form ref="form" v-model="valid" @submit.prevent>
    <v-card class="mx-auto mt-5" max-width="400">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              prepend-icon="mdi-account-circle"
              label="Email"
              name="email"
              value
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <span class="caption grey--text text--darken-1"
              >This is the email you will use to login to your EventOur
              account</span
            >
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              prepend-icon="mdi-lock"
              label="Password"
              name="password"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              label="Confirm Password"
              name="confirm-password"
              v-model="confirmPassword"
              type="password"
              :rules="comparePasswords"
            ></v-text-field>
            <span class="caption grey--text text--darken-1"
              >Please enter a password for your account</span
            >
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to EventOur</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn v-if="step === 1" color="success" to="/user/login">Login</v-btn>
        <v-btn v-if="step === 2" @click="step--" color="info">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step === 1"
          color="primary"
          @click="step++"
          :disabled="!validEmail"
          type="button"
          >Next</v-btn
        >
        <v-btn
          v-else-if="step === 2"
          color="primary"
          type="submit"
          @click="submitRegistrationHandler"
          :disabled="!valid"
          :loading="loading"
          >Sign up</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
function validateEmail(email) {
  return /.+@.+\..+/.test(email);
}
const passwordLength = 3;

export default {
  data: () => ({
    valid: true,
    step: 1,
    email: "",
    emailRules: [v => !!v || "E-mail is required", validateEmail],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        !(v && v.length < passwordLength) ||
        `Password must be at least ${passwordLength} characters`
    ],
    confirmPassword: ""
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Register";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? ["Passwords do not match"]
        : [];
    },
    user() {
      return this.$store.getters.user;
    },
    validEmail() {
      return this.validateEmail(this.email);
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    submitRegistrationHandler() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password
      });
      this.step++;
    },
    validateEmail
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        setTimeout(() => {
          this.$router.push("/events");
        }, 3000);
      }
    }
  }
};
</script>
