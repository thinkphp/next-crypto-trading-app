This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Crypto Trading Platform

A modern, Nextjs-based cryptocurrency trading simulation platform built with TypeScript and shadcn/ui components. This application allows users to manage a virtual cryptocurrency portfolio with real-time market prices.

## Features

- Portfolio management with support for Bitcoin, Ethereum, and Cardano
- Real-time market price tracking
- Buy and sell cryptocurrency functionality
- Portfolio value calculation
- Educational resources section
- Modern, responsive UI using shadcn/ui components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React 18+
- TypeScript 4.5+
- shadcn/ui components

## Installation

1. Install the required shadcn/ui components:

```bash
npx shadcn@latest add card select input button alert
```

2. Install other dependencies:

```bash
npm install
# or
yarn
```

## Component Structure

The `CryptoTradingApp` component consists of several key sections:

### Types and Interfaces

```typescript
type CoinType = 'Bitcoin' | 'Ethereum' | 'Cardano'
type MarketPrices = {
  [K in CoinType]: number
}
interface PortfolioItem {
  amount: number
  price: number
}
type Portfolio = {
  [K in CoinType]: PortfolioItem
}
```

### State Management

The component manages the following state:
- Market prices for supported cryptocurrencies
- User's portfolio with coin amounts and purchase prices
- Selected coin for trading
- Input amount for transactions
- Error messages

### Key Functions

- `calculateTotalValue()`: Calculates the total portfolio value based on current market prices
- `handleBuy()`: Processes buy transactions with input validation
- `handleSell()`: Processes sell transactions with balance verification

## Usage

Import and use the component in your React application:

```tsx
import CryptoTradingApp from './CryptoTradingApp'

function App() {
  return <CryptoTradingApp />
}
```

## UI Components

The application includes four main card sections:
1. Portfolio Overview - Displays current holdings and total value
2. Trading Interface - Allows users to buy and sell cryptocurrencies
3. Market Prices - Shows current prices for supported cryptocurrencies
4. Educational Resources - Provides learning materials about cryptocurrency

## Styling

The component uses Tailwind CSS classes for styling and layout:
- Responsive design with `max-w-4xl` container
- Consistent spacing using `space-y-` utilities
- Flexible layouts with `flex` and `grid` components

## Error Handling

The component includes validation for:
- Invalid input amounts
- Insufficient balance for sell transactions
- Input formatting requirements

## Customization

To modify supported cryptocurrencies:
1. Update the `CoinType` type definition
2. Modify the initial `marketPrices` state
3. Adjust the initial `portfolio` state accordingly

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT
