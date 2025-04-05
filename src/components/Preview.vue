<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full flex items-center justify-center z-30 p-4">
      <div class="w-full h-[80vh] max-w-screen-sm rounded-lg bg-white flex flex-col gap-2">
        <div class="flex-none flex justify-between items-center px-6 py-2">
          <div class="text-thin text-xl">Preview</div>
          <button class="button button-blend transition rounded-full p-4" @click="close"><Close /></button>
        </div>

        <div class="px-6 grow flex flex-col justify-between gap-4 overflow-hidden">
          <div v-if="props.record.syncedLyrics && props.record.plainLyrics" class="flex justify-center">
            <div class="rounded-full p-1 bg-indigo-100 flex justify-center gap-1">
              <button class="button text-xs w-36 px-3 py-1.5 rounded-full"
                      :class="{ 'bg-indigo-800 text-indigo-100': lyricsType === 'synced', 'hover:bg-indigo-200': lyricsType !== 'synced' }"
                      @click="lyricsType = 'synced'">Synced Lyrics
              </button>
              <button class="button text-xs w-36 px-3 py-1.5 rounded-full"
                      :class="{ 'bg-indigo-800 text-indigo-100': lyricsType !== 'synced', 'hover:bg-indigo-200': lyricsType === 'synced' }"
                      @click="lyricsType = 'plain'">Plain Lyrics
              </button>
            </div>
          </div>

          <div class="relative grow flex flex-col justify-between overflow-hidden">
            <button v-if="props.record.syncedLyrics || props.record.plainLyrics"
                    class="absolute bottom-4 right-8 p-4 rounded-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-950 transition text-indigo-200"
                    @click="copyToClipboard">
              <ContentCopy/>
            </button>
            <div v-if="lyricsType === 'synced'" class="grow rounded bg-indigo-50 text-indigo-900 whitespace-pre-line p-4 overflow-auto">
              {{ props.record.syncedLyrics }}
            </div>

            <div v-else-if="lyricsType === 'plain'" class="grow rounded bg-indigo-50 text-indigo-900 whitespace-pre-line p-4 overflow-auto">
              {{ props.record.plainLyrics }}
            </div>

            <div v-else-if="lyricsType === 'instrumental'" class="grow rounded bg-indigo-50 text-indigo-900 whitespace-pre-line p-4 overflow-auto italic flex items-center justify-center">
              This track is instrumental
            </div>

            <div v-else class="grow rounded bg-indigo-50 text-indigo-900 whitespace-pre-line p-4 overflow-auto italic flex items-center justify-center">
              There are currently no lyrics submitted for this track
            </div>
          </div>
        </div>

        <div class="px-6 py-4 flex-none flex justify-center">
          <button class="button button-normal px-8 py-2 rounded-full" @click="close">Close</button>
        </div>
      </div>
    </div>

    <div class="fixed top-0 left-0 h-full w-full z-20 bg-black/30">
    </div>
  </div>
</template>

<script setup>
import { Close, ContentCopy } from 'mdue'
import { ref } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps(['record'])

const getInitialLyricsType = () => {
  if (props.record.syncedLyrics) return 'synced'
  else if (props.record.plainLyrics) return 'plain'
  else if (props.record.instrumental) return 'instrumental'
  else return undefined
}

const lyricsType = ref(getInitialLyricsType())

const close = () => {
  emit('close')
}

const copyToClipboard = () => {
  if (lyricsType.value === 'synced') {
    navigator.clipboard.writeText(props.record.syncedLyrics);
  } else if (lyricsType.value === 'plain') {
    navigator.clipboard.writeText(props.record.plainLyrics);
  }
}
</script>
