<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12 lg12 class="mb-4">
              <v-checkbox
                v-if="modalMode === 'create'"
                @change="onCompanyCheckClicked"
                :value="companyCheck"
                label="Юр. лицо?"
                hide-details
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.name"
                :label="
                  showCompanyFields ? 'Название компании *' : 'ФИО клиента *'
                "
                :hint="
                  showCompanyFields
                    ? 'Название компании'
                    : 'Через пробел: Фамилия, Имя, Отчество'
                "
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.inn"
                label="ИНН *"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm12 md12 lg12>
              <v-select
                v-model="currentClient.status"
                :items="clientStatuses"
                item-text="label"
                item-value="code"
                label="Статус"
                color="light-blue accent-3"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.city"
                label="Город"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.mailAdress"
                label="Адрес"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.phone"
                label="Телефон"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.email"
                label="Email"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.fax"
                label="Факс"
                color="light-blue accent-3"
              />
            </v-flex>
            <v-flex v-if="showCompanyFields" xs12 sm6 md6 lg6>
              <v-text-field
                v-model="currentClient.ogrn"
                label="ОГРН *"
                color="light-blue accent-3"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="light-blue accent-3" @click="onCloseModalClicked">
          Отменить
        </v-btn>
        <v-btn
          :disabled="!formValid"
          color="green accent-2"
          @click="onSaveModalClicked"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CLIENT_STATUSES } from "@/utils/enums";

import {
  createClient,
  patchClientById,
  fetchClientById,
} from "@/netClient/clientService";

export default {
  name: "ClientsControlModal",
  data: () => ({
    dialog: false,
    expanded: [],
    clients: [],
    modalMode: null,
    companyCheck: false,
    currentClient: {
      id: "",
      name: "",
      inn: "",
      status: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      fax: "",
      ogrn: "",
    },
  }),
  computed: {
    clientStatuses() {
      return Object.keys(CLIENT_STATUSES).map((code) => ({
        code,
        label: CLIENT_STATUSES[code],
      }));
    },
    clientStatusCodes() {
      return Object.keys(CLIENT_STATUSES);
    },
    clientStatusNames() {
      return Object.values(CLIENT_STATUSES);
    },
    formTitle() {
      return this.modalMode === "create"
        ? "Добавить нового клиента"
        : "Редактирование клиента";
    },
    showCompanyFields() {
      return this.modalMode === "create"
        ? this.companyCheck
        : !!this.currentClient?.ogrn?.length;
    },
    formValid() {
      const baseFields = Boolean(
        this.currentClient?.name?.trim()?.length &&
          this.currentClient?.inn?.trim()?.length &&
          this.currentClient?.city?.trim()?.length &&
          this.currentClient?.email?.trim()?.length &&
          this.currentClient?.phone?.trim()?.length &&
          this.currentClient?.address?.trim()?.length
      );
      console.warn({ baseFields });
      console.warn(
        this.currentClient?.name?.trim()?.length,
        this.currentClient?.inn?.trim()?.length,
        this.currentClient?.city?.trim()?.length,
        this.currentClient?.email?.trim()?.length,
        this.currentClient?.phone?.trim()?.length,
        this.currentClient?.address?.trim()?.length
      );
      return this.showCompanyFields
        ? baseFields && !!this.currentClient?.ogrn?.trim()?.length
        : baseFields;
    },
  },
  methods: {
    onCompanyCheckClicked(isCompany) {
      if (!isCompany) {
        this.currentClient.ogrn = null;
      }
      this.companyCheck = isCompany;
    },
    async openModal(clientId) {
      if (clientId) {
        this.currentClient = await fetchClientById(clientId);
        if (this.showCompanyFields) {
          this.companyCheck = true;
        }
        this.modalMode = "edit";
      } else {
        this.currentClient = {};
        this.currentClient.status = this.clientStatusCodes[0];
        this.modalMode = "create";
      }
      this.dialog = true;
    },
    async fetchClient() {
      try {
        await patchClientById();
      } catch (error) {
        console.error({ error });
      }
    },
    async patchClient() {
      try {
        await patchClientById({ ...this.currentClient });
      } catch (error) {
        console.error({ error });
        throw error;
      }
    },
    async createClient() {
      try {
        await createClient({ ...this.currentClient });
      } catch (error) {
        console.error({ error });
        throw error;
      }
    },
    async onSaveModalClicked() {
      try {
        this.modalMode === "create"
          ? await this.createClient()
          : await this.patchClient();
        this.$emit("success");
        this.onCloseModalClicked();
      } catch (error) {
        console.error({ error });
        this.$emit("error");
      }
    },
    onCloseModalClicked() {
      this.$emit("close");
      this.currentClient = null;
      this.dialog = false;
    },
  },
};
</script>
