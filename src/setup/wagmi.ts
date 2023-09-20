import { mainnet } from '@wagmi/chains'
import { createConfig, configureChains, InjectedConnector } from '@wagmi/core'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { publicProvider } from '@wagmi/core/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY }),
    publicProvider(),
  ],
  {
    batch: { multicall: true },
    pollingInterval: 10_000,
  }
)

const wagmi = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export {
  chains,
  publicClient,
  webSocketPublicClient,
  wagmi
}
