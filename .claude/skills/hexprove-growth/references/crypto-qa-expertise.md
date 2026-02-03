# Crypto QA Expertise Reference

This document contains crypto-specific QA knowledge for use in content creation. Use this to ensure technical accuracy and demonstrate deep expertise.

## DeFi Testing Knowledge

### Swap/Trade Testing
**What to test:**
- Token input/output calculations
- Slippage tolerance handling
- Price impact warnings
- Insufficient balance errors
- Token approval flows
- Transaction confirmation states
- Failed transaction handling
- Gas estimation accuracy

**Common bugs:**
- Price displayed doesn't match execution price
- Slippage tolerance not respected
- Approval transaction required but not prompted
- Infinite approval set without user consent/warning
- Transaction stuck in pending without timeout
- Wrong token decimals causing calculation errors
- Price impact warning thresholds incorrect

### Liquidity Pool Testing
**What to test:**
- Add liquidity flows
- Remove liquidity flows
- LP token receipt/burning
- Impermanent loss calculations (if displayed)
- Pool share percentage accuracy
- Multi-token deposits

**Common bugs:**
- LP token balance not updating after add/remove
- Incorrect pool share display
- Missing confirmation of successful liquidity addition
- Remove liquidity leaving dust amounts

### Bridging Testing
**What to test:**
- Source chain → destination chain transfers
- Transaction status tracking
- Finality confirmation
- Failed bridge handling
- Refund flows
- Gas estimation on both chains

**Common bugs:**
- Funds deducted but not received on destination
- Status not updating (stuck on "pending")
- Incorrect estimated time
- Wrong gas token used for estimation
- Bridge transaction not showing in history

## Wallet Testing Knowledge

### Connection Flows
**What to test:**
- Initial connection request
- Network switching
- Account switching
- Disconnect/reconnect
- Multiple wallet support
- WalletConnect flows
- Deep linking (mobile)

**Common bugs:**
- Wallet not detected even when installed
- Network mismatch not handled gracefully
- Account change not reflected in UI
- "Connect Wallet" button state not updating
- WalletConnect session expiry not handled
- Mobile deep link returning to wrong screen

### Transaction Signing
**What to test:**
- Transaction preview accuracy
- Gas fee display
- Speed up / cancel flows
- Signature request types (personal_sign, eth_signTypedData)
- Transaction history

**Common bugs:**
- Transaction preview showing wrong amounts
- Gas estimation failing silently
- Signed message not matching displayed message
- Transaction confirmed but UI not updated
- Duplicate transactions submitted

### Smart Wallet Testing (EIP-7702, Account Abstraction)
**What to test:**
- Session key creation
- Spending limits
- Social recovery flows
- Batch transactions
- Gas sponsorship (paymasters)

**Common bugs:**
- Session key expiry not enforced
- Spending limit bypass possible
- Recovery guardian setup failures
- Batch transaction partial failure handling

## NFT Testing Knowledge

### Minting Flows
**What to test:**
- Mint function execution
- Quantity selection
- Price calculation
- Allowlist verification
- Reveal mechanics
- Metadata loading

**Common bugs:**
- Minted NFT not appearing in wallet
- Incorrect mint price charged
- Allowlist merkle proof failing
- Metadata not revealing after timer
- Image not loading from IPFS

### Marketplace Testing
**What to test:**
- Listing creation (fixed price, auction)
- Buying flow
- Offer/bid mechanics
- Royalty calculations
- Collection verification
- Bulk operations

**Common bugs:**
- Listed item still showing in seller's wallet
- Royalties not calculated correctly
- Auction ending but winner not determined
- Offer acceptance failing silently
- Wrong collection floor price displayed

## Common Crypto-Specific Edge Cases

### Network-Related
- User on wrong network
- Network congestion (high gas)
- RPC endpoint failures
- Chain reorganizations
- Pending transactions during network issues

### Token-Related
- Tokens with non-standard decimals (not 18)
- Rebasing tokens
- Fee-on-transfer tokens
- Tokens with transfer restrictions
- Newly deployed tokens not in price feeds

### Timing-Related
- Block confirmation delays
- Transaction deadline expiry
- Oracle price staleness
- Session/connection timeouts
- Real-time price updates

### State-Related
- Balance changes mid-transaction
- Approval state changes
- Pool state changes (MEV, arbitrage)
- Concurrent transactions

## What Generic QA Testers Get Wrong

### Gas Fees
**Wrong:** "Gas fee is too high" (reported as bug)
**Right:** Gas fees are determined by network congestion, not the app. Test that the *display* is accurate and the *estimation* is reasonable.

### Transaction Times
**Wrong:** "Transaction takes too long" (reported as bug)
**Right:** Transaction time depends on network and gas price. Test that *status updates* are accurate and *user feedback* is clear.

### Network Behavior
**Wrong:** "App says wrong network" (reported as bug)
**Right:** Network detection is a feature. Test that the *prompt to switch* works correctly and handles edge cases.

### Failed Transactions
**Wrong:** "Transaction failed" (reported as bug)
**Right:** Transactions fail for valid reasons (slippage, insufficient gas, contract revert). Test that *error messages* are clear and *recovery flows* work.

### Wallet State
**Wrong:** "Wallet not connected after refresh" (sometimes a bug, sometimes not)
**Right:** Depends on intended behavior. Some apps persist connection, some require reconnect. Test against *intended behavior*.

## Testing Tools & Techniques

### Test Networks
- Ethereum: Sepolia, Goerli (deprecated)
- Polygon: Mumbai (deprecated), Amoy
- Arbitrum: Arbitrum Sepolia
- Optimism: OP Sepolia
- Base: Base Sepolia

### Faucets & Test Tokens
- Most testnets have faucets for native tokens
- Test token contracts can be deployed for testing
- Some protocols have testnet deployments

### Transaction Simulation
- Tenderly for transaction simulation
- Hardhat forking for local testing
- Browser dev tools for RPC inspection

### Wallet Testing Setup
- Multiple browser profiles
- Test wallets with different states
- Hardware wallet simulators
- WalletConnect test apps

## Credibility Phrases for Content

Use these to establish expertise without being heavy-handed:

- "In our experience testing at [Uniswap/OpenSea]..."
- "We've seen this bug pattern across multiple DeFi products..."
- "One of the most common issues we catch..."
- "This is why crypto-native QA matters..."
- "Generic QA teams often miss this because..."
- "After testing products processing billions in volume..."
- "The shift-left methodology we developed..."

## Technical Terms to Use (and Explain)

When writing content, use these terms but explain them for mixed audiences:

- **Gas fees** — Transaction costs on blockchain networks
- **Slippage** — Price difference between expected and executed trade
- **RPC** — Remote Procedure Call, how apps communicate with blockchain
- **Testnet** — Test version of a blockchain for development
- **Mainnet** — Production blockchain with real value
- **L2** — Layer 2, scaling solutions built on top of main blockchains
- **DEX** — Decentralized Exchange
- **AMM** — Automated Market Maker
- **LP** — Liquidity Provider
- **TVL** — Total Value Locked
- **MEV** — Maximal Extractable Value
