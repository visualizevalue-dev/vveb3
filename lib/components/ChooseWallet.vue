<template>
  <div>
    <button
      :disabled="!ic.ready"
      @click="() => connectWallet(ic)"
      class="base"
    >
      <template v-if="ic.name === 'Coinbase Wallet'">
        <img src="/cbw.svg" :alt="ic.name" />
        {{ ic.name }}
      </template>
      <template v-else>
        <img src="/mm.svg" :alt="mm.name" />
        MetaMask
      </template>
      <small v-if="isConnecting && pendingConnector?.id === ic.id" class="tiny upper">connecting</small>
    </button>

    <button
      @click="() => connectWallet(wc)"
      class="base"
    >
      <img src="/wc.svg" alt="WalletConnect" />
      {{ wc.name }}
      {{ isConnecting && pendingConnector?.id === wc.id ? ' (connecting)' : '' }}
    </button>

    <aside v-if="error" class="small">
      {{ error.message }}
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { connect, InjectedConnector } from '@wagmi/core'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { useAccount } from './../utils/use-wagmi'

const { walletConnectProjectId, rpc } = defineProps({
  walletConnectProjectId: String,
  rpc: String,
})
const emit = defineEmits(['connected', 'closeContext'])

const { isConnecting, address } = useAccount()

const ic = new InjectedConnector()
const mm = new MetaMaskConnector()
const wc = new WalletConnectConnector({
  options: {
    projectId: walletConnectProjectId,
    qrcode: true,
    rpc: {
      1: rpc,
    },
  },
})

const pendingConnector = ref(null)
const error = ref(null)

const connectWallet = async (connector) => {
  pendingConnector.value = connector

  if (connector.id === 'walletConnect') {
    emit('closeContext')
  }

  await connect({
    connector,
  })

  emit('connected')
}
</script>

<style lang="postcss" scoped>
  div {
    display: flex;
    flex-direction: column;
    gap: var(--size-4);

    @media (--md) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  button {
    width: 100%;
    padding: var(--size-3);
    text-transform: uppercase;
    border: var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
    transition: all var(--speed);
    background: var(--gray-z-1);
    font-weight: var(--font-weight-bold);
    border: var(--border-dark);

    img {
      height: 4.5rem;
      margin-bottom: var(--size-4);
    }

    &:--highlight {
      background-color: var(--gray-z-3);
    }

    &[disabled]:not([disabled=false]) {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  aside {
    text-align: center;
    grid-column: 1 / -1;
    padding: var(--size-2) var(--size-3);
    border: var(--border);
    border-color: var(--red);
    background: var(--red);
  }
</style>
