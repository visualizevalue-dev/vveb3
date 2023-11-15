import { mainnet } from '@wagmi/chains'
import { createConfig, configureChains, InjectedConnector } from '@wagmi/core'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { publicProvider } from '@wagmi/core/providers/public'

const setup = ({
  alchemyApiKey,
  walletConnectProjectId,
}: {
  alchemyApiKey: string,
  walletConnectProjectId: string,
}) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [
      alchemyProvider({ apiKey: alchemyApiKey }),
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
          projectId: walletConnectProjectId,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })

  return {
    chains,
    publicClient,
    webSocketPublicClient,
    wagmi
  }
}

export default setup
