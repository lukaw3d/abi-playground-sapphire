import { StaticImageData } from 'next/image';
import * as viemNextVersionChains from "../../viemNextVersionChains";
import * as chains from "viem/chains";
import arbitrumIcon from "~~/public/arbitrum.svg";
import baseIcon from "~~/public/base.svg";
import gnosisIcon from "~~/public/gnosis.svg";
import hardhatIcon from "~~/public/hardhat.png";
import mainnetIcon from "~~/public/mainnet.svg";
import oasisIcon from "~~/public/oasis.svg";
import optimismIcon from "~~/public/optimism.svg";
import polygonIcon from "~~/public/polygon.svg";
import scrollIcon from "~~/public/scroll.svg";
import zksyncIcon from "~~/public/zksync.svg";
import scaffoldConfig from "~~/scaffold.config";

type ChainAttributes = {
  // color | [lightThemeColor, darkThemeColor]
  color: string | [string, string];
  // Used to fetch price by providing mainnet token address
  // for networks having native currency other than ETH
  nativeCurrencyTokenAddress?: string;
  etherscanEndpoint?: string;
  etherscanApiKey?: string;
  icon?: StaticImageData;
  groupSelector?: string;
};

export type ChainWithAttributes = chains.Chain & Partial<ChainAttributes>;

const MAINNET_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || "";
const OPTIMISM_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_OPTIMISM_ETHERSCAN_API_KEY || "";
const POLYGON_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_POLYGON_ETHERSCAN_API_KEY || "";
const ARBITRUM_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ARBITRUM_ETHERSCAN_API_KEY || "";
const ZKSYNC_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ZKSYNC_ETHERSCAN_API_KEY || "";
const BASE_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_BASE_ETHERSCAN_API_KEY || "";
const SCROLL_ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_SCROLL_ETHERSCAN_API_KEY || "";

export const NETWORKS_EXTRA_DATA: Record<string, ChainAttributes> = {
  [viemNextVersionChains.sapphire.id]: {
    color: "#fbebd4",
    icon: oasisIcon,
  },
  [viemNextVersionChains.sapphireTestnet.id]: {
    color: "#fbebd4",
    icon: oasisIcon,
  },
  [viemNextVersionChains.emerald.id]: {
    color: "#fbebd4",
    icon: oasisIcon,
  },
  [viemNextVersionChains.emeraldTestnet.id]: {
    color: "#fbebd4",
    icon: oasisIcon,
  },
  [chains.hardhat.id]: {
    color: "#b8af0c",
    icon: hardhatIcon,
  },
  [chains.mainnet.id]: {
    color: "#ff8b9e",
    etherscanEndpoint: "https://api.etherscan.io",
    etherscanApiKey: MAINNET_ETHERSCAN_API_KEY,
    icon: mainnetIcon,
  },
  [chains.sepolia.id]: {
    color: ["#5f4bb6", "#87ff65"],
    etherscanEndpoint: "https://api-sepolia.etherscan.io",
    etherscanApiKey: MAINNET_ETHERSCAN_API_KEY,
    icon: mainnetIcon,
  },
  [chains.gnosis.id]: {
    color: "#48a9a6",
    etherscanEndpoint: "https://api.gnosisscan.io",
    etherscanApiKey: MAINNET_ETHERSCAN_API_KEY,
    icon: gnosisIcon,
  },
  [chains.polygon.id]: {
    color: "#2bbdf7",
    nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    etherscanEndpoint: "https://api.polygonscan.com",
    etherscanApiKey: POLYGON_ETHERSCAN_API_KEY,
    icon: polygonIcon,
  },
  [chains.polygonMumbai.id]: {
    color: "#92D9FA",
    nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    etherscanEndpoint: "https://api-testnet.polygonscan.com",
    etherscanApiKey: POLYGON_ETHERSCAN_API_KEY,
    icon: polygonIcon,
  },
  [chains.optimism.id]: {
    color: "#f01a37",
    etherscanEndpoint: "https://api-optimistic.etherscan.io",
    etherscanApiKey: OPTIMISM_ETHERSCAN_API_KEY,
    icon: optimismIcon,
  },
  [chains.arbitrum.id]: {
    color: "#28a0f0",
    etherscanEndpoint: "https://api.arbiscan.io",
    etherscanApiKey: ARBITRUM_ETHERSCAN_API_KEY,
    icon: arbitrumIcon,
  },
  [chains.zkSync.id]: {
    color: "#5f4bb6",
    etherscanEndpoint: "https://block-explorer-api.mainnet.zksync.io",
    etherscanApiKey: ZKSYNC_ETHERSCAN_API_KEY,
    icon: zksyncIcon,
  },
  [chains.zkSyncTestnet.id]: {
    color: "#5f4bb6",
    etherscanEndpoint: "https://block-explorer-api.testnets.zksync.dev",
    etherscanApiKey: ZKSYNC_ETHERSCAN_API_KEY,
    icon: zksyncIcon,
  },
  [chains.base.id]: {
    color: "#1450EE",
    etherscanEndpoint: "https://api-sepolia.basescan.org",
    etherscanApiKey: BASE_ETHERSCAN_API_KEY,
    icon: baseIcon,
  },
  [chains.baseSepolia.id]: {
    color: "#1450EE",
    etherscanApiKey: BASE_ETHERSCAN_API_KEY,
    icon: baseIcon,
  },
  [chains.scroll.id]: {
    color: "#fbebd4",
    etherscanEndpoint: "https://api.scrollscan.com",
    etherscanApiKey: SCROLL_ETHERSCAN_API_KEY,
    icon: scrollIcon,
  },
  [chains.scrollSepolia.id]: {
    color: "#fbebd4",
    etherscanEndpoint: "https://api-sepolia.scrollscan.com",
    etherscanApiKey: SCROLL_ETHERSCAN_API_KEY,
    icon: scrollIcon,
  },
};

/**
 * Gives the block explorer transaction URL.
 * Returns empty string if the network is a local chain
 */
export function getBlockExplorerTxLink(chainId: number, txnHash: string) {
  const chainNames = Object.keys(chains);

  const targetChainArr = chainNames.filter(chainName => {
    const wagmiChain = chains[chainName as keyof typeof chains];
    return wagmiChain.id === chainId;
  });

  if (targetChainArr.length === 0) {
    return "";
  }

  const targetChain = targetChainArr[0] as keyof typeof chains;
  // @ts-expect-error : ignoring error since `blockExplorers` key may or may not be present on some chains
  const blockExplorerTxURL = chains[targetChain]?.blockExplorers?.default?.url;

  if (!blockExplorerTxURL) {
    return "";
  }

  return `${blockExplorerTxURL}/tx/${txnHash}`;
}

/**
 * Gives the block explorer URL for a given address.
 * Defaults to Etherscan if no (wagmi) block explorer is configured for the network.
 */
export function getBlockExplorerAddressLink(network: chains.Chain, address: string) {
  const blockExplorerBaseURL = network.blockExplorers?.default?.url;
  if (network.id === chains.hardhat.id) {
    return `/blockexplorer/address/${address}`;
  }

  if (!blockExplorerBaseURL) {
    return `https://etherscan.io/address/${address}`;
  }

  return `${blockExplorerBaseURL}/address/${address}`;
}

/**
 * @returns targetNetworks array containing networks configured in scaffold.config including extra network metadata
 */
export function getTargetNetworks(): ChainWithAttributes[] {
  return scaffoldConfig.targetNetworks.map(targetNetwork => ({
    ...targetNetwork,
    ...NETWORKS_EXTRA_DATA[targetNetwork.id],
  }));
}
