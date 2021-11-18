<template>
  <div class="all">
    <template>
      <div>
        <v-toolbar color="white">
          <v-toolbar-title>Все отчёты</v-toolbar-title>
          <v-divider class="mx-5" inset vertical></v-divider>
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
                >+ Создать новый отчёт</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-autocomplete
                        v-model="editedItem.employee"
                        :items="['Андрей', 'Паша', 'Петя']"
                        label="Работник*"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex xs12 sm8 md8>
                      <v-text-field
                        v-model="editedItem.startDate"
                        label="Дата начала отчёта*"
                        type="date"
                        color="rgb(109, 152, 134)"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm8 md8>
                      <v-text-field
                        v-model="editedItem.endDate"
                        label="Дата окончания отчёта*"
                        type="date"
                        color="rgb(109, 152, 134)"
                        required
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
          :items="reports"
          :search="search"
          item-key="name"
          class="elevation-1"
        >
          <!-- <template v-slot:item.edit="{ item }">
            <v-icon class="mr-2" @click="editItem(item)"> edit </v-icon>
          </template> -->
          <template v-slot:item.download="{ item }">
            <v-icon color="blue" @click="downloadItem(item)"> download </v-icon>
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
    dialog: false,
    expand: [],
    search: "",
    headers: [
      {
        text: "ФИО Работника",
        align: "left",
        sortable: false,
        value: "employee",
      },
      { text: "От", value: "startDate" },
      { text: "До", value: "endDate" },

      // { text: "", value: "edit", sortable: false },
      { text: "", value: "download", sortable: false },
    ],
    reports: [],
    editedIndex: -1,
    editedItem: {
      employee: "",
      startDate: "-",
      endDate: "-",
    },
    defaultItem: {
      employee: "",
      startDate: "-",
      endDate: "-",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Создание нового отчёта"
        : "Редактировать";
      // return this.editedIndex === -1 ? "Создание нового отчёта" : "Редактировать";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.reports = [this.defaultItem];
  },

  methods: {
    // editItem(item) {
    //   this.editedIndex = this.reports.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    // deleteItem(item) {
    //   const index = this.reports.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.reports.splice(index, 1);
    // },

    downloadItem() {
      alert("Скачать отчёт?");
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
        Object.assign(this.reports[this.editedIndex], this.editedItem);
      } else {
        this.reports.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
