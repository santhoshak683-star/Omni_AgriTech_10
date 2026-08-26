# 🐄 Biometric Livestock Health Predictor

A real-time IoT telemetry dashboard designed for advanced livestock health monitoring. This application tracks core temperature, behavioral actigraphy, and rumination metrics to establish ML-based baseline anomaly detection. By identifying physiological stress early, it enables preemptive care and early disease prevention in livestock.

## ✨ Key Features

- **Real-Time Telemetry Tracking**: Monitor core body temperature, activity indices, and rumination times.
- **ML Anomaly Detection**: Automatically flags deviations from established baselines (e.g., temperature spikes, hypo-activity) to predict early signs of illness like Bovine Respiratory Disease (BRD) or Mastitis.
- **Predictive Health Alerts**: Generates critical alerts with lead times of up to 3-5 days before clinical symptoms appear.
- **Livestock Directory & Profiles**: Detailed individual animal tracking including RFID tags, breed, age, pen location, hardware sensor health (bolus & ear tag batteries), and clinical history.
- **Farm-Wide Metrics Dashboard**: Overview of herd health status, active alerts, isolated animals, and estimated antibiotic doses saved through early detection.
- **Responsive & Modern UI**: Built with React and styled beautifully with Tailwind CSS, featuring interactive charts and metrics (Recharts).

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Charts/Visualizations**: Recharts
- **Icons**: Lucide React
- **Animations**: Motion

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/santhoshak683-star/Omni_AgriTech_10.git
   cd Omni_AgriTech_10
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided in the terminal (typically `http://localhost:3000` or `http://localhost:5173`).

## ⚙️ Configuration

System settings such as anomaly thresholds (temperature spikes, activity drop percentage), ML confidence thresholds, and alert preferences can be configured within the application's Settings view.

## 📄 License

This project is licensed under the MIT License.
