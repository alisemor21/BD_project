<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3 class="text-xs-center" mt-5>
        <h1>Аккаунт</h1>
      </v-flex>
      <v-flex sm6 offset-sm3 xs6 offset-xs3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="login"
                label="Login"
                id="login"
                type="login"
                color="light-blue accent-3"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                color="light-blue accent-3"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <div class="enterBtn">
                <v-btn
                  @click="onLoginClicked"
                  color="light-blue accent-3"
                  type="submit"
                  >Войти</v-btn
                >
              </div>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
  data:() =>({
      login:'',
      password:'',
  }),
  components: {},
  async mounted(){},
  methods: {
    onLoginClicked() {
      this.$router.push("/");
    },
  },
};
</script>
