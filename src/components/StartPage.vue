<template>
  <v-container>
    <v-row class="mt-3" justify="center" no-gutters>
      <v-col class="text-center" cols="12" sm="6">
        <h1 class="display-1 font-weight-bold">
          Travel around Europe
          in a sustainable way
        </h1>
      </v-col>
    </v-row>

    <v-row class="mt-6" justify="center" no-gutters>
      <v-col cols="12" sm="6">
        <SearchForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchForm from "./SearchForm";

export default {
  name: "StartPage",

  components: {
    SearchForm
  },

  data: () => ({
    //
  }),

  methods: {
    //
  }
};
</script>
