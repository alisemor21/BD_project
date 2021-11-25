<template>
  <v-dialog v-model="dialogContactFaces" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-icon color="light-blue accent-3" dark v-on="on">person_add_alt</v-icon>
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

<script>
export default {
  name: "ContactFaceControlModal",
  data: () => ({
    dialogContactFaces: false,
    expanded: [],
    clients: [],
    contactFaces: [],
    editedContactFaceIndex: -1,

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
    formTitleContactFaces() {
      return this.editedContactFaceIndex === -1
        ? "Новый контакт"
        : "Редактирование контакта";
    },
  },

  watch: {
    dialogContactFaces(val) {
      console.log("DialogContactFaces.val =", val);
      val || this.closeContactFace();
    },
  },

  methods: {
    saveContactFace() {
      if (this.editedContactFaceIndex > -1) {
        Object.assign(
          this.clients[this.editedContactFaceIndex],
          this.contactFace
        );
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

    // editContactFaces(item) {
    //   console.log("editedContactFaces", item);
    //   this.editedContactFaceIndex = this.clients.indexOf(item);
    //   this.contactFace = Object.assign({}, item);
    //   this.dialogContactFaces = true;

    // },
  },
};
</script>
