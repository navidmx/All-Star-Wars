function Score(){
	/* SCORE */
	var scoreGeometry = new THREE.TextGeometry( text, { size: 10, height: 5, curveSegments: 6, font: "helvetiker", weight: "normal", style: "bold" }); 
	var scoreMaterial = new THREE.MeshBasicMaterial({color: "#eac086"});
	score = new THREE.Mesh(scoreGeometry, scoreMaterial);
	score.position.set(20, 6, 5);
	return score;
}

module.exports = Score;