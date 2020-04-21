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
      <template v-if="currentPage !== 'START'">
        <v-btn icon @click="previousPage">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title>Stockholm &lt;&gt; Hamburg</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="drawer = false">
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-toolbar-title>around.eu</v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
    </v-app-bar>

    <v-content>
      <template v-if="currentPage != 'START'">
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

  methods: {
    previousPage: function() {
      this.$store.dispatch("previousPage");
    }
  },

  mounted: function() {
    this.$store.subscribe(mutation => {
      if (mutation.type === "changePage") {
        this.currentPage = mutation.payload.page;
      }
    });
  },

  data: () => ({
    currentPage: "START",
    drawer: null
  })
};
</script>
