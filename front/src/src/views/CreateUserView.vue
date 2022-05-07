<template>
  <div class="create-user">
    <form @submit="create">
      <div class="field">
        <label class="label">ユーザー名</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-success': name.meta.valid && !apiErrors.name, 'is-danger': errors.name || apiErrors.name}" type="text" placeholder="username" v-model="name.value.value">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i :class="{'fas fa-check': name.meta.valid && !apiErrors.name, 'fas fa-exclamation-triangle': errors.name || apiErrors.name}"></i>
          </span>
        </div>
        <p class="help is-danger">{{ errors.name }}</p>
        <p class="help is-danger">{{ apiErrors.name }}</p>
      </div>

      <div class="field">
        <label class="label">メールアドレス</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-success': email.meta.valid && !apiErrors.email, 'is-danger': errors.email || apiErrors.email}" type="email" placeholder="email" :value="email.value.value" @blur="email.handleChange">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i :class="{'fas fa-check': email.meta.valid && !apiErrors.email, 'fas fa-exclamation-triangle': errors.email || apiErrors.email}"></i>
          </span>
        </div>
        <p class="help is-danger">{{ errors.email }}</p>
        <p class="help is-danger">{{ apiErrors.email }}</p>
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
import ApiService from '@/services/ApiService';
import { useField, useForm } from 'vee-validate';
import router from '@/router'
import * as yup from 'yup';
import { reactive } from '@vue/reactivity';

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
    const apiErrors = reactive({})
    
    const create = handleSubmit(async (values) => {
      if (values) {
        try {
          apiErrors['name'] = ''
          apiErrors['email'] = ''
          await ApiService.register(values)
          router.push('/');
        } catch (error) {
          const res = error.response
          if (res) {
            if (res.data.errors.name) {
              apiErrors['name'] = res.data.errors.name[0]
            }
            if (res.data.errors.email) {
              apiErrors['email'] = res.data.errors.email[0]
            }
          }
          console.log(error);
          
        }
      }
    })

    return {
      create,
      name,
      email,
      password,
      errors,
      apiErrors,
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