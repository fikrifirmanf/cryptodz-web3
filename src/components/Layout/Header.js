import React, { useEffect, useState } from 'react'
import { WalletIcon } from '@heroicons/react/24/outline'
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, ethers } from 'ethers'

import contractAbi from '../../../contracts/abi.json'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open } = useWeb3Modal() // Destructure provider, account, chainId, and balance from useWeb3Modal
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState('')
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  // Connect to Ethereum provider
  const { walletProvider } = useWeb3ModalProvider()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const truncateAddress = (address) => {
    // Check if the address is valid
    if (!address || typeof address !== 'string' || address.length < 42) {
      return address // Return the original address if it's invalid or already truncated
    }

    // Truncate the address to display only the first and last four characters
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  const getConnection = async () => {
    if (!isConnected) {
      console.log('disconnected')
    } else {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      // The Contract object
      // const USDTContract = new Contract(contractAddress, contractAbi, signer)
      setSignerAddress(signer.address)
      console.log(signer.address)
      setIsWalletConnected(true)
    }
  }

  useEffect(() => {
    getConnection()
  }, [signerAddress])

  return (
    <header className="bg-white bg-opacity-50 backdrop-blur-md shadow-sm fixed w-full z-10 h-20 flex items-center">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 relative">
          <a href="#" className="text-gray-600 font-bold text-3xl">
            CRYPTODZ
          </a>

          {/* Burger icon for mobile */}
          <button
            className="block lg:hidden text-gray-600 transition duration-300"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Desktop menu items */}
          <ul className="hidden lg:flex lg:space-x-8 lg:text-lg lg:items-center">
            <li>
              <a
                href="#"
                className="text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Ecosystem
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Developers
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Community
                </span>
              </a>
            </li>
            <li>
              <button
                onClick={() => open()}
                className="flex items-center justify-center font-semibold bg-gradient-to-r from-cyan-500 to-green-500 text-white px-4 py-3 rounded-2xl transition duration-300 ml-10"
              >
                <WalletIcon className="w-6 h-6 mr-2 text-white" />
                {isWalletConnected
                  ? truncateAddress(signerAddress)
                  : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-100 text-center ${isMenuOpen ? 'block' : 'hidden'}`}
          style={{ transition: 'opacity 0.3s ease-in-out' }}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 transition duration-300"
            onClick={closeMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col justify-center items-center h-full">
            <li>
              <a
                href="#"
                className="block py-4 text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Ecosystem
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-4 text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Developers
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-4 text-gray-600 transition duration-300 group"
              >
                <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-green-500 group-hover:text-transparent">
                  Community
                </span>
              </a>
            </li>
            <li>
              <button
                onClick={() => open()}
                className="flex mt-4 items-center justify-center bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-3 rounded-2xl transition duration-300"
              >
                <WalletIcon className="w-6 h-6 mr-2 text-white" />
                {isWalletConnected
                  ? truncateAddress(signerAddress)
                  : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
