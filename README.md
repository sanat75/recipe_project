# 🍽️ Recipe Sorting App

A **React + FastAPI** application that helps users find recipes based on available ingredients. The app sorts recipes into four categories: **Exact Match**, **Contains All Ingredients**, **Contains Some Ingredients**, and **No Match**, while also ranking them by simplicity (fewest steps first).

## 🚀 Features

✅ **Ingredient-Based Sorting** - Finds recipes based on user-provided ingredients.  
✅ **Categorization** - Recipes are grouped into four match categories.  
✅ **Sorting by Simplicity** - Recipes with fewer steps are prioritized.  
✅ **Beautiful UI** - Clean and responsive interface with Tailwind CSS.  
✅ **FastAPI Backend** - Efficient backend handling with optimized search.



## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js** - UI framework
- 🎨 **Tailwind CSS** - Styling and responsiveness
- 🚦 **React Router** - Navigation

### Backend
- 🚀 **FastAPI** - Backend API
- 🐍 **Python** - Data processing
- 📊 **Pandas** - Recipe sorting
- 🗄️ **CSV Dataset** - Recipe storage

## 📂 Folder Structure

```
recipe_project/
│── backend/                # Backend API (FastAPI)
│   ├── main.py            # API logic and recipe processing
│   ├── random_100_recipes.csv  # Sample dataset
│── src/                   # React Frontend
│   ├── pages/             # App pages
│   │   ├── LandingPage.js
│   │   ├── FunctionPage.js
│   ├── App.js            # Main React Component
│── public/               # Static assets
│── package.json         # Frontend dependencies
│── tailwind.config.js   # Tailwind CSS config
│── README.md           # Project documentation
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/recipe_project.git
cd recipe_project
```

### 2️⃣ Backend Setup
```sh
cd backend
pip install fastapi uvicorn pandas
python main.py
```
🔹 **Backend will run at:** `http://localhost:5000`

### 3️⃣ Frontend Setup
```sh
cd src
yarn install
yarn start
```
🔹 **Frontend will run at:** `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/process-data` | Takes user ingredients and returns sorted recipes |

**Example Request:**
```json
{
  "ingredients": ["chicken", "onion", "garlic"]
}
```

**Example Response:**
```json
{
  "Exact Match": [],
  "Contains All Ingredients": [
    {
      "title": "Puerto Rican Chicken Soup",
      "NER": "[chicken, carrots, garlic, onion]",
      "num_steps": 8
    }
  ],
  "Contains Some Ingredients": [
    {
      "title": "Herb Fryer Chicken",
      "NER": "[lemon juice, olive oil, garlic, chicken]",
      "num_steps": 2
    }
  ],
  "No Matching Ingredients": [...]
}
```

## 🚀 Deployment

**Deploy Backend on Render/Fly.io:**
```sh
pip install fastapi uvicorn
uvicorn main:app --host 0.0.0.0 --port 5000
```

**Deploy Frontend on Netlify/Vercel:**
```sh
yarn build
```
🔹 Upload `build/` to Netlify or Vercel.

## 🤝 Contributing

💡 Want to improve this project? Contributions are **welcome**!

1. **Fork** this repository
2. **Create a branch** (`feature-new-idea`)
3. **Commit your changes** (`git commit -m 'Added feature'`)
4. **Push to GitHub** (`git push origin feature-new-idea`)
5. **Submit a Pull Request** 🚀

## 📜 License

This project is **open-source** and available under the **MIT License**.

## 🎯 Contact & Support

👨‍💻 **Developed by:** *Sanat Chaudhary*  
📧 **Email:** sanat23122003@gmail.com  
🌐 **GitHub:** sanat75
