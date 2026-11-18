# 🛡️ PaisaGuard – Your Private AI Financial Assistant

**Financial clarity, without the trade-off.**

PaisaGuard is a privacy-first AI-powered financial assistant designed to help users understand their spending, identify recurring subscriptions, analyze transactions, and gain meaningful financial insights without sharing unnecessary personal information.

🌐 **Live Demo:** https://paisaguard-beta.vercel.app/

---

## ✨ Features

- **Privacy First:** Designed to keep financial data on the user's device whenever possible.
- **Transaction Analysis:** Analyze bank SMS messages and financial statements.
- **Smart Spending Insights:** Understand spending patterns and transaction history.
- **Subscription Detection:** Identify recurring payments and subscriptions.
- **AI Financial Assistant:** Get easy-to-understand answers about your financial activity.
- **PII Auto-Redaction:** Detect and redact sensitive information such as phone numbers, account details, and UPI IDs before cloud requests.
- **No Bank Connection Required:** Users can paste transaction messages or upload statements directly.

## 🔐 Privacy & Security

PaisaGuard follows a privacy-first approach:

1. On-device analysis whenever possible.
2. Sensitive information is detected and redacted before cloud AI requests.
3. Cloud AI is used as a fallback when additional processing is needed.
4. Users remain in control of the financial information they share.

**Your financial data belongs to you.**

## 🚀 How It Works

1. **Share a Statement:** Paste a bank SMS or upload a transaction statement.
2. **Protect Your Details:** Sensitive information is detected and redacted.
3. **Analyze Transactions:** Process financial information and identify spending patterns.
4. **Get Insights:** Understand expenses, recurring charges, and financial activity through simple explanations.

## 🛠️ Technology

The project uses Firebase for application infrastructure and Vercel for deployment.

Additional technologies and AI services are part of the application implementation.

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and configure:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY=your_recaptcha_site_key
```

**Important:** Never commit `.env.local`, Firebase service account credentials, or other private secrets to GitHub.

## 💻 Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd paisaguard
```

Install dependencies:

```bash
npm install
```

Configure your `.env.local` file with the required Firebase credentials.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

*Note: These commands assume a standard Next.js project with npm scripts configured.*

## ☁️ Deployment

PaisaGuard is deployed using Vercel.

To deploy your own instance:

1. Import your GitHub repository into Vercel.
2. Configure the required environment variables.
3. Verify Firebase Authentication and App Check configuration.
4. Deploy the application.

## 🎯 Project Goal

The goal of PaisaGuard is to make personal financial management more accessible, understandable, and privacy-conscious.

Users should be able to understand their money without compromising their privacy.

---

**PaisaGuard – Your Money. Your Privacy.**

Made with ❤️ for a more private financial future.
