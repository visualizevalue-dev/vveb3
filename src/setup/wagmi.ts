import setup from '../../lib/setup-wagmi'

const {
  chains,
  publicClient,
  webSocketPublicClient,
  wagmi
} = setup({
  alchemyApiKey: import.meta.env.VITE_ALCHEMY,
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
})

export {
  chains,
  publicClient,
  webSocketPublicClient,
  wagmi
}
