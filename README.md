# Nokorpost News

A stunning, modern, and futuristic Khmer Unicode news website. Nokorpost News delivers a visually impressive and highly functional platform for reading and discovering news in the Khmer language, built with a focus on user experience, design sophistication, and performance.

---

## 🚀 Key Features

### 🤖 AI-Powered Content Processing
- **Khmer Content Summarization:** Intelligent summarization using DeepSeek R1 model via Ollama
- **Real-time Translation:** Bidirectional Khmer ↔ English translation
- **Content Analysis:** Readability scoring, topic extraction, and sentiment analysis
- **Article Suggestions:** AI-generated article ideas based on trending topics
- **Content Insights:** Advanced analytics with AI-powered readability metrics

### 🌌 Modern Futuristic Design
- **Glassmorphism Effects:** Semi-transparent cards and containers with blur and layered depth.
- **Gradient Backgrounds:** Lively, multi-hued gradients throughout the site for a dynamic feel.
- **Neon Accents:** Highlighted interactive elements with glowing neon borders and shadows.
- **Floating Animations:** Subtle, smooth element movement for a sense of depth and modernity.

### 🇰🇭 Complete Khmer Unicode Support
- **Font:** Uses [Noto Sans Khmer](https://fonts.google.com/specimen/Noto+Sans+Khmer) for all content.
- **Typography:** Carefully tuned line heights, spacing, and font weights for optimal Khmer readability.
- **Accessibility:** Ensures proper rendering and accessibility across all major browsers and OSes.

### 🖱️ Advanced Interactions
- **Hover Animations:** Buttons, cards, and images respond with smooth, modern transitions.
- **Smooth Transitions:** All navigation and state changes are accompanied by elegant animations.
- **Auto-scrolling Hero Carousel:** The latest featured news scrolls automatically with manual swipe support.
- **Floating Action Buttons:** Quick access to main actions, designed with prominent neon-glass styles.

### 📱 Responsive Excellence
- **Mobile-First Approach:** Designed to look and feel perfect on every device: phones, tablets, desktops.
- **Adaptive Layouts:** News grid, navigation, and carousels adapt gracefully to any screen size.
- **Touch Optimization:** All interactive elements are large enough and well-spaced for touch screens.

### 📰 Rich Content Features
- **Category Filtering:** Instantly filter news by category with animated transitions.
- **Real-Time Search:** Lightning-fast, instant search for articles with Khmer input support.
- **Featured News Carousel:** Eye-catching top stories displayed with floating, animated cards.
- **Organized News Grid:** Clean, visually balanced grids with responsive image handling.

### ⚡ Performance Optimized
- **Component Structure:** Efficient, modular codebase for fast rendering and easy maintenance.
- **Image Optimization:** Lazy loading, responsive images, and proper aspect ratios.
- **Smooth Animations:** All animations are GPU-accelerated and optimized for performance.

---

## 🏗️ Built With

- **React** or modern SPA framework (edit to match your stack)
- **Styled Components / TailwindCSS** for dynamic, maintainable styles
- **Noto Sans Khmer** (web fonts)
- **Vite / Next.js** (edit if different) for fast build and HMR
- **Framer Motion** or CSS animation libraries for smooth transitions
- **Ollama + DeepSeek R1** for AI-powered content processing
- **Axios** for API communication

---

## 📸 Screenshots

> **Tip:** Paste screenshots or demo GIFs here to showcase glassmorphism, neon accents, Khmer text rendering, and responsive layouts.

---

## ✨ Getting Started

### Prerequisites

1. **Install Ollama** (for AI features):
    ```bash
    curl -fsSL https://ollama.ai/install.sh | sh
    ```

2. **Pull DeepSeek R1 Model**:
    ```bash
    ollama pull deepseek-r1
    ```

3. **Start Ollama Service**:
    ```bash
    ollama serve
    ```

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/sisovin/nokorpost-news.git
    cd nokorpost-news
    ```

2. **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Development Server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open in Browser**
    - Visit [http://localhost:3000](http://localhost:3000)
    - Access Admin Panel via the settings icon in the header
    - AI features will be available if Ollama is running

---

## ⚙️ Configuration

### AI Configuration
- **Ollama URL:** Default `http://localhost:11434`
- **Model:** DeepSeek R1 (`deepseek-r1:latest`)
- **Features:** Auto-detection of AI service availability
- **Fallbacks:** Graceful degradation when AI is unavailable

- **Fonts:** Noto Sans Khmer is loaded globally via CSS or imported in the main layout.
- **Theming:** Easily adjust gradients, neon colors, and glassmorphism intensity in the theme file.
- **Content:** Add or edit news articles in `/data` or through your CMS integration.

---

## 🛠️ Customization

### AI Features
- **Model Selection:** Change model in `src/services/aiService.ts`
- **Prompt Engineering:** Customize prompts for better Khmer language processing
- **API Endpoints:** Configure Ollama connection settings
- **Fallback Behavior:** Customize offline functionality

- **Change Colors:** Edit the theme config for different neon/glassmorphism palettes.
- **Add Categories:** Update the category list in the data or CMS.
- **Integrate CMS:** Connect to your favorite headless CMS for dynamic article management.

---

## 🖌️ Design Principles

- **Typography:** Carefully balanced for Khmer readability.
- **Spacing:** Consistent padding/margins for a harmonious layout.
- **Color Harmony:** Neon, gradients, and dark backgrounds blend for a futuristic look.
- **UX:** All transitions and animations enhance, never hinder, usability.

---

## 🌏 Khmer Unicode Ready

All content, navigation, search, and UI elements have full Khmer Unicode support, ensuring a seamless experience for Khmer-speaking users.

---

## 📱 Responsive Preview

| Desktop | Tablet | Mobile |
|---------|--------|--------|
| ![desktop](demo/desktop.png) | ![tablet](demo/tablet.png) | ![mobile](demo/mobile.png) |

---

## 📦 Production Ready

- **SEO Optimized:** Well-structured metadata and semantic HTML.
- **Accessibility:** Keyboard navigation, ARIA labels, and color contrast best practices.
- **Performance:** Lazy loading, code splitting, and optimized assets.

---

## 🤝 Contributing

Pull requests, issue reports, and feature suggestions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### AI Development
- Test with different Ollama models
- Improve Khmer language processing
- Add new AI-powered features
- Optimize prompt engineering

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [Ollama](https://ollama.ai/) for local AI model serving
- [DeepSeek R1](https://github.com/deepseek-ai/DeepSeek-R1) for advanced language processing
- [Noto Sans Khmer](https://fonts.google.com/specimen/Noto+Sans+Khmer)
- [Glassmorphism Inspiration](https://glassmorphism.com/)
- [Neon UI Inspiration](https://dribbble.com/tags/neon)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📣 Contact

Have questions or feedback? Reach out via [GitHub Issues](https://github.com/sisovin/nokorpost-news/issues) or email: <your-email@example.com>
