<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>Login</span>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="loginSubmitHandler" ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-account-circle"
          label="Username"
          type="email"
          v-model="email"
          :rules="emailRules"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
        />
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text color="success" to="/user/register">Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            type="submit"
            :disabled="!valid"
            :loading="loading"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "AppLogin",
  data: () => ({
    valid: true,
    showPassword: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    loginSubmitHandler() {
      this.$store.dispatch("loginUser", {
        email: this.email,
        password: this.password
      });
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/events");
      }
    }
  }
};
</script>
