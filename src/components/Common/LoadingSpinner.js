import React from 'react'
import { WalletIcon } from '@heroicons/react/24/outline' // You can use any payment-related icon library

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 flex items-center justify-center text-white rounded-full">
        <WalletIcon className="w-6 h-6 mr-2 text-3xl text-white animate-spin" />
      </div>
    </div>
  )
}

export default LoadingSpinner
