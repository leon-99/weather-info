# Weather Info App

A modern Vue 3 weather application built with Vite, Vuetify, and Composition API.

## 🚀 Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Location-based Weather**: Automatically detect user location for instant weather info
- **Weather Alerts**: Display weather warnings and alerts for searched locations
- **Unit Conversion**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Modern Material Design UI that works on all devices
- **Weather Icons**: Beautiful weather condition icons
- **Background Images**: Dynamic backgrounds that change based on weather and time

## 🏗️ Architecture

The app follows Vue 3 Composition API best practices with a modular, maintainable structure:

### **Composables** (`/src/composables/`)
- **`useWeather.js`**: Manages weather data, API calls, and weather state
- **`useUnitConversion.js`**: Handles temperature and unit conversions
- **`useLocation.js`**: Manages geolocation services and user location
- **`useDialogs.js`**: Controls dialog/modal states and interactions

### **API Services** (`/src/api/`)
- **`weatherApi.js`**: Centralized API calls to Weatherbit.io service
- **Error handling and response processing**

### **Utilities** (`/src/utils/`)
- **`weatherUtils.js`**: Weather calculations, background image logic, AQI colors
- **`utils.js`**: Temperature conversion functions

### **Components** (`/src/components/`)
- **`SearchBar.vue`**: City search input with Vuetify styling
- **`MainInfo.vue`**: Main weather display (temperature, conditions, alerts)
- **`Details.vue`**: Detailed weather metrics (humidity, pressure, UV index, etc.)
- **`Footer.vue`**: App footer with copyright information

## 🛠️ Tech Stack

- **Vue 3**: Latest Vue.js with Composition API
- **Vite**: Fast build tool and dev server
- **Vuetify 3**: Material Design component library
- **Composition API**: Modern Vue 3 reactive state management
- **ES6+**: Modern JavaScript features
- **CSS3**: Custom styling with Vuetify utilities

## 📁 Project Structure

```
src/
├── api/
│   └── weatherApi.js          # Weather API service
├── assets/
│   ├── bg-images/             # Weather background images
│   ├── css/                   # Styles and animations
│   └── fonts/                 # Weather icons font
├── components/                 # Vue components
├── composables/               # Vue 3 composables
├── utils/                     # Utility functions
├── App.vue                    # Main app component
├── main.js                    # App entry point
├── countryCodes.js            # Country code mappings
└── index.html                 # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd weather-info

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
The app uses a Weatherbit.io API key. You can:
- Use the provided demo key for testing
- Replace with your own API key in `src/api/weatherApi.js`

## 🔧 Development

### Adding New Features
1. **New API endpoints**: Add to `src/api/weatherApi.js`
2. **New weather logic**: Add to `src/utils/weatherUtils.js`
3. **New state management**: Create or extend composables in `/src/composables/`
4. **New UI components**: Add to `/src/components/`

### Code Style
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Vue 3 Composition API**: Modern Vue patterns
- **Vuetify classes**: Use built-in styling when possible

## 📱 Responsive Design

The app is fully responsive with:
- **Mobile-first approach**
- **Vuetify grid system**
- **Adaptive background images**
- **Touch-friendly interactions**

## 🌟 Key Benefits of the New Architecture

1. **Maintainability**: Separated concerns with clear file organization
2. **Reusability**: Composables can be used across components
3. **Testability**: Isolated functions are easier to test
4. **Scalability**: Easy to add new features and weather data sources
5. **Performance**: Vite provides fast development and optimized builds
6. **Modern**: Uses latest Vue 3 and JavaScript features

## 🔮 Future Enhancements

- **Forecast Data**: Add 5-day weather forecasts
- **Weather Maps**: Interactive weather maps
- **Multiple Locations**: Save favorite cities
- **Weather History**: Historical weather data
- **Notifications**: Weather alert notifications
- **Offline Support**: Service worker for offline functionality

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
