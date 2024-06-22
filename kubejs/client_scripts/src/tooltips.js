ItemEvents.tooltip(event => {
    event.addAdvanced('minecraft:translate', (item, advanced, text) => {
        text.add(1, [
            Text.translate('tooltip.minecraft.translate.translation')
        ]);
    });
});