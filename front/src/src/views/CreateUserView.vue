<template>
  <div class="create-user">
    <form @submit="create">
      <div class="field">
        <label class="label">ユーザー名</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-success': name.meta.valid, 'is-danger': errors.name}" type="text" placeholder="username" v-model="name.value.value">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i :class="{'fas fa-check': name.meta.valid, 'fas fa-exclamation-triangle': errors.name}"></i>
          </span>
        </div>
        <p class="help is-danger">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label class="label">メールアドレス</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-success': email.meta.valid, 'is-danger': errors.email}" type="email" placeholder="email" :value="email.value.value" @blur="email.handleChange">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i :class="{'fas fa-check': email.meta.valid, 'fas fa-exclamation-triangle': errors.email}"></i>
          </span>
        </div>
        <p class="help is-danger">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label class="label">パスワード</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-success': password.meta.valid, 'is-danger': errors.password}" type="password" placeholder="password" v-model="password.value.value">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span class="icon is-small is-right">
            <i :class="{'fas fa-check': password.meta.valid, 'fas fa-exclamation-triangle': errors.password}"></i>
          </span>
        </div>
        <p class="help is-danger">{{ errors.password }}</p>
      </div>
      <div class="control">
        <button class="button is-success mt-4" v-bind:disabled="!meta.valid" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
// import { computed } from 'vue'
import ApiService from '@/services/ApiService';
import { useField, useForm } from 'vee-validate';
import router from '@/router'
import * as yup from 'yup';

export default {
  setup() {
    const schema = yup.object({
      name: yup.string().required('必須です'),
      email: yup.string().required('必須です').email('メールアドレスが不正です'),
      password: yup.string()
        .required('必須です')
        .min(8, '8文字以上で入力してください')
        .max(24, '24文字以内で入力してください')
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]+$/, '英字と数字をそれぞれ1つ以上含めてください'),
    })

    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
    })

    const name = useField('name')
    const email = useField('email')
    const password = useField('password')

    const create = handleSubmit(async (values) => {
      if (values) {
        console.log(values);
        const res = await ApiService.register(values)
        console.log(res);
        router.push('/');
      }
    })

    return {
      create,
      name,
      email,
      password,
      errors,
      meta,
    }
  },
}
</script>

<style lang="scss" scoped>
  .create-user {
    width: 40%;
    margin: auto;
    min-width: 300px;

    label {
      text-align: left;
      font-size: 0.7rem;
      font-weight: normal;
    }

    .help {
      text-align: left;
    }
  }

</style>