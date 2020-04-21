<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="pb-3"
          v-for="(item,i) in chosenRoutes"
          v-bind:key="i"
          background-color="cyan"
        >
          <v-container>
            <div>
              <v-icon>check_circle</v-icon>
              {{i == 0 ? 'OUTBOUND' : 'INBOUND'}}
            </div>
            <div>
              <span
                class="font-weight-bold ml-1"
                style="font-size: 1.2em;"
              >{{item.date + " " + item.timeFrom}}</span>
              <span>&#32;—&#32;</span>

              <span v-text="item.timeTo" class="font-weight-bold" style="font-size: 1.4em;"></span>
              <span v-show="item.timeToPlus1" style="font-size:0.8em">+1</span>
            </div>
            <div class="d-flex justify-space-between">
              <div>{{item.locationFrom}} - {{item.locationTo}}</div>
              <v-icon
                @click="item.showDetails = !item.showDetails"
              >{{item.showDetails ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
            </div>
            <div class="d-flex justify-space-between">
              <div @click="item.showDetails = !item.showDetails">
                <span>{{item.duration}} • {{item.transfers}} Transfer</span>
              </div>
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

              <v-row justify="center" class="mt-8">
                <div class="mt-2">166kg less CO2 compared to flying</div>
              </v-row>
            </div>
          </v-container>
        </v-card>

        <div
          v-if="chosenRoutes.length > 0"
          class="text-right font-weight-bold"
          style="font-size: 1.4em;"
        >€{{totalPrice}}</div>

        <div v-if="chosenRoutes.length == 2" class="d-flex justify-center mt-6">
          <v-btn>Continue to checkout</v-btn>
        </div>
      </v-col>
    </v-row>

    <div v-show="chosenRoutes.length < 2">
      <v-row class="mt-3" justify="center" no-gutters>
        <v-col cols="12">
          <h1
            class="display-1 font-weight-bold"
          >{{chosenRoutes.length === 0 ? 'Choose outbound': 'Choose inbound'}}</h1>
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
          <v-card
            class="mt-3 pb-3"
            v-for="(item, i) in routeListing"
            :key="i"
            @click="chooseRoute(i)"
          >
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

                <div>€{{item.price}}</div>
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

                <v-row justify="center" class="mt-8">
                  <v-btn color="primary" @click="chooseRoute(i)">Choose this journey €{{item.price}}</v-btn>
                  <div class="mt-2">166kg less CO2 compared to flying</div>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>


<script>
// import SearchForm from "./SearchForm";

export default {
  name: "ListingPage",

  components: {
    // SearchForm
  },

  methods: {
    chooseRoute: function(x) {
      for (let i = 0; i < this.routeListing.length; i++) {
        this.routeListing[i].showDetails = false;
      }
      if (this.chosenOutboundRouteIdx !== undefined) {
        this.chosenInboundRouteIdx = x;
      } else {
        this.chosenOutboundRouteIdx = x;
      }
    }
  },

  computed: {
    chosenRoutes: function() {
      if (
        this.chosenOutboundRouteIdx === undefined &&
        this.chosenInboundRouteIdx == undefined
      ) {
        return [];
      }

      const routes = [];
      if (this.chosenOutboundRouteIdx !== undefined) {
        routes.push(this.outboundRoutes[this.chosenOutboundRouteIdx]);
      }
      if (this.chosenInboundRouteIdx !== undefined) {
        routes.push(this.inboundRoutes[this.chosenInboundRouteIdx]);
      }
      return routes;
    },
    routeListing: function() {
      return this.chosenOutboundRouteIdx === undefined
        ? this.outboundRoutes
        : this.inboundRoutes;
    },
    totalPrice: function() {
      return this.chosenRoutes.reduce((acc, x) => {
        return acc + Number(x.price);
      }, 0);
    }
  },

  data: () => ({
    //
    chosenOutboundRouteIdx: undefined,
    chosenInboundRouteIdx: undefined,
    outboundRoutes: [
      {
        most: "Fastest, 2nd Cheapest",
        date: "Wed, 29 Apr",
        timeFrom: "12:21",
        timeTo: "00:25",
        timeToPlus1: true,
        duration: "12h04",
        locationFrom: "Stockholm Centralstation",
        locationTo: "Hamburg",
        transfers: 4,
        vehicle: "train",
        price: "120",
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
        date: "Wed, 29 Apr",
        timeFrom: "21:20",
        timeTo: "13:15",
        timeToPlus1: true,
        duration: "16h05",
        locationFrom: "Stockholm Centralstation",
        locationTo: "Hamburg",
        transfers: 1,
        vehicle: "directions_bus",
        price: "111",
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
    ],
    inboundRoutes: [
      {
        date: "Sun, 3 May",
        timeFrom: "17:00",
        timeTo: "07:20",
        timeToPlus1: true,
        duration: "14h20",
        locationFrom: "Hamburg, ZOB am Hbf",
        locationTo: "Stokcholm Cityterminalen",
        transfers: 0,
        vehicle: "directions_bus",
        price: "111",
        co2: "25",
        showDetails: false,
        routeDetails: [
          {
            time: "17:00",
            station: "Hamburg, ZOB am Hbf",
            carrier: "Flixbus",
            duration: "14h20"
          },
          {
            time: "07:20",
            timePlus1: true,
            station: "Stokcholm Cityterminalen"
          }
        ]
      }
    ]
  })
};
</script>
