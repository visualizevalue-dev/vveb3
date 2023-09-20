<template>
  <NuxtLink v-if="to" :to="to" class="button" :exact="exact"><slot /></NuxtLink>
  <button v-else class="button"><slot /></button>
</template>

<script setup>
const { to, exact } = defineProps({
  to: String,
  exact: Boolean,
})
</script>

<style lang="postcss" scoped>
.button,
button {
  background: var(--gray-z-1);
  color: var(--gray-z-8);
  user-select: none;
  border: var(--border);
  padding: calc(var(--size-0)*1.5 + var(--size-1)) var(--size-4) calc(var(--size-0) + var(--size-1));
  color: var(--gray-z-8);
  transition: all var(--speed);
  outline: none;
  display: flex;
  align-items: center;
  gap: var(--size-3);

  &:--highlight,
  &.active {
    color: var(--color);
    background-color: var(--gray-z-2);
    outline: none;
    border-color: var(--gray-z-5);
  }

  &[disabled]:not([disabled=false]) {
    color: var(--gray-z-5);
  }

  &.link.router-link-exact-active,
  &.link.active {
    background: var(--gray-z-4);
  }

  :deep(.vue-feather) {
    width: var(--size-4);
  }
}
</style>

<style lang="postcss">
.button,
button {
  &:--highlight,
  &.active {
    outline: none;
  }

  &[disabled]:not([disabled=false]) {
    pointer-events: none;
    cursor: normal;
  }
}
</style>
