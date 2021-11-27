<template>
  <div>
    <v-btn
      @click="startCreateClient"
      color="light-blue accent-3"
      dark
      class="mt-2"
    >
      + Новый клиент
    </v-btn>
    <ClientControlModal
      v-if="clientModalVisible"
      ref="clientControlModal"
      @done="onCliendModalDone"
    />

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
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="clientsList"
      :search="search"
      item-key="id"
      class="elevation-1"
      :expanded.sync="expanded"
      show-expand
    >
      <template v-slot:item.status="{ item }" dark>
        <v-chip :color="getColor(item.status)">
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.addContactFace="{}">
        <v-icon
          @click="startCreateContactFace"
          color="light-blue accent-3"
          dark
          class="mt-2"
        >
         person_add_alt
        </v-icon>
        <ContactFaceControlModal
          v-if="contactFacesModalVisible"
          :currentContactFace.sync="currentContactFace"
          @doneContactFace="onContactFacesModalDone"
        />
      </template>

      <template v-slot:item.edit="{ item }">
        <v-icon color="green darken-1" @click="startEditClient(item)">
          edit
        </v-icon>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-icon color="red" @click="deleteClient(item)"> delete </v-icon>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.contactFaces }}
          <!-- Контактные лица {{ item.name }}: {{ contactFace.name }}
					{{ contactFace.phone }} {{ contactFace.email }} -->
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ClientControlModal from "@/components/ClientControlModal";
import ContactFaceControlModal from "@/components/ContactFaceControlModal";
export default {
  name: "ClientsPage",
  components: {
    ClientControlModal,
    ContactFaceControlModal,
  },
  data: () => ({
    search: "",
    isCompany: false,
    clientModalMode: "create",
    contactFacesModalMode: "create",
    clientModalVisible: false,
    contactFacesModalVisible: false,
    expanded: [],
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
    clientsList: [],
    contactFacesList:[],
    currentClient: null,
    currentContactFace: null,
  }),

  methods: {
    startCreateClient() {
      this.clientModalVisible = true;
      this.$nextTick(() => {
        this.$refs.clientControlModal.openModal();
      });
    },
    startEditClient(item) {
      this.clientModalVisible = true;
      this.currentClient = item;
      this.$nextTick(() => {
        this.$refs.clientControlModal.openModal(item);
      });
    },
    onCliendModalDone(client) {
      if (client) {
        const index = this.clientsList.findIndex(({ id }) => client.id === id);
        if (index > -1) {
          this.clientsList[index] = client;
        } else {
          this.clientsList = this.clientsList.concat(client);
        }
      }
      this.currentClient = null;
      this.clientModalVisible = false;
    },
    getColor(status) {
      if (status == "CURRENT") return "green accent-2";
      else if (status == "INACTIVE") return "grey lighten-1";
      else if (status == "FUTURE") return "cyan accent-1";
    },
    
    deleteClient(item) {
      const index = this.clientsList.indexOf(item);
      confirm("Удалить клиента?") && this.clientsList.splice(index, 1);
    },

    startCreateContactFace() {
      this.contactFacesModalVisible = true;
      this.$nextTick(() => {
        this.$refs.ccontactFaceControlModal.openContactFaceModal();
      });
    },

    onContactFacesModalDone(contactFace) {
      if (contactFace) {
        const index = this.contactFacesList.findIndex(({ id }) => contactFace.id === id);
        if (index > -1) {
          this.contactFacesList[index] = contactFace;
        } else {
          this.contactFacesList = this.contactFacesList.concat(contactFace);
        }
      }
      this.currentContactFace = null;
      this.contactFacesModalVisible = false;
    },
  },
};
</script>
