<template>
  <v-form>
    <v-navigation-drawer v-model="drawer" fixed temporary right width="100%">
      <v-toolbar>
        <v-btn icon @click="drawer = false">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-text-field autofocus placeholder="From: City, Station or Port" hide-details="auto"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>near_me</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list>
        <template v-for="(city, i) in searchResults">
          <v-list-item :key="i" link>
            <v-list-item-icon>
              <v-icon v-text="city.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="city.text"></v-list-item-title>
          </v-list-item>

          <v-list-item v-for="(item, j) in city.children" :key="j" no-action link class="pl-12">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-row>
        <v-col class="d-flex justify-space-between" cols="12">
          <v-select v-model="singleOrReturn" :items="singleOrReturnItems" dense hide-details="auto"></v-select>

          <v-spacer></v-spacer>

          <v-btn class="ma-2 mr-n2" tile text small>
            <v-icon left>person</v-icon>1
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            single-line
            prepend-inner-icon="place"
            placeholder="From: City, Station or Port"
            hide-details="auto"
            @click="drawer = true"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            single-line
            prepend-inner-icon="place"
            placeholder="To: City, Station or Port"
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                single-line
                prepend-inner-icon="calendar_today"
                placeholder="Depart"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field single-line placeholder="Return" hide-details="auto"></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-btn class="mt-6" color="primary">Primary</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "SearchForm",
  data: () => ({
    singleOrReturn: "round",
    singleOrReturnItems: [
      {
        text: "Round-trip",
        value: "round"
      },
      {
        text: "One-way",
        value: "one"
      }
    ],
    drawer: null,
    searchResults: [
      {
        icon: "place",
        text: "Stockholm, Sweden",
        children: [
          {
            icon: "train",
            text: "Stockholm Centralstation"
          },
          {
            icon: "directions_bus",
            text: "Cityterminalen, Stockholm"
          },
          {
            icon: "directions_boat",
            text: "Cruise Terminal, Stockholm"
          }
        ]
      }
    ]
  })
};
</script>