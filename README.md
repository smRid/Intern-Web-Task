# Dua & Ruqyah - Islamic Supplications App

A modern, responsive web application built with Next.js that displays Islamic Duas and Ruqyah with Arabic text, transliteration, and English translations.

---

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Category-based Navigation**: Browse duas by categories and subcategories
- **Multi-language Support**: Arabic text with English translations and transliterations
- **Audio Playback**: Play audio recitations for duas (when available)
- **Search Functionality**: Search for specific duas
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Database Integration**: Uses SQLite database for efficient data storage and retrieval
---

## 🔗 Live Demo : [View Live Demo](https://ruqiyahduas.vercel.app/)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite
- **Icons**: Lucide React
- **Fonts**: Inter (UI), Amiri (Arabic text)

---


## Database Schema

The application uses three main tables:

### Categories Table
- `id`: Primary key
- `cat_id`: Category ID
- `cat_name_en`: Category name in English
- `cat_name_bn`: Category name in Bengali
- `no_of_subcat`: Number of subcategories
- `no_of_dua`: Number of duas
- `cat_icon`: Category icon name

### Sub-Categories Table
- `id`: Primary key
- `cat_id`: Foreign key to categories
- `subcat_id`: Subcategory ID
- `subcat_name_en`: Subcategory name in English
- `subcat_name_bn`: Subcategory name in Bengali
- `no_of_dua`: Number of duas

### Duas Table
- `id`: Primary key
- `cat_id`: Foreign key to categories
- `subcat_id`: Foreign key to subcategories
- `dua_id`: Dua ID
- `dua_name_en`: Dua name in English
- `dua_name_bn`: Dua name in Bengali
- `top_en`: Top description in English
- `dua_arabic`: Arabic text
- `transliteration_en`: English transliteration
- `translation_en`: English translation
- `bottom_en`: Bottom description in English
- `refference_en`: Reference in English
- `audio`: Audio file URL

## Getting Started

**Install Dependencies**
   ```bash
   npm install
   ```

**Run Development Server**
   ```bash
   npm run dev
   ```

**Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

