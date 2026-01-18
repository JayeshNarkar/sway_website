# sway_website

## Technologies used

### Frontend

- **Next.js 15** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation
- **Next Auth** - Authentication solution
- **html-to-image** - Convert HTML elements to images
- **react-qr-code** - QR code generation
- **react-loader-spinner** - Loading indicators

### Backend & Database

- **Prisma** - ORM and database toolkit
- **Prisma Accelerate** - Connection pooling and caching
- **Nodemailer** - Email sending

### Cloud & Storage

- **Cloudinary** - Image and video management
- **Next Cloudinary** - Cloudinary integration for Next.js

### Development Tools

- **ESLint** - Code linting
- **TSX** - TypeScript execution
- **PostCSS** - CSS processing

### Additional Libraries

- **@hello-pangea/dnd** - Drag and drop functionality

## Preview

### /homepage

![Homepage Image](/screenshots/homepage.png)

### /catalogue

![Catalogue Image](/screenshots/catalogue.png)

### /admin/products

![Admin Products Page Image](/screenshots/admin_products.png)

### /admin/orders

![Admin orders Page Image](/screenshots/admin_orders.png)

### /admin/site-settings

![Site Settings Image](/screenshots/admin_website.png)

## Setup

### Step 1: Install Dependencies

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

### Step 2: Add Environment Variables

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

### Step 3: Set Up Prisma

Run the following commands to set up Prisma:

Generate the Prisma Client:

```
npx prisma generate
```

Push the Prisma Schema to the Database:

```
npx prisma db push
```

### Step 4: Run the Application

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
