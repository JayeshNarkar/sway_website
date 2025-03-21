# sway_website

## Step 1: Install Dependencies

First, install the required npm packages:

```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Step 2: Add Environment Variables

Create a .env file in the root of your project and add the following variables:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=your_prisma_accelerate_url
DIRECT_DATABASE_URL=your_direct_sql_db_url

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Replace the placeholders (your\_...) with the actual values for your project.

## Step 3: Set Up Prisma

Run the following commands to set up Prisma:

Generate the Prisma Client:

```
npx prisma generate
```

Push the Prisma Schema to the Database:

```
npx prisma db push
```

## Step 4: Run the Application

Development Mode
To run the application in development mode, use:

```
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
```

Open http://localhost:3000 in your browser to view the application.

Production Mode
To build and run the application in production mode, use:

Build the Application:

```
npm run build

# or

yarn build

# or

pnpm build

# or

bun build
```

Start the Production Server:

```
npm run start

# or

yarn start

# or

pnpm start

# or

bun start
```
