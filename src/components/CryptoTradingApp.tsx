"use client"

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

type CoinType = 'Bitcoin' | 'Ethereum' | 'Cardano';

type MarketPrices = {
  [K in CoinType]: number;
}

interface PortfolioItem {
  amount: number;
  price: number;
}

type Portfolio = {
  [K in CoinType]: PortfolioItem;
}

const CryptoTradingApp = () => {
  const [marketPrices] = useState<MarketPrices>({
    Bitcoin: 27500,
    Ethereum: 1850,
    Cardano: 0.35
  });

  const [portfolio, setPortfolio] = useState<Portfolio>({
    Bitcoin: { amount: 0.5, price: 27000 },
    Ethereum: { amount: 10, price: 1800 },
    Cardano: { amount: 1000, price: 0.3 }
  });

  const [selectedCoin, setSelectedCoin] = useState<CoinType>('Bitcoin');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateTotalValue = (): number => {
    return Object.entries(portfolio).reduce((total, [coin, data]) => {
      return total + (data.amount * marketPrices[coin as CoinType]);
    }, 0);
  };

  const handleBuy = () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
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

  const handleSell = () => {
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
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
      
      <Card className="w-full">
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
                  <div className="text-muted-foreground">
                    ${(data.amount * marketPrices[coin as CoinType]).toFixed(2)}
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Trade Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select Coin
              </label>
              <Select value={selectedCoin} onValueChange={(value: CoinType) => setSelectedCoin(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(marketPrices) as CoinType[]).map(coin => (
                    <SelectItem key={coin} value={coin}>
                      {coin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Amount
              </label>
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

      <Card className="w-full">
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">What is Blockchain?</h3>
              <p className="text-muted-foreground">Learn the fundamentals of blockchain technology</p>
            </div>
            <div>
              <h3 className="font-medium">How to Trade Cryptocurrencies?</h3>
              <p className="text-muted-foreground">Basic and advanced trading strategies</p>
            </div>
            <div>
              <h3 className="font-medium">Understanding Market Trends</h3>
              <p className="text-muted-foreground">Technical and fundamental analysis</p>
            </div>
            <div>
              <h3 className="font-medium">Cryptocurrency Security</h3>
              <p className="text-muted-foreground">Best practices for securing your assets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTradingApp;
