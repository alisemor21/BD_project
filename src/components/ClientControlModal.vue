<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="light-blue accent-3" dark class="mb-2" v-on="on"
        >+ Новый клиент</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm4 md4>
              <v-select
                v-model="editedClient.status"
                :items="['FUTURE', 'CURRENT', 'INACTIVE']"
                label="Статус*"
                color="light-blue accent-3"
                required
              ></v-select>
            </v-flex>

            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="editedClient.inn"
                label="ИНН"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedClient.city"
                label="Город"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="editedClient.name"
                label="ФИО"
                hint="фамилия имя отчество через пробел"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="editedClient.phone"
                label="Телефон"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm8 md8>
              <v-text-field
                v-model="editedClient.email"
                label="Email"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm8 md8>
              <v-text-field
                v-model="editedClient.address"
                label="Адрес"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="editedClient.fax"
                label="fax"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm4 md4>
              <v-checkbox
                v-model="isCompany"
                label="Юр. лицо?"
                hide-details
                class="shrink mr-2 mt-0"
                color="light-blue accent-3"
              ></v-checkbox>
            </v-flex>

            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="editedClient.companyId"
                :disabled="!isCompany"
                label="Название компании"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="editedClient.ogrn"
                :disabled="!isCompany"
                label="ОГРН"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="light-blue accent-3" @click="close">Отменить</v-btn>
        <v-btn color="green accent-2" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ClientsControlModal",
  components: {},
  data: () => ({
    dialog: false,
    isCompany: false,
    expanded: [],
    clients: [],
    editedClientIndex: -1,
    editedClient: {
      status: "CURRENT",
      name: "",
      email: "",
      phone: "",
      city: "",
      inn: "",
      fax: "",
      address: "",
      companyId: "",
      ogrn: "",
    },
    defaultClient: {
      status: "CURRENT",
      name: "",
      email: "",
      phone: "",
      city: "",
      inn: "",
      fax: "",
      address: "",
      companyId: "",
      ogrn: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedClientIndex === -1
        ? "Новый клиент"
        : "Редактирование клиента";
    },
  },

  watch: {
    dialog(val) {
      console.log("Dialog.val =", val);
      val || this.close();
    },
  },

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedClient = Object.assign({}, this.defaultClient);
        this.editedClientIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedClientIndex > -1) {
        Object.assign(this.clients[this.editedClientIndex], this.editedClient);
      } else {
        this.clients.push(this.editedClient);
      }
      this.close();
    },
  },
};
</script>
