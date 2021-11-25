<template>
  <div class="all">
    <template>
      <div>
        <v-toolbar color="white">
          <v-toolbar-title>Все клиенты</v-toolbar-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            color="light-blue accent-3"
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
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
                <v-btn color="light-blue accent-3" @click="close"
                  >Отменить</v-btn
                >
                <v-btn color="green accent-2" @click="save">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="clients"
          :search="search"
          item-key="name"
          class="elevation-1"
          :expanded.sync="expanded"
          show-expand
        >
          <!-- :single-expand="singleExpand" -->
          <template v-slot:item.status="{ item }" dark>
            <v-chip :color="getColor(item.status)">
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.addContactFace="{}">
            <v-dialog v-model="dialogContactFaces" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-icon color="light-blue accent-3" dark v-on="on"
                  >person_add_alt</v-icon
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitleContactFaces }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="contactFace.name"
                          label="ФИО"
                          hint="фамилия имя отчество через пробел"
                          color="light-blue accent-3"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 md4>
                        <v-text-field
                          v-model="contactFace.phone"
                          label="Телефон"
                          color="light-blue accent-3"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm8 md8>
                        <v-text-field
                          v-model="contactFace.email"
                          label="Email"
                          color="light-blue accent-3"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="light-blue accent-3" @click="closeContactFace"
                    >Отменить контакт</v-btn
                  >
                  <v-btn color="green accent-2" @click="saveContactFace"
                    >Сохранить контакт</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-icon color="green darken-1" @click="editClient(item)">
              edit
            </v-icon>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-icon color="red" @click="deleteClient(item)"> delete </v-icon>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              Контактные лица {{ item.name }}: {{ contactFace.name }}
              {{ contactFace.phone }} {{ contactFace.email }}
            </td>
          </template>
        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ClientsPage",
  data: () => ({
    search: "",
    isCompany: false,
    dialog: false,
    dialogContactFaces: false,
    expanded: [],
    // singleExpand: false,
    headers: [
      { text: "Cтатус", value: "status" },
      { text: "ФИО", align: "left", sortable: false, value: "name" },
      { text: "Email", value: "email" },
      { text: "Телефон", value: "phone" },
      { text: "Город", value: "city" },
      { text: "ИНН", value: "inn" },
      { text: "fax", value: "fax" },
      { text: "Адрес", value: "address" },
      { text: "Компания", value: "companyId" },
      { text: "ОГРН", value: "ogrn" },


      { text: "", value: "addContactFace", sortable: false },
      { text: "", value: "edit", sortable: false },
      { text: "", value: "delete", sortable: false },
    ],

    // headersContacts: [

    //   { text: "ФИО", align: "left", sortable: false, value: "name" },
    //   { text: "Email", value: "email" },
    //   { text: "Телефон", value: "phone" },

    //   { text: "", value: "edit", sortable: false },
    //   { text: "", value: "delete", sortable: false },
    // ],

    // clients:[
    //   {
    //     contactFaces:[

    //     ]

    //   }
    // ],

    clients: [],
    contactFaces: [],
    editedClientI: -1,
    editedContactFaceIndex: -1,
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
    contactFace: {
      name: "",
      email: "",
      phone: "",
    },

    defaultContactFace: {
      name: "",
      email: "",
      phone: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedClientIndex === -1
        ? "Новый клиент"
        : "Редактирование клиента";
    },
    formTitleContactFaces() {
      return this.editedContactFaceIndex === -1
        ? "Новый контакт"
        : "Редактирование контакта";
    },
  },

  watch: {
    dialog(val) {
      console.log('Dialog.val =' , val)
      val || this.close();
    },

    dialogContactFaces(val) {
      console.log('DialogContactFaces.val =' , val)
      val || this.closeContactFace();
    },

  },

  methods: {
    getColor(status) {
      if (status == "CURRENT") return "green accent-2";
      else if (status == "INACTIVE") return "grey lighten-1";
      else if (status == "FUTURE") return "cyan accent-1";
    },

    editClient(item) {
      this.editedClientIndex = this.clients.indexOf(item);
      this.editedClient = Object.assign({}, item);
      this.dialog = true;
    },

    deleteClient(item) {
      const index = this.clients.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.clients.splice(index, 1);
    },

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

    // saveContactFace() {
    //   if (this.editedContactFaceIndex > -1) {
    //     Object.assign(this.contactFaces[this.editedContactFaceIndex], this.contactFace);
    //   } else {
    //     this.contactFaces.push(this.contactFace);
    //   }
    //   this.close();
    //   this.dialogContactFaces = false;
    // },

    // closeContactFace() {
    //   this.dialogContactFaces = false;
    //   setTimeout(() => {
    //     this.contactFace = Object.assign({}, this.defaultContactFace);
    //     this.editedContactFaceIndex = -1;
    //   }, 300);
    // },

    saveContactFace() {
      if (this.editedContactFaceIndex > -1) {
        Object.assign(this.clients[this.editedContactFaceIndex], this.contactFace);
      } else {
        this.contactFaces.push(this.contactFace);
      }
      this.close();
      this.dialogContactFaces = false;
    },

    closeContactFace() {
      this.dialogContactFaces = false;
      setTimeout(() => {
        this.contactFace = Object.assign({}, this.defaultContactFace);
        this.editedContactFaceIndex = -1;
      }, 300);
    },

    editContactFaces(item) {
      console.log("editedContactFaces", item);
      this.editedContactFaceIndex = this.clients.indexOf(item);
      this.contactFace = Object.assign({}, item);
      this.dialogContactFaces = true;

    },
  },
};
</script>
