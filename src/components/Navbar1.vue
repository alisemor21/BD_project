<template>
	<v-app-bar app v-if="$route.name !== 'loginPage'">
		<v-toolbar-items class="hidden-xs-only">
			<v-btn
				col4
				v-for="item in menuItems"
				:key="item.title"
				:to="item.path"
			>
				<v-icon left dark>{{ item.icon }}</v-icon>
				{{ item.title }}
			</v-btn>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			appTitle: 'Awesome App',
			sidebar: false,
			menuItems: [
				{ title: 'Аккаунт', path: '/', icon: 'account_circle' },
				{ title: 'Задания', path: '/tasks', icon: 'task_alt' },
				{
					title: 'Сотрудники',
					path: '/employees',
					icon: 'supervisor_account',
				},
				{
					title: 'Клиенты',
					path: '/clients',
					icon: 'settings_accessibility',
				},
				{ title: 'Отчёты', path: '/reports', icon: 'summarize' },
			],
		};
	},
};
</script>
<style></style>
