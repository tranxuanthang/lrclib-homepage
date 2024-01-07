<template>
  <div class="min-h-screen py-6 px-2 mx-auto w-full max-w-screen-sm">
    <div class="text-sm mb-8">
      <router-link to="/" class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition flex items-center uppercase gap-2">
        <ArrowLeft />
        <span>Back to home</span>
      </router-link>
    </div>

    <h1 class="block font-thin text-2xl mb-16">Database Dumps</h1>

    <div class="mb-16">
      <div v-if="isLoading" class="grow text-5xl flex justify-center items-center animate-spin py-16">
        <Loading />
      </div>

      <div v-else class="flex flex-col gap-4">
        <div
          v-for="dump in dumps"
          :key="dump.key"
          class="bg-indigo-50 hover:bg-white transition px-4 py-2 rounded flex justify-between items-center"
        >
          <div class="flex flex-col gap-2">
            <div class="flex-grow truncate">
              <a
                :href="`https://db-dumps.lrclib.net/${dump.key}`"
                class="font-bold text-sm truncate"
                target="_blank"
              >{{ dump.key }}</a>
            </div>

            <div class="flex gap-1 items-center">
              <div class="text-xs whitespace-nowrap">{{ humanFileSize(dump.size) }}</div>
              <div class="text-xs text-indigo-300">|</div>
              <div class="text-xs whitespace-nowrap">{{ dayjs(dump.uploaded).fromNow() }}</div>
            </div>
          </div>

          <div class="flex items-center">
            <a
              class="rounded text-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 transition p-3 hover:text-indigo-100 active:text-indigo-100"
              :href="`https://db-dumps.lrclib.net/${dump.key}`"
              target="_blank"
            ><Download /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ky from 'ky'
import { ref, onMounted } from 'vue'
import { ArrowLeft, Loading, Download, CircleSmall } from 'mdue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const dumps = ref(null)
const isLoading = ref(true)

function humanFileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

const retrieveList = async () => {
  isLoading.value = true
  try {
    const response = await ky.get('https://lrclib-db-dumps.bu3nnyut4y9jfkdg.workers.dev').json()
    dumps.value = response.objects.reverse()
  } catch (error) {
    dumps.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  retrieveList()
})
</script>
