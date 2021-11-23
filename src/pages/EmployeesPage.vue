<template>
  <div class="all">
    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>Все сотрудники</v-toolbar-title>
        <v-divider class="mx-3" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          color="light-blue accent-3"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="light-blue accent-3" dark class="mb-2" v-on="on"
              >+ Создать нового сотрудника</v-btn
            >
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md8>
                    <v-text-field
                      v-model="editedItem.name"
                      label="ФИО"
                      hint="фамилия имя отчество через пробел"
                      color="light-blue accent-3"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.role"
                      :items="['MANAGER', 'ADMIN', 'COMMON']"
                      label="Роль*"
                      color="light-blue accent-3"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm6 md12>
                    <v-text-field
                      v-model="editedItem.login"
                      label="Login"
                      color="light-blue accent-3"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md12>
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      type="password"
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
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="employees"
        item-key="name"
        class="elevation-1"
        :search="search"
        
      >
        <template v-slot:item.role="{ item }" dark>
          <v-chip :color="getColor(item.role)">
            {{ item.role }}
          </v-chip>
        </template>

        <template v-slot:item.edit="{ item }">
          <v-icon
            color="green darken-1"
            
            @click="editItem(item)"
          >
            edit
          </v-icon>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-icon color="red" @click="deleteItem(item)"> delete </v-icon>
        </template>
        
        

      </v-data-table>
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
        text: "ФИО",
        align: "left",
        // sortable: false,
        value: "name",
      },
      { text: "Должность сотрудника", value: "role" },
      { text: "", value: "edit", sortable: false },
      { text: "", value: "delete", sortable: false },
    ],
    employees: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      role: "COMMON",
      login: "",
      password: "",
    },
    defaultItem: {
      name: "",
      role: "COMMON",
      login: "",
      password: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Создать" : "Редактировать";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },



  methods: {
    getColor(role) {
      if (role == "ADMIN") return "orange accent-4";
      else if (role == "MANAGER") return "cyan accent-1";
      else if (role == "COMMON") return "green accent-2";
    },

    editItem(item) {
      this.editedIndex = this.employees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.employees.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.employees.splice(index, 1);
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
        Object.assign(this.employees[this.editedIndex], this.editedItem);
      } else {
        this.employees.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
