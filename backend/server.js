const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Data = require('./models/Data');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dataVizDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes

// Get all data with filters
app.get('/api/data', async (req, res) => {
  try {
    const {
      endYear,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city
    } = req.query;

    let filter = {};

    // Build filter object based on query parameters
    if (endYear) filter.end_year = endYear;
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (sector) filter.sector = { $regex: sector, $options: 'i' };
    if (region) filter.region = { $regex: region, $options: 'i' };
    if (pestle) filter.pestle = { $regex: pestle, $options: 'i' };
    if (source) filter.source = { $regex: source, $options: 'i' };
    if (swot) filter.swot = { $regex: swot, $options: 'i' };
    if (country) filter.country = { $regex: country, $options: 'i' };
    if (city) filter.city = { $regex: city, $options: 'i' };

    const data = await Data.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unique filter values
app.get('/api/filters', async (req, res) => {
  try {
    const [
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swots,
      countries,
      cities
    ] = await Promise.all([
      Data.distinct('end_year'),
      Data.distinct('topic'),
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('swot'),
      Data.distinct('country'),
      Data.distinct('city')
    ]);

    res.json({
      endYears: endYears.filter(y => y !== '').sort(),
      topics: topics.filter(t => t !== '').sort(),
      sectors: sectors.filter(s => s !== '').sort(),
      regions: regions.filter(r => r !== '').sort(),
      pestles: pestles.filter(p => p !== '').sort(),
      sources: sources.filter(s => s !== '').sort(),
      swots: swots.filter(s => s !== '').sort(),
      countries: countries.filter(c => c !== '').sort(),
      cities: cities.filter(c => c !== '').sort()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics/aggregations
app.get('/api/analytics', async (req, res) => {
  try {
    const {
      endYear,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city
    } = req.query;

    let matchStage = {};
    if (endYear) matchStage.end_year = endYear;
    if (topic) matchStage.topic = { $regex: topic, $options: 'i' };
    if (sector) matchStage.sector = { $regex: sector, $options: 'i' };
    if (region) matchStage.region = { $regex: region, $options: 'i' };
    if (pestle) matchStage.pestle = { $regex: pestle, $options: 'i' };
    if (source) matchStage.source = { $regex: source, $options: 'i' };
    if (swot) matchStage.swot = { $regex: swot, $options: 'i' };
    if (country) matchStage.country = { $regex: country, $options: 'i' };
    if (city) matchStage.city = { $regex: city, $options: 'i' };

    const pipeline = Object.keys(matchStage).length > 0 
      ? [{ $match: matchStage }] 
      : [];

    // Intensity by sector
    const intensityBySector = await Data.aggregate([
      ...pipeline,
      {
        $match: { sector: { $ne: '' } }
      },
      {
        $group: {
          _id: '$sector',
          avgIntensity: { $avg: '$intensity' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgIntensity: -1 } },
      { $limit: 10 }
    ]);

    // Likelihood by region
    const likelihoodByRegion = await Data.aggregate([
      ...pipeline,
      {
        $match: { region: { $ne: '' } }
      },
      {
        $group: {
          _id: '$region',
          avgLikelihood: { $avg: '$likelihood' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgLikelihood: -1 } }
    ]);

    // Relevance by topic
    const relevanceByTopic = await Data.aggregate([
      ...pipeline,
      {
        $match: { topic: { $ne: '' } }
      },
      {
        $group: {
          _id: '$topic',
          avgRelevance: { $avg: '$relevance' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgRelevance: -1 } },
      { $limit: 15 }
    ]);

    // Country distribution
    const countryDistribution = await Data.aggregate([
      ...pipeline,
      {
        $match: { country: { $ne: '' } }
      },
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
      }
      },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    // Year trends
    const yearTrends = await Data.aggregate([
      ...pipeline,
      {
        $match: { 
          end_year: { $ne: '', $regex: /^\d{4}$/ }
        }
      },
      {
        $group: {
          _id: '$end_year',
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // PESTLE analysis
    const pestleAnalysis = await Data.aggregate([
      ...pipeline,
      {
        $match: { pestle: { $ne: '' } }
      },
      {
        $group: {
          _id: '$pestle',
          avgIntensity: { $avg: '$intensity' },
          avgRelevance: { $avg: '$relevance' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      intensityBySector,
      likelihoodByRegion,
      relevanceByTopic,
      countryDistribution,
      yearTrends,
      pestleAnalysis
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
