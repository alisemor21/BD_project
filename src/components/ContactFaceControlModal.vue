<template>
  <v-dialog v-model="contactFaceModal" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitleContactFaces }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field
                v-model="currentContactFace.name"
                label="ФИО *"
                hint="фамилия имя отчество через пробел"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field
                v-model="currentContactFace.phone"
                label="Телефон"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm8 md8>
              <v-text-field
                v-model="currentContactFace.email"
                label="Email"
                color="light-blue accent-3"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="light-blue accent-3" @click="onCloseModalClicked">
          Отменить
        </v-btn>
        <v-btn color="green accent-2" @click="onSaveModalClicked">
          Сохранить контакт
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  patchContactFaceById,
  fetchContactFaceById,
  createContactFace,
} from "@/netClient/clientService";
export default {
  name: "ContactFaceControlModal",
  data: () => ({
    contactFaceModal: false,
    currentClientId: null,
    currentContactFace: {
      name: "",
      email: "",
      phone: "",
    },
  }),

  computed: {
    formTitleContactFaces() {
      return "Новое контактное лицо";
    },
  },

  watch: {
    contactFaceModal(val) {
      console.log("contactFaceModal.val =", val);
      val || this.closeContactFaceModal();
    },
  },

  methods: {
    async fetchContactFace() {
      try {
        await fetchContactFaceById();
      } catch (error) {
        console.error({ error });
      }
    },
    async patchContactFace() {
      try {
        await patchContactFaceById({ ...this.currentContactFace });
      } catch (error) {
        console.error({ error });
        throw error;
      }
    },
    async createContactFace() {
      try {
        console.log("444444444444", { ...this.currentContactFace });
        await createContactFace(
          this.currentClientId,
          this.currentContactFace.name,
          this.currentContactFace.phone,
          this.currentContactFace.email
        );
      } catch (error) {
        console.error({ error });
        throw error;
      }
    },
    async openContactFaceModal(clientId) {
      if (clientId) {
        this.currentClientId = clientId;
        this.currentContactFace = {};
      }
      this.contactFaceModal = true;
    },
    async onSaveModalClicked() {
      try {
        await this.createContactFace();
        this.$emit("success");
        this.onCloseModalClicked();
      } catch (error) {
        console.error({ error });
        this.$emit("error");
      }
    },
    onCloseModalClicked() {
      this.$emit("close");
      this.contactFaceModal = false;
    },
  },
};
</script>
