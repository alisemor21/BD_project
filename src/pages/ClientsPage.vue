<template>
  <div class="all">
    <div id="clients">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="rgb(109, 152, 134)" dark v-bind="attrs" v-on="on">
              Создать нового клиента
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Новый клиент</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['FUTURE', 'CURRENT', 'INACTIVE']"
                      label="Статус клиента*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      color="rgb(109, 152, 134)"
                      label="Name"
                      hint="ФИО или название компании"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Телефон*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- <v-col cols="12">
                      <v-text-field
                        label="Телефон"
                        class="my-input"
                        color="#109CF1"
                        outline
                        id="phone"
                        v-model="phoneNumber"
                        mask="+7(###) ### ####"
                        name="phone"
                      >
                      </v-text-field>
                    </v-col> -->

                  <v-col cols="12">
                    <v-text-field
                      label="ИНН*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="fax*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Адрес*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col class="Company" cols="12" sm="12">
                    
                      <v-card>
                        <v-card-text>
                          <v-row align="center">
                            <v-checkbox
                              color="rgb(109, 152, 134)"
                              label="Юр. лицо? "
                              v-model="enabled"
                              hide-details
                              class="shrink mr-6 mt-0"
                            ></v-checkbox>

                            <v-col cols="12">
                              <v-text-field
                                color="rgb(109, 152, 134)"
                                :disabled="!enabled"
                                label="Название компании"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                color="rgb(109, 152, 134)"
                                :disabled="!enabled"
                                label="ОГРН"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="ALISA*"
                      color="rgb(109, 152, 134)"
                      required
                    ></v-text-field>
                  </v-col>


                </v-row>
              </v-container>
              <small>*indicates required field</small>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "ClientsPage",

  el: ".Company",
  data: () => ({
    enabled: false,
  }),
};
</script>
