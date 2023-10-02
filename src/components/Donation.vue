<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full flex items-center justify-center z-30">
      <div class="w-full h-[80vh] max-w-screen-sm rounded-lg m-4 bg-white flex flex-col gap-2">
        <div class="flex-none flex justify-between items-center px-6 py-2">
          <div class="text-thin text-xl">Donation</div>
          <button class="button button-blend transition rounded-full p-4" @click="close"><Close /></button>
        </div>

        <div class="px-6 grow flex flex-col justify-center gap-4 overflow-hidden">
          <div class="text-center font-thin text-2xl mb-4">Monero (XMR)</div>
          <div class="bg-indigo-900 rounded px-4 py-2 text-indigo-100 break-all">43ZN5qDdGQhPGthFnngD8rjCHYLsEFBcyJjDC1GPZzVxWSfT8R48QCLNGyy6Z9LvatF5j8kSgv23DgJpixJg8bnmMnKm3b7</div>
          <div class="flex justify-center"><img src="@/assets/xmr.png" alt="XMR" class="w-[60%]" width="1032" height="1032"></div>
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
import { Close } from 'mdue'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps(['isShow'])

const close = () => {
  emit('close')
}
</script>
