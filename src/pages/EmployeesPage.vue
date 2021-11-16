<template>
  <div class="all">
    

    <div id="app">
      <v-app id="inspire">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="rgb(109, 152, 134)" dark v-bind="attrs" v-on="on">
                Создать нового сотрудника
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Новый сотрудник</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="ФИО"
                        hint="фамилия имя отчество через пробел"
                        color="rgb(109, 152, 134"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Login*"
                        required
                        color="rgb(109, 152, 134"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        color="rgb(109, 152, 134"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" xs="6" md="6">
                      <v-select
                        :items="['MANAGER', 'ADMIN', 'COMMON']"
                        label="Role*"
                        color="rgb(109, 152, 134"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgb(109, 152, 134)" text @click="dialog = false">
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
    </div>
  </div>
</template>

<script>


export default {
  name: "SpisokDelPage",
  components: {

  },
};
</script>
