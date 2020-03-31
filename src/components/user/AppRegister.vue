<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="mdi-account-circle" label="Username" />
        <v-text-field prepend-icon="mdi-lock" label="Password" type="password" />
        <v-text-field prepend-icon="mdi-lock" label="Retype Password" type="password" />
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" to="/login">Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
