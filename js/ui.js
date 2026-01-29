export function updateUI(player){
  nationName.textContent = player;
  gold.textContent = playerData[player].gold;
  mil.textContent = playerData[player].mil;
}

export let playerData = {};
export function setPlayerData(data){
  playerData = data;
}
