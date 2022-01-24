import React from 'react'
import { useNetwork, useSigner } from 'wagmi'

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

function NetworkWarning() {
  const [{ data }] = useNetwork()
  const [{ data: signer }] = useSigner()

  if (chainId && signer && data.chain?.id !== +chainId) {
    return (
      <div className="w-screen h-[40px] text-black bg-yellow-200 flex items-center justify-center">
        <span>
          You are connected to the wrong network. Please, switch to{' '}
          <strong>
            {+chainId === 1 ? 'Ethereum Mainnet' : 'Rinkeby Testnet'}
          </strong>
        </span>
      </div>
    )
  }
  return null
}

export default NetworkWarning
