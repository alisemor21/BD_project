<template>
	<div>
		<template v-if="role === 'ADMIN'">
			<v-btn
				@click="startCreateClient"
				color="light-blue accent-3"
				dark
				class="mb-4"
			>
				+ Новый клиент
			</v-btn>
		</template>
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
				<v-chip :color="getStatusCellColor(item.status)">
					{{ item.status | getStatusCellLabel }}
				</v-chip>
			</template>

			<template
				v-if="currentRole === 'ADMIN' || currentRole === 'MANAGER'"
				v-slot:item.addContactFace="{ item }"
			>
				<v-icon
					@click="startCreateContactFace(item)"
					color="light-blue accent-3"
					dark
				>
					person_add_alt
				</v-icon>
				<ContactFaceControlModal
					v-if="contactFacesModalVisible"
					ref="сontactFaceControlModal"
					:currentContactFace.sync="currentContactFace"
					@done="onContactFacesModalDone"
				/>
			</template>
			<template
				v-if="currentRole === 'ADMIN' || currentRole === 'MANAGER'"
				v-slot:item.editClient="{ item }"
			>
				<v-icon
					v-if="item.status !== 'INACTIVE'"
					color="green darken-1"
					@click="startEditClient(item)"
				>
					edit
				</v-icon>
			</template>
			<template
				v-if="currentRole === 'ADMIN' || currentRole === 'MANAGER'"
				v-slot:item.deleteClient="{ item }"
			>
				<v-icon
					v-if="item.status !== 'INACTIVE'"
					color="red"
					@click="deleteClient(item)"
				>
					delete
				</v-icon>
			</template>

			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<v-list-item
						v-for="contactFace in item.contactFaceList"
						:key="contactFace.id"
					>
						<v-list-item-content>
							<v-list-item-title
								>{{ contactFace.name }}, тел:{{
									contactFace.phone
								}}, еmail:{{ contactFace.email }}, статус:
								{{
									contactFace.contactFaceStatus
								}}</v-list-item-title
							>
						</v-list-item-content>
						<template
							v-if="
								currentRole === 'ADMIN' &&
								contactFace.contactFaceStatus === 'ACTIVE'
							"
						>
							<v-dialog
								v-model="dialog"
								persistent
								max-width="4000"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-icon
										dark
										v-bind="attrs"
										v-on="on"
										color="red"
									>
										person_remove
									</v-icon>
								</template>
								<v-card>
									<v-card-title class="text-h5">
										Вы уверены, что хотите удалить это
										контактное лицо?
									</v-card-title>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="green darken-1"
											text
											@click="dialog = false"
										>
											Отменить
										</v-btn>
										<v-btn
											color="red"
											text
											@click="deleteContact(item.id, contactFace.id)"
										>
											Удалить
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</template>
					</v-list-item>
				</td>
			</template>
		</v-data-table>
		<ClientControlModal
			v-if="clientModalVisible"
			ref="clientControlModal"
			@success="onClientModalSuccess"
			@close="onClientModalClose"
		/>
	</div>
</template>

<script>
import ClientControlModal from '@/components/ClientControlModal';
import ContactFaceControlModal from '@/components/ContactFaceControlModal';
import {
	deleteClientById,
	fetchClientList,
	deleteContactFaceById,
} from '@/netClient/clientService';
import { getCLientEnumColor, getEnumLabel } from '@/utils/enumUtil';

export default {
	name: 'ClientsPage',
	filters: {
		getStatusCellLabel: (statusCode) => {
			return getEnumLabel(statusCode);
		},
	},
	components: {
		ClientControlModal,
		ContactFaceControlModal,
	},
	data: () => ({
		role: 'ADMIN',
		dialog: false,
		search: '',
		isCompany: false,
		clientModalMode: 'create',
		contactFacesModalMode: 'create',
		clientModalVisible: false,
		contactFacesModalVisible: false,
		expanded: [],
		headers: [
			{ text: 'Cтатус', value: 'status' },
			{ text: 'Имя', value: 'name', align: 'left' },
			{ text: 'ИНН', value: 'inn', sortable: false },
			// { text: 'Email', value: 'email', sortable: false },
			// { text: 'Телефон', value: 'phone', sortable: false },
			// { text: 'Город', value: 'city', sortable: false },
			// { text: 'fax', value: 'fax', sortable: false },
			// { text: 'Адрес', value: 'mailAdress', sortable: false },
			// { text: 'ОГРН', value: 'ogrn', sortable: false },
			{ text: '', value: 'addContactFace', sortable: false },
			{ text: '', value: 'editClient', sortable: false },
			{ text: '', value: 'deleteClient', sortable: false },
		],
		clientsList: [],
		contactFacesList: [],
		currentClient: null,
		currentContactFace: null,
	}),

	computed: {
		currentRole() {
			return localStorage.role;
		},
	},

	created() {
		this.fetchClients();
	},
	methods: {
		async fetchClients() {
			try {
				this.clientsList = await fetchClientList();
			} catch (error) {
				console.error({ error });
			}
		},
		async deleteClientById(id) {
			try {
				await deleteClientById(id);
			} catch (error) {
				console.error({ error });
			}
		},
		async deleteClient(item) {
			console.warn({ item });
			if (confirm('Удалить клиента?')) {
				await this.deleteClientById(item.id);
				this.fetchClients();
			}
		},
		startCreateClient() {
			this.clientModalVisible = true;
			this.$nextTick(() => {
				this.$refs.clientControlModal.openModal();
			});
		},

		startEditClient(client) {
			this.clientModalVisible = true;
			this.$nextTick(() => {
				this.$refs.clientControlModal.openModal(client.id);
			});
		},

		onClientModalSuccess() {
			this.clientModalVisible = false;
			this.fetchClients();
		},

		onClientModalClose() {
			this.clientModalVisible = false;
		},

		startCreateContactFace(client) {
			this.contactFacesModalVisible = true;
			this.currentClient = client;
			this.$nextTick(() => {
				this.$refs.сontactFaceControlModal.openContactFaceModal(
					client.id,
				);
			});
		},

		onContactFacesModalDone(contactFace) {
			if (contactFace) {
				const tableClientIndex = this.clientsList.findIndex(
					({ id }) => this.currentClient.id === id,
				);
				const { contactFaces } =
					this.clientsList[tableClientIndex] ?? {};
				if (!contactFaces) {
					this.clientsList[tableClientIndex].contactFaces = [];
				}
				const index = contactFaces.findIndex(
					({ id }) => contactFace.id === id,
				);
				if (index > -1) {
					this.clientsList[tableClientIndex].contactFaces[index] =
						contactFace;
				} else {
					this.clientsList[tableClientIndex].contactFaces =
						contactFaces.concat(contactFace);
				}
			}

			this.currentClient = null;
			this.currentContactFace = null;
			this.contactFacesModalVisible = false;
			this.fetchClients();
		},

		getStatusCellColor(statusCode) {
			return getCLientEnumColor(statusCode);
		},
		async deleteContact(clientId, contactFaceId) {
			await deleteContactFaceById(clientId, contactFaceId);
			await this.fetchClients();
			this.dialog = false;
		},
	},
};
</script>
