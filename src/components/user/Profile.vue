<template>
  <v-container v-if="user">
    <v-form ref="form" v-model="valid" @submit.prevent="formSubmitHandler">
      <v-text-field
        prepend-icon="mdi-account-circle"
        label="Name"
        name="name"
        value
        v-model="name"
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        prepend-icon="mdi-email"
        label="Email"
        name="email"
        disabled
        v-model="email"
      ></v-text-field>
      <v-file-input
        accept="image/*"
        label="Photo"
        dense
        hint="Your avatar image"
        required
        prepend-icon="mdi-camera"
        v-model="avatar"
        :rules="avatarRules"
        placeholder="Pick a picture"
        @change="filePickedHandler"
      ></v-file-input>
      <img class="img-preview" :src="imageUrl" />
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Change password</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              prepend-icon="mdi-lock"
              label="Current Password"
              name="password"
              type="password"
              v-model="currentPassword"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              label="New Password"
              name="password"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              label="Confirm New Password"
              name="confirm-password"
              v-model="confirmPassword"
              type="password"
              :rules="comparePasswords"
            ></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row>
        <v-col>
          <v-row class="mt-5">
            <v-col cols="6"><h3>Events submitted</h3></v-col>
            <v-col cols="6">{{ eventsCreated }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><h3>Events joined</h3></v-col>
            <v-col cols="6">{{ eventsJoined }}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-dialog v-model="terminateDialog" width="300">
          <v-card>
            <v-card-title class="headline">Close your account?</v-card-title>

            <v-card-text>
              Are you sure, you want to terminate your account in EventOur ? :(
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="terminateDialog = false"
              >
                Cancel
              </v-btn>

              <v-btn color="error darken-1" text @click="terminateAccount">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
          class="error"
          type="button"
          :loading="loading"
          @click.stop="terminateDialog = true"
          >Terminate Account</v-btn
        >
        <v-btn
          class="primary mx-2"
          type="submit"
          :disabled="!valid"
          :loading="loading"
          >Save</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
const passwordLength = 6;
function validateEmail(email) {
  return /.+@.+\..+/.test(email);
}
export default {
  data() {
    return {
      updateUser: {},
      valid: true,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      email: "",
      emailRules: [v => !!v || "E-mail is required", validateEmail],
      password: "",
      passwordRules: [
        v =>
          !(v && v.length < passwordLength) ||
          `Password must be at least ${passwordLength} characters`
      ],
      currentPassword: null,
      confirmPassword: null,
      avatar: null,
      imageUrl: null,
      avatarRules: [
        v => !!v || "Avatar is required",
        v => !v || v.size < 1000000 || "Image size should be less than 1 MB!"
      ],
      terminateDialog: false
    };
  },
  computed: {
    validEmail() {
      return this.validateEmail(this.email);
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? ["Passwords do not match"]
        : [];
    },
    user() {
      return this.$store.getters.user;
    },
    eventsCreated() {
      return this.$store.getters.loadedEvents.filter(
        e => e.creatorId === this.user.id
      ).length;
    },
    eventsJoined() {
      return this.user.eventsJoined.length;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    filePickedHandler(img) {
      if (!img) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(img);
    },
    async formSubmitHandler() {
      if (this.password) {
        this.updateUser.currentPassword = this.currentPassword;
        this.updateUser.email = this.user.email;
        this.updateUser.password = this.password;
      }
      await this.$store.dispatch("updateUser", this.updateUser);
    },
    async terminateAccount() {
      await this.$store.dispatch("terminateUserAccount", this.updateUser);
      this.$router.push("/").catch(() => {});
    }
  },
  watch: {
    name(value) {
      if (value !== this.user.name) {
        this.updateUser.name = value;
      } else {
        delete this.updateUser.name;
      }
    },
    avatar(value) {
      if (value.size > 0) {
        this.updateUser.image = value;
      }
    }
  },

  mounted() {
    if (!this.user) {
      return;
    }
    this.name = this.user.name;
    this.email = this.user.email;
    this.imageUrl = this.user.photoURL;
    this.avatar = { name: this.user.name, size: 0 };
  }
};
</script>
