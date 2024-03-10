<template>
  <q-page padding class="col text-center justify-center">
    <p class="text-body1">Thanks for registration!</p>
    <p class="text-body1">
      Please confirm your email to finish registering:
      <strong>{{ $route.query.email }}</strong>
    </p>
    <q-btn
      label="Back"
      color="dark"
      class="full-width"
      rounded
      flat
      :to="{ name: 'login' }"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
