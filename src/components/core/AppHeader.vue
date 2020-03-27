<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Vue Tasks</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white" text rounded>Home</v-btn>
    <v-btn color="white" text rounded @click="$emit('navigationEvent', 'AppLogin')">Login</v-btn>
  </v-app-bar>
</template>
