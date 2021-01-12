const NutritionBase = `
  calories: Int!
  carbs: Int!
  fat: Int!
  protein: Int!
`

export default `
  type Nutrition {
    ${NutritionBase}
  }
  
  input NutritionInput {
    ${NutritionBase}
  }
`
