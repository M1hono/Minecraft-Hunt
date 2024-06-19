ItemEvents.crafted(event=>{
    event.player.tell(event.item.getHoverName())
})