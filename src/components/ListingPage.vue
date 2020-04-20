<template>
  <v-container>
    <v-row class="mt-3" justify="center" no-gutters>
      <v-col cols="12">
        <h1 class="display-1 font-weight-bold">Choose Outbound</h1>
      </v-col>
    </v-row>

    <v-row class="mt-6" no-gutters>Sorted by: Fast & Cheap</v-row>

    <v-row class="mt-6" justify="center" no-gutters>
      <v-col cols="12">
        <v-card v-for="(item, i) in routes" :key="i" class="mt-3">
          <v-container>
            <div v-text="item.most"></div>

            <div>
              <span v-text="item.timeFrom"></span>
              <span>&nbsp;-&nbsp;</span>
              <span v-text="item.timeTo"></span>
            </div>
            <div>
              <span v-text="item.locationFrom"></span>
              <span>&nbsp;-&nbsp;</span>
              <span v-text="item.locationTo"></span>
            </div>
            <div class="d-flex justify-space-between">
              <div>
                <v-icon v-text="item.vehicle"></v-icon>
                <span v-text="item.transfers"></span>
                <span>&nbsp;Transfers</span>
              </div>
              <div v-text="item.price"></div>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SearchForm from "./SearchForm";

export default {
  name: "ListingPage",

  components: {
    // SearchForm
  },

  data: () => ({
    //
    routes: [
      {
        most: "Fastest, 2nd Cheapest",
        timeFrom: "12:21",
        timeTo: "00:25",
        timeToPlus1: true,
        duration: "12h04",
        locationFrom: "Stockholm Centralstation",
        locationTo: "Hamburg",
        transfers: 4,
        vehicle: "train",
        price: "€120"
      },
      {
        most: "Cheapest",
        timeFrom: "21:20",
        timeTo: "13:15",
        timeToPlus1: true,
        duration: "16h05",
        locationFrom: "Stockholm Centralstation",
        locationTo: "Hamburg",
        transfers: 1,
        vehicle: "directions_bus",
        price: "€111"
      }
    ]
  })
};
</script>
