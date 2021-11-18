<template>
  <div class="all">
    <template>
      <div>
        <v-toolbar color="white">
          <v-toolbar-title>Все клиенты</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            color="rgb(109, 152, 134)"
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="rgb(109, 152, 134)" dark class="mb-2" v-on="on"
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
                        v-model="editedItem.status"
                        :items="['FUTURE', 'CURRENT', 'INACTIVE']"
                        label="Статус*"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm4 md4>
                      <v-text-field
                        v-model="editedItem.inn"
                        label="ИНН"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.city"
                        label="Город"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.name"
                        label="ФИО"
                        hint="фамилия имя отчество через пробел"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Телефон"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm8 md8>
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm8 md8>
                      <v-text-field
                        v-model="editedItem.address"
                        label="Адрес"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4 md4>
                      <v-text-field
                        v-model="editedItem.fax"
                        label="fax"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4 md4>
                      <v-checkbox
                        v-model="isCompany"
                        label="Юр. лицо?"
                        hide-details
                        class="shrink mr-2 mt-0"
                        color="rgb(109, 152, 134)"
                      ></v-checkbox>
                    </v-flex>

                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.companyId"
                        :disabled="!isCompany"
                        label="Название компании"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        v-model="editedItem.ogrn"
                        :disabled="!isCompany"
                        label="ОГРН"
                        color="rgb(109, 152, 134)"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgb(109, 152, 134)" @click="close"
                  >Отменить</v-btn
                >
                <v-btn color="rgb(109, 152, 134)" @click="save"
                  >Сохранить</v-btn
                >
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
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-icon
              color="rgb(109, 152, 134)"
              class="mr-2"
              @click="editItem(item)"
            >
              edit
            </v-icon>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-icon color="red" @click="deleteItem(item)"> delete </v-icon>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">Контактные лица {{ item.name }} {{ item.name }}</td>
        </template>

        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "EmployeesPage",
  data: () => ({
    search: "",
    isCompany: false,
    dialog: false,
    expand: [],
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

      { text: "", value: "edit", sortable: false },
      { text: "", value: "delete", sortable: false },
    ],
    clients: [],
    editedIndex: -1,
    editedItem: {
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
    defaultItem: {
      status: "",
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
      return this.editedIndex === -1
        ? "Новый клиент"
        : "Редактирование клиента";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.clients = [this.defaultItem];
  },

  methods: {
    getColor(status) {
      if (status == "CURRENT") return "green";
      else if (status == "INACTIVE") return "brown";
      else if (status == "FUTURE") return "brown";
      else return "WHITE";
    },

    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.clients.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.clients.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clients[this.editedIndex], this.editedItem);
      } else {
        this.clients.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
