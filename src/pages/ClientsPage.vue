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
      <ClientControlModal />
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
      <template v-slot:item.status="{ item }" dark>
        <v-chip :color="getColor(item.status)">
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.addContactFace="{}">
        <ContactFaceControlModal />
      </template>

      <template v-slot:item.edit="{ item }">
        <v-icon color="green darken-1" @click="editClient(item)"> edit </v-icon>
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
    dialog: false,
    dialogContactFaces: false,
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
  }),

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
  },
};
</script>
