import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';

const seedUsers = [
  {
    username: 'chef_mario',
    email: 'mario@recipes.com',
    password: 'password123',
  },
  {
    username: 'baker_sarah',
    email: 'sarah@recipes.com',
    password: 'password123',
  },
  {
    username: 'foodie_alex',
    email: 'alex@recipes.com',
    password: 'password123',
  },
  {
    username: 'cook_emma',
    email: 'emma@recipes.com',
    password: 'password123',
  },
];

const seedRecipes = [
  {
    title: 'Classic Spaghetti Carbonara',
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale',
      '4 large eggs',
      '100g Pecorino Romano cheese',
      'Black pepper',
      'Salt',
    ],
    instructions:
      '1. Cook pasta in salted boiling water until al dente.\n2. Fry pancetta until crispy.\n3. Mix eggs with grated cheese.\n4. Drain pasta, mix with pancetta and egg mixture off heat.\n5. Season with black pepper and serve immediately.',
    photo: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  },
  {
    title: 'Homemade Margherita Pizza',
    ingredients: [
      '500g pizza dough',
      '400g San Marzano tomatoes',
      '250g fresh mozzarella',
      'Fresh basil leaves',
      'Olive oil',
      'Salt',
    ],
    instructions:
      '1. Preheat oven to 250°C.\n2. Roll out pizza dough.\n3. Spread crushed tomatoes on base.\n4. Add torn mozzarella.\n5. Bake for 10-12 minutes.\n6. Top with fresh basil and olive oil.',
    photo: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
  },
  {
    title: 'Chocolate Chip Cookies',
    ingredients: [
      '225g butter, softened',
      '200g brown sugar',
      '100g white sugar',
      '2 eggs',
      '300g all-purpose flour',
      '1 tsp baking soda',
      '300g chocolate chips',
      '1 tsp vanilla extract',
    ],
    instructions:
      '1. Preheat oven to 180°C.\n2. Cream butter and sugars together.\n3. Beat in eggs and vanilla.\n4. Mix in flour and baking soda.\n5. Fold in chocolate chips.\n6. Drop spoonfuls on baking sheet.\n7. Bake for 10-12 minutes.',
    photo: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
  },
  {
    title: 'Caesar Salad',
    ingredients: [
      '1 large romaine lettuce',
      '100g Parmesan cheese',
      '2 cups croutons',
      '2 garlic cloves',
      '2 anchovy fillets',
      '1 egg yolk',
      '2 tbsp lemon juice',
      '150ml olive oil',
      'Worcestershire sauce',
    ],
    instructions:
      '1. Make dressing: blend garlic, anchovies, egg yolk, lemon juice.\n2. Slowly add olive oil while blending.\n3. Add Worcestershire sauce to taste.\n4. Tear lettuce into bite-sized pieces.\n5. Toss with dressing, croutons, and shaved Parmesan.',
    photo: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
  },
  {
    title: 'Beef Tacos',
    ingredients: [
      '500g ground beef',
      '8 taco shells',
      '1 onion, diced',
      '2 garlic cloves',
      '1 tbsp cumin',
      '1 tbsp paprika',
      'Lettuce, shredded',
      'Tomatoes, diced',
      'Cheddar cheese',
      'Sour cream',
      'Salsa',
    ],
    instructions:
      '1. Brown ground beef with onion and garlic.\n2. Add spices and cook for 5 minutes.\n3. Warm taco shells in oven.\n4. Fill shells with beef.\n5. Top with lettuce, tomatoes, cheese, sour cream, and salsa.',
    photo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  },
  {
    title: 'Chicken Stir Fry',
    ingredients: [
      '500g chicken breast, sliced',
      '2 bell peppers',
      '1 broccoli head',
      '2 carrots',
      '3 tbsp soy sauce',
      '2 tbsp oyster sauce',
      '1 tbsp sesame oil',
      '2 garlic cloves',
      '1 inch ginger',
      'Rice for serving',
    ],
    instructions:
      '1. Heat wok or large pan over high heat.\n2. Stir-fry chicken until cooked.\n3. Add vegetables and stir-fry for 3-4 minutes.\n4. Add garlic, ginger, and sauces.\n5. Toss everything together.\n6. Serve over rice.',
    photo: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  },
  {
    title: 'Banana Bread',
    ingredients: [
      '3 ripe bananas',
      '75g melted butter',
      '200g sugar',
      '1 egg',
      '1 tsp vanilla',
      '1 tsp baking soda',
      'Pinch of salt',
      '190g all-purpose flour',
    ],
    instructions:
      '1. Preheat oven to 175°C.\n2. Mash bananas in a bowl.\n3. Mix in melted butter.\n4. Add sugar, egg, and vanilla.\n5. Sprinkle baking soda and salt.\n6. Add flour and mix.\n7. Pour into greased loaf pan.\n8. Bake for 60 minutes.',
    photo: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
  },
  {
    title: 'Greek Salad',
    ingredients: [
      '4 tomatoes',
      '1 cucumber',
      '1 red onion',
      '200g feta cheese',
      '100g Kalamata olives',
      '3 tbsp olive oil',
      '1 tbsp red wine vinegar',
      'Oregano',
      'Salt and pepper',
    ],
    instructions:
      '1. Chop tomatoes and cucumber into chunks.\n2. Slice red onion thinly.\n3. Combine vegetables in a bowl.\n4. Add olives and cubed feta.\n5. Drizzle with olive oil and vinegar.\n6. Season with oregano, salt, and pepper.\n7. Toss gently and serve.',
    photo: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
  },
  {
    title: 'Pancakes',
    ingredients: [
      '200g all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1/2 tsp salt',
      '250ml milk',
      '1 egg',
      '2 tbsp melted butter',
      'Maple syrup for serving',
    ],
    instructions:
      '1. Mix dry ingredients in a bowl.\n2. Whisk together milk, egg, and melted butter.\n3. Pour wet into dry ingredients and mix until just combined.\n4. Heat griddle or pan over medium heat.\n5. Pour 1/4 cup batter for each pancake.\n6. Cook until bubbles form, then flip.\n7. Serve with maple syrup.',
    photo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  },
  {
    title: 'Vegetable Curry',
    ingredients: [
      '2 potatoes, cubed',
      '1 cauliflower head',
      '2 carrots',
      '1 can chickpeas',
      '1 can coconut milk',
      '2 tbsp curry powder',
      '1 onion',
      '3 garlic cloves',
      '1 inch ginger',
      'Cilantro for garnish',
    ],
    instructions:
      '1. Sauté onion, garlic, and ginger.\n2. Add curry powder and cook for 1 minute.\n3. Add vegetables and stir.\n4. Pour in coconut milk and simmer for 20 minutes.\n5. Add chickpeas and cook for 5 more minutes.\n6. Garnish with cilantro.\n7. Serve with rice or naan.',
    photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  },
];

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Recipe.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of seedUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.username}`);
    }

    // Create recipes (distribute among users)
    for (let i = 0; i < seedRecipes.length; i++) {
      const recipe = await Recipe.create({
        ...seedRecipes[i],
        user: createdUsers[i % createdUsers.length]._id,
      });
      console.log(`✅ Created recipe: ${recipe.title}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(
      `📊 Created ${createdUsers.length} users and ${seedRecipes.length} recipes`
    );
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};
