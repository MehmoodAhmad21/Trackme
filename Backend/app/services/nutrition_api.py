import httpx
from typing import Optional, Dict, Any
from app.core.config import settings


class NutritionAPIClient:
    """
    Client for Nutrition API integration.
    This is a generic implementation that can be adapted for specific APIs like:
    - Nutritionix
    - Edamam
    - USDA FoodData Central
    - etc.
    """
    
    def __init__(self):
        self.api_key = settings.NUTRITION_API_KEY
        self.base_url = settings.NUTRITION_API_URL
    
    async def get_nutrition_data(self, food_name: str, quantity: Optional[str] = None) -> Dict[str, Any]:
        """
        Fetch nutrition data for a food item.
        
        Args:
            food_name: Name or description of the food
            quantity: Optional quantity specification
            
        Returns:
            Dictionary with nutrition data including calories, carbs, protein, fat
        """
        if not self.api_key:
            # Return mock data if API key is not configured
            return self._get_mock_nutrition_data(food_name, quantity)
        
        try:
            # This is a generic implementation - adapt based on your chosen API
            # Example for Nutritionix Natural Language API:
            async with httpx.AsyncClient() as client:
                headers = {
                    "x-app-id": self.api_key,
                    "x-app-key": self.api_key,
                    "Content-Type": "application/json"
                }
                
                query = f"{quantity} {food_name}" if quantity else food_name
                
                # Adapt this endpoint and payload based on your chosen API
                response = await client.post(
                    f"{self.base_url}/natural/nutrients",
                    headers=headers,
                    json={"query": query}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return self._parse_nutrition_response(data)
                else:
                    # Fall back to mock data if API fails
                    return self._get_mock_nutrition_data(food_name, quantity)
                    
        except Exception as e:
            print(f"Error fetching nutrition data: {e}")
            # Return mock data as fallback
            return self._get_mock_nutrition_data(food_name, quantity)
    
    def _parse_nutrition_response(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse API response to standard format."""
        # Adapt this based on your chosen API's response format
        # Example for Nutritionix:
        try:
            food = data.get("foods", [{}])[0]
            return {
                "calories": food.get("nf_calories", 0),
                "carbs": food.get("nf_total_carbohydrate", 0),
                "protein": food.get("nf_protein", 0),
                "fat": food.get("nf_total_fat", 0),
                "raw_data": data
            }
        except (IndexError, KeyError):
            return self._get_mock_nutrition_data("unknown", None)
    
    def _get_mock_nutrition_data(self, food_name: str, quantity: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate mock nutrition data when API is unavailable.
        This provides reasonable estimates for testing/development.
        """
        # Simple mock data based on common foods
        food_lower = food_name.lower()
        
        # Default values
        calories = 200
        carbs = 30
        protein = 10
        fat = 5
        
        # Rough estimates based on food type
        if any(word in food_lower for word in ["salad", "vegetable", "lettuce"]):
            calories, carbs, protein, fat = 50, 10, 2, 1
        elif any(word in food_lower for word in ["chicken", "beef", "meat", "fish"]):
            calories, carbs, protein, fat = 250, 0, 40, 10
        elif any(word in food_lower for word in ["rice", "pasta", "bread", "potato"]):
            calories, carbs, protein, fat = 300, 60, 8, 2
        elif any(word in food_lower for word in ["burger", "pizza", "fries"]):
            calories, carbs, protein, fat = 500, 50, 20, 25
        elif any(word in food_lower for word in ["fruit", "apple", "banana", "orange"]):
            calories, carbs, protein, fat = 80, 20, 1, 0
        elif any(word in food_lower for word in ["yogurt", "milk", "cheese"]):
            calories, carbs, protein, fat = 150, 15, 8, 5
        
        return {
            "calories": calories,
            "carbs": carbs,
            "protein": protein,
            "fat": fat,
            "raw_data": {
                "source": "mock",
                "food_name": food_name,
                "quantity": quantity,
                "note": "Mock data - configure NUTRITION_API_KEY for real data"
            }
        }


# Singleton instance
nutrition_client = NutritionAPIClient()

