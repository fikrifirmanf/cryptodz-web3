// useWeb3ModalAccount.js
import { useState, useEffect } from 'react'
import { useWeb3Modal } from '@web3modal/ethers/react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

const useWeb3ModalAccounts = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  useEffect(() => {}, [])

  return {
    address,
    chainId,
    isConnected,
  }
}

export default useWeb3ModalAccounts
