<template>
  <div class="min-h-screen py-6 px-2 flex justify-center items-center">
    <main class="w-full max-w-screen-sm">
      <div class="flex flex-col justify-center items-center gap-6 w-full">
        <img src="@/assets/lrclib.png" width="512" height="512" class="w-28" alt="Logo">
        <form class="flex items-center rounded-full w-full h-auto overflow-hidden bg-white transition" :class="{ 'ring ring-indigo-400': inputActive }" @submit.prevent="onSubmit">
          <input type="text" v-model="keyword" class="outline-none grow h-12 px-6" placeholder="Search for lyrics..." @focus="inputActive = true" @blur="inputActive = false" autofocus>
          <button
            class="rounded-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 transition text-indigo-200 text-lg h-12 w-12 flex justify-center items-center m-1"
          >
            <Magnify />
          </button>
        </form>
        <div class="text-xs text-indigo-400 uppercase flex flex-col md:flex-row gap-4 text-center">
          <a class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition" href="https://github.com/tranxuanthang/lrcget" target="_blank">Download LRCGET</a>
          <router-link class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition" to="/docs">API Documentation</router-link>
          <a class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition" href="#" @click.prevent="isShowDonation = true">Donation</a>
        </div>
      </div>
    </main>
  </div>

  <Teleport to="body">
    <Donation v-if="isShowDonation" @close="isShowDonation = false" />
  </Teleport>
</template>

<script setup>
import { Magnify } from 'mdue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Donation from '../components/Donation.vue'

const router = useRouter()

const isShowDonation = ref(false)
const inputActive = ref(false)
const keyword = ref('')

const onSubmit = () => {
  if (keyword.value === '' || keyword.value === null) {
    return
  }

  router.push({ name: 'search', params: { keyword: keyword.value } })
}
</script>
