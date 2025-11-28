# 📦 Benodigde Packages voor Madoc Website

## Contentful Integratie

Voor de Contentful CMS integratie moet je het volgende package installeren:

```bash
npm install contentful
```

### Wat doet dit package?

- **contentful** - Official Contentful JavaScript SDK
  - Maakt verbinding met Contentful API
  - Haalt projecten op uit je Contentful space
  - Zorgt voor type-safe data transformatie

### Versie

- Gebruikt de nieuwste stabiele versie (automatisch door npm)
- Compatible met React + Vite projecten

### Andere Dependencies

De volgende packages zijn al geïnstalleerd (standaard React/Vite setup):

- `react` - Frontend framework
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing/navigatie
- `vite` - Build tool

## Installatie Commando's

### Voor nieuwe setup:

```bash
# Installeer alle dependencies
npm install

# Installeer Contentful
npm install contentful
```

### Development server starten:

```bash
npm run dev
```

### Production build maken:

```bash
npm run build
```

---

**Note:** Deze packages zijn alleen nodig voor lokale development en worden automatisch meegenomen bij het builden voor productie.
