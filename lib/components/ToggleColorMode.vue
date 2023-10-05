<template>
  <button @click="() => toggleDark()">
    <Icon v-if="mode === 'dark'" type="sun" :size="20" />
    <Icon v-else type="moon" :size="20" />
  </button>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleDark = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>
