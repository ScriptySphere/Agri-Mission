# 🛰️ NASA Farm Navigators

A real-time farming simulation game that uses live NASA Earth data to teach sustainable agriculture practices. Players make farming decisions based on actual satellite and weather data from around the world.

## 🌟 Features

- **Real NASA Data**: Live temperature, precipitation, and solar radiation data from NASA POWER API
- **70+ Countries**: Choose from countries worldwide with unique climate conditions
- **5 Crop Types**: Wheat, rice, corn, sorghum, and soybeans with realistic requirements
- **Sustainable Farming**: Learn about irrigation, fertilizers, and environmental impact
- **Weather Alerts**: Real-time warnings for droughts, floods, extreme temperatures
- **Multi-Season Play**: Build long-term farming strategies across seasons
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser
- Internet connection (for NASA API)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nasa-farm-navigators

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Choose Country**: Select from 70+ countries with real NASA climate data
2. **Select Crop**: Pick the best crop for your region's climate
3. **Make Decisions**: Choose irrigation and fertilizer strategies
4. **View Results**: See your yield, sustainability score, and environmental impact
5. **Continue Playing**: Progress through seasons and improve your farming

## 📱 Responsive Design

The game is fully responsive and optimized for:
- **Mobile phones** (320px+): Touch-friendly interface, optimized text sizes
- **Tablets** (768px+): Grid layouts, better spacing
- **Desktop** (1024px+): Full multi-column layouts, detailed information

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom components
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for consistent iconography
- **API**: NASA POWER API for real climate data
- **Deployment**: Static site compatible (Vercel, Netlify, etc.)

## 📊 NASA Data Sources

The game uses real data from NASA's POWER (Prediction of Worldwide Energy Resources) project:

- **Temperature**: Daily 2-meter air temperature
- **Precipitation**: Corrected total precipitation
- **Solar Radiation**: All-sky surface shortwave downward irradiance
- **Coverage**: Global data updated daily from satellites and weather stations

## 🎯 Learning Objectives

Players learn about:
- Climate impact on agriculture
- Sustainable farming practices
- Water conservation strategies
- Crop selection for different climates
- Environmental trade-offs in farming
- Real-world applications of satellite data

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configurations:

```env
# API Configuration (optional)
VITE_NASA_API_BASE_URL=https://power.larc.nasa.gov
VITE_NASA_API_TIMEOUT=10000

# Development (optional)
VITE_DEBUG_MODE=false
```

### Customization

- **Crops**: Modify `src/utils/gameData.js` to add new crops
- **Countries**: Update country list with new locations
- **Styling**: Customize Tailwind classes in `src/index.css`
- **Components**: Add new features in `src/components/`

## 📂 Project Structure

```
nasa-farm-navigators/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── LoadingScreen.jsx
│   │   ├── CountrySelect.jsx
│   │   ├── CropSelect.jsx
│   │   └── Results.jsx
│   ├── utils/            # Utility functions
│   │   └── gameData.js   # Game data and NASA API calls
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles and Tailwind
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🐛 Troubleshooting

### Common Issues

**NASA API not loading:**
- Check internet connection
- Verify NASA POWER API is accessible
- Game will use fallback mock data if API fails

**Performance on mobile:**
- Reduce batch size in `loadCountryData()`
- Enable service worker for caching (future feature)

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES2020 support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use semantic commit messages
- Follow ESLint configuration
- Test on multiple screen sizes
- Ensure accessibility compliance
- Optimize for performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA POWER Project**: For providing free access to global climate data
- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Vite Team**: For the fast build tool
- **Educational Community**: For inspiring this project

## 📧 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

**Built with 💚 for sustainable farming education**

*Learn farming, protect the planet, one season at a time!*