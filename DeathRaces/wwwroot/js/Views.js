function draw_enemies(enemy)
{
    gameZone.innerHTML += `<div class="car" style="left: ${enemy.x}px; top: ${enemy.y}px; transform: rotate(${enemy.degrees}deg);"></div>`
}
