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
				<ContactFaceControlModal
					v-if="contactFacesModalVisible"
					:currentContactFace.sync="currentContactFace"
				/>
			</template>

			<template v-slot:item.edit="{ item }">
				<v-icon color="green darken-1" @click="startEditClient(item)">
					edit
				</v-icon>
			</template>
			<template v-slot:item.delete="{ item }">
				<v-icon color="red" @click="deleteClient(item)">
					delete
				</v-icon>
			</template>

			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					{{ item.contactFaces }}
					<!-- Контактные лица {{ item.name }}: {{ contactFace.name }}
					{{ contactFace.phone }} {{ contactFace.email }} -->
				</td>
			</template>
		</v-data-table>
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
			:currentClient.sync="currentClient"
			@done="onCliendModalDone"
		/>
	</div>
</template>

<script>
import ClientControlModal from '@/components/ClientControlModal';
import ContactFaceControlModal from '@/components/ContactFaceControlModal';
export default {
	name: 'ClientsPage',
	components: {
		ClientControlModal,
		ContactFaceControlModal,
	},
	data: () => ({
		search: '',
		isCompany: false,
		clientModalMode: 'create',
		contactFacesModalMode: 'create',
		clientModalVisible: false,
		contactFacesModalVisible: false,
		expanded: [],
		headers: [
			{ text: 'Cтатус', value: 'status' },
			{ text: 'ФИО', align: 'left', sortable: false, value: 'name' },
			{ text: 'Email', value: 'email' },
			{ text: 'Телефон', value: 'phone' },
			{ text: 'Город', value: 'city' },
			{ text: 'ИНН', value: 'inn' },
			{ text: 'fax', value: 'fax' },
			{ text: 'Адрес', value: 'address' },
			{ text: 'Компания', value: 'companyId' },
			{ text: 'ОГРН', value: 'ogrn' },

			{ text: '', value: 'addContactFace', sortable: false },
			{ text: '', value: 'edit', sortable: false },
			{ text: '', value: 'delete', sortable: false },
		],
		clientsList: [],
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
				const index = this.clientsList.findIndex(
					({ id }) => client.id === id,
				);
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
			if (status == 'CURRENT') return 'green accent-2';
			else if (status == 'INACTIVE') return 'grey lighten-1';
			else if (status == 'FUTURE') return 'cyan accent-1';
		},

		deleteClient(item) {
			const index = this.clientsList.indexOf(item);
			confirm('Are you sure you want to delete this item?') &&
				this.clientsList.splice(index, 1);
		},
	},
};
</script>
