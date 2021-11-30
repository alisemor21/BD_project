<template>
  <div class="all">
    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>Все задания</v-toolbar-title>
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
            <template v-if="role === 'ADMIN' || role === 'MANAGER'">
              <v-btn
                color="light-blue accent-3"
                dark
                class="mb-2"
                v-on="on"
                @click="startCreateTask"
                >+ Создать новое задание</v-btn
              >
            </template>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-if="currentUser"
                      v-model="editedItem.author"
                      :disabled="true"
                      text="this.currentUser.name"
                      label="Автор*"
                      color="light-blue accent-3"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md6>
                    <v-select
<<<<<<< HEAD
                      v-model="editedItem.executorName"
                      :items="this.employeesNames" 
=======
                      v-model="editedItem.executor"
                      :items="this.employeesNames"
>>>>>>> c615082a2803f1e79a1e56a4d5d33c8adca29967
                      label="Исполнитель*"
                      color="light-blue accent-3"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm6 md6>
                    <v-select
                      v-model="editedItem.priority"
                      :items="['LOW', 'MEDIUM', 'HIGH']"
                      label="Приоритет выполнения*"
                      color="light-blue accent-3"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm6 md6>
                    <v-select
                      v-model="editedItem.status"
                      :items="['ACTIVE', 'INACTIVE', 'READY']"
                      label="Статус*"
                      color="light-blue accent-3"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.deadline"
                      label="Дедлайн задания*"
                      type="date"
                      color="light-blue accent-3"
                      required
                    ></v-text-field>

<<<<<<< HEAD
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="editedItem.type"
                      background-color="amber lighten-4"
                      color="orange orange-darken-4"
                      label="Описание задания"
                      type="type"
                      required
                    ></v-textarea>
                  </v-flex>

                  
=======
                    <v-flex xs12 sm12 md12>
                      <v-textarea
                        v-model="editedItem.type"
                        background-color="amber lighten-4"
                        color="orange orange-darken-4"
                        label="ОписMatveiание задания"
                        type="type"
                        required
                      ></v-textarea>
                    </v-flex>
>>>>>>> c615082a2803f1e79a1e56a4d5d33c8adca29967
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="light-blue accent-3" @click="close">Отменить</v-btn>
              <v-btn color="green accent-2" @click="submitCreateTask">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="tasks"
        item-key="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.status="{ item }" dark>
          <v-chip :color="getColorStatus(item.status)">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.priority="{ item }" dark>
          <v-chip :color="getColorPriority(item.priority)">
            {{ item.priority }}
          </v-chip>
        </template>

        <template v-slot:item.edit="{ item }">
          <v-icon color="green darken-1" @click="editItem(item)"> edit </v-icon>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-icon color="red" @click="deleteItem(item)"> delete </v-icon>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import {
  // getAllTasks,
  // getTaskById,
  createTask,
  // patchTaskById,
  // deleteTaskById,
} from "@/netClient/taskService";
import { getAllEmployees, getMyInfo } from "@/netClient/employeesService";
export default {
  name: "TaskPage",
  data: () => ({
    role: "MANAGER",
    dialog: false,
    currentUser: [],
    employees: [],
    employeesNames: [],
    expand: [],
    search: "",
    headers: [
      {
        text: "Автор задания",
        align: "left",
        value: "author",
      },
      { text: "Исполнитель", value: "executor" },
      { text: "Приоритет", value: "priority" },
      { text: "Статус", value: "status" },
      { text: "Описание", value: "type" },
      { text: "Дедлайн", value: "deadline" },

      { text: "", value: "edit", sortable: false },
      { text: "", value: "delete", sortable: false },
    ],
    tasks: [],
    //editItemName: this.currentUser.name,
    editedIndex: -1,
    editedItem: {
      author: "",
      executorName: "",
      executorId: "",
      priority: "LOW",
      status: "ACTIVE",
      type: "",
      deadline: "",
    },
    defaultItem: {
      author: "",
      executorName: "",
      executorId: "",
      priority: "LOW",
      status: "ACTIVE",
      type: "",
      deadline: "",
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

  created() {
    this.refresh();
  },

  methods: {
    refresh() {
      this.getCurrentUserInfo();
      this.fetchEmployeesList();
    },

    async fetchEmployeesList() {
      try {
        this.employees = await getAllEmployees();
<<<<<<< HEAD
      } catch (error){
=======
        console.log(this.employees);
      } catch (error) {
>>>>>>> c615082a2803f1e79a1e56a4d5d33c8adca29967
        console.error({ error });
      }
    },

    getEmployeesNames() {
      this.employees.forEach((element) => {
        if (element.name != this.currentUser.name) {
          this.employeesNames.push(element.name);
        }
      });
    },

    async getCurrentUserInfo() {
      try {
        this.currentUser = await getMyInfo();
        this.editedItem.author = this.currentUser.name;
        this.defaultItem.author = this.currentUser.name;
      } catch (error) {
        console.error({ error });
      }
    },

    startCreateTask(){
      this.fetchEmployeesList()
      this.getEmployeesNames()
    },

    async submitCreateTask(){
      console.log(this.editedItem)
      
      this.employees.forEach(element => {
        if(element.name == this.editedItem.executorName){
          this.editedItem.executorId = element.id
        }
      })
      if(this.editedItem.executorId){
        try {
        await createTask(
            this.currentUser.id,
            this.editedItem.executorId,
            this.editedItem.priority,
            this.editedItem.status,
            this.editedItem.type,
            this.editedItem.deadline
        )
      } catch (error){
        console.error({ error });
      }
      }
      
    },

    getColorStatus(status) {
      if (status == "READY") return "light-green lighten-2";
      else if (status == "INACTIVE") return "green lighten-5";
      else if (status == "ACTIVE") return "green";
    },

    getColorPriority(priority) {
      if (priority == "HIGH") return "orange accent-4";
      else if (priority == "MEDIUM") return "cyan accent-1";
      else if (priority == "LOW") return "green accent-2";
    },

    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tasks.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tasks.splice(index, 1);
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
        Object.assign(this.tasks[this.editedIndex], this.editedItem);
      } else {
        this.tasks.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
