<template>
  <div class="create-post">
    <form @submit.prevent="create">
      <div class="field">
        <label class="label">タイトル<span class="has-text-danger">*</span><span class="ml-2 is-size-7">({{ remainingLetterNum.title }} / 50)</span></label>
        <div class="control">
          <input class="input" type="text" v-model="form.title">
        </div>
      </div>
      <div class="field">
        <label class="label">要約<span class="has-text-danger">*</span><span class="ml-2 is-size-7">({{ remainingLetterNum.description }} / 140)</span></label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="form.description"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" :disabled="!validations.title || !validations.description" type="submit">送信</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const form = reactive({
      title: '',
      description: '',
    })
    
    const remainingLetterNum = reactive({
      title: computed(() => {
        return 50 - form.title.length
      }),
      description: computed(() => {
        return 140 - form.description.length
      })
    })

    const validations = reactive({
      title: computed(() => {
        return form.title.length > 0 && form.title.length <= 30
      }),
      description: computed(() => {
        return form.description.length > 0 && form.description.length <= 140
      })
    })

    const create = () => {
      if (Object.values(validations).filter( v => v === false).length) {
        return
      }
      console.log('Create')
    }

    return {
      form,
      remainingLetterNum,
      validations,
      create
    }
  },
}
</script>

<style lang="scss" scoped>
  .create-post {
    label {
      text-align: left;
    }
  }
</style>