<template>
  <div class="bg-indigo-50 rounded overflow-hidden shadow-lg">
    <h2 class="text-xl bg-indigo-200 p-4"><slot name="title" /></h2>
    <div class="p-4">
      <div class="bg-indigo-200 rounded flex p-1 gap-1 mb-8">
        <div class="bg-indigo-700 rounded p-1 font-bold uppercase text-white"><slot name="method" /></div>
        <div class="p-1 grow"><slot name="route" /></div>
      </div>
      <div class="prose prose-indigo">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
