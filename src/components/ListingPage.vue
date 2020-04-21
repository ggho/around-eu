<template>
  <v-container>
    <v-row class="mt-3" justify="center" no-gutters>
      <v-col cols="12">
        <h1 class="display-1 font-weight-bold">Choose outbound</h1>
      </v-col>
    </v-row>

    <v-row class="mt-3">
      <v-col cols="12">
        <v-chip link>Vehicles</v-chip>
        <v-chip link class="ml-1">Transfers</v-chip>
        <v-chip link class="ml-1">Times</v-chip>
        <v-chip link class="ml-1">Durations</v-chip>
      </v-col>
    </v-row>

    <v-row class="mt-3" no-gutters>Sorted by: Fast & Cheap</v-row>

    <v-row class="mt-3" justify="center" no-gutters>
      <v-col cols="12">
        <template v-for="(item, i) in routes">
          <v-card class="mt-3" :key="i">
            <v-container>
              <div class="d-flex justify-space-between">
                <div v-text="item.most" class="text-uppercase"></div>
                <div>
                  CO2
                  <span v-text="item.co2"></span>
                  kg
                </div>
              </div>

              <div>
                <span v-text="item.timeFrom" class="font-weight-bold" style="font-size: 1.4em;"></span>
                <span>&#32;—&#32;</span>
                <span v-text="item.duration" style="font-size:0.8em"></span>
                <span>&#32;—&#32;</span>
                <span v-text="item.timeTo" class="font-weight-bold" style="font-size: 1.4em;"></span>
                <span v-show="item.timeToPlus1" style="font-size:0.8em">+1</span>
              </div>
              <div>{{item.locationFrom}} - {{item.locationTo}}</div>
              <div class="d-flex justify-space-between">
                <div @click="item.showDetails = !item.showDetails">
                  <v-icon>{{item.vehicle}}</v-icon>
                  <span class="ml-1">{{item.transfers}}</span>
                  <span class="ml-1">Transfer</span>
                  <v-icon>{{item.showDetails ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                </div>

                <div v-text="item.price"></div>
              </div>

              <div v-show="item.showDetails">
                <v-divider class="my-6"></v-divider>
                <v-row v-for="(details, i) in item.routeDetails" :key="i" no-gutters>
                  <v-col cols="3">
                    <div class="font-weight-bold">{{details.time}}</div>
                    <div>{{details.duration}}</div>
                  </v-col>
                  <v-col
                    cols="9"
                    class="pl-2"
                    :style="'border-left: 2px ' + (i%2 == 0 ? 'solid' : 'dotted')"
                  >
                    <div
                      :class="(i == 0 || i == item.routeDetails.length-1) ? 'font-weight-bold' : ''"
                    >{{details.station}}</div>
                    <div>{{details.carrier}}</div>
                    <v-spacer v-show="i < (item.routeDetails.length-1)" style="height: 2em;"></v-spacer>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </template>
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
        price: "€120",
        co2: "27",
        showDetails: false,
        routeDetails: [
          {
            time: "12:21",
            station: "Stokcholm Cityterminalen",
            carrier: "Flixbus",
            duration: "8h55"
          },
          {
            time: "0:00",
            timePlus1: true,
            station: "København, Ingerslevsgade (Central Bus Station)",
            transferDuration: "1h30"
          },
          {
            time: "00:00",
            station: "Stokcholm Cityterminalen",
            carrier: "Flixbus",
            duration: "8h55"
          },
          {
            time: "6:05",
            timePlus1: true,
            station: "København, Ingerslevsgade (Central Bus Station)",
            transferDuration: "1h30"
          },
          {
            time: "7:35",
            station: "København, Ingerslevsgade (Central Bus Station)",
            carrier: "Flixbus",
            duration: "5h40"
          },
          {
            time: "13:15",
            timePlus1: false,
            station: "Hamburg, ZOB am Hbf",
            transferDuration: ""
          }
        ]
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
        price: "€111",
        co2: "25",
        showDetails: false,
        routeDetails: [
          {
            time: "21:10",
            station: "Stokcholm Cityterminalen",
            carrier: "Flixbus",
            duration: "8h55"
          },
          {
            time: "6:05",
            timePlus1: true,
            station: "København, Ingerslevsgade (Central Bus Station)",
            transferDuration: "1h30"
          },
          {
            time: "7:35",
            station: "København, Ingerslevsgade (Central Bus Station)",
            carrier: "Flixbus",
            duration: "5h40"
          },
          {
            time: "13:15",
            timePlus1: false,
            station: "Hamburg, ZOB am Hbf",
            transferDuration: ""
          }
        ]
      }
    ]
  })
};
</script>
