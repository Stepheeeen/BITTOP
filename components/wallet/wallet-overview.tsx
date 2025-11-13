"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { supportedWallets, WalletInfo } from "@/lib/supportedWallets"
import axiosClient from "@/lib/axiosClient"

export function WalletOverview() {
  const [selectedCoin, setSelectedCoin] = useState<WalletInfo | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("")
  const [network, setNetwork] = useState("")

  const handleDepositClick = (coin: WalletInfo) => {
    setSelectedCoin(coin)
    setNetwork(coin.network) // prefill default network
    setIsOpen(true)
  }

  const handleCopy = async () => {
    if (selectedCoin) {
      await navigator.clipboard.writeText(selectedCoin.address)
      alert("Address copied to clipboard!")
    }
  }

  const handleConfirmDeposit = async () => {
    if (!selectedCoin || !amount || !network) {
      alert("Please fill in all fields before confirming.")
      return
    }

    const payload = {
      coin: selectedCoin.name.toLowerCase(), // lowercase matches backend
      network,
      address: selectedCoin.address,
      amount: parseFloat(amount) // backend expects amount field
    }

    setLoading(true)
    try {
      console.log("Deposit payload:", payload) // debug
      const res = await axiosClient.post("/deposit/initiate", payload)

      if (res.status === 200) {
        alert("Deposit submitted successfully. Await admin confirmation.")
        setIsOpen(false)
        setAmount("")
      }
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.message || "Error submitting deposit.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {Object.values(supportedWallets).map((coin) => (
        <Card
          key={coin.symbol}
          className="p-4 flex flex-col justify-between shadow-md border border-primary/10 
          bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <div>
            <h2 className="text-lg font-semibold">{coin.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{coin.network}</p>
          </div>
          <Button
            onClick={() => handleDepositClick(coin)}
            className="mt-4 w-full dark:bg-primary/80 dark:hover:bg-primary"
          >
            Deposit
          </Button>
        </Card>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 dark:text-gray-100">
          {selectedCoin && (
            <>
              <DialogHeader>
                <DialogTitle>Deposit {selectedCoin.name}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center space-y-3">
                <img
                  src={selectedCoin.qrCode}
                  alt={`${selectedCoin.name} QR`}
                  className="w-32 h-32 rounded-md border dark:border-gray-700"
                />

                <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2">
                  <span className="truncate text-sm">{selectedCoin.address}</span>
                  <button onClick={handleCopy}>
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Amount Input */}
                <div className="w-full">
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Amount (in Crypto)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter deposit amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                {/* Network Display (Read-only) */}
                <div className="w-full">
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    On-chain Network
                  </label>
                  <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2">
                    <span className="truncate text-sm">{network}</span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmDeposit}
                  className="w-full mt-2 dark:bg-green-600 dark:hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "I've Paid – Confirm Deposit"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
