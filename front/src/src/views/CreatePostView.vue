<template>
  <div class="create-post">
    <form @submit="create">
      <div class="field">
        <label class="label">タイトル</label>
        <div class="control">
          <input class="input" type="text" v-model="form.title">
        </div>
      </div>
      <div class="field">
        <label class="label">要約<span class="ml-2">({{ remainingLetterNum }} / 140)</span></label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="form.description"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" type="submit">送信</button>
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
    const remainingLetterNum = computed(() => {
      return 140 - form.description.length
    })

    return {
      form,
      remainingLetterNum,
    }
  },
}
</script>

<style lang="scss" scoped>
  .create-post {
    label {
      text-align: left;
      span {
        font-size: 0.8rem;
      }
    }
  }
</style>