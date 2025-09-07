# ⚖️ LegalTrack4
WATCH LIVE(Frontend)
https://legaltrackhost-12ep.vercel.app/

LegalTrack4 is an **AI + Blockchain powered legal tech platform** designed to modernize and simplify the legal process — from **FIR assistance to legal support services** — all in one place.  

It brings together **Artificial Intelligence, IPFS, and Blockchain** to make FIR filing **secure, tamper-proof, and transparent**. Built for users, police departments, and legal professionals, it ensures FIRs are immutable and traceable on the blockchain while leveraging AI for predictions and automation.  

---

## 📌 Problem Statement

The legal process in many regions suffers from **delays, lack of transparency, and risks of tampering with records**. FIRs (First Information Reports), in particular, are prone to mismanagement or loss in traditional systems. Victims often face challenges like:  

- Complex manual filing procedures  
- Lack of legal knowledge (which sections apply)  
- Data integrity issues (tampering or lost files)  
- Difficulty in tracking FIR status  

---

## 💡 Our Solution

LegalTrack4 solves these challenges by combining **AI, decentralized storage, and blockchain**:  

- 🧠 **AI-driven Legal Prediction** – Suggests relevant sections for FIRs using ANN models.  
- 🗣️ **Voice-to-Text FIR Filing** – Helps victims file FIRs faster.  
- 🔗 **Blockchain Integration** – Stores FIR CIDs on Flow blockchain (immutable, tamper-proof).  
- 📂 **IPFS Storage** – Decentralized FIR storage with unique content hashes.  
- 📞 **Emergency Support** – Contact police/lawyers instantly.  

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 with Next.js 15  
- **Styling:** Tailwind CSS, ShadCN UI, Framer Motion  
- **Auth:** Clerk Authentication  
- **Forms & Validation:** React Hook Form, Zod  

### Backend
- **Runtime:** Node.js  
- **AI Models:** ANN-based prediction for legal sections  
- **AI Services:** OpenRouter, Gemini API  
- **PDF Generation:** jsPDF  
- **Storage:** IPFS (via local node and Pinata API)  

### Blockchain
- **Network:** Flow Blockchain  
- **Smart Contract:** `FIRSystem`  
- **Contract Address:** `0xd9145CCE52D386f254917e481eB44e9943F39138`  
- **Wallet Integration:** MetaMask  

---

## 📜 Smart Contract Details

The `FIRSystem` contract is deployed on **Flow Blockchain** at:  

👉 **Contract Address:** `0xd9145CCE52D386f254917e481eB44e9943F39138`  

### Functions:
- **registerFIR(cid)** → Stores FIR’s IPFS CID on the blockchain  
- **viewFIR(firId)** → Fetch FIR details by ID  
- **updateFIR(firId, status)** → Police officers update FIR status  
- **addOfficer(address)** → Admin adds authorized officers  
- **removeOfficer(address)** → Admin removes officers  

This ensures **immutability, transparency, and controlled updates** of FIRs.  

---

## 📁 Project Structure

legaltrack4/
├── backend/ # Node.js backend logic
│ └── index.js # Backend server entry point
├── legaltrack4/ # Frontend (Next.js)
│ ├── app/ # Pages, layouts, and routes
│ ├── components/ # UI Components
│ ├── public/ # Static files
│ ├── styles/ # Global styles
│ └── utils/ # Helper functions
└── .env.local # Environment variables


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Editx01/legaltrack4.git
cd legaltrack4

cd legaltrack4
npm install

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Zmx5aW5nLXRlcm1pdGUtNjguY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_bUjW0NL2LNQpJYwqdcJVLFkacyAgvJIqT5ro0qBcgf

OPENROUTER_API_KEY=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
GEMINI_API_KEY=AIzaSyBt0XNQLkSXlllJdUT3O_hZUkazJMDSCC8

# Backend Auth
API_KEY=9cf576e52c46eb91f35a
API_SECRET=1ba8fc772e3ab70b0ab2d03e2a4cf8962cdc5f7c6df2e937b1f6454cb29ac40e
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# IPFS / Pinata
PINATA_API_KEY=ef46a46dcffe5494f425
PINATA_SECRET_API_KEY=1ba8fc772e3ab70b0ab2d03e2a4cf8962cdc5f7c6df2e937b1f6454cb29ac40e

Run the Frontend
npm run dev

Run the Backend

Open a new terminal:

cd backend
node index.js


🔗 FIR Filing Process in LegalTrack4
1. User Information Collection

Collects personal details (name, contact, ID proof) and incident details (date, time, description, witnesses).

2. Review & PDF Generation

Users review before submitting.

jsPDF generates a PDF with hash for data integrity.

3. IPFS Storage

FIR uploaded to local IPFS node (http://localhost:3001/upload).

Returns a CID (unique identifier).

4. Blockchain Integration

Users connect MetaMask wallet.

CID is registered on Flow blockchain via FIRSystem contract.

Creates an immutable FIR record.

5. Status Tracking

Shows FIR ID, IPFS CID, hash, blockchain status.

Users can download receipt as PDF.

Additional Blockchain Features

View FIRs by ID

Update FIR status (Police Officers only)

Manage Officers (Admins can add/remove officers)

🧠 Features Overview

✅ AI Legal FIR Assistance (ANN Model)

🗣️ Voice-to-Text FIR Filing

📋 Legal AI Chatbot

📞 Emergency Numbers Integration

🧾 PDF FIR Generation

🌐 Responsive, Animated UI

🔗 Blockchain + IPFS FIR Storage


Demo & Screenshots
Demo: https://1drv.ms/v/c/e44270becb740185/EaMsDn5zQ5xCuJVl09vXctEB2A4uGFZPMq6jWKbeDKjuyA?e=UPTs0c
screenshort: https://1drv.ms/f/c/e44270becb740185/EqJyOk90KhRGg6zZg9Epc8IB_VGRO6VcY-z-c96NNxzBpQ?e=G3QxOO
ppt: https://gamma.app/docs/LEGALTRACK-Revolutionizing-FIR-Filing-evufj3uu6z7ge3l
