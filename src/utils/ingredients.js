const ingredients = [
    { name: 'Manzana', quantity: '1 mediana (182g)', calories: 52, protein: 0.3, fat: 0.2, sugar: 10.4, carbs: 13.8 },
    { name: 'Plátano', quantity: '1 grande (136g)', calories: 89, protein: 1.1, fat: 0.3, sugar: 12.2, carbs: 22.8 },
    { name: 'Zanahoria', quantity: '1 mediana (61g)', calories: 41, protein: 0.9, fat: 0.2, sugar: 4.7, carbs: 9.6 },
    { name: 'Tomate', quantity: '1 mediano (123g)', calories: 18, protein: 0.9, fat: 0.2, sugar: 2.6, carbs: 3.9 },
    { name: 'Espinaca', quantity: '1 taza (30g)', calories: 23, protein: 2.9, fat: 0.4, sugar: 0.4, carbs: 3.6 },
    { name: 'Huevox|', quantity: '1 grande (50g)', calories: 155, protein: 13, fat: 11, sugar: 1.1, carbs: 1.1 },
    { name: 'Leche', quantity: '1 taza (244g)', calories: 42, protein: 3.4, fat: 1, sugar: 5, carbs: 5 },
    { name: 'Yogur', quantity: '1 taza (245g)', calories: 59, protein: 10, fat: 0.4, sugar: 5.8, carbs: 3.6 },
    { name: 'Arroz blanco', quantity: '1 taza cocida (158g)', calories: 130, protein: 2.7, fat: 0.3, sugar: 0.1, carbs: 28.6 },
    { name: 'Lentejas', quantity: '1 taza cocida (198g)', calories: 116, protein: 9.0, fat: 0.4, sugar: 1.8, carbs: 20.1 },
    { name: 'Tofu', quantity: '100g', calories: 76, protein: 8, fat: 4.8, sugar: 0.7, carbs: 1.9 },
    { name: 'Salmón', quantity: '100g', calories: 208, protein: 20, fat: 13, sugar: 0, carbs: 0 },
    { name: 'Pechuga de pollo', quantity: '100g', calories: 165, protein: 31, fat: 3.6, sugar: 0, carbs: 0 },
    { name: 'Ternera', quantity: '100g', calories: 250, protein: 26, fat: 15, sugar: 0, carbs: 0 },
    { name: 'Pavo', quantity: '100g', calories: 189, protein: 29, fat: 7, sugar: 0, carbs: 0 },
    { name: 'Aguacate', quantity: '1 entero (200g)', calories: 160, protein: 2, fat: 15, sugar: 0.7, carbs: 9 },
    { name: 'Fresas', quantity: '1 taza (152g)', calories: 32, protein: 0.7, fat: 0.3, sugar: 4.9, carbs: 7.7 },
    { name: 'Naranja', quantity: '1 mediana (131g)', calories: 47, protein: 0.9, fat: 0.1, sugar: 9.4, carbs: 11.8 },
    { name: 'Papas', quantity: '1 mediana (173g)', calories: 77, protein: 2.0, fat: 0.1, sugar: 0.8, carbs: 17.5 },
    { name: 'Pan blanco', quantity: '1 rebanada (25g)', calories: 265, protein: 9, fat: 3.2, sugar: 5, carbs: 49 },
    { name: 'Queso Cheddar', quantity: '1 onza (28g)', calories: 402, protein: 25, fat: 33, sugar: 0.1, carbs: 1.3 },
    { name: 'Almendras', quantity: '1 onza (28g)', calories: 579, protein: 21, fat: 50, sugar: 4.8, carbs: 22 },
    { name: 'Mantequilla', quantity: '1 cucharada (14g)', calories: 717, protein: 0.9, fat: 81, sugar: 0.1, carbs: 0.1 },
    { name: 'Aceite de oliva', quantity: '1 cucharada (15ml)', calories: 884, protein: 0, fat: 100, sugar: 0, carbs: 0 },
    { name: 'Chocolate negro', quantity: '1 onza (28g)', calories: 546, protein: 5, fat: 31, sugar: 24, carbs: 61 },
    { name: 'Brócoli', quantity: '1 taza (91g)', calories: 34, protein: 2.8, fat: 0.4, sugar: 1.7, carbs: 6.6 },
    { name: 'Garbanzos', quantity: '1 taza cocida (164g)', calories: 164, protein: 8.9, fat: 2.6, sugar: 8, carbs: 27.4 },
    { name: 'Avena', quantity: '1 taza cocida (234g)', calories: 389, protein: 16.9, fat: 6.9, sugar: 0, carbs: 66.3 },
    { name: 'Quinoa', quantity: '1 taza cocida (185g)', calories: 120, protein: 4.1, fat: 1.9, sugar: 0, carbs: 21.3 },
    { name: 'Alubias negras', quantity: '1 taza cocida (172g)', calories: 132, protein: 8.9, fat: 0.5, sugar: 0, carbs: 23.7 },
    { name: 'Maíz', quantity: '1 taza (166g)', calories: 86, protein: 3.2, fat: 1.2, sugar: 4.5, carbs: 19 },
    { name: 'Mango', quantity: '1 taza en cubos (165g)', calories: 60, protein: 0.8, fat: 0.4, sugar: 13.7, carbs: 15 },
    { name: 'Pera', quantity: '1 mediana (178g)', calories: 57, protein: 0.4, fat: 0.1, sugar: 9.8, carbs: 15.1 },
    { name: 'Melón', quantity: '1 taza en cubos (156g)', calories: 34, protein: 0.8, fat: 0.2, sugar: 7.9, carbs: 8.2 },
    { name: 'Sandía', quantity: '1 taza en cubos (154g)', calories: 30, protein: 0.6, fat: 0.2, sugar: 6.2, carbs: 7.6 },
    { name: 'Kiwi', quantity: '1 grande (69g)', calories: 61, protein: 1.1, fat: 0.5, sugar: 9, carbs: 14.7 },
    { name: 'Frambuesas', quantity: '1 taza (123g)', calories: 52, protein: 1.2, fat: 0.7, sugar: 4.4, carbs: 11.9 },
    { name: 'Arándanos', quantity: '1 taza (148g)', calories: 57, protein: 0.7, fat: 0.3, sugar: 9.96, carbs: 14.5 },
    { name: 'Cacahuetes', quantity: '1 onza (28g)', calories: 567, protein: 25.8, fat: 49.2, sugar: 4.7, carbs: 16.1 },
    { name: 'Pistachos', quantity: '1 onza (28g)', calories: 562, protein: 20.3, fat: 45.4, sugar: 7.7, carbs: 27.5 },
    { name: 'Nueces', quantity: '1 onza (28g)', calories: 654, protein: 15.2, fat: 65.2, sugar: 2.6, carbs: 13.7 },
    { name: 'Calabaza', quantity: '1 taza en cubos (116g)', calories: 26, protein: 1, fat: 0.1, sugar: 2.8, carbs: 6.5 },
    { name: 'Berenjena', quantity: '1 taza en cubos (99g)', calories: 25, protein: 1, fat: 0.2, sugar: 3.5, carbs: 6 },
    { name: 'Espárragos', quantity: '1 taza (134g)', calories: 20, protein: 2.2, fat: 0.1, sugar: 1.2, carbs: 3.9 },
    { name: 'Pepino', quantity: '1 mediano (201g)', calories: 16, protein: 0.7, fat: 0.1, sugar: 1.7, carbs: 3.6 },
    { name: 'Calabacín', quantity: '1 taza en rodajas (180g)', calories: 17, protein: 1.2, fat: 0.3, sugar: 2.5, carbs: 3.1 },
    { name: 'Remolacha', quantity: '1 taza en cubos (136g)', calories: 43, protein: 1.6, fat: 0.2, sugar: 6.8, carbs: 10 },
    { name: 'Apio', quantity: '2 tallos grandes (110g)', calories: 16, protein: 0.7, fat: 0.2, sugar: 1.8, carbs: 3 },
    { name: 'Coles de Bruselas', quantity: '1 taza (88g)', calories: 43, protein: 3.4, fat: 0.3, sugar: 2.2, carbs: 8.9 },
    { name: 'Col rizada', quantity: '1 taza (67g)', calories: 35, protein: 2.9, fat: 1.5, sugar: 0, carbs: 4.4 },
];

export default ingredients;