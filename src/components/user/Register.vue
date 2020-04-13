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
              label="Name"
              name="name"
              value
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>
            <span class="caption grey--text text--darken-1"
              >Тhe name you want to introduce yourself to</span
            >
            <v-text-field
              prepend-icon="mdi-email"
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
            <v-file-input
              accept="image/*"
              label="Photo"
              show-size
              dense
              hint="Your avatar image"
              required
              prepend-icon="mdi-camera"
              v-model="avatar"
              :rules="avatarRules"
              placeholder="Pick a picture"
              @change="filePickedHandler"
            ></v-file-input>
            <v-row>
              <v-col cols="12" class="text-center">
                <img class="img-preview" :src="imageUrl" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
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
        <v-window-item :value="4">
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
        <v-btn v-else-if="step !== 4" @click="step--" color="info">Back</v-btn>
        <v-spacer v-if="step !== 4"></v-spacer>
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
          @click="step++"
          :disabled="!imageUrl"
          type="button"
          >Next</v-btn
        >
        <v-btn
          v-else-if="step === 3"
          color="primary"
          type="submit"
          @click="submitRegistrationHandler"
          :disabled="!valid"
          :loading="loading"
          >Register</v-btn
        >
        <v-row v-if="step === 4">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              :indeterminate="false"
              rotate="0"
              size="32"
              :value="progressValue"
              width="4"
              color="light-blue"
              >{{ progressText }}</v-progress-circular
            >
          </v-col>
        </v-row>
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
    progressText: 3,
    progressValue: 0,
    valid: true,
    step: 1,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    email: "",
    emailRules: [v => !!v || "E-mail is required", validateEmail],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        !(v && v.length < passwordLength) ||
        `Password must be at least ${passwordLength} characters`
    ],
    confirmPassword: "",
    avatar: null,
    imageUrl: null,
    avatarRules: [
      v => !!v || "Avatar is required",
      v => !v || v.size < 1000000 || "Image size should be less than 1 MB!"
    ],
    progressInterval: null
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Register";
        case 2:
          return "Select Avatar";
        case 3:
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
        password: this.password,
        name: this.name,
        image: this.avatar
      });
    },
    validateEmail,
    filePickedHandler(img) {
      if (!img) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(img);
    }
  },
  watch: {
    user(value) {
      this.step++;
      if (value !== null && value !== undefined) {
        this.progressInterval = setInterval(() => {
          if (this.progressText > 0) {
            this.progressText--;
            this.progressValue += 33;
          } else {
            clearInterval(this.progressInterval);
            this.$router.push("/events").catch(() => {});
          }
        }, 1000);
      }
    }
  },
  destroyed: function() {
    clearInterval(this.progressInterval);
  }
};
</script>
<style scoped>
.img-preview {
  max-width: 100px;
  max-height: 100px;
}
</style>
