# 🚀 Contentful Setup Handleiding - Madoc Website

Deze handleiding helpt je om Contentful CMS te koppelen aan je Madoc website.

---

## 📋 Wat Je Nodig Hebt

- ✅ Contentful account (gratis)
- ✅ Space ID en API access token
- ✅ Node.js geïnstalleerd (voor lokaal testen)

---

## 🏗️ DEEL 1: Contentful Account Opzetten

### Stap 1: Maak een Contentful Account

1. Ga naar **https://www.contentful.com/**
2. Klik **"Sign Up"** en kies het **gratis plan**
3. Voltooi de registratie

### Stap 2: Maak een Space aan

1. Klik **"Create a space"**
2. Naam: `Madoc Projecten`
3. Kies template: **"Empty space"**
4. Klik **"Create space"**

---

## 📦 DEEL 2: Content Model Maken

### Stap 1: Ga naar Content Model

1. Klik in de linker sidebar op **"Content model"**
2. Klik **"Add content type"**

### Stap 2: Maak "Project" Content Type

- **Name:** `Project`
- **API Identifier:** `project`
- Klik **"Create"**

### Stap 3: Voeg Velden Toe

Voeg de volgende velden toe (in deze volgorde):

#### 1️⃣ Titel (verplicht)
- Type: **Text** (kort)
- Name: `Titel`
- Field ID: `titel`
- ✅ Validations: **Required field**

#### 2️⃣ Slug (verplicht & uniek)
- Type: **Text** (kort)
- Name: `Slug`
- Field ID: `slug`
- ✅ Validations: **Required field** + **Unique field**

#### 3️⃣ Locatie
- Type: **Text** (kort)
- Name: `Locatie`
- Field ID: `locatie`

#### 4️⃣ Jaar
- Type: **Number**
- Name: `Jaar`
- Field ID: `jaar`
- Validations: **Integer**

#### 5️⃣ Categorie
- Type: **Text** (kort)
- Name: `Categorie`
- Field ID: `categorie`
- Appearance: **Dropdown**
- Validations: **Accept only specified values**
  - `Woongebouw`
  - `Kantoor`
  - `Publiek`
  - `Renovatie`

#### 6️⃣ Beschrijving
- Type: **Rich text**
- Name: `Beschrijving`
- Field ID: `beschrijving`

#### 7️⃣ Hoofdbeeld (verplicht)
- Type: **Media** → **One file**
- Name: `Hoofdbeeld`
- Field ID: `hoofdbeeld`
- ✅ Validations: **Required field** + **Accept only images**

#### 8️⃣ Extra Beelden
- Type: **Media** → **Many files**
- Name: `Extra Beelden`
- Field ID: `extraBeelden`
- Validations: **Accept only images** + **Max 10 files**

### Stap 4: Sla Op

Klik rechtsboven op **"Save"**

✅ **Je Content Model is klaar!**

---

## 🔑 DEEL 3: API Keys Ophalen

### Stap 1: Ga naar Settings

1. Klik op **"Settings"** (tandwiel icoon linksboven)
2. Klik **"API keys"**

### Stap 2: Maak API Key aan

1. Klik **"Add API key"**
2. Name: `Madoc Website Productie`
3. Klik **"Save"**

### Stap 3: Kopieer de Keys

Je ziet nu twee keys:

```
Space ID: abc123xyz456
Content Delivery API - access token: jouw_lange_token_hier
```

⚠️ **BELANGRIJK:** Bewaar deze veilig! Je hebt ze straks nodig.

---

## 📸 DEEL 4: Eerste Project Toevoegen

### Test de setup met een voorbeeld project:

1. Ga naar **"Content"** tab
2. Klik **"Add entry"** → **"Project"**
3. Vul in:
   - **Titel:** `Testproject`
   - **Slug:** `testproject` (geen spaties, kleine letters)
   - **Locatie:** `Gent`
   - **Jaar:** `2024`
   - **Categorie:** `Woongebouw`
   - **Beschrijving:** `Dit is een testproject om de integratie te checken.`
4. Upload een **hoofdbeeld** (bijv. een screenshot of testfoto)
5. Upload 1-2 **extra beelden**
6. Klik rechtsboven op **"Publish"** (niet "Save", maar "Publish"!)

✅ **Je eerste project is live in de API!**

---

## 💻 DEEL 5: Website Koppelen (Lokaal Testen)

### Stap 1: Installeer Contentful Package

Open een terminal in je projectmap en voer uit:

