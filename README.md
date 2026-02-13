# ABP Test Task

VIN Decoder - a web application for decoding vehicle VIN codes using the open NHTSA API. The application allows entering VIN codes, viewing decoding results, and exploring available variables with their descriptions. Includes history of the last 3 requests for quick access to previously decoded codes.

## Features

- **VIN Code Decoding**: Input and validation of VIN codes (17 characters, excluding I, O, Q)
- **Request History**: Save and reuse last 3 decoded VIN codes
- **Results Display**: Show all filled variables and their values
- **Variables Catalog**: List of all available variables with DataType and Group
- **Variable Details**: Detailed description of each variable
- **Responsive Design**: Correct display on devices from 420px to 1440px

## Deployment

[Deployment Link](https://abp-test.vercel.app/)

## Tech Stack

- **TypeScript**
- **React**
- **React Router v7**
- **React Hook Form**
- **Vite**
- **CSS Modules**
- **html-react-parser**
- **dompurify**

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ABP-test

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```
