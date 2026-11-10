import { useEffect, useMemo, useState } from 'react';
import { Bookmark, Check, ChefHat, ChevronDown, Clock3, Leaf, Plus, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

const startingIngredients = ['eggs', 'spinach', 'tomatoes', 'feta', 'rice'];
const pantrySuggestions = ['chicken', 'potatoes', 'pasta', 'avocado', 'mushrooms', 'chickpeas', 'bell pepper', 'yogurt'];

const recipes = [
  { id: 1, name: 'Spinach & feta breakfast bowl', description: 'A warm, savory start with soft eggs, wilted greens and salty feta.', time: 15, difficulty: 'Easy', category: 'Breakfast', image: '🥣', color: 'mint', ingredients: ['eggs', 'spinach', 'feta', 'tomatoes'], steps: ['Warm a little oil in a pan and add the spinach until just wilted.', 'Add chopped tomatoes and cook for 2 minutes.', 'Crack in the eggs, cover, and cook until the whites are set.', 'Finish with crumbled feta, black pepper and toast if you have it.'], extra: ['olive oil', 'black pepper'] },
  { id: 2, name: 'Tomato butter rice', description: 'Comforting pantry rice with jammy tomatoes and a little butter.', time: 25, difficulty: 'Easy', category: 'Lunch', image: '🍅', color: 'peach', ingredients: ['rice', 'tomatoes', 'spinach'], steps: ['Rinse the rice until the water runs mostly clear.', 'Cook rice in salted water according to the package.', 'Meanwhile, soften chopped tomatoes in butter or olive oil.', 'Fold the tomatoes and spinach through the warm rice until the leaves wilt.'], extra: ['butter or olive oil', 'salt'] },
  { id: 3, name: 'Crispy feta egg toast', description: 'Golden-edged feta, a sunny egg and fresh tomato on toast.', time: 10, difficulty: 'Easy', category: 'Breakfast', image: '🍳', color: 'yellow', ingredients: ['eggs', 'feta', 'tomatoes'], steps: ['Crumble feta into a non-stick pan in a small circle.', 'When the edges turn golden, crack an egg into the middle.', 'Cover the pan until the egg is cooked how you like it.', 'Serve over toast with chopped tomato and pepper.'], extra: ['bread', 'black pepper'] },
  { id: 4, name: 'Garden fried rice', description: 'A flexible, quick pan of rice with greens, tomato and egg.', time: 20, difficulty: 'Easy', category: 'Dinner', image: '🍚', color: 'sage', ingredients: ['rice', 'eggs', 'spinach', 'tomatoes'], steps: ['Use cold cooked rice if you have it; break up any clumps.', 'Scramble the eggs in a hot pan, then set them aside.', 'Stir-fry the rice and chopped tomatoes for 4 to 5 minutes.', 'Add spinach and eggs back in. Season with soy sauce or salt.'], extra: ['soy sauce or salt', 'oil'] },
  { id: 5, name: 'Tomato & feta rice salad', description: 'A bright, no-fuss bowl that works warm or straight from the fridge.', time: 18, difficulty: 'Easy', category: 'Lunch', image: '🥗', color: 'lavender', ingredients: ['rice', 'tomatoes', 'feta', 'spinach'], steps: ['Cook the rice, then spread it out for a few minutes to cool slightly.', 'Chop tomatoes and crumble feta.', 'Toss rice with spinach, tomatoes and a squeeze of lemon if available.', 'Add feta and olive oil just before serving.'], extra: ['lemon', 'olive oil'] },
  { id: 6, name: 'Soft spinach & tomato scramble', description: 'A quick skillet meal for the days that call for something simple.', time: 12, difficulty: 'Easy', category: 'Breakfast', image: '🥬', color: 'mint', ingredients: ['eggs', 'spinach', 'tomatoes', 'feta'], steps: ['Whisk the eggs with a pinch of salt.', 'Cook chopped tomatoes in a buttered pan for 2 minutes.', 'Add spinach and stir until wilted.', 'Pour in eggs and gently fold until softly set. Add feta to finish.'], extra: ['butter', 'salt'] },
  { id: 7, name: 'Feta & tomato stuffed potato', description: 'A cozy baked potato topped with fresh tomato and salty feta.', time: 45, difficulty: 'Easy', category: 'Dinner', image: '🥔', color: 'peach', ingredients: ['potatoes', 'tomatoes', 'feta', 'spinach'], steps: ['Bake or microwave a potato until tender all the way through.', 'Wilt spinach in a pan with a splash of water.', 'Split the potato and fluff the inside with a fork.', 'Top with spinach, chopped tomato, feta and black pepper.'], extra: ['olive oil', 'black pepper'] },
  { id: 8, name: 'Chickpea tomato skillet', description: 'A hearty one-pan supper with chickpeas and crumbled feta.', time: 22, difficulty: 'Easy', category: 'Dinner', image: '🫘', color: 'yellow', ingredients: ['chickpeas', 'tomatoes', 'spinach', 'feta'], steps: ['Warm oil in a skillet and add chopped tomatoes.', 'Add drained chickpeas and simmer for 10 minutes.', 'Stir in spinach until wilted.', 'Finish with feta and serve with rice or bread.'], extra: ['olive oil', 'paprika'] },
];

const extraRecipeStyles = [
  { label: 'quick skillet', category: 'Dinner', image: '🍳', color: 'peach', time: 18, steps: (a, b) => [`Chop the ${a} and ${b} into bite-size pieces.`, `Warm a little oil in a pan and cook the ${a} until nearly tender.`, `Add the ${b}, season with salt and pepper, and cook until everything is ready.`, 'Taste, adjust the seasoning, and serve warm.'] },
  { label: 'simple bowl', category: 'Lunch', image: '🥣', color: 'mint', time: 15, steps: (a, b) => [`Prepare the ${a} in the way that suits it best (cook, roast, or slice).`, `Add the ${b} and a little olive oil, lemon, or dressing if you have some.`, 'Season to taste and arrange everything in a bowl.', 'Add any herbs, grains, or crunchy toppings you have around.'] },
  { label: 'easy tray bake', category: 'Dinner', image: '🥘', color: 'yellow', time: 30, steps: (a, b) => [`Heat the oven to 200°C (400°F). Cut the ${a} and ${b} into similar-sized pieces.`, 'Toss with a little oil, salt, and pepper on a baking tray.', 'Roast until tender and lightly golden, turning once halfway through.', 'Finish with any fresh herbs or sauce you have.'] },
  { label: 'fresh kitchen plate', category: 'Lunch', image: '🥗', color: 'sage', time: 10, steps: (a, b) => [`Wash and prepare the ${a} and ${b}.`, 'Arrange them together on a plate or in a bowl.', 'Add a simple dressing with oil, lemon or vinegar, and a pinch of salt.', 'Serve as it is, or add bread, rice, or another pantry staple.'] },
];
const recipeMoods = ['Cozy', 'Bright', 'Herby', 'Golden', 'Fresh', 'Rustic', 'Zesty', 'Simple', 'Crispy', 'Sunny', 'Savory', 'Garden'];

function makeExtraRecipes(pantry, count) {
  const usable = pantry.filter((item) => pantrySuggestions.includes(item) || startingIngredients.includes(item));
  if (!usable.length) return [];
  return Array.from({ length: count }, (_, index) => {
    const style = extraRecipeStyles[index % extraRecipeStyles.length];
    const first = usable[(index * 2) % usable.length];
    const second = usable.length > 1 ? usable[(index * 2 + 1) % usable.length] : first;
    const included = [...new Set([first, second])];
    const mood = recipeMoods[Math.floor(index / extraRecipeStyles.length) % recipeMoods.length];
    return {
      id: `generated-${mood}-${first}-${second}-${style.label}`,
      name: `${mood} ${first} & ${second} ${style.label}`,
      description: `A flexible ${mood.toLowerCase()} ${style.category.toLowerCase()} idea built around ${included.join(' and ')}.`,
      time: style.time,
      difficulty: 'Easy',
      category: style.category,
      image: style.image,
      color: style.color,
      ingredients: included,
      steps: style.steps(first, second),
      extra: ['oil', 'salt and pepper'],
    };
  });
}

function readStorage(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}

function RecipeCard({ recipe, onOpen, isSaved, onSave }) {
  return <article className="recipe-card">
    <button className={`recipe-photo ${recipe.color}`} onClick={() => onOpen(recipe)} aria-label={`See ${recipe.name}`}><span className="food-emoji">{recipe.image}</span><span className="photo-label">{recipe.category}</span></button>
    <div className="recipe-info"><div className="recipe-meta"><span><Clock3 size={13} /> {recipe.time} min</span><span><span className="easy-dot" /> {recipe.difficulty}</span></div><h3>{recipe.name}</h3><p>{recipe.description}</p><div className="recipe-bottom"><span className="match-count"><Sparkles size={13} /> {recipe.ingredients.length} ingredients match</span><button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={() => onSave(recipe.id)} aria-label={isSaved ? 'Remove saved recipe' : 'Save recipe'}><Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /></button></div></div>
  </article>;
}

function RecipeModal({ recipe, onClose, ingredients, onAddIngredient }) {
  if (!recipe) return null;
  const missing = recipe.ingredients.filter((ingredient) => !ingredients.includes(ingredient));
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close recipe"><X size={18} /></button>
      <div className={`modal-hero ${recipe.color}`}><span>{recipe.image}</span><small>{recipe.category} · {recipe.time} minutes</small></div>
      <div className="modal-content"><p className="modal-kicker"><ChefHat size={14} /> A recipe for your kitchen</p><h2 id="modal-title">{recipe.name}</h2><p className="modal-description">{recipe.description}</p>
        <div className="modal-section"><div className="section-heading"><h3>What you'll need</h3><span>{recipe.ingredients.length + recipe.extra.length} items</span></div><div className="ingredient-checklist">{recipe.ingredients.map((item) => <span key={item} className={ingredients.includes(item) ? 'ingredient-line have-it' : 'ingredient-line'}><span className="check-box">{ingredients.includes(item) && <Check size={12} />}</span>{item}<small>{ingredients.includes(item) ? 'in your kitchen' : 'add to list'}</small>{!ingredients.includes(item) && <button onClick={() => onAddIngredient(item)} aria-label={`Add ${item}`}><Plus size={14} /></button>}</span>)}{recipe.extra.map((item) => <span className="ingredient-line extra-line" key={item}><span className="check-box" />{item}<small>pantry extra</small></span>)}</div></div>
        <div className="modal-section"><div className="section-heading"><h3>A few simple steps</h3><span>{recipe.steps.length} steps</span></div><ol className="steps-list">{recipe.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div>
      </div>
    </section>
  </div>;
}

export default function App() {
  const [ingredients, setIngredients] = useState(() => readStorage('what-can-i-cook-pantry', startingIngredients));
  const [savedRecipes, setSavedRecipes] = useState(() => readStorage('what-can-i-cook-saved', []));
  const [query, setQuery] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Best match');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showPantry, setShowPantry] = useState(true);
  const [savedOnly, setSavedOnly] = useState(false);
  const [moreCount, setMoreCount] = useState(0);
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  useEffect(() => { localStorage.setItem('what-can-i-cook-pantry', JSON.stringify(ingredients)); }, [ingredients]);
  useEffect(() => { localStorage.setItem('what-can-i-cook-saved', JSON.stringify(savedRecipes)); }, [savedRecipes]);

  const visibleRecipes = useMemo(() => {
    const generated = makeExtraRecipes(ingredients, moreCount * 8);
    let result = [...recipes, ...generated].map((recipe) => ({ ...recipe, matchCount: recipe.ingredients.filter((item) => ingredients.includes(item)).length }));
    if (filter !== 'All') result = result.filter((recipe) => recipe.category === filter);
    if (savedOnly) result = result.filter((recipe) => savedRecipes.includes(recipe.id));
    if (query.trim()) result = result.filter((recipe) => `${recipe.name} ${recipe.description} ${recipe.ingredients.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
    result = result.filter((recipe) => recipe.matchCount > 0);
    if (sortBy === 'Quickest') result.sort((a, b) => a.time - b.time);
    else if (sortBy === 'Most ingredients') result.sort((a, b) => b.matchCount - a.matchCount || a.time - b.time);
    else result.sort((a, b) => b.matchCount / b.ingredients.length - a.matchCount / a.ingredients.length || b.matchCount - a.matchCount || a.time - b.time);
    return result;
  }, [ingredients, filter, savedOnly, savedRecipes, query, sortBy, moreCount]);

  function addIngredient(value) {
    const cleaned = value.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!cleaned) return;
    if (ingredients.includes(cleaned)) { setIngredientInput(''); return; }
    setIngredients((current) => [...current, cleaned]);
    setIngredientInput('');
  }
  function toggleSaved(id) { setSavedRecipes((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]); }
  const matchingCount = visibleRecipes.length;

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><ChefHat size={19} /></span><span>what can i cook<span className="brand-period">?</span></span></a><div className="top-promise"><span className="tiny-leaf"><Leaf size={14} /></span> Make something good with what you have</div><button className={`saved-nav ${savedOnly ? 'active' : ''}`} onClick={() => setSavedOnly(!savedOnly)}><Bookmark size={15} fill={savedOnly ? 'currentColor' : 'none'} /> Saved <span>{savedRecipes.length}</span></button></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> GOOD FOOD, LESS GUESSWORK</div><h1>What can you make<br />with <em>what you've got?</em></h1><p>Tell us what's in your kitchen. We'll help you turn it into<br className="desktop-break" /> something really good.</p><div className="hero-stats"><span><span className="stat-icon">✳</span> {ingredients.length} ingredients in your kitchen</span><i /> <span>{recipes.length} simple ideas to start</span></div></div><div className="hero-art" aria-hidden="true"><div className="hero-art-circle"><span className="hero-food food-a">🥑</span><span className="hero-food food-b">🍅</span><span className="hero-food food-c">🥚</span><span className="hero-food food-d">🥬</span><div className="hero-center">🥗</div><span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span></div><div className="hero-note">A little less food waste,<br />a lot more “that was good.”</div></div></section>

      <section className="pantry-section"><div className="section-top"><div><div className="section-kicker">YOUR KITCHEN, RIGHT NOW</div><h2>What have you got?</h2><p>We'll find recipes that use as much of it as possible.</p></div><button className="collapse-button" onClick={() => setShowPantry(!showPantry)}>{showPantry ? 'Hide ingredients' : 'Show ingredients'} <ChevronDown size={15} className={showPantry ? 'turned' : ''} /></button></div>
        {showPantry && <div className="pantry-box"><div className="pantry-chips">{ingredients.length ? ingredients.map((ingredient) => <span className="ingredient-chip" key={ingredient}>{ingredient}<button onClick={() => setIngredients((current) => current.filter((item) => item !== ingredient))} aria-label={`Remove ${ingredient}`}><X size={13} /></button></span>) : <span className="pantry-empty">Your ingredient list is empty. Add a few things to get started.</span>}</div><form className="ingredient-form" onSubmit={(event) => { event.preventDefault(); addIngredient(ingredientInput); }}><span className="input-plus"><Plus size={16} /></span><input value={ingredientInput} onChange={(event) => setIngredientInput(event.target.value)} placeholder="Add an ingredient..." aria-label="Add an ingredient" /><button type="submit" disabled={!ingredientInput.trim()}>Add to kitchen</button></form><div className="suggestions"><span>Try adding:</span>{pantrySuggestions.filter((item) => !ingredients.includes(item)).slice(0, 5).map((item) => <button key={item} onClick={() => addIngredient(item)}><Plus size={11} /> {item}</button>)}</div></div>}
      </section>

      <section className="results-section"><div className="results-heading"><div><div className="section-kicker">A GOOD PLACE TO START</div><h2>{savedOnly ? 'Your saved recipes' : 'Made for your kitchen'} <span className="result-count">{matchingCount}</span></h2><p>{matchingCount ? 'Recipes sorted by how much of your kitchen they use.' : 'Try adding a few ingredients or changing your search.'}</p></div><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes..." /><kbd>⌕</kbd></label></div>
        <div className="filter-row"><div className="category-filters" aria-label="Filter by meal"><SlidersHorizontal size={14} />{categories.map((category) => <button key={category} className={filter === category ? 'filter-chip selected' : 'filter-chip'} onClick={() => setFilter(category)}>{category}</button>)}</div><label className="sort-select"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option>Best match</option><option>Quickest</option><option>Most ingredients</option></select><ChevronDown size={13} /></label></div>
        {visibleRecipes.length ? <><div className="recipe-grid">{visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onOpen={setSelectedRecipe} isSaved={savedRecipes.includes(recipe.id)} onSave={toggleSaved} />)}</div>{!savedOnly && <button className="more-ideas-button" onClick={() => setMoreCount((count) => count + 1)}><Sparkles size={14} /> Show me more ideas</button>}</> : <div className="no-recipes"><span>🥄</span><h3>Nothing on the menu yet.</h3><p>{savedOnly ? 'Save a recipe with the bookmark icon and it will show up here.' : 'Add another ingredient or clear your search to see more ideas.'}</p>{savedOnly && <button onClick={() => setSavedOnly(false)}>Browse all recipes</button>}</div>}
        <div className="waste-note"><span>♻</span><p><strong>Good food deserves a second look.</strong> Recipes are flexible. Swap an ingredient, skip a garnish, make it yours.</p><button onClick={() => { setIngredients([]); setQuery(''); setFilter('All'); setSavedOnly(false); }}>Start fresh <X size={13} /></button></div>
      </section>
    </main>
    <footer className="footer"><span><ChefHat size={14} /> A little kitchen inspiration.</span><span>Cook what you have. Enjoy what you make.</span></footer>
    <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} ingredients={ingredients} onAddIngredient={addIngredient} />
  </div>;
}