```bash
npm install contentful
```

### Stap 2: Maak .env.local Bestand

1. Kopieer het `.env.example` bestand
2. Hernoem de kopie naar `.env.local`
3. Vul je keys in:

```env
VITE_CONTENTFUL_SPACE_ID=abc123xyz456
VITE_CONTENTFUL_ACCESS_TOKEN=jouw_token_hier
```

⚠️ Gebruik je **echte keys** uit Contentful!

### Stap 3: Start Development Server

```bash
npm run dev
```

### Stap 4: Test de Website

1. Open de website in je browser (meestal http://localhost:5173)
2. Klik op **"Projecten"**
3. Je zou bovenaan een **blauw vak** moeten zien: "✅ Data vanuit Contentful"
4. Je ziet je **Testproject** in de lijst
5. Klik erop → Je ziet de detail pagina met je foto's

✅ **Het werkt!**

---

## 🎉 DEEL 6: Projecten Toevoegen

Nu kun je projecten toevoegen zoals in Squarespace:

### Zo voeg je een nieuw project toe:

1. Ga naar **Contentful** → **Content** tab
2. Klik **"Add entry"** → **"Project"**
3. Vul alle velden in
4. Upload foto's:
   - 1 hoofdbeeld (dit zie je op de projectenlijst)
   - Maximaal 10 extra beelden (deze zie je op de detail pagina)
5. Klik **"Publish"**
6. Ververs je website → Project is live!

### Zo bewerk je een project:

1. Ga naar **Content** tab
2. Klik op het project
3. Pas aan wat je wilt
4. Klik **"Publish"** (niet alleen "Save"!)
5. Ververs website → Wijzigingen zijn live!

### Zo verwijder je een project:

1. Open het project in Contentful
2. Klik **"Unpublish"**
3. Of: Klik op de **drie puntjes** → **"Delete"**

---

## 🚀 DEEL 7: Online Zetten (Later)

Als je hosting hebt gekozen (Vercel/Netlify/eigen hosting):

### Voor Vercel/Netlify:

1. Ga naar je project dashboard
2. Klik **"Environment Variables"** of **"Settings"**
3. Voeg toe:
   - `VITE_CONTENTFUL_SPACE_ID` = [je space ID]
   - `VITE_CONTENTFUL_ACCESS_TOKEN` = [je token]
4. Klik **"Redeploy"** of **"Trigger deploy"**
5. ✅ Website is live met Contentful!

### Voor Eigen Hosting:

1. Build je website: `npm run build`
2. Upload de `dist` folder naar je server
3. Zorg dat environment variables op je server staan (via control panel/SSH)

---

## ❓ Problemen Oplossen

### "Projecten laden..." blijft staan
- ✅ Check of je `.env.local` bestand bestaat
- ✅ Check of je keys correct zijn (geen spaties!)
- ✅ Herstart je development server (`npm run dev`)

### Projecten tonen niet
- ✅ Check of je project **gepubliceerd** is (niet alleen opgeslagen)
- ✅ Check de browser console (F12) voor errors
- ✅ Check of je `slug` uniek is (geen dubbele)

### Foto's laden niet
- ✅ Check of je foto's hebt geüpload in Contentful
- ✅ Check of foto formaat niet te groot is (max 20MB)
- ✅ Check of je "Publish" hebt geklikt (niet alleen "Save")

### "Mock data" melding
Dit betekent dat Contentful niet is gekoppeld:
- ✅ Check je `.env.local` bestand
- ✅ Herstart development server
- Als je lokaal test zonder keys, dan is mock data normaal

---

## 📊 Wat Nu?

### Je kunt nu:

✅ **50 projecten toevoegen** via Contentful  
✅ **Foto's uploaden** (hoofdbeeld + 10 extra per project)  
✅ **Teksten bewerken** met rich text editor  
✅ **Projecten publiceren/unpubliceren**  
✅ **Lokaal testen** voor je online gaat  

### Volgende stap:

Kies een **hosting** oplossing en zet je website live:
- **Vercel** (aanbevolen, gratis)
- **Netlify** (ook gratis)
- **Eigen hosting** (als je die al hebt)

---

## 🆘 Hulp Nodig?

Als je ergens vastloopt:
1. Check de browser console (F12 → Console tab)
2. Check de terminal voor error messages
3. Check of alle stappen correct zijn gevolgd
4. Vraag om hulp en deel de error message

---

**Succes met je Madoc website! 🎨**
