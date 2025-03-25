# NEAR DApp Template: Trading Tool with NEARMobile Wallet Integration

This repository is a template for building a minimal NEAR decentralized application (dApp) with integrated [NEARMobile Wallet](https://github.com/near/wallet-selector) sign in. It provides a simple trading tool interface where users can swap between NEAR Intent assets and view their trading performance (PNL) in real time.

---

## Overview

The core idea of this dApp is to let users:
- **Swap Assets:** Initiate trades by swapping one asset (e.g., USDC) for another (e.g., NEAR).
- **Track Real-Time PNL:** Monitor the profit and loss (PNL) of an open trade as market prices update.
- **View Trade History:** Automatically close previous trades when starting a new one and maintain a history of past trades with entry/exit prices and realized PNL.
- **Wallet Integration:** Seamlessly sign in with NEARMobile Wallet using wallet-selector, making it easier for users to connect their NEAR accounts.

This template follows a modular and domain-driven architecture inspired by Peersyst coding style and guidelines.

---

## Features

- **Monorepo Structure:** Organized into separate modules for the frontend, backend (optional), and shared packages.
- **Modern Frontend:** Built with React, TypeScript, and Vite for a fast and responsive user interface.
- **State Management:** Uses [zustand](https://github.com/pmndrs/zustand) for lightweight state management.
- **Real-Time Data:** Implements polling (or live updates) to fetch asset prices and compute PNL dynamically.
- **NEARMobile Wallet Integration:** Provides a dedicated module for NEAR wallet-selector logic (`near.factory.ts`) to facilitate secure wallet connections.
- **Scalable Architecture:** Includes a clear separation between UI components, hooks, services, and domain models for easier expansion and maintenance.
- **DevOps Ready:** Contains CI/CD workflows (e.g., GitHub Actions in `.github/workflows/build-web.yaml`) and helpful scripts (`generate_report.sh` and `get_only_tree.sh`) for repository management.

---

## Project Structure

```
.
├── CreateProjectPrompt.txt          # Initial project ideas and guidelines
├── generate_report.sh               # Script to generate a repo tree and file content report
├── get_only_tree.sh                 # Script to generate the repo tree excluding some directories
├── package.json                     # Root package configuration (dependencies, scripts, etc.)
├── repo_tree.txt                    # Generated repository tree overview
└── monorepo/                        
    ├── .github/                     
    │   └── workflows/               
    │       └── build-web.yaml       # CI/CD workflow for building the web app
    ├── apps/                        
    │   ├── api/                    # Optional API for data tracking or historical data
    │   └── web/                    
    │       ├── .gitignore           
    │       ├── README.md            # README specific to the web application
    │       ├── eslint.config.js     # ESLint configuration for the web app
    │       ├── index.html           # HTML entry point
    │       ├── package.json         # Package configuration for the web app
    │       ├── public/              # Static assets (e.g., Vite logo)
    │       ├── src/                 
    │       │   ├── App.tsx          # Main application component (includes TradePanel)
    │       │   ├── core/wallet/     
    │       │   │   └── near.factory.ts   # NEARMobile wallet-selector integration
    │       │   ├── modules/trading/     
    │       │   │   ├── components/  
    │       │   │   │   └── TradePanel.tsx  # Trading UI component
    │       │   │   ├── hooks/       
    │       │   │   │   └── useTrade.ts     # Trade state and polling hook
    │       │   │   ├── services/    
    │       │   │   │   └── price.service.ts  # Asset price fetching (mock implementation)
    │       │   │   ├── state/       
    │       │   │   │   └── trading.state.ts  # Zustand store for managing trades
    │       │   │   └── types/       
    │       │   │       └── trade.types.ts  # Domain models for trades and assets
    │       │   └── ...                
    │       ├── tsconfig.*.json      # TypeScript configurations for the app
    │       └── vite.config.ts       # Vite configuration for the web app
    ├── docker/                       # Docker-related files (if containerization is needed)
    ├── packages/                    
    │   ├── backend/                 # Shared backend logic (optional)
    │   ├── frontend/                # Reusable frontend modules (hooks, services, models)
    │   └── shared/                  # Shared types, utilities, and NEAR wallet logic
    ├── pnpm-workspace.yaml          # PNPM workspace configuration
    └── turbo.json                   # TurboRepo configuration for build caching and pipelines
```

---

## Getting Started

### Prerequisites

- **Node.js:** Make sure you have Node.js (v16 or later) installed.
- **PNPM:** This project uses PNPM for managing dependencies. Install it globally if you haven't already:

  ```bash
  npm install -g pnpm
  ```

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/near-dapp-template.git
   cd near-dapp-template
   ```

2. **Install Dependencies:**

   At the root of the repository, run:

   ```bash
   pnpm install
   ```

   This will install all dependencies for the monorepo and set up the workspace.

### Running the Web App

Navigate to the web application directory and start the development server:

```bash
cd monorepo/apps/web
pnpm run dev
```

Your dApp should now be running locally with hot module reloading.

### Building for Production

To build the web application, run:

```bash
pnpm run build
```

And to preview the production build locally:

```bash
pnpm run preview
```

---

## Wallet Integration

The NEARMobile wallet integration is handled in the `near.factory.ts` file within the `src/core/wallet/` directory. This module leverages the NEAR wallet-selector to:
- Initialize wallet connections.
- Manage user sessions.
- Facilitate secure transaction signing.

For more details on wallet-selector integration, refer to the [NEAR Wallet Selector documentation](https://github.com/near/wallet-selector).

---

## Trading Functionality

### How It Works

- **Opening a Trade:**  
  When a user initiates a swap (using the TradePanel UI), the app:
  - Fetches the current price of the target asset.
  - Computes the conversion based on the input amount.
  - Opens a new trade, setting the entry price.

- **Real-Time PNL Calculation:**  
  While a trade is open, the app polls for the latest asset price every few seconds to calculate the current unrealized PNL.

- **Closing a Trade:**  
  When a new swap occurs (or the user opts to close the trade), the current trade is finalized, its exit price and PNL computed, and the trade is saved in the history log.

### Key Modules

- **TradePanel Component (`TradePanel.tsx`):**  
  The main user interface to open and close trades and display real-time PNL.
  
- **Trade State Management (`trading.state.ts` & `useTrade.ts`):**  
  Utilizes zustand for managing trade state, including current trades and trade history.
  
- **Price Service (`price.service.ts`):**  
  Contains a mocked implementation to fetch asset prices (replace with real API integration as needed).

---

## Contribution

Contributions to improve this template are welcome. Please follow these guidelines:
- Adhere to the existing code style and architecture.
- Update or add tests when modifying functionality.
- Ensure new features integrate well with the modular project structure.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Additional Resources

- [NEAR Wallet Selector](https://github.com/near/wallet-selector)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

Start building your NEAR trading dApp today using this template as your foundation!

Happy coding!