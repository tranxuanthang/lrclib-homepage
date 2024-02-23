<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full flex items-center justify-center z-30 p-4">
      <div class="w-full h-[80vh] max-w-screen-sm rounded-lg bg-white flex flex-col gap-2">
        <div class="flex-none flex justify-between items-center px-6 py-2">
          <div class="text-thin text-xl">Donation</div>
          <button class="button button-blend transition rounded-full p-4" @click="close"><Close /></button>
        </div>

        <div class="px-6 grow flex flex-col gap-4 overflow-scroll">
          <div class="flex justify-center">
            <div class="rounded-full p-1 bg-indigo-100 flex justify-center gap-1">
              <button
                class="button text-xs w-36 px-3 py-1.5 rounded-full"
                :class="{
                  'bg-indigo-800 text-indigo-100': donationChoice === 'buymeacoffee',
                  'hover:bg-indigo-200': donationChoice !== 'buymeacoffee'
                  }"
                @click="donationChoice = 'buymeacoffee'"
              >Buy Me A Coffee</button>
              <button
                class="button text-xs w-36 px-3 py-1.5 rounded-full"
                :class="{
                  'bg-indigo-800 text-indigo-100': donationChoice === 'cryptocurrency',
                  'hover:bg-indigo-200': donationChoice !== 'cryptocurrency'
                  }"
                @click="donationChoice = 'cryptocurrency'"
              >Cryptocurrency</button>
            </div>
          </div>

          <div class="grow flex flex-col">
            <div v-if="donationChoice === 'buymeacoffee'" class="w-full flex flex-col items-center">
              <div class="text-center italic text-xs mb-4">Thank you for being here!
                LRCLIB is always free and nonprofit.
                However, maintaining and developing LRCLIB requires both time and financial resources.
                If you can, please consider a donation—every amount, no matter how small, is appreciated!</div>

              <div class="text-center font-thin text-2xl mb-4">Buy Me A Coffee</div>

              <a href="https://www.buymeacoffee.com/thangtran" class="mb-8" target="_blank">
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=thangtran&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                  width="235"
                  height="72"
                /></a>

              <div class="flex justify-center"><img src="@/assets/bmc.png" alt="BMC" class="w-[50%]" width="1032" height="1032"></div>
            </div>

            <div v-if="donationChoice === 'cryptocurrency'">
              <div class="text-center italic text-xs mb-4">Thank you for being here!
                LRCLIB is always free and nonprofit.
                However, maintaining and developing LRCLIB requires both time and financial resources.
                If you can, please consider a donation—every amount, no matter how small, is appreciated!</div>

              <div class="text-center font-thin text-2xl mb-4">Monero (XMR)</div>

              <div class="bg-indigo-900 rounded px-4 py-2 text-indigo-100 break-all mb-8">43ZN5qDdGQhPGthFnngD8rjCHYLsEFBcyJjDC1GPZzVxWSfT8R48QCLNGyy6Z9LvatF5j8kSgv23DgJpixJg8bnmMnKm3b7</div>

              <div class="text-center font-thin text-2xl mb-4">Litecoin (LTC)</div>

              <div class="bg-indigo-900 rounded px-4 py-2 text-indigo-100 break-all">ltc1q7texq5qsp59gclqlwf6asrqmhm98gruvz94a48</div>
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
import { Close } from 'mdue'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps(['isShow'])

const donationChoice = ref('buymeacoffee')

const close = () => {
  emit('close')
}
</script>
