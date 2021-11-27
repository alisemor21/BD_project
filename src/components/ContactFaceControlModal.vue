<template>
	<v-dialog v-model="dialogContactFaces" max-width="500px">
		<v-card>
			<v-card-title>
				<span class="headline">{{ formTitleContactFaces }}</span>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex xs12 sm12 md12>
							<v-text-field
								v-model="editedContactFace.name"
								label="ФИО"
								hint="фамилия имя отчество через пробел"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm4 md4>
							<v-text-field
								v-model="editedContactFace.phone"
								label="Телефон"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12 sm8 md8>
							<v-text-field
								v-model="editedContactFace.email"
								label="Email"
								color="light-blue accent-3"
							></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="light-blue accent-3" @click="closeContactFaceModal"
					>Отменить контакт</v-btn
				>
				<v-btn color="green accent-2" @click="saveContactFaceModal"
					>Сохранить контакт</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'ContactFaceControlModal',
	props: ['currentContactFace'],
	data: () => ({
		dialogContactFaces: false,
		expanded: [],

		editedContactFaceIndex: -1,
		editedContactFace: {
			name: '',
			email: '',
			phone: '',
		},

		defaultContactFace: {
			name: '',
			email: '',
			phone: '',
		},
	}),

	computed: {
		formTitleContactFaces() {
			return this.modalModeContactFace === -1
				? 'Новый контакт'
				: 'Редактирование контакта';
		},
	},

	watch: {
		dialogContactFaces(val) {
			console.log('DialogContactFaces.val =', val);
			val || this.closeContactFaceModal();
		},
	},

	methods: {

        openContactFaceModal(contactFace) {
			if (contactFace) {
				this.editedContactFace = contactFace;
			}
			this.modalModeContactFace = contactFace ? 'edit' : 'create';
			this.dialogContactFaces = true;
		},
		closeContactFaceModal() {
			this.$emit('done', null);
			this.dialogContactFaces = false;
		},

		saveContactFaceModal() {
			const contactFace = this.modalModeContactFace === 'create'
				? {
					...this.editedContactFace,
					id: Date.now().toString(),
					// contactFaces: [],
					}
				: this.editedContactFace;
			this.$emit('doneContactFace', contactFace);
			this.closeContactFaceModal();
		},




















		// saveContactFace() {
		// 	if (this.editedContactFaceIndex > -1) {
		// 		Object.assign(
		// 			this.clients[this.editedContactFaceIndex],
		// 			this.editedContactFace,
		// 		);
		// 	} else {
		// 		this.contactFaces.push(this.editedContactFace);
		// 	}
		// 	this.close();
		// 	this.dialogContactFaces = false;
		// },

		// closeContactFace() {
		// 	this.dialogContactFaces = false;
		// 	setTimeout(() => {
		// 		this.editedContactFace = Object.assign({}, this.defaultContactFace);
		// 		this.editedContactFaceIndex = -1;
		// 	}, 300);
		// },

		// editContactFaces(item) {
		//   console.log("editedContactFaces", item);
		//   this.editedContactFaceIndex = this.clients.indexOf(item);
		//   this.editedContactFace = Object.assign({}, item);
		//   this.dialogContactFaces = true;

		// },
	},
};
</script>
