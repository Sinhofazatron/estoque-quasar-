<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h4 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Необходимо указать email',
          ]"
        />
        <q-input
          label="Password"
          v-model="form.password"
          type="password"
          :rules="[
            (val) => (val && val.length > 5) || 'Минимальное число символов 6',
          ]"
          lazy-rules
        />
        <div class="full-width q-pt-md">
          <q-btn
            class="full-width"
            type="submit"
            label="Login"
            color="primary"
            size="lg"
            outline
            rounded
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            class="full-width"
            type="submit"
            to="/register"
            label="Register"
            color="primary"
            size="sm"
            flat
          />
          <q-btn
            class="full-width"
            type="submit"
            :to="{ name: 'forgot-password' }"
            label="Forgot password?"
            color="primary"
            size="sm"
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({name: 'me'})
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "me" });
        notifySuccess("Вы успешно вошли в систему!");
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
