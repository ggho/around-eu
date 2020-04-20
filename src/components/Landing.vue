<template>
  <v-container>
    <v-row>
      <v-col class="mb-4 text-center">
        <h1 class="display-1 font-weight-bold mb-3">
          Travel around Europe
          <br />in a sustainable way
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <!-- <h2 class="headline font-weight-bold mb-3">What's next?</h2> -->
        <SearchForm />
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchForm from "./SearchForm";

export default {
  name: "Landing",

  components: {
    SearchForm
  },

  data: () => ({
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
