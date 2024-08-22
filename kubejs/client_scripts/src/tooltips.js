// ignored: true
ItemEvents.tooltip(event => {
    event.addAdvanced('minecraft:translate', (item, advanced, text) => {
        text.add(1, [
            Text.translatable('tooltip.minecraft.translate.translation')
        ]);
    });
});