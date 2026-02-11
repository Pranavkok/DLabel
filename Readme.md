# DataLabel

DataLabel is a **decentralized data-labeling marketplace**.

Think of it like this:
- Companies bring a big box of images that need labels (cat, dog, car, etc.).
- People (labelers) label and verify those images.
- Payments are backed by an Ethereum smart contract.

So this project solves a real problem in AI: **getting high-quality labeled data with fair, trackable rewards**.

## 1. Problem This Project Solves

AI models need labeled data, but traditional labeling platforms have issues:
- low trust (who did what?)
- payment transparency problems
- weak quality control

DataLabel solves this by combining:
- a verification system (2 out of 3 votes)
- reputation scoring
- on-chain ETH-backed funding and claim flow

## 2. High-Level Solution

DataLabel has 2 sides:
- **Company side**: creates a dataset post, locks ETH, uploads images in a ZIP.
- **Labeler side**: labels images, verifies others, earns rewards, claims with wallet.

Quality is enforced with consensus:
- label goes to `PENDING_VERIFICATION`
- 3 verifiers vote `YES/NO`
- if at least 2 votes are YES -> `VERIFIED`
- if at least 2 votes are NO -> label reset, image becomes `UNLABELED`

## 3. Tech Stack

### Frontend (`frontend/`)
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Wagmi + Viem + Ethers for wallet and contract calls
- React Query for data provider layer

### Backend (`server/`)
- Express 5 + TypeScript
- Prisma ORM + PostgreSQL
- JWT auth
- Cloudinary image hosting
- Multer + AdmZip for ZIP upload and extraction
- Ethers for backend signature generation

### Blockchain
- Network: **Ethereum Sepolia**
- Contract address hardcoded at: `frontend/lib/contract.ts`
- Key contract methods used:
  - `createDataset(datasetId, durationDays)`
  - `claimTokens(datasetId, amount, nonce, signature)`

## 4. Project Structure (Part by Part)

```text
DLabel/
  frontend/
    app/
      page.tsx                        # Landing page
      auth/company/page.tsx          # Company login/register
      auth/user/page.tsx             # Labeler wallet auth
      (dashboard)/...
    components/Sidebar.tsx           # Role-based sidebar
    lib/api.ts                       # API client wrapper
    lib/auth-context.tsx             # Local auth state (token/role/user/company)
    lib/wagmi.ts                     # Wallet chain config (Sepolia)
    lib/contract.ts                  # Contract ABI + address

  server/
    src/index.ts                     # Express server entry
    src/routes/*.ts                  # API route maps
    src/controllers/*.ts             # Business logic
    src/middleware/auth.ts           # JWT role auth middlewares
    src/middleware/upload.ts         # ZIP upload rules (100MB)
    src/lib/prisma.ts                # Prisma client via pg adapter
    src/lib/cloudinary.ts            # Cloudinary config
    src/utils/reputation.ts          # Reputation tiers/multipliers
    src/utils/rewards.ts             # Earnings calculation logic
    src/utils/signature.ts           # Claim signature generator
    prisma/schema.prisma             # DB schema
    prisma/migrations/*              # SQL migrations
```

## 5. Data Model (Database)

Core tables/models:
- `User`: wallet-based labeler profile, reputation, stats, token totals
- `Company`: email/password account + wallet
- `Post`: dataset post created by company, funding pools, labels, status
- `Data`: each uploaded image and its labeling lifecycle
- `Verification`: votes (`YES/NO`) by verifiers
- `Transaction`: ledger for lock/withdrawal and other payment events

Important enums:
- `PostStatus`: `ACTIVE`, `COMPLETED`, `EXPIRED`
- `DataStatus`: `UNLABELED`, `PENDING_VERIFICATION`, `VERIFIED`
- `TransactionType`: `LABELING`, `VERIFICATION`, `WITHDRAWAL`, `DATASET_LOCK`

## 6. Full User Flow

### Company flow
1. Register/Login (`/auth/company`)
2. Connect wallet in browser (must match company wallet in profile)
3. Create post:
   - enter dataset info
   - lock ETH on-chain (`createDataset`)
   - backend stores post + `DATASET_LOCK` transaction
4. Upload ZIP images to that post
5. Monitor labeling and verification progress

