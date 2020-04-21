<template>
  <v-form>
    <v-navigation-drawer v-model="inputDrawerMode" fixed temporary right width="100%">
      <v-toolbar flat>
        <v-btn icon @click="inputDrawerMode = false">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>

        <v-text-field autofocus placeholder="City, Station or Port" hide-details="auto"></v-text-field>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>near_me</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list>
        <template v-for="(city, i) in locationSuggestions">
          <v-list-item :key="i" link @click="setLocation(city.text)">
            <v-list-item-icon>
              <v-icon v-text="city.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="city.text"></v-list-item-title>
          </v-list-item>

          <v-list-item
            v-for="(item, j) in city.children"
            :key="i+'-'+j"
            no-action
            link
            class="pl-12"
            @click="setLocation(item.text)"
          >
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
            v-model="locationFrom"
            @click="showInputDrawer('LOCATION_FROM')"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            single-line
            prepend-inner-icon="place"
            placeholder="To: City, Station or Port"
            hide-details="auto"
            v-model="locationTo"
            @click="showInputDrawer('LOCATION_TO')"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="dateFrom"
                prepend-inner-icon="calendar_today"
                placeholder="Depart"
                hide-details="auto"
                @click="dateFrom = 'Wed, 29 Apr'"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="dateTo"
                single-line
                placeholder="Return"
                hide-details="auto"
                @click="dateTo = 'Sun, 3 May'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-btn class="mt-6" color="primary" @click="doSearch">Search</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "SearchForm",
  props: {
    //
  },

  mounted: function() {
    //on load inits
    this.locationFrom = this.$store.state.locationFrom;
    this.locationTo = this.$store.state.locationTo;
    this.dateFrom = this.$store.state.dateFrom;
    this.dateTo = this.$store.state.dateTo;
  },

  methods: {
    showInputDrawer: function(mode) {
      this.inputDrawerMode = mode;
    },
    setLocation: function(locationText) {
      if (this.inputDrawerMode == "LOCATION_TO") {
        this.locationTo = locationText;
      } else {
        this.locationFrom = locationText;
      }
      this.inputDrawerMode = false;
    },
    doSearch: function() {
      //Save state
      this.$store.commit("saveUserInputs", {
        locationFrom: this.locationFrom,
        locationTo: this.locationTo,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      });

      this.$store.commit("changePage", {
        page: "LISTING-0",
        chosenIdx: []
      });
    }
  },
  data: () => ({
    inputDrawerMode: null,
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
    locationFrom: "",
    locationTo: "",
    dateFrom: "",
    dateTo: "",
    locationSuggestions: [
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
      },
      {
        icon: "place",
        text: "Hamburg, Germany"
      }
    ]
  })
};
</script>