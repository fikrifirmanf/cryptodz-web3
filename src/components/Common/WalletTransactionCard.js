import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { WalletIcon } from '@heroicons/react/24/outline'
import {
  useWeb3Modal,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from '@web3modal/ethers/react'

// Import ethers.js and your smart contract ABI
import { BrowserProvider, Contract, formatUnits, ethers } from 'ethers'

import contractAbi from '../../../contracts/abi.json'
import { useEffect, useState } from 'react'
import TransactionStatusModal from './TransactionStatusModal'
import LoadingSpinner from './LoadingSpinner'

const WalletTransactionCard = () => {
  const { open } = useWeb3Modal()

  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [balance, setBalance] = useState(0)
  const [networkName, setNetworkName] = useState('-')
  const [isLoading, setIsLoading] = useState(false) // State variable to track loading state
  const [isTransferCompleted, setIsTransferCompleted] = useState(false) // State variable to track transfer completion
  const [modalMessage, setModalMessage] = useState('') // State variable to store modal message
  const [isModalOpen, setIsModalOpen] = useState(false) // State variable to control modal visibility
  const [transactionHash, setTransactionHash] = useState('')
  const [value, setValue] = useState('')

  const etherscanLink = `https://sepolia.etherscan.io/tx/${transactionHash}`

  // Connect to Ethereum provider
  const { walletProvider } = useWeb3ModalProvider()
  // Get signer (account)

  // Instantiate the contract with its address and ABI
  const contractAddress = '0x0A1fA0D39147A9c5e9fB1523b689346c7bD57989' // Replace with your contract address

  const getBalance = async () => {
    if (!isConnected) {
        setNetworkName('')
        setBalance(0)
        setIsWalletConnected(false)
        console.log('disconnected')
    } else {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const balance = await ethersProvider.getBalance(signer.getAddress())
      const network = await ethersProvider.getNetwork()
      // The Contract object
      // const USDTContract = new Contract(contractAddress, contractAbi, signer)

      console.log(
        formatUnits((await ethersProvider.getFeeData()).maxFeePerGas),
        'gwei'
      )
      setNetworkName(network?.name)
      setBalance(formatUnits(balance, 18))
      setIsWalletConnected(true)
    }
  }

  const sendTransaction = async () => {
    setIsLoading(true) // Set isLoading to true when the transaction begins
    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const contract = new Contract(contractAddress, contractAbi, signer)
      // Call the contract function to transfer Ether
      const transaction = await contract.transferEther(
        '0xF611E890E43fFd796F1EbF969Aa32bED3bba1d42',
        {
          value: ethers.parseEther(value), // Convert amount to wei
        }
      )

      // Wait for the transaction to be mined
      const receipt = await transaction.wait()

      console.log('Transaction mined. Receipt:', receipt)

      // Get the transaction hash from the receipt
      const txHash = receipt.hash

      // Log the transaction hash
      console.log('Transaction hash:', txHash)

      console.log('Ether transferred successfully')
      setTransactionHash(txHash)
      setIsTransferCompleted(true) // Set isTransferCompleted to true after the transaction is completed
      setValue('')
      setModalMessage(
        'Successfully paid the debt, next time please borrow more debt from me again 😊'
      ) // Set modal message
      getBalance()
    } catch (error) {
      setModalMessage('Paying debt failed!') // Set modal message

      console.error('Error transferring Ether:', error)
    } finally {
      setIsModalOpen(true)
      setIsLoading(false) // Set isLoading to false after the transaction (whether successful or not)
    }
  }

  const buyToken = async() => {
    setIsLoading(true) // Set isLoading to true when the transaction begins
    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const contract = new Contract(contractAddress, contractAbi, signer)
      // Call the contract function to transfer Ether
      const transaction = await contract.buyTokens({
        value: ethers.parseEther(value)
      })

      // Wait for the transaction to be mined
      const receipt = await transaction.wait()

      console.log('Transaction mined. Receipt:', receipt)

      // Get the transaction hash from the receipt
      const txHash = receipt.hash

      // Log the transaction hash
      console.log('Transaction hash:', txHash)

      console.log('Ether transferred successfully')
      setTransactionHash(txHash)
      setIsTransferCompleted(true) // Set isTransferCompleted to true after the transaction is completed
      setValue('')
      setModalMessage(
        'Transaction successful 😊'
      ) // Set modal message
      getBalance()
    } catch (error) {
      setModalMessage('Transaction failed!') // Set modal message

      console.error('Error transferring Ether:', error)
    } finally {
      setIsModalOpen(true)
      setIsLoading(false) // Set isLoading to false after the transaction (whether successful or not)
    }
  }

  const sellToken = async() => {
    setIsLoading(true) // Set isLoading to true when the transaction begins
    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const contract = new Contract(contractAddress, contractAbi, signer)
      // Call the contract function to transfer Ether
      const transaction = await contract.sellTokens(ethers.parseEther(value))

      // Wait for the transaction to be mined
      const receipt = await transaction.wait()

      console.log('Transaction mined. Receipt:', receipt)

      // Get the transaction hash from the receipt
      const txHash = receipt.hash

      // Log the transaction hash
      console.log('Transaction hash:', txHash)

      console.log('Ether transferred successfully')
      setTransactionHash(txHash)
      setIsTransferCompleted(true) // Set isTransferCompleted to true after the transaction is completed
      setValue('')
      setModalMessage(
        'Transaction successful 😊'
      ) // Set modal message
      getBalance()
    } catch (error) {
      setModalMessage('Transaction failed!') // Set modal message

      console.error('Error transferring Ether:', error)
    } finally {
      setIsModalOpen(true)
      setIsLoading(false) // Set isLoading to false after the transaction (whether successful or not)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false) // Close modal
    setIsTransferCompleted(false) // Reset transfer completion state
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    getBalance()
  }, [isConnected])

  return (
    <>
      <div className="bg-white overflow-hidden sm:rounded-2xl bg-opacity-60 backdrop-blur-md">
        <div className="px-4 py-5 sm:px-6">
          {/* <h3 className="text-2xl font-bold leading-6 text-gray-600 mb-8">Swap</h3> */}
          <div className="bg-gray-100 bg-opacity-20 backdrop-blur-md overflow-hidden sm:rounded-2xl">
            <div className="px-4 py-5 sm:px-6">
              <div div className="grid grid-cols-2 gap-2">
                <h3 className="text-sm text-gray-500 mb-2 text-left">
                  Network: {networkName}
                </h3>
                <h3 className="text-sm text-gray-600 mb-2 text-right">
                  Balance: {balance} ETH
                </h3>
              </div>
              <div className="relative">
                <input
                  className="text-gray-600 outline-none border-none w-full bg-transparent text-3xl"
                  placeholder="0.00"
                  type="number"
                  value={value}
                  onChange={handleChange}
                />
                {/* Hide increase and decrease buttons */}
                <style jsx>{`
                  input::-webkit-outer-spin-button,
                  input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }

                  input[type='number'] {
                    -moz-appearance: textfield;
                  }
                `}</style>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center font-bold text-gray-800 mt-8 mb-8">
            <ArrowDownIcon className="w-6 h-6" />
          </div>
          <div className="bg-gray-100 overflow-hidden sm:rounded-2xl mb-8 bg-opacity-20 backdrop-blur-md">
            <div className="px-4 py-5 sm:px-6">
              <div div className="grid grid-cols-1">
                {/* <h3 className="text-sm leading-6 text-gray-500 mb-2 text-left">To: Cryptodz Mainnet</h3> */}
                <h3 className="text-sm leading-6 text-gray-500 mb-2 text-left">
                  You will send to me: 0 USD
                </h3>
                <h3 className="text-sm leading-6 text-gray-500 mb-2 text-left">
                  Fee: 0.00123 ETH
                </h3>
              </div>
            </div>
          </div>
          {isLoading ? (
            <button
              disabled
              className="flex items-center justify-center font-semibold bg-gradient-to-r from-cyan-500 to-green-500 text-white px-5 py-5 rounded-2xl transition duration-300 w-full"
            >
              <LoadingSpinner />
              Processing transaction...
            </button>
          ) : (
            <button
              onClick={() => !isWalletConnected ? open () : sellToken()}
              className="flex items-center justify-center font-semibold bg-gradient-to-r from-cyan-500 to-green-500 text-white px-5 py-5 rounded-2xl transition duration-300 w-full"
            >
              <WalletIcon className="w-6 h-6 mr-2 text-3xl text-white" />
              {!isWalletConnected ? 'Connect Wallet' : 'Pay Debt'}
            </button>
          )}
        </div>
      </div>
      <TransactionStatusModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        message={modalMessage}
        isSuccess={isTransferCompleted}
        etherscanLink={etherscanLink}
      />{' '}
    </>
  )
}

export default WalletTransactionCard
