# Data Visualization Dashboard

A comprehensive full-stack data visualization dashboard built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This application provides powerful analytics and interactive visualizations for exploring global intelligence data.

![Dashboard Preview](https://via.placeholder.com/1200x600/1a1a2e/ffffff?text=Data+Insights+Dashboard)

## 🌟 Features

### Interactive Visualizations
- **Intensity by Sector**: Bar chart showing average intensity across different sectors
- **Likelihood by Region**: Regional analysis with color-coded bars
- **Relevance by Topic**: Horizontal bar chart displaying topic relevance
- **Country Distribution**: Pie chart showing data distribution across countries
- **Year Trends**: Multi-line chart tracking intensity, likelihood, and relevance over time
- **PESTLE Analysis**: Radar chart for Political, Economic, Social, Technological, Legal, and Environmental factors

### Advanced Filtering System
- **End Year**: Filter by projection end year
- **Topics**: Filter by specific topics
- **Sector**: Industry/sector filtering
- **Region**: Geographic region selection
- **PESTLE**: Filter by PESTLE category
- **Source**: Data source filtering
- **SWOT**: SWOT analysis filtering
- **Country**: Country-specific filtering
- **City**: City-level filtering

### Key Metrics Dashboard
- Total Records count
- Average Intensity score
- Average Relevance rating
- Average Likelihood percentage

### Design Features
- 🎨 Modern glassmorphism UI design
- 🌈 Beautiful gradient color schemes
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive layout
- 🌙 Dark theme optimized
- ⚡ Fast and performant

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: For bar charts
- **Recharts**: For advanced visualizations
- **Framer Motion**: Animation library
- **Axios**: HTTP client

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd data-viz-dashboard
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/dataVizDB
# PORT=5000

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend application will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
data-viz-dashboard/
├── backend/
│   ├── models/
│   │   └── Data.js              # MongoDB schema
│   ├── server.js                # Express server & API routes
│   ├── seedData.js              # Database seeding script
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── IntensityBySector.js
│   │   │   │   ├── LikelihoodByRegion.js
│   │   │   │   ├── RelevanceByTopic.js
│   │   │   │   ├── CountryDistribution.js
│   │   │   │   ├── YearTrends.js
│   │   │   │   └── PestleAnalysis.js
│   │   │   ├── FilterPanel.js   # Multi-filter component
│   │   │   ├── StatsOverview.js # Key metrics display
│   │   │   └── LoadingSpinner.js
│   │   ├── App.js               # Main application component
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles & Tailwind
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Tailwind configuration
│   └── postcss.config.js        # PostCSS configuration
│
└── README.md                    # This file
```

## 🔌 API Endpoints

### GET `/api/data`
Fetch all data with optional filters
- Query Parameters: `endYear`, `topic`, `sector`, `region`, `pestle`, `source`, `swot`, `country`, `city`
- Returns: Array of data objects

### GET `/api/filters`
Get unique values for all filter options
- Returns: Object with arrays of unique values for each filter

### GET `/api/analytics`
Get aggregated analytics data
- Query Parameters: Same as `/api/data`
- Returns: Object containing:
  - `intensityBySector`
  - `likelihoodByRegion`
  - `relevanceByTopic`
  - `countryDistribution`
  - `yearTrends`
  - `pestleAnalysis`

### GET `/api/health`
Health check endpoint
- Returns: Server status and timestamp

## 💾 Database Schema

```javascript
{
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
  city: String,
  swot: String
}
```

## 🎨 Customization

### Changing Colors
Edit `frontend/src/index.css` to modify color schemes:
```css
:root {
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  /* Add more custom gradients */
}
```

### Adding New Charts
1. Create a new component in `frontend/src/components/charts/`
2. Import and use in `App.js`
3. Add corresponding data processing in backend's `/api/analytics` route

### Modifying Filters
Update `filterConfig` array in `FilterPanel.js` to add/remove filters

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB service is active

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Export charts as PNG/PDF
- [ ] Real-time data updates with WebSocket
- [ ] Custom dashboard layouts
- [ ] Data upload functionality
- [ ] Advanced search with Elasticsearch
- [ ] Machine learning predictions
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Chart.js for beautiful charts
- Recharts for advanced visualizations
- Framer Motion for smooth animations
- Tailwind CSS for rapid UI development
- MongoDB for flexible data storage

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ using MERN Stack & Tailwind CSS
