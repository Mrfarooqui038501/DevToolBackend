# Dev Toolbox

A modern web application that provides essential development tools for JSON formatting and Base64 encoding/decoding.

## 🚀 Features

### Core Tools
- **JSON Formatter**: Beautify and validate JSON with proper indentation
- **Base64 Encoder/Decoder**: Convert text to/from Base64 encoding
- **History Tracking**: View all processed JSON data (stored in MongoDB)

### Technical Features
- Modern React frontend with Vite
- Node.js backend with Express
- MongoDB database for data persistence
- Responsive design with CSS
- Error handling and validation
- Real-time feedback

## 🛠️ Tech Stack

### Frontend
- React 18 with functional components and hooks
- Vite for fast development and building
- CSS for styling
- Axios for API communication

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests
- Input validation and error handling

## 📁 Project Structure

```
DevTool/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone and setup the project:**
```bash
# Navigate to the project directory
cd DevTool

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

2. **Setup MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `devtoolbox`
   - Update the connection string in `backend/config/db.js`

3. **Environment Setup:**
```bash
# In backend directory, create .env file
cd backend
echo "MONGODB_URI=mongodb://localhost:27017/devtoolbox
PORT=5000" > .env
```

4. **Run the application:**
```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend development server
cd frontend
npm run dev
```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
npm test
```

### Manual Testing

1. **JSON Formatter:**
   - Navigate to "JSON Formatter" tab
   - Enter valid JSON: `{"name":"John","age":30}`
   - Click "Format JSON" - should display formatted JSON
   - Enter invalid JSON: `{"name":"John",}` - should show error

2. **Base64 Encoder/Decoder:**
   - Navigate to "Base64 Encoder/Decoder" tab
   - Enter text: "Hello World"
   - Click "Encode" - should show "SGVsbG8gV29ybGQ="
   - Click "Decode" - should show "Hello World"

3. **History Page:**
   - Process some JSON data
   - Navigate to "History" page
   - Verify processed data appears in the list

## 📡 API Endpoints

### JSON Formatter
- `POST /api/format-json`
  - Body: `{ "json": "raw json string" }`
  - Response: `{ "formatted": "formatted json", "error": null }`

### Base64 Operations
- `POST /api/encode`
  - Body: `{ "text": "plain text" }`
  - Response: `{ "encoded": "base64 string" }`

- `POST /api/decode`
  - Body: `{ "encoded": "base64 string" }`
  - Response: `{ "decoded": "plain text" }`

### History
- `GET /api/history`
  - Response: `{ "history": [array of processed json data] }`

## 🎨 UI/UX Features

- **Tab Navigation**: Clean tab interface for switching between tools
- **Real-time Validation**: Immediate feedback for JSON syntax errors
- **Copy to Clipboard**: One-click copying of results
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## 📝 Database Schema

### JSON History Collection
```javascript
{
  _id: ObjectId,
  originalJson: String,
  formattedJson: String,
  timestamp: Date,
  ipAddress: String
}
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your Node.js hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository. #