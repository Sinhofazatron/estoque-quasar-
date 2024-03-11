<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form Category</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input
          label="Name"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 2) || 'Минимум 3 символа']"
        />
        <q-btn
          :label="isUpdate ? 'Update' : 'Save'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="Back"
          color="primary"
          class="full-width"
          rounded
          flat
          type="submit"
          :to="{ name: 'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageFormCategory",

  setup() {
    const table = "category";
    const route = useRoute();
    const router = useRouter();
    const { post, getById, update } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    let categories = {};
    const isUpdate = computed(() => route.params.id);
    const form = ref({
      name: "",
    });

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value);
      }
    });

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value);
          notifySuccess("Успешно обновлено!");
        } else {
          await post(table, form.value);
          notifySuccess("Успешно сохранено!");
        }

        router.push({ name: "category" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetCategory = async (id) => {
      try {
        categories = await getById(table, id);
        form.value = categories;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleSubmit,
      isUpdate
    };
  },
});
</script>
