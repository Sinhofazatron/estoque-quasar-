<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h4 text-center">Reset password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="New password" v-model="password" />

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
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {useRouter, useRoute} from 'vue-router'
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const { resetPassword } = useAuthUser();
    const router = useRouter()
    const route = useRoute()
    const token = route.query.token
    const password = ref("");

    const handlePasswordReset = async () => {
      await resetPassword(token, password.value);
      router.push({name: 'login'})
    };

    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