### Labeler flow
1. Connect wallet (`/auth/user`)
2. Open Label page and submit labels
3. Open Verify page and vote YES/NO on others' labels
4. Earn based on verified work + reputation multiplier
5. Claim earnings:
   - backend prepares signed claims
   - frontend calls `claimTokens` on contract
   - backend marks transaction confirmed

## 7. Reward and Reputation Logic

### Reputation
From `server/src/utils/reputation.ts`:
- Verified label: `+10`
- Rejected label: `-15`
- Minimum reputation floor: `-100`

### Multipliers
- `BEGINNER`: 1.0x
- `INTERMEDIATE`: 1.2x
- `ADVANCED`: 1.5x
- `EXPERT`: 2.0x
- `MASTER`: 2.5x

### Pool split
When company locks ETH:
- 70% -> labeling pool
- 30% -> verification pool

## 8. API Surface

Base URL default: `http://localhost:3001`

### Auth
- `POST /api/auth/connect`
- `POST /api/auth/company/login`
- `POST /api/auth/company/register`
- `POST /api/auth/logout`

### User
- `GET /api/user/dashboard`
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `GET /api/user/earnings`
- `GET /api/user/transactions`
- `POST /api/user/claim`

### Label
- `GET /api/label/next`
- `POST /api/label/submit`

### Verify
- `GET /api/verify/next`
- `POST /api/verify/submit`

### Company
- `GET /api/company/dashboard`
- `POST /api/company/post/create`
- `POST /api/company/post/images` (multipart ZIP)
- `GET /api/company/posts`
- `GET /api/company/posts/:postId`
- `GET /api/company/posts/:postId/images`
- `GET /api/company/profile`
- `PUT /api/company/profile`

### Transactions
- `GET /api/transactions/:id`
- `POST /api/transactions/confirm`

## 9. Environment Variables

Use the example files already included in the repo:
- `server/.env.example`
- `frontend/.env.local.example`

Copy them into active env files:

```bash
cp server/.env.example server/.env
cp frontend/.env.local.example frontend/.env.local
```

If `cp` is not available on your terminal, create the files manually with the same values.

`server/.env.example` includes:
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `BACKEND_PRIVATE_KEY`
- `CONTRACT_ADDRESS`

`frontend/.env.local.example` includes:
- `NEXT_PUBLIC_API_URL`

## 10. How to Run Locally

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL running
- MetaMask in browser
- Sepolia test ETH (for wallet actions)
- Cloudinary account

### Backend setup

```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

Backend runs at: `http://localhost:3001`

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

Open `http://localhost:3000`.

## 11. 5-Minute Demo Path (Click by Click)

If you just want to see the project working quickly, follow this exact path.

1. Start backend:
```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```
2. Start frontend in a new terminal:
```bash
cd frontend
npm install
npm run dev
```
3. Open `http://localhost:3000`.
4. Click `Company Login` -> `Register`.
5. Fill company details and submit.
6. Go to `My Posts` -> `Create Post`.
7. Fill dataset name, labels (example: `cat,dog`), ETH amount, and days.
8. Approve MetaMask transaction for `createDataset`.
9. Open the created post and upload a ZIP with images.
10. Open a second browser/profile (or logout) and click `Connect Wallet` as a labeler.
11. Go to `Label` and label a few images.
12. Go to `Validate` and vote on labels.
13. Go to `My Earnings` and click `Claim ETH` (if pending claim > 0).

Result: full lifecycle complete from company funding -> labeling/verification -> on-chain claim.

## 12. Build and Production Commands

### Backend

```bash
cd server
npm run build
npm run start
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

## 13. Notes for Developers

- `server/dist/` and `server/src/generated/prisma/` are generated artifacts; do not hand-edit generated Prisma code.
- Upload endpoint expects a single file field named `zipFile`.
- Company post IDs are UUIDs and are also used as dataset IDs for contract operations.
- Auth tokens are JWTs stored client-side in local storage (`datalabel_auth`).
- Current frontend assumes Sepolia chain.

## 14. Current Gaps / Practical Caveats

- No automated tests are present in this repository yet.
- Smart contract source is not included here; only ABI/address usage exists in frontend/backend utilities.
- Default JWT fallback secret exists in code; always set `JWT_SECRET` in real deployments.

## 15. One-Line Summary

DataLabel is a full-stack Web3 labeling platform where companies fund datasets with ETH and contributors earn by labeling and verifying images with reputation-based rewards.