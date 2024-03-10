<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h4 text-center">Reset password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="email" />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            class="full-width"
            type="submit"
            label="Reset password"
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
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageForgotPassword",

  setup() {
    const { sendPasswordRestEmail } = useAuthUser();
    const email = ref("");

    const handleForgotPassword = async () => {
      await sendPasswordRestEmail(email.value);
      alert(`Пароль был отправлен на ${email.value}`);
    };

    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
