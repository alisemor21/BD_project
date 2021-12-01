<template>
  <div class="all">
    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>Все контракты</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <template v-if="role === 'ADMIN' || role === 'MANAGER'">
              <v-btn
                color="light-blue accent-3"
                dark
                class="mb-2"
                v-on="on"
                @click="startCreateContract"
                >+ Создать новый контракт</v-btn
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
                  <v-flex xs12 sm12 md12>
                    <v-select
                      v-model="editedItem.clientName"
                      :items="this.clientNameList"
                      label="Клиент*"
                      color="light-blue accent-3"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="editedItem.info"
                      background-color="amber lighten-4"
                      color="orange orange-darken-4"
                      label="Информация по контракту"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="light-blue accent-3" @click="close">Отменить</v-btn>
              <v-btn color="green accent-2" @click="submitCreateContract"
                >Сохранить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="contracts"
        item-key="name"
        class="elevation-1"
        :search="search"
      >
        <!-- Ничего пока не делают)))) -->
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
  getAllContracts, 
  createContract,
  deleteContractById,
   } from "@/netClient/contractService";
import { fetchClientList, fetchClientById } from "@/netClient/clientService";

export default {
  name: "ContractsPage",
  data: () => ({
    role: "MANAGER",
    dialog: false,
    currentUser: [],
    currentContract: [],
    client:null,
    clients: [],
    clientNameList: [],
    expand: [],
    search: "",
    headers: [
      { text: "id контракт", value: "id" },
      { text: "Клиент", value: "client.clientInfos.name" },
      { text: "Информация по контракту", value: "info" },

      { text: "", value: "edit", sortable: false },
      { text: "", value: "delete", sortable: false },
    ],
    contracts: [],
    editedIndex: -1,
    editedItem: {
      clientId: "",
      clientName: "Клиент",
      info: "",
    },
    defaultItem: {
      clientId: "",
      info: "",
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
      this.getAllClients();
      this.getClientsNames();
      this.fetchAllContracts();
    },

    async fetchAllContracts() {
      try {
        this.contracts = await getAllContracts();
      } catch (error) {
        console.error({ error });
      }
    },

    async fetchClientById(){
      try {
        this.client = await fetchClientById();
      } catch (error) {
        console.error({ error });
      }
    },

    async getAllClients() {
      try {
        this.clients = await fetchClientList();
        this.clients.forEach((element) => {
          this.clientNameList.push(element.name);
        });
      } catch (error) {
        console.error({ error });
      }
    },

    getClientsNames() {
      this.clients.forEach((element) => {
        this.clientNameList.push(element.name);
      });
    },

    startCreateContract() {

    },

    async submitCreateContract() {
      this.clients.forEach((element) => {
        if (element.name == this.editedItem.clientName) {
          this.editedItem.clientId = element.id;
        }
      });
      if (this.editedItem.clientId) {
        try {
          await createContract(this.editedItem.clientId, this.editedItem.info);
        } catch (error) {
          console.error({ error });
        }

        this.dialog = false;
        this.refresh();
      }
    },

    async deleteItem(item) {
			this.currentContract = item;
			//await deleteContractById(this.currentContract.id)
      try {
				this.contract = await deleteContractById(this.currentContract.id);
				this.refresh()
			} catch (error) {
				console.error({ error });
			}
		},

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
};
</script>
