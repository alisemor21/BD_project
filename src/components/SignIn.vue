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
                color="rgb(109, 152, 134)"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                color="rgb(109, 152, 134)"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <div class="enterBtn">
                <v-btn color="rgb(109, 152, 134)" type="submit">Войти</v-btn>
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
  components: {

  },
  mounted() {
    const enterBtn = document.querySelector(".enterBtn");
    enterBtn.addEventListener("click", ($event) => {
      console.warn($event);
      this.$router.push("/");
    });
  },
};
</script>
