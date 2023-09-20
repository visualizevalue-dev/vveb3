import { computed, reactive, ref, toRefs, watch } from 'vue'
import {
  Connector,
  FetchEnsNameResult,
  GetNetworkResult,
  fetchEnsAvatar,
  fetchEnsName,
  mainnet,
  watchAccount,
  watchNetwork,
} from '@wagmi/core'
import { getBlockExplorer, getChainName } from './chain'
import { GetEnsAvatarReturnType } from 'viem/ens';

const account = reactive<{
  address: `0x${string}` | undefined,
  connector: Connector<any,any> | undefined,
  isConnected: boolean,
  isConnecting: boolean,
  isDisconnected: boolean,
  isReconnecting: boolean,
  status: 'connected' | 'reconnecting' | 'connecting' | 'disconnected' | undefined,
  network: GetNetworkResult | undefined,
}>({
  address: undefined,
  connector: undefined,
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isReconnecting: false,
  status: undefined,
  network: undefined,
})

// WATCHERS
let unwatchAccount;
let unwatchNetwork;

const chain = computed(() => account.network?.chain || mainnet)
const chainId = computed<number>(() => chain.value?.id)
const blockExplorer = computed(() => getBlockExplorer(chainId.value))
const networkName = computed(() => getChainName(chainId.value) || chain.value?.name || 'Unknown Chain')

export const useAccount = () => {
  if (! unwatchAccount) {
    unwatchAccount = watchAccount(updatedAccount => {
      account.address = updatedAccount.address
      account.connector = updatedAccount.connector
      account.isConnected = updatedAccount.isConnected
      account.isConnecting = updatedAccount.isConnecting
      account.isDisconnected = updatedAccount.isDisconnected
      account.isReconnecting = updatedAccount.isReconnecting
      account.status = updatedAccount.status
    })
  }

  if (! unwatchNetwork) {
    unwatchNetwork = watchNetwork(network => {
      account.network = network
    })
  }

  return {
    ...toRefs(account),
    networkName,
    blockExplorer,
  }
}

export const useEnsName = (address) => {
  const name = ref<FetchEnsNameResult>('')

  const update = async () => {
    if (! address.value) return
    name.value = await fetchEnsName({ address: address.value })
  }

  if (address.value) update()
  watch([address, chainId], () => update())

  return name
}

export const useEnsAvatar = (name) => {
  const avatar = ref<GetEnsAvatarReturnType>('')

  const update = async () => {
    if (! name.value) return
    avatar.value = await fetchEnsAvatar({ name: name.value })
  }

  if (name.value) update()
  watch([name, chainId], () => update())

  return avatar
}
