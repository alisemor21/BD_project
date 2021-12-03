<template>
	<div class="all">
		<template>
			<v-toolbar flat color="white">
				<v-toolbar-title>Все задания</v-toolbar-title>
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
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<template v-if="role === 'ADMIN' || role === 'MANAGER'">
							<v-btn
								color="light-blue accent-3"
								dark
								class="mb-2"
								v-on="on"
								@click="startCreateTask"
								>+ Создать новое задание</v-btn
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
									<v-flex xs12 sm6 md6>
										<v-text-field
											v-if="currentUser"
											v-model="editedItem.author"
											:disabled="true"
											label="Автор*"
											color="light-blue accent-3"
											required
										></v-text-field>
									</v-flex>

									<v-flex xs12 sm6 md6>
										<v-select
											v-model="editedItem.executor"
											:items="employees"
											item-text="name"
											item-value="id"
											label="Исполнитель*"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>

									<v-flex xs12 sm6 md6>
										<v-select
											v-model="editedItem.priority"
											:items="['LOW', 'MEDIUM', 'HIGH']"
											label="Приоритет выполнения*"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>

									<v-flex xs12 sm6 md6>
										<v-select
											v-model="editedItem.status"
											:items="[
												'ACTIVE',
												'INACTIVE',
												'READY',
											]"
											label="Статус*"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>

									<v-flex xs12 sm12 md12>
										<v-text-field
											v-model="editedItem.deadline"
											label="Дедлайн задания*"
											type="date"
											color="light-blue accent-3"
											required
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-select
											@change="onSelectChanged"
											v-model="editedItem.contactFaceId"
											:items="contactFaces"
											item-text="name"
											item-value="id"
											label="Контактное лицо *"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-select
											v-model="editedItem.contractId"
											:items="contracts"
											item-text="id"
											item-value="id"
											label="Контракты контактного лица"
											color="light-blue accent-3"
											required
										></v-select>
									</v-flex>

									<v-flex xs12 sm12 md12>
										<v-textarea
											v-model="editedItem.description"
											background-color="amber lighten-4"
											color="orange orange-darken-4"
											label="Описание задания"
											type="text"
											required
										></v-textarea>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="light-blue accent-3" @click="close"
								>Отменить</v-btn
							>
							<v-btn
								color="green accent-2"
								@click="submitCreateTask"
								>Сохранить</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>







			</v-toolbar>
			<v-data-table
				:headers="headers"
				:items="tasks"
				item-key="author"
				class="elevation-1"
				:search="search"
			>
				<template v-slot:item.status="{ item }" dark>
					<v-chip :color="getColorStatus(item.status)">
						{{ item.status }}
					</v-chip>
				</template>

				<template v-slot:item.priority="{ item }" dark>
					<v-chip :color="getColorPriority(item.priority)">
						{{ item.priority }}
					</v-chip>
				</template>

				<template v-slot:item.edit="{ item }">
					<v-icon 
                    color="blue" 
                    @click="editItem(item)">
						edit
					</v-icon>
				</template>

                <template v-slot:item.editDone="{ item }">
					<v-icon 
                    color="green darken-1" 
                    @click="editDone(item)">
						check_circle_outline
					</v-icon>
				</template>

                <template v-slot:item.editExecutor="{ item }">
					<v-icon 
                    color="orange" 
                    @click="editExecutor(item)"
                    v-on="onEditExecutor">
						manage_accounts
					</v-icon>

				</template>

				<template v-slot:item.delete="{ item }">
					<v-icon color="red" @click="deleteItem(item)">
						delete
					</v-icon>
				</template>
			</v-data-table>
		</template>
	</div>
</template>

<script>
import {
	getAllTasks,
    patchStatusTaskById,
    patchExecutorTaskById,
	// getTaskById,
	createTask,
	//patchTaskById,
	deleteTaskById,
} from '@/netClient/taskService';
import { fetchContactFaceList } from '@/netClient/clientService';
import { fetchClientContractList } from '@/netClient/contractService';
import { getAllEmployees, getMyInfo } from '@/netClient/employeesService';
export default {
	name: 'TaskPage',
	data: () => ({
		role: 'MANAGER',
		dialog: false,
        dialogEditExecutor: false,
		currentUser: [],
		employees: [],
		expand: [],
		search: '',
		headers: [
			{
				text: 'Автор задания',
				align: 'left',
				value: 'editedItem.author',
			},
			{ text: 'Исполнитель', value: 'employeeList[0].name' },
			{ text: 'Приоритет', value: 'priority' },
			{ text: 'Статус', value: 'status' },
			{ text: 'Описание', value: 'description' },
			{ text: 'Дедлайн', value: 'deadline' },
			{ text: 'Контактное лицо', value: 'contactFaceId' },
			{ text: 'Контракт', value: 'contractId' },
			{ text: '', value: 'edit', sortable: false },
			{ text: '', value: 'editDone', sortable: false },
            { text: '', value: 'editExecutor', sortable: false },
            { text: '', value: 'delete', sortable: false }
		],
		tasks: [],
		task: null,
		contactFaces: [],
		contracts: [],
		currentTask: [],
		editedIndex: -1,
		editedItem: {
			author: '',
			executor: '',
			priority: 'LOW',
			status: 'ACTIVE',
			description: '',
			deadline: null,
			clientId: '',
			contactFaceId: '',
			contractId: null,
		},
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Создать' : 'Редактировать';
		},
    /**
     * CHECK THIS
     */
    currentRole() {
      return localStorage.currentRole;
    }
	},
	created() {
		this.getCurrentUserInfo();
		this.fetchTaskList();
	},
	methods: {
		onSelectChanged(contactFaceId) {
			const { clientId } = 	this.contactFaces.find(({ id }) => id === contactFaceId) ?? {};
			this.fetchClientContractList(clientId);
		},
		async fetchTaskList(){
			try {
				this.tasks = await getAllTasks()
				console.log("Tasks: ", this.tasks)
			} catch (error) {
				console.error({ error });
			}
		},
		async fetchEmployeesList() {
			try {
				const allEmployees = await getAllEmployees();
				this.employees = allEmployees.filter(
					({ id, role }) => id !== this.currentUser.id && role !== "ADMIN",
				);
			} catch (error) {
				console.error({ error });
			}
		},
		async getCurrentUserInfo() {
			try {
				this.currentUser = await getMyInfo();
				this.editedItem.author = this.currentUser.name;
			} catch (error) {
				console.error({ error });
			}
		},
		async fetchContactFaceList() {
			try {
				this.contactFaces = await fetchContactFaceList();
			} catch (error) {
				console.error({ error });
			}
		},
		async fetchClientContractList(clientId) {
			try {
				this.contracts = await fetchClientContractList(clientId);
			} catch (error) {
				console.error({ error });
			}
		},
		startCreateTask() {
			this.fetchEmployeesList();
			this.fetchContactFaceList();
		},
		async submitCreateTask() {
			try {
				await createTask(
					this.currentUser.id,
					this.editedItem.executor,
					this.editedItem.priority,
					this.editedItem.status,
					this.editedItem.description,
					this.editedItem.deadline,
					this.editedItem.contactFaceId,
					this.editedItem.contractId,
				);
			} catch (error) {
				console.error({ error });
			}
            this.dialog = false;
		},
		getColorStatus(status) {
			if (status == 'READY') return 'light-green lighten-2';
			else if (status == 'INACTIVE') return 'green lighten-5';
			else if (status == 'ACTIVE') return 'green';
		},
		getColorPriority(priority) {
			if (priority == 'HIGH') return 'orange accent-4';
			else if (priority == 'MEDIUM') return 'cyan accent-1';
			else if (priority == 'LOW') return 'green accent-2';
		},
		editItem(item) {
			this.editedIndex = this.tasks.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		async deleteItem(item) {
			// const index = this.tasks.indexOf(item);
			// confirm("Are you sure you want to delete this item?") &&
			//   this.tasks.splice(index, 1)

			this.currentTask = item;
			confirm('Are you sure you want to delete this item?');
			console.log("item", item.id)
			try {
				this.task = await deleteTaskById(this.currentTask.id);
				this.refresh();
			} catch (error) {
				console.error({ error });
			}
		},
		close() {
			this.dialog = false;
		},

        async editDone(item){
            this.dialog = true;
            this.currentTask = item;
            try {
				this.task = await patchStatusTaskById(this.currentTask.id);
				this.refresh();
			} catch (error) {
				console.error({ error });
			}
            this.dialog = false;
        },

        async submitDone(){},

        async editExecutor(item){
            this.dialog = true;
            this.currentTask = item;
            try {
				this.task = await patchExecutorTaskById(this.currentTask.id, this.currentTask.executorId);
				this.refresh();
			} catch (error) {
				console.error({ error });
			}
            this.dialog = false;
        }
	},
};
</script>
