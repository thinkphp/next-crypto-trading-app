"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CryptoTradingApp = () => {
  // Initial market data
  const [marketPrices] = useState({
    Bitcoin: 27500,
    Ethereum: 1850,
    Cardano: 0.35
  });

  // Portfolio state
  const [portfolio, setPortfolio] = useState({
    Bitcoin: { amount: 0.5, price: 27000 },
    Ethereum: { amount: 10, price: 1800 },
    Cardano: { amount: 1000, price: 0.3 }
  });

  // Trading form state
  const [selectedCoin, setSelectedCoin] = useState('Bitcoin');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Calculate total portfolio value
  const calculateTotalValue = () => {
    return Object.entries(portfolio).reduce((total, [coin, data]) => {
      return total + (data.amount * marketPrices[coin]);
    }, 0);
  };

  // Handle buying cryptocurrency
  const handleBuy = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setPortfolio(prev => ({
      ...prev,
      [selectedCoin]: {
        amount: (prev[selectedCoin]?.amount || 0) + parseFloat(amount),
        price: marketPrices[selectedCoin]
      }
    }));
    setAmount('');
    setError('');
  };

  // Handle selling cryptocurrency
  const handleSell = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!portfolio[selectedCoin] || portfolio[selectedCoin].amount < parseFloat(amount)) {
      setError('Insufficient balance');
      return;
    }

    setPortfolio(prev => ({
      ...prev,
      [selectedCoin]: {
        ...prev[selectedCoin],
        amount: prev[selectedCoin].amount - parseFloat(amount)
      }
    }));
    setAmount('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Crypto Trading Platform</h1>

      {/* Portfolio Card */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(portfolio).map(([coin, data]) => (
              <div key={coin} className="flex justify-between items-center">
                <span className="font-medium">{coin}</span>
                <div className="text-right">
                  <div>{data.amount.toFixed(4)} coins</div>
                  <div className="text-gray-600">
                    ${(data.amount * marketPrices[coin]).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-bold">
                <span>Total Portfolio Value</span>
                <span>${calculateTotalValue().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Card */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Select Coin</label>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(marketPrices).map(coin => (
                    <SelectItem key={coin} value={coin}>
                      {coin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-4">
              <Button onClick={handleBuy} className="flex-1">
                Buy
              </Button>
              <Button onClick={handleSell} variant="outline" className="flex-1">
                Sell
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Prices Card */}
      <Card>
        <CardHeader>
          <CardTitle>Market Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(marketPrices).map(([coin, price]) => (
              <div key={coin} className="flex justify-between items-center">
                <span>{coin}</span>
                <span>${price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Resources Card */}
      <Card>
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-medium">What is Blockchain?</h3>
            <p className="text-gray-600">Learn the fundamentals of blockchain technology</p>

            <h3 className="font-medium">How to Trade Cryptocurrencies?</h3>
            <p className="text-gray-600">Basic and advanced trading strategies</p>

            <h3 className="font-medium">Understanding Market Trends</h3>
            <p className="text-gray-600">Technical and fundamental analysis</p>

            <h3 className="font-medium">Cryptocurrency Security</h3>
            <p className="text-gray-600">Best practices for securing your assets</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTradingApp;
