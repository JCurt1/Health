const CATS = {
  macro: { label: 'Macronutrients', color: 'var(--macro)', soft: 'var(--macro-soft)' },
  fiber: { label: 'Fiber & Carbs', color: 'var(--fiber)', soft: 'var(--fiber-soft)' },
  vit:   { label: 'Vitamins', color: 'var(--vit)', soft: 'var(--vit-soft)' },
  min:   { label: 'Minerals', color: 'var(--min)', soft: 'var(--min-soft)' },
};

const NUTRIENTS = [
  {
    name: 'Protein', cat: 'macro',
    preview: 'Builds and repairs muscle, enzymes, and hormones.',
    func: 'Supplies amino acids used to build and repair muscle, skin, and organs, and to make enzymes, antibodies, and hormones. It also helps you feel full after eating.',
    sources: 'Chicken, fish, eggs, Greek yogurt, tofu, lentils, beans, cottage cheese, nuts.',
    rda: '~0.8g per kg of body weight/day (roughly 50–70g for most adults; more if you strength train).'
  },
  {
    name: 'Carbohydrates', cat: 'macro',
    preview: 'Your body\'s preferred, fastest source of fuel.',
    func: 'Broken down into glucose, the primary energy source for your brain and muscles. Complex carbs also feed gut bacteria and steady blood sugar.',
    sources: 'Oats, brown rice, potatoes, quinoa, whole-grain bread, fruit, beans.',
    rda: '45–65% of daily calories, favoring whole/unrefined sources.'
  },
  {
    name: 'Fat', cat: 'macro',
    preview: 'Stores energy, cushions organs, builds cell walls.',
    func: 'Provides concentrated energy, forms every cell membrane, cushions organs, and is required to absorb vitamins A, D, E, and K.',
    sources: 'Olive oil, avocado, nuts, seeds, fatty fish (salmon, sardines), eggs.',
    rda: '20–35% of daily calories; prioritize unsaturated fats over saturated.'
  },
  {
    name: 'Sodium', cat: 'macro',
    preview: 'Fluid balance, nerve signals — easy to get too much.',
    func: 'Regulates fluid balance and blood volume, and is required for nerve signaling and muscle contraction. Unlike most nutrients here, the common problem is too much, not too little.',
    sources: 'Table salt, processed and packaged foods, cured meats, canned soup, soy sauce.',
    rda: 'Under 2,300mg/day (about 1 tsp of salt); most adults get more than this from processed food.'
  },
  {
    name: 'Fiber', cat: 'fiber',
    preview: 'Feeds gut bacteria, steadies blood sugar and cholesterol.',
    func: 'Slows digestion so blood sugar rises more gradually, feeds beneficial gut bacteria, and helps carry cholesterol and waste out of the body.',
    sources: 'Beans, lentils, oats, berries, broccoli, chia seeds, whole grains, apples (with skin).',
    rda: '25g/day for women, 38g/day for men.'
  },
  {
    name: 'Omega-3 Fats', cat: 'fiber',
    preview: 'Anti-inflammatory fat that supports heart and brain.',
    func: 'A type of polyunsaturated fat the body can\'t make on its own. Supports brain function, lowers inflammation, and helps regulate heart rhythm and blood pressure.',
    sources: 'Salmon, mackerel, sardines, walnuts, flaxseed, chia seeds, algae oil.',
    rda: 'No formal RDA; roughly 250–500mg of EPA/DHA per day is a common target.'
  },
  {
    name: 'Choline', cat: 'fiber',
    preview: 'Brain chemistry and liver function.',
    func: 'Used to build acetylcholine, a neurotransmitter involved in memory and muscle control, and helps transport fat out of the liver.',
    sources: 'Eggs (especially yolks), liver, salmon, chicken, soybeans, cruciferous vegetables.',
    rda: '~425mg (women) / 550mg (men) per day.'
  },
  {
    name: 'Vitamin A', cat: 'vit',
    preview: 'Vision, immune defense, skin repair.',
    func: 'Maintains the light-sensing cells in your eyes, supports immune cell function, and helps skin and mucous membranes act as a barrier against infection.',
    sources: 'Sweet potato, carrots, spinach, kale, liver, eggs, red bell pepper.',
    rda: '~700mcg (women) / 900mcg (men) per day.'
  },
  {
    name: 'Vitamin C', cat: 'vit',
    preview: 'Collagen production and immune support.',
    func: 'Needed to build collagen (skin, tendons, blood vessels), helps the body absorb iron from plants, and acts as an antioxidant that supports immune function.',
    sources: 'Citrus fruit, bell peppers, strawberries, kiwi, broccoli, Brussels sprouts.',
    rda: '~75mg (women) / 90mg (men) per day.'
  },
  {
    name: 'Vitamin D', cat: 'vit',
    preview: 'Calcium absorption and bone strength.',
    func: 'Helps your gut absorb calcium and phosphorus for strong bones, and plays a role in immune regulation and muscle function. Your skin makes it from sunlight.',
    sources: 'Sunlight exposure, fatty fish, egg yolks, fortified milk, mushrooms.',
    rda: '600–800 IU/day (many adults need more; blood testing can confirm).'
  },
  {
    name: 'Vitamin E', cat: 'vit',
    preview: 'Antioxidant that protects cell membranes.',
    func: 'A fat-soluble antioxidant that protects cell membranes from oxidative damage, and supports immune function and skin health.',
    sources: 'Almonds, sunflower seeds, spinach, avocado, wheat germ, olive oil.',
    rda: '~15mg/day.'
  },
  {
    name: 'Vitamin K', cat: 'vit',
    preview: 'Blood clotting and bone mineralization.',
    func: 'Activates proteins involved in blood clotting so cuts heal properly, and helps bind calcium into bone tissue.',
    sources: 'Kale, spinach, broccoli, Brussels sprouts, fermented soy (natto).',
    rda: '~90mcg (women) / 120mcg (men) per day.'
  },
  {
    name: 'Vitamin B6', cat: 'vit',
    preview: 'Protein metabolism and neurotransmitter production.',
    func: 'Helps convert food into usable energy, supports the creation of neurotransmitters like serotonin and dopamine, and helps form hemoglobin.',
    sources: 'Chickpeas, salmon, chicken breast, potatoes, bananas, fortified cereal.',
    rda: '~1.3mg/day (higher for adults over 50).'
  },
  {
    name: 'Vitamin B12', cat: 'vit',
    preview: 'Nerve function and red blood cell formation.',
    func: 'Keeps nerve cells healthy, helps form DNA, and is required to make red blood cells. Deficiency can cause fatigue and nerve tingling.',
    sources: 'Meat, fish, eggs, dairy, fortified nutritional yeast (important for vegans to supplement).',
    rda: '~2.4mcg/day.'
  },
  {
    name: 'Folate (B9)', cat: 'vit',
    preview: 'Cell division and DNA synthesis.',
    func: 'Essential for making new cells and DNA — especially critical during pregnancy for the developing neural tube.',
    sources: 'Leafy greens, lentils, chickpeas, asparagus, avocado, fortified grains.',
    rda: '~400mcg/day (600mcg during pregnancy).'
  },
  {
    name: 'Calcium', cat: 'min',
    preview: 'Bone density, muscle contraction, nerve signaling.',
    func: 'The main mineral in bones and teeth. Also needed for muscles to contract, nerves to send signals, and blood to clot properly.',
    sources: 'Dairy, fortified plant milk, sardines with bones, tofu (calcium-set), leafy greens.',
    rda: '~1,000mg/day (1,200mg for women over 50).'
  },
  {
    name: 'Iron', cat: 'min',
    preview: 'Carries oxygen through the blood.',
    func: 'A core component of hemoglobin, the protein in red blood cells that carries oxygen from your lungs to the rest of your body. Low iron causes fatigue and pale skin.',
    sources: 'Red meat, liver, lentils, spinach, pumpkin seeds, fortified cereal (pair with vitamin C for absorption).',
    rda: '~18mg (women) / 8mg (men) per day.'
  },
  {
    name: 'Zinc', cat: 'min',
    preview: 'Immune response and wound healing.',
    func: 'Supports immune cell development, helps wounds heal, and is needed for taste, smell, and normal growth.',
    sources: 'Oysters, beef, pumpkin seeds, chickpeas, cashews, dairy.',
    rda: '~8mg (women) / 11mg (men) per day.'
  },
  {
    name: 'Magnesium', cat: 'min',
    preview: 'Muscle relaxation, energy production, sleep quality.',
    func: 'Involved in over 300 enzyme reactions, including energy production, muscle relaxation, and regulating nerve signals. Often linked to better sleep.',
    sources: 'Almonds, spinach, pumpkin seeds, black beans, dark chocolate, avocado.',
    rda: '~310–320mg (women) / 400–420mg (men) per day.'
  },
  {
    name: 'Potassium', cat: 'min',
    preview: 'Blood pressure and fluid balance.',
    func: 'Balances fluid levels inside cells, helps counter sodium\'s effect on blood pressure, and supports normal muscle and nerve function, including heartbeat.',
    sources: 'Bananas, potatoes (with skin), white beans, spinach, coconut water, avocado.',
    rda: '~2,600mg (women) / 3,400mg (men) per day.'
  },
  {
    name: 'Iodine', cat: 'min',
    preview: 'Thyroid hormone production.',
    func: 'A building block of thyroid hormones, which regulate metabolism, growth, and brain development, especially critical during pregnancy.',
    sources: 'Iodized salt, seaweed, cod, dairy, eggs.',
    rda: '~150mcg/day (220mcg during pregnancy).'
  },
  {
    name: 'Selenium', cat: 'min',
    preview: 'Antioxidant defense and thyroid support.',
    func: 'Works as part of antioxidant enzymes that protect cells from damage, and helps activate thyroid hormone.',
    sources: 'Brazil nuts (just 1–2 cover a full day), tuna, sardines, eggs, sunflower seeds.',
    rda: '~55mcg/day.'
  },
];

// Slugify a nutrient name for use in URLs, e.g. "Vitamin B12" -> "vitamin-b12"
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
