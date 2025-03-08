from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

origins = [
    "*"
]

# Load dataset
def load_recipes(filepath="random_100_recipes.csv"):
    try:
        df = pd.read_csv(filepath)
        # Ensure source and link columns exist
        if 'source' not in df.columns:
            df['source'] = "N/A"
        if 'link' not in df.columns:
            df['link'] = "N/A"
            
        # Convert any NaN values to empty strings
        df['source'] = df['source'].fillna("N/A")
        df['link'] = df['link'].fillna("N/A")
        
        return df
    except Exception as e:
        print(f"Error loading file: {e}")
        return None

df = load_recipes()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class IngredientsRequest(BaseModel):
    ingredients: list[str]

# Function to categorize recipes
def categorize_recipes(user_ingredients, df):
    user_ingredients = set(ingredient.lower().strip() for ingredient in user_ingredients)
    
    def get_category(recipe_ingredients):
        try:
            recipe_ingredients = set(eval(recipe_ingredients.lower()))
            if user_ingredients == recipe_ingredients:
                return 0  # Exact match
            elif user_ingredients.issubset(recipe_ingredients):
                return 1  # Contains all user ingredients
            elif user_ingredients & recipe_ingredients:
                return 2  # Contains some user ingredients
            else:
                return 3  # No match
        except:
            return 3  # Default to "No match" in case of any errors
    
    df["category"] = df["NER"].apply(get_category)
    return df.sort_values(by="category")

# Function to sort recipes by simplicity (fewest steps)
def sort_by_simplicity(df):
    try:
        df["num_steps"] = df["directions"].apply(lambda x: len(eval(x)))
        return df.sort_values(by=["category", "num_steps"])
    except Exception as e:
        print(f"Error sorting by simplicity: {e}")
        return df

# Function to format links
def format_link(link):
    if pd.isna(link) or not link or link == "N/A":
        return None
        
    link = str(link).strip()
    if not link.startswith(('http://', 'https://')):
        return f"https://{link}"
    return link

# API Endpoint to process ingredients and return categorized & sorted recipes
@app.post("/process-data")
def process_data(request: IngredientsRequest):
    global df
    if df is None:
        return {"error": "Recipe dataset could not be loaded."}
    
    sorted_recipes = categorize_recipes(request.ingredients, df)
    final_sorted_recipes = sort_by_simplicity(sorted_recipes)
    
    # Format links before returning
    final_sorted_recipes['formatted_link'] = final_sorted_recipes['link'].apply(format_link)
    
    # Debug print to console to see what data we're working with
    print("Sample data:")
    print(final_sorted_recipes[['title', 'source', 'link', 'formatted_link']].head())
    
    # Map category numbers to readable names
    category_labels = {
        0: "Exact Match",
        1: "Contains All Ingredients",
        2: "Contains Some Ingredients",
        3: "No Matching Ingredients",
    }
    
    # Convert output to structured JSON with categories
    categorized_recipes = {}
    for category, label in category_labels.items():
        recipes_in_category = final_sorted_recipes[final_sorted_recipes["category"] == category]
        # Include directions in the output along with other fields
        categorized_recipes[label] = recipes_in_category[["title", "NER", "directions", "num_steps", "source", "link", "formatted_link"]].to_dict(orient="records")
    
    return categorized_recipes

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)