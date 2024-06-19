<template>
  <div class="min-h-screen py-6 px-2 mx-auto w-full max-w-screen-sm flex flex-col">
    <div class="text-sm mb-8">
      <router-link to="/" class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition flex items-center uppercase gap-2">
        <ArrowLeft />
        <span>Back to home</span>
      </router-link>
    </div>

    <form class="flex items-center rounded-full w-full h-auto overflow-hidden bg-white transition mb-16" :class="{ 'ring ring-indigo-400': inputActive }" @submit.prevent="onSubmit">
      <input type="text" v-model="keyword" class="outline-none grow h-12 px-6" placeholder="Search for lyrics..." @focus="inputActive = true" @blur="inputActive = false" autofocus>
      <button
        class="rounded-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 transition text-indigo-200 text-lg h-12 w-12 flex justify-center items-center m-1"
      >
        <Magnify />
      </button>
    </form>

    <h1 class="block font-thin text-2xl mb-16">Search for keyword: <strong class="">{{ currentKeyword }}</strong></h1>

    <div v-if="loading" class="grow text-5xl flex justify-center items-center animate-spin">
      <Loading />
    </div>

    <div v-else-if="error" class="grow text-5xl flex justify-center items-center animate-spin text-red-800">
      {{ error }}
    </div>

    <div v-else class="flex flex-col gap-4">
      <div v-for="record in records" :key="record.id" class="bg-indigo-50 hover:bg-white transition px-4 py-2 rounded flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <div class="font-bold">{{ record.trackName }}</div>
          <div class="text-xs font-bold flex gap-2">
            <span class="bg-indigo-200 text-indigo-900 px-1 py-0.5 rounded">{{ format(record.duration * 1000) }}</span>
            <span v-if="!!record.syncedLyrics" class="bg-green-800 text-green-200 px-1 py-0.5 rounded">Synced</span>
            <span v-else-if="!!record.plainLyrics" class="bg-gray-800 text-gray-200 px-1 py-0.5 rounded">Plain</span>
            <span v-else-if="!!record.instrumental" class="bg-gray-300 text-gray-600 px-1 py-0.5 rounded">Instrumental</span>
          </div>
          <div class="font-thin">{{ record.albumName }} - {{ record.artistName }}</div>
        </div>
        <div>
          <button class="rounded text-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 transition p-3 hover:text-indigo-100 active:text-indigo-100" type="button" @click="showingRecord = record"><Eye /></button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Preview v-if="!!showingRecord" :record="showingRecord" @close="showingRecord = null" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ky from 'ky'
import { ArrowLeft, Loading, Eye, Magnify } from 'mdue'
import format from 'format-duration'
import Preview from '../components/Preview.vue'

const router = useRouter()
const route = useRoute()

const keyword = ref(route.params.keyword)
const currentKeyword = ref(route.params.keyword)
const loading = ref(true)
const error = ref(null)
const records = ref([])
const showingRecord = ref(null)
const inputActive = ref(false)

const onSubmit = () => {
  if (keyword.value === '' || keyword.value === null) {
    return
  }

  router.push({ name: 'search', params: { keyword: keyword.value } })
}

const doSearch = async (q) => {
  loading.value = true
  keyword.value = q
  currentKeyword.value = q
  try {
    const response = await ky.get('https://lrclib.net/api/search', {
      searchParams: { q },
      headers: {
        'User-Agent': 'LRCLIB Web Client (https://github.com/tranxuanthang/lrclib)',
        'X-User-Agent': 'LRCLIB Web Client (https://github.com/tranxuanthang/lrclib)'
      }
    }).json()
    records.value = response
  } catch (error) {
    if (error.message) {
      error.value = error.message
    } else {
      error.value = 'Unknown error while searching for your lyrics'
    }
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  doSearch(route.params.keyword)
})

watch(
  () => route.params.keyword,
  newKeyword => {
    doSearch(newKeyword)
  }
)
</script>
