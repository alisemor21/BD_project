<template>
	<div class="all">
		<template>
			<v-toolbar flat color="white">
				<v-toolbar-title>Все сотрудники</v-toolbar-title>
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
				<v-btn
					color="light-blue accent-3"
					dark
					class="mb-2"
					@click="startCreateEmployee"
				>
					+ Создать нового сотрудника
				</v-btn>
				<v-dialog v-model="dialog" max-width="500px">
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container
								v-if="currentEmployeeItem"
								grid-list-md
							>
								<v-layout wrap>
									<v-flex xs12 sm6 md8>
										<v-text-field
											v-model="currentEmployeeItem.name"
											label="ФИО"
											hint="фамилия имя отчество через пробел"
											color="light-blue accent-3"
										></v-text-field>
									</v-flex>

									<v-flex xs12 sm6 md4>
										<v-select
											v-model="currentEmployeeItem.role"
											:items="[
												'MANAGER',
												'ADMIN',
												'COMMON',
											]"
											label="Роль*"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>

									<v-flex xs12 sm6 md12>
										<v-text-field
											v-model="currentEmployeeItem.login"
											label="Login"
											color="light-blue accent-3"
										></v-text-field>
									</v-flex>

									<v-flex xs12 sm6 md12>
										<v-text-field
											v-model="
												currentEmployeeItem.password
											"
											label="Password"
											type="password"
											color="light-blue accent-3"
										></v-text-field>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="light-blue accent-3"
								@click="onModalCloseClicked"
							>
								Отменить
							</v-btn>
							<v-btn
								color="green accent-2"
								@click="onModalSaveClicked"
							>
								Сохранить
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
			<v-data-table
				:headers="headers"
				:items="employees"
				item-key="name"
				class="elevation-1"
				:search="search"
			>
				<template v-slot:item.role="{ item }" dark>
					<v-chip :color="getColor(item.role)">
						{{ item.role }}
					</v-chip>
				</template>

				<template v-if="role === 'ADMIN'" v-slot:item.edit="{ item }">
					<v-icon color="green darken-1" @click="editEmployeeItem(item)">
						edit
					</v-icon>
				</template>

				<template v-if="role === 'ADMIN'" v-slot:item.delete="{ item }">
					<v-icon color="red" @click="deleteEmployeeItem(item)">
						delete
					</v-icon>
				</template>
			</v-data-table>
		</template>
	</div>
</template>

<script>
import {
	getAllEmployees,
	createEmployee,
	patchEmployeeById,
	deleteEmployeeById
} from '@/netClient/employeesService';

export default {
	name: 'EmployeesPage',
	data: () => ({
		role: 'ADMIN',
		dialog: false,
		expand: [],
		search: '',
		headers: [
			{
				name: 'name',
				text: 'Имя',
				align: 'left',
				value: 'name',
			},
			{ text: 'Должность сотрудника', value: 'role' },
			{ text: '', value: 'edit', sortable: false },
			{ text: '', value: 'delete', sortable: false },
		],
		employees: [],
		currentEmployeeItem: {
			id: '',
			name: '',
			role: '',
			login: '',
			password: '',
		},
		editedIndex: -1,
		editedItem: {
			name: '',
			role: 'COMMON',
			login: '',
			password: '',
		},
		defaultItem: {
			name: '',
			role: 'COMMON',
			login: '',
			password: '',
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Создать' : 'Редактировать';
		},
	},

	created() {
		this.refresh();
	},
	
	methods: {
		refresh() {
			this.fetchEmployeesList();
		},

		async fetchEmployeesList() {
			try {
				this.employees = await getAllEmployees();
			} catch (error) {
				console.error({ error });
			}
		},
		async submitCreateEmployee() {
			try {
				await createEmployee(
					this.currentEmployeeItem.name,
					this.currentEmployeeItem.role,
					this.currentEmployeeItem.login,
					this.currentEmployeeItem.password,
				);
			} catch (error) {
				console.error({ error });
			}
		},
		async submitEditEmployee() {
			try {
				await patchEmployeeById(
					this.currentEmployeeItem.id,
					this.currentEmployeeItem.name,
					this.currentEmployeeItem.role,
					this.currentEmployeeItem.login,
					this.currentEmployeeItem.password,
				);
			} catch (error) {
				console.error({ error });
			}
		},

		async deleteEmployee() {
			try {
				this.employee = await deleteEmployeeById(this.currentEmployeeItem.id);
				this.refresh()
			} catch (error) {
				console.error({ error });
			}
		},

		getColor(role) {
			if (role == 'ADMIN') return 'orange accent-4';
			else if (role == 'MANAGER') return 'cyan accent-1';
			else if (role == 'COMMON') return 'green accent-2';
		},
		startCreateEmployee() {
			this.dialog = true;
			this.currentEmployeeItem = {};
		},
		editEmployeeItem(item) {
			this.currentEmployeeItem = item;
			this.dialog = true;
		},

		deleteEmployeeItem(item) {
			this.currentEmployeeItem = item;
			this.deleteEmployee()
		},

		onModalCloseClicked() {
			this.dialog = false;
			this.currentEmployeeItem = null;
		},

		async onModalSaveClicked() {
			if (this.currentEmployeeItem?.id) {
				await this.submitEditEmployee();
			} else {
				await this.submitCreateEmployee();
			}

			this.refresh();
			this.dialog = false;
		},
	},
};
</script>
