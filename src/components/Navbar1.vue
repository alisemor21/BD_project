<template>
	<v-app-bar app v-if="$route.name !== 'loginPage'">
		<v-toolbar-items class="hidden-xs-only">
			<v-btn
				col4
				v-for="item in menuItems"
				:key="item.title"
				:to="item.path"
        :color="item.backgroundcolor"
        :exact-active-class="item.color" 
			>
				<v-icon left dark >{{ item.icon }}</v-icon>
				{{ item.title }}
			</v-btn>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
export default {
	name: 'Navbar1',
	data() {
		return {
			sidebar: false,
			menuItems: [
				{ title: 'Аккаунт', path: '/', icon: 'account_circle',backgroundcolor:'amber lighten-3'},
				{ title: 'Задания', path: '/tasks', icon: 'task_alt',backgroundcolor:'amber lighten-3'},
				{ title: 'Сотрудники', path: '/employees',icon: 'supervisor_account', backgroundcolor:'amber lighten-3'},
				{ title: 'Клиенты', path: '/clients', icon: 'settings_accessibility', backgroundcolor:'amber lighten-3'},
				{ title: 'Отчёты', path: '/reports', icon: 'summarize',backgroundcolor:'amber lighten-3'},
				{ title: "Контракты", path: "/contracts", icon: "description",backgroundcolor:'amber lighten-3' },

			],
		};
	},
};
</script>
<style></style>
