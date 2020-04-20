<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-toolbar-title>around.eu</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content @goToListing="currentPage = 'LISTING'">
      <template v-if="currentPage == 'LISTING'">
        <ListingPage />
      </template>
      <template v-else>
        <StartPage />
      </template>
    </v-content>
  </v-app>
</template>

<script>
import StartPage from "./components/StartPage";

import ListingPage from "./components/ListingPage";

export default {
  name: "App",

  components: {
    StartPage,
    ListingPage
  },

  data: () => ({
    //
    currentPage: "START",

    drawer: null
  })
};
</script>
