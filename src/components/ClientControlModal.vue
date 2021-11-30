<template>
  <v-dialog v-model="dialog" max-width="500px">
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
            <v-flex xs12 sm8 md8>
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
                label="ФИО / Название компании"
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
                v-model="editedClient.mailAdress"
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
        <v-btn color="light-blue accent-3" @click="closeModal">
          Отменить
        </v-btn>
        <v-btn color="green accent-2" @click="saveModal">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ClientsControlModal",
  data: () => ({
    dialog: false,
    isCompany: false,
    expanded: [],
    clients: [],
    editedClientIndex: -1,
    modalMode: null,
    editedClient: {
      status: "CURRENT",
      name: "",
      email: "",
      phone: "",
      city: "",
      inn: "",
      fax: "",
      mailAdress: "",
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
      mailAdress: "",
      ogrn: "",
    },
  }),

  computed: {
    formTitle() {
      return this.modalMode === "create"
        ? "Новый клиент"
        : "Редактирование клиента";
    },
  },
  watch: {
    dialog(val) {
      val || this.closeModal();
    },
  },
  methods: {
    openModal(client) {
      if (client) {
        this.editedClient = client;
      }
      this.modalMode = client ? "edit" : "create";
      this.dialog = true;
    },
    closeModal() {
      this.$emit("done", null);
      this.dialog = false;
    },

    saveModal() {
      const client =
        this.modalMode === "create"
          ? {
              ...this.editedClient,
              id: Date.now().toString(),
              contactFaces: [],
            }
          : this.editedClient;
      this.$emit("done", client);
      this.closeModal();
    },
  },
};
</script>
