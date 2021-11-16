<template>
  <div class="all">
    <!-- <div class="reports"> -->
      <v-app id="inspire">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="rgb(109, 152, 134)" dark v-bind="attrs" v-on="on">
                Создать отчет
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4">Создание нового отчёта</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="['Андрей', 'Паша', 'Петя']"
                        label="Работник*"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Дата начала отчёта*"
                        type="date"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Дата окончания отчёта*"
                        type="date"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="closeBtn" color="rgb(109, 152, 134)">
                  Close
                </v-btn>
                <v-btn color="rgb(109, 152, 134)" text @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-app>
    <!-- </div> -->

    <v-btn
      class="createReportBtn"
      rounded
      elevation="8"
      color="rgb(109, 152, 134)"
      dark
    >
      СОЗДАТЬ ОТЧЁТ
    </v-btn>

    <body></body>
  </div>
</template>

<script>
export default {
  name: "ReportsPage",
  components: {},
};
</script>
