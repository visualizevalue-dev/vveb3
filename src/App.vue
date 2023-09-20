<script setup lang="ts">
import { ref } from 'vue'
import { Connect, Button, Modal } from 'vveb3'

const open = ref(false)

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const rpc = import.meta.env.VITE_RPC
</script>

<template>
  <div>
    <Button @click="open = true">
      <Icon type="feather" />
      <span>Open Modal</span>
    </Button>
    <Connect :wallet-connect-project-id="projectId" :rpc="rpc" />

    <Modal :open="open" title="Test Modal" @close="open = false">
      <p>Lorem Ipsum...</p>
    </Modal>
  </div>
</template>

<style scoped>
  div {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
