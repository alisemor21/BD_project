<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title>
				<span class="headline">{{ formTitle }}</span>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex xs12 sm12 md12 lg12>
							<v-checkbox
								v-if="modalMode === 'create'"
								@change="onCompanyCheckClicked"
								:value="companyCheck"
								label="Юр. лицо?"
								hide-details
								class="shrink mb-4"
								color="light-blue accent-3"
							></v-checkbox>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.name"
								:label="
									showCompanyFields
										? 'Название компании *'
										: 'ФИО клиента *'
								"
								:hint="
									showCompanyFields
										? 'Название компании'
										: 'Через пробел: Фамилия, Имя, Отчество'
								"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.inn"
								label="ИНН *"
								color="light-blue accent-3"
							></v-text-field>
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
							></v-select>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.city"
								label="Город"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.address"
								label="Адрес"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.phone"
								label="Телефон"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.email"
								label="Email"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.fax"
								label="Факс"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex v-if="showCompanyFields" xs12 sm6 md6 lg6>
							<v-text-field
								v-model="currentClient.ogrn"
								label="ОГРН"
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
					Сохранить
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { CLIENT_STATUSES } from '@/utils/enums';

import {
	createClient,
	patchClientById,
	fetchClientById,
} from '@/netClient/clientService';

export default {
	name: 'ClientsControlModal',
	data: () => ({
		dialog: false,
		expanded: [],
		clients: [],
		modalMode: null,
		companyCheck: false,
		currentClient: {
			id: '',
			name: '',
			inn: '',
			status: '',
			city: '',
			address: '',
			phone: '',
			email: '',
			fax: '',
			ogrn: '',
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
			return this.modalMode === 'create'
				? 'Новый клиент'
				: 'Редактирование клиента';
		},
		showCompanyFields() {
			return this.modalMode === 'create'
				? this.companyCheck
				: !!this.currentClient?.ogrn?.length;
		},
	},
	methods: {
		onCompanyCheckClicked(isCompany) {
			if (!isCompany) {
				this.currentClient.ogrn = null;
			}
			this.companyCheck = isCompany;
		},
		async openModal(client) {
			if (client?.id) {
				this.currentClient = await fetchClientById(client);
				if (this.showCompanyFields) {
					this.companyCheck = true;
				}
				this.modalMode = 'edit';
			} else {
				this.currentClient.status = this.clientStatusCodes[0];
				this.modalMode = 'create';
			}
			this.dialog = true;
		},
		onCloseModalClicked() {
			this.$emit('done', null);
			this.dialog = false;
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
				await patchClientById(
					this.currentClient.id,
					this.currentClient.name,
					this.currentClient.inn,
					this.currentClient.status,

					this.currentClient.city,
					this.currentClient.address,

					this.currentClient.phone,
					this.currentClient.email,
					this.currentClient.fax,

					this.currentClient.ogrn,
				);
			} catch (error) {
				console.error({ error });
			}
		},
		async createClient() {
			try {
				await createClient();
			} catch (error) {
				console.error({ error });
			}
		},
		async onSaveModalClicked() {
			const client =
				this.modalMode === 'create'
					? await this.createClient()
					: await this.patchClient();
			this.$emit('done', client);
			this.onCloseModalClicked();
		},
	},
};
</script>
