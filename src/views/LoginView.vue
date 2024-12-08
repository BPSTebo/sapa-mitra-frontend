<template>
  <div class="container">
    <div class="form-container">
      <div style="display: flex; align-items: center; gap: 10px">
        <el-image src="logo-bps-tebo.png" fit="cover" />
      </div>
      <el-text
        style="font-size: 14pt; align-self: first baseline; font-weight: 500"
        >Selamat Datang di
        <el-text
          type="primary"
          style="font-size: 14pt; align-self: first baseline; font-weight: 500"
          >{{ app }}</el-text
        ></el-text
      >

      <el-form
        @submit.prevent
        style="margin-top: 15px"
        :rules="rules"
        ref="formRef"
        v-loading="loading"
        :model="form"
        label-width="auto"
        label-position="top"
      >
        <el-form-item label="Email" required prop="email">
          <el-input
            @keyup.enter="login(formRef)"
            size="large"
            v-model="form.email"
            type="email"
            placeholder="Masukkan Email"
          />
        </el-form-item>
        <el-form-item label="Password" required prop="password">
          <el-input
            @keyup.enter="login(formRef)"
            size="large"
            v-model="form.password"
            type="password"
            placeholder="Masukkan Password"
          />
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="login(formRef)"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <div v-if="enableSso">
        <div style="display: flex; align-items: center">
          <el-divider style="margin-right: 10px"></el-divider>
          <span style="margin: 0 10px">OR</span>
          <el-divider style="margin-left: 10px"></el-divider>
        </div>
        <el-button
          size="large"
          style="margin-top: 18px; width: 100%"
          @click="loginSso"
        >
          <IconBPS style="width: 1.9em; height: 1.9em; margin-right: 10px" />
          Login with SSO BPS
        </el-button>
      </div>
    </div>
    <div class="image-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { ElNotification } from "element-plus";
import { BASE_URL } from "@/api/api";
import { useRoute } from "vue-router";

const app = import.meta.env.VITE_APP_TITLE;

const initialState = {
  email: "",
  password: "",
};

const enableSso = ref(true);

const rules = reactive<FormRules<any>>({
  email: [
    {
      required: true,
      message: "Email perlu terisi",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Password perlu terisi",
      trigger: "blur",
    },
  ],
});

const formRef = ref<FormInstance>();
const form = reactive({ ...initialState });
const route = useRoute();
const auth = useAuthStore();
const loading = ref(false);
const error = ref("");
const feedback = ref({
  title: "",
  message: "",
  type: "",
});

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    loading.value = true;
    error.value = "";

    if (!valid) {
      loading.value = false;
      return;
    }

    try {
      const { data, message } = await auth.login(form);
      feedback.value = {
        title: "Success",
        message: message,
        type: "success",
      };
    } catch (e) {
      if (e instanceof Error) {
        feedback.value = {
          title: "Error",
          message: e.message,
          type: "error",
        };
      }
    } finally {
      loading.value = false;
    }
  });
};

const loginSso = async () => {
  window.location.href = `${BASE_URL}/v1/auth/sso`;
};

const handleError = (error: any) => {
  let message = "";
  if (error == "user_not_found") {
    message = "User tidak ditemukan";
  } else {
    message = "Terjadi kesalahan, silahkan coba lagi";
  }

  feedback.value = {
    title: "Error",
    message: message,
    type: "error",
  };
};

watch(
  () => route.query.token,
  async (token) => {
    if (token) {
      try {
        await auth.loginSso(token);
        feedback.value = {
          title: "Success",
          message: "Successfully logged in",
          type: "success",
        };
      } catch (e) {
        if (e instanceof Error) {
          feedback.value = {
            title: "Error",
            message: "Something went wrong, please try again",
            type: "error",
          };
        }
      }
    }
  },
  { immediate: true }
);

watch(
  () => route.query.error,
  async (error) => {
    if (error) handleError(error);
  },
  { immediate: true }
);

watch(
  () => feedback.value,
  (feedback: any) => {
    if (feedback.message != "") {
      ElNotification({
        title: feedback.title,
        message: feedback.message,
        type: feedback.type,
      });
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  width: 20%;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-container {
  width: 80%;
  background: url("/background-login.png") no-repeat center center;
  background-size: cover;
  height: 100vh;
}
</style>
