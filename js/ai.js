function aiTurn(nation) {
  const targets = territories.filter(t =>
    t.owner !== nation &&
    t.neighbors.some(n => n.owner === nation)
  );

  if (targets.length && Math.random() < 0.4) {
    conquerTerritory(targets[0]);
  }
}
