function isAdjacent(a, b) {
  return a.properties.adm0_a3 === b.properties.adm0_a3
      || a.properties.neighbors?.includes(b.properties.adm0_a3);
}
function conquerTerritory(territory) {
  const nation = territory.owner;

  if (territory.isCapital) {
    annexNation(nation);
  } else {
    territory.owner = player;
  }
}
function annexNation(nation) {
  territories.forEach(t => {
    if (t.owner === nation) t.owner = player;
  });
}
