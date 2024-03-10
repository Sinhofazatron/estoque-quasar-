<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h4 text-center">Registration</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Необходимо указать Имя',
          ]"
        />
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
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Минимальное число символов 6',
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            type="submit"
            label="Register"
            color="primary"
            size="lg"
            outline
            rounded
          />
          <q-btn
            :to="{ name: 'login' }"
            class="full-width"
            type="submit"
            label="Back"
            color="dark"
            size="lg"
            flat
            rounded
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });

        notifySuccess("Вы успешно зарегистрировались!");
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
