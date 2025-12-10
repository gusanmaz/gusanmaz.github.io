// Tutorial Data - Tüm içerikleri birleştirir
// Her içerik dosyası kendi değişkenini tanımlar

const tutorialData = [
    introContent,
    spritesContent,
    physicsContent,
    movementContent,
    collisionsContent,
    visualsContent,
    groupsContent,
    inputContent,
    cameraContent,
    advancedContent
];

// Export for debugging
if (typeof window !== 'undefined') {
    window.tutorialData = tutorialData;
}
