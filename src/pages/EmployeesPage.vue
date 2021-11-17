<template>
	<div class="all">
		<template>
			<div>
				<v-toolbar color="white">
					<v-toolbar-title>My CRUD</v-toolbar-title>
					<v-divider class="mx-2" inset vertical></v-divider>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on }">
							<v-btn color="primary" dark class="mb-2" v-on="on"
								>New Item</v-btn
							>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container grid-list-md>
									<v-layout wrap>
										<v-flex xs12 sm6 md4>
											<v-text-field
												v-model="editedItem.name"
												label="Dessert name"
											></v-text-field>
										</v-flex>
										<v-flex xs12 sm6 md4>
											<v-text-field
												v-model="editedItem.calories"
												label="Calories"
											></v-text-field>
										</v-flex>
										<v-flex xs12 sm6 md4>
											<v-text-field
												v-model="editedItem.fat"
												label="Fat (g)"
											></v-text-field>
										</v-flex>
										<v-flex xs12 sm6 md4>
											<v-text-field
												v-model="editedItem.carbs"
												label="Carbs (g)"
											></v-text-field>
										</v-flex>
										<v-flex xs12 sm6 md4>
											<v-text-field
												v-model="editedItem.protein"
												label="Protein (g)"
											></v-text-field>
										</v-flex>
									</v-layout>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" @click="close"
									>Cancel</v-btn
								>
								<v-btn color="blue darken-1" @click="save"
									>Save</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
				<v-data-table
					:headers="headers"
					:items="desserts"
					item-key="name"
					class="elevation-1"
				>
					<template v-slot:items="{ item, index }">
            {{index}}
						<td>{{ item.name }}</td>
						<td class="text-xs-right">{{item.calories }}</td>
						<td class="text-xs-right">{{ item.fat }}</td>
						<td class="text-xs-right">{{ item.carbs }}</td>
						<td class="text-xs-right">{{ item.protein }}</td>
						<td class="justify-center">
							<v-icon
								small
								class="mr-2"
								@click="editItem(item)"
							>
								edit
							</v-icon>
							<v-icon small @click="deleteItem(item)">
								delete
							</v-icon>
						</td>
					</template>
				</v-data-table>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'EmployeesPage',
	data: () => ({
		dialog: false,
		expand: [],
		headers: [
			{
				text: 'Dessert (100g serving)',
				align: 'left',
				sortable: false,
				value: 'name',
			},
			{ text: 'Calories', value: 'calories' },
			{ text: 'Fat (g)', value: 'fat' },
			{ text: 'Carbs (g)', value: 'carbs' },
			{ text: 'Protein (g)', value: 'protein' },
			{ text: 'Actions', value: 'actions', sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
		defaultItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Создать' : 'Редактировать';
		},
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
	},

  created() {
    this.desserts = [this.defaultItem]
  },

	methods: {
		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			const index = this.desserts.indexOf(item);
			confirm('Are you sure you want to delete this item?') &&
				this.desserts.splice(index, 1);
		},

		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
