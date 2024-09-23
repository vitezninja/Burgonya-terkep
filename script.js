// HTML lekérések

const springPointDisplay = document.querySelector("#spring-point-display");
const summerPointDisplay = document.querySelector("#summer-point-display");
const fallPointDisplay = document.querySelector("#fall-point-display");
const winterPointDisplay = document.querySelector("#winter-point-display");
const pointDisplayText = document.querySelector("#point-display-text");
const gameTable = document.querySelector("#game-table");
const currentSeason = document.querySelector("#current-season");
const missionsContainerTable = document.querySelector("#missions-container-table");
const currentTime = document.querySelector("#current-time");
const endGame = document.querySelector("#end-game");
const rotate = document.querySelector("#rotate");
const mirror = document.querySelector("#mirror");
const currentPieceTime = document.querySelector("#current-piece-time");
const currentPieceTable = document.querySelector("#current-piece-table");
const gameOverMessage = document.querySelector("#game-over-message")
const newGameButton = document.querySelector("#new-game-button")
const help = document.querySelector("#help");

// Állapottér

let missionA
let missionB
let missionC
let missionD
const MAX_TIME = 7
let gameData
let currentPiece
const tiles = [
  {
      time: 2,
      type: 'water',
      shape: [[1,1,1],
              [0,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false
  },
  {
      time: 2,
      type: 'town',
      shape: [[1,1,1],
              [0,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false        
  },
  {
      time: 1,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'farm',
      shape: [[1,1,1],
              [0,0,1],
              [0,0,0]],
          rotation: 0,
          mirrored: false  
      },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,1],
              [0,0,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'town',
      shape: [[1,1,1],
              [0,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'farm',
      shape: [[1,1,1],
              [0,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 1,
      type: 'town',
      shape: [[1,1,0],
              [1,0,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 1,
      type: 'town',
      shape: [[1,1,1],
              [1,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 1,
      type: 'farm',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 1,
      type: 'farm',
      shape: [[0,1,0],
              [1,1,1],
              [0,1,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,1,1],
              [1,0,0],
              [1,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,0,0],
              [1,1,1],
              [1,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,1]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'forest',
      shape: [[1,1,0],
              [0,1,1],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
  {
      time: 2,
      type: 'water',
      shape: [[1,1,0],
              [1,1,0],
              [0,0,0]],
      rotation: 0,
      mirrored: false  
  },
]
const missions = 
[
  {
    "title": "Az erdő széle",
    "description": "Mission 2.png",
    "points": "mission2"
  },
  {
    "title": "Álmos-völgy",
    "description": "Mission 7.png",
    "points": "mission7"
  },
  {
    "title": "Krumpliöntözés",
    "description": "Mission 3.png",
    "points": "mission3"
  },
  {
    "title": "Határvidék",
    "description": "Mission 11.png",
    "points": "mission11"
  },
  {
    "title": "Fasor",
    "description": "Mission 1.png",
    "points": "mission1"
  },
  {
    "title": "Gazdag város",
    "description": "Mission 4.png",
    "points": "mission4"
  },
  {
    "title": "Öntözőcsatorna",
    "description": "Mission 8.png",
    "points": "mission8"
  },
  {
    "title": "Mágusok völgye",
    "description": "Mission 9.png",
    "points": "mission9"
  },
  {
    "title": "Üres telek",
    "description": "Mission 10.png",
    "points": "mission10"
  },
  {
    "title": "Sorház",
    "description": "Mission 5.png",
    "points": "mission5"
  },
  {
    "title": "Páratlan silók",
    "description": "Mission 6.png",
    "points": "mission6"
  },
  {
    "title": "Gazdag vidék",
    "description": "Mission 12.png",
    "points": "mission12"
  }
]

// Event listener

endGame.addEventListener('click', handleEndGameButtonClick)
rotate.addEventListener('click', handleRotateButtonClick)
mirror.addEventListener('click', handleMirrorButtonClick)
gameTable.addEventListener('click', handleGameTableClick)
newGameButton.addEventListener('click', handleNewGameButtonClick)

// Event handler

function handleEndGameButtonClick(e){
  showGameOverMessage()
}

function handleRotateButtonClick(e){
  currentPiece.shape = currentPiece.shape.map((val, index) => currentPiece.shape.map(row => row[index]).reverse())
  currentPiece.rotation++
  if (currentPiece.rotation == 4) {
    currentPiece.rotation = 0
  }
  setCurrentPiece()
}

function handleMirrorButtonClick(e){
  currentPiece.shape = currentPiece.shape.map((element) => element.reverse())
  currentPiece.mirrored = !currentPiece.mirrored
  setCurrentPiece()
}

function handleGameTableClick(e){
  let isTrue = true
  if (e.target.matches("img")) {
    if(checkIfPlaceble(e.target.dataset.x, e.target.dataset.y)){
      placeCurrentPiece(e.target.dataset.x, e.target.dataset.y)
      calculatePoints(gameData.currentSeasonData)
      if(checkSeason()){
        gameData.currentSeasonData++
        calculateLastSeasonPoints(gameData.currentSeasonData-1)
        gameData.pointsInCurrentSeason = 0
        if (gameData.currentSeasonData == 4) {
          showGameOverMessage()
          isTrue = false
        }
        else{
          gameData.gameTiles = shuffle(tiles)
          gameData.currentTileIndex = 0
          gameData.currentTimeInTheSeason = 0
          setSeanonAndMissionsUpdate()
        }
      }
      setLeftOfSeason()
      if(isTrue){
        saveGame()
        newPiece()
      }
    }
  }
}

function handleNewGameButtonClick(e){
  startGame()
}


// Segédfüggvény

function startGame(){
  setEndOfGameMessageVisible(false)
  loadGame()
  setScore()
  setTable()
  setMissions()
  missionA = document.querySelector("#missions-container-A")
  missionB = document.querySelector("#missions-container-B")
  missionC = document.querySelector("#missions-container-C")
  missionD = document.querySelector("#missions-container-D")
  setSeanonAndMissionsUpdate()
  setLeftOfSeason()
  setCurrentPiece()
}

function newGame(){
  gameData = {
    currentTileIndex: 0,
    gameTiles: shuffle(tiles),
    currentSeasonData: 0,
    //0 == tavasz
    //1 == nyár
    //2 == ősz
    //3 == tél
    currentTimeInTheSeason: 0,
    currentBoard: [
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,-1,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,-1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,-1,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,-1,0],
      [0,0,0,0,0,-1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
    ],
    //0 == üres
    //-1 == hegy
    //1 == víz
    //2 == erdő
    //3 == falu
    //4 == farm
    seasonScores: [0,0,0,0],
    pointsInCurrentSeason: 0,
    missionScors: [0,0,0,0],
    missionsChosen: []
  }
  createMissions()
}

function loadGame(){
  gameData = JSON.parse(localStorage.getItem("savedData"))
  if(gameData === null){
    newGame()
  }
}

function saveGame(){
  localStorage.setItem("savedData", JSON.stringify(gameData))
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

function setEndOfGameMessageVisible(isTrue){
  help.hidden = isTrue
  gameOverMessage.hidden = !isTrue
  newGameButton.hidden = !isTrue
  newGameButton.disabled = !isTrue
  endGame.disabled = isTrue
  rotate.disabled = isTrue
  mirror.disabled = isTrue
  gameTable.hidden = isTrue
}

function createMissions(){
  let temp = missions
  for (let i = 0; i < 4; i++) {
    let x = Math.floor(Math.random() * temp.length)
    gameData.missionsChosen.push(temp[x])
    temp = temp.filter((element) => element !== temp[x])
  }
}

function setScore(){
  springPointDisplay.innerHTML = `Tavasz:<br>${gameData.seasonScores[0]} pont`
  summerPointDisplay.innerHTML = `Nyár:<br>${gameData.seasonScores[1]} pont`
  fallPointDisplay.innerHTML = `Ősz:<br>${gameData.seasonScores[2]} pont`
  winterPointDisplay.innerHTML = `Tél:<br>${gameData.seasonScores[3]} pont`
  pointDisplayText.innerHTML = `Összesen: ${gameData.seasonScores.reduce((sum, num) => sum + num, 0)+calculateSurrundedMountainPoints()} pont`
}

function setTable(){
  gameTable.innerHTML = ""
  for (let i = 0; i < 11; i++) {
    let trData = document.createElement('tr')
    let rowData = []
    for (let j = 0; j < 11; j++) {
      switch(gameData.currentBoard[i][j]){
        case 0:
          rowData.push(`<td><img src="assets/tiles/base_tile.png" alt="base tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
        case -1:
          rowData.push(`<td><img src="assets/tiles/mountain_tile.png" alt="mountain tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
        case 1:
          rowData.push(`<td><img src="assets/tiles/water_tile.png" alt="water tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
        case 2:
          rowData.push(`<td><img src="assets/tiles/forest_tile.png" alt="forest tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
        case 3:
          rowData.push(`<td><img src="assets/tiles/village_tile.png" alt="village tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
        case 4:
          rowData.push(`<td><img src="assets/tiles/plains_tile.png" alt="plains tile" class="tableimg" data-x="${i}" data-y="${j}"></td>`)
          break
      }
    }
    trData.innerHTML = rowData.join("")
    gameTable.appendChild(trData)
  }
}

function setMissions(){
  missionsContainerTable.innerHTML = ""
  let tr1Data = document.createElement('tr')
  let rowData = []
  rowData.push(`<td id="missions-container-A" class="missions-container-table-child"><img src="assets/missions_hun/${gameData.missionsChosen[0].description}" alt="Mission A: ${gameData.missionsChosen[0].title}" class="small-img"><br><p>(${gameData.missionScors[0]} pont) A</p></td>`)
  rowData.push(`<td id="missions-container-B" class="missions-container-table-child"><img src="assets/missions_hun/${gameData.missionsChosen[1].description}" alt="Mission B: ${gameData.missionsChosen[1].title}" class="small-img"><br><p>(${gameData.missionScors[1]} pont) B</p></td>`)
  tr1Data.innerHTML = rowData.join("")
  let tr2Data = document.createElement('tr')
  rowData = []
  rowData.push(`<td id="missions-container-C" class="missions-container-table-child"><img src="assets/missions_hun/${gameData.missionsChosen[2].description}" alt="Mission C: ${gameData.missionsChosen[2].title}" class="small-img"><br><p>(${gameData.missionScors[2]} pont) C</p></td>`)
  rowData.push(`<td id="missions-container-D" class="missions-container-table-child"><img src="assets/missions_hun/${gameData.missionsChosen[3].description}" alt="Mission D: ${gameData.missionsChosen[3].title}" class="small-img"><br><p>(${gameData.missionScors[3]} pont) D</p></td>`)
  tr2Data.innerHTML = rowData.join("")
  missionsContainerTable.appendChild(tr1Data)
  missionsContainerTable.appendChild(tr2Data)
}

function setSeanonAndMissionsUpdate(){
  switch(gameData.currentSeasonData){
    case 0:
      currentSeason.innerHTML = `Jelenlegi évszak: Tavasz (AB)`
      missionA.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[0].description}" alt="Mission A: ${gameData.missionsChosen[0].title}" class="small-img"><br><p>(${gameData.missionScors[0]} pont) A  <img src="assets/green circle.png" class="timer-icon"></p>`
      missionB.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[1].description}" alt="Mission B: ${gameData.missionsChosen[1].title}" class="small-img"><br><p>(${gameData.missionScors[1]} pont) B  <img src="assets/green circle.png" class="timer-icon"></p>`
      break
    case 1:
      currentSeason.innerHTML = `Jelenlegi évszak: Nyár (BC)`
      missionA.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[0].description}" alt="Mission A: ${gameData.missionsChosen[0].title}" class="small-img"><br><p>(${gameData.missionScors[0]} pont) A</p>`
      missionB.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[1].description}" alt="Mission B: ${gameData.missionsChosen[1].title}" class="small-img"><br><p>(${gameData.missionScors[1]} pont) B  <img src="assets/green circle.png" class="timer-icon"></p>`
      missionC.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[2].description}" alt="Mission C: ${gameData.missionsChosen[2].title}" class="small-img"><br><p>(${gameData.missionScors[2]} pont) C  <img src="assets/green circle.png" class="timer-icon"></p>`
      break
    case 2:
      currentSeason.innerHTML = `Jelenlegi évszak: Ősz (CD)`
      missionB.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[1].description}" alt="Mission B: ${gameData.missionsChosen[1].title}" class="small-img"><br><p>(${gameData.missionScors[1]} pont) B</p>`
      missionC.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[2].description}" alt="Mission C: ${gameData.missionsChosen[2].title}" class="small-img"><br><p>(${gameData.missionScors[2]} pont) C  <img src="assets/green circle.png" class="timer-icon"></p>`
      missionD.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[3].description}" alt="Mission D: ${gameData.missionsChosen[3].title}" class="small-img"><br><p>(${gameData.missionScors[3]} pont) D  <img src="assets/green circle.png" class="timer-icon"></p>`
      break
    case 3:
      currentSeason.innerHTML = `Jelenlegi évszak: Tél (DA)`
      missionC.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[2].description}" alt="Mission C: ${gameData.missionsChosen[2].title}" class="small-img"><br><p>(${gameData.missionScors[2]} pont) C</p>`
      missionD.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[3].description}" alt="Mission D: ${gameData.missionsChosen[3].title}" class="small-img"><br><p>(${gameData.missionScors[3]} pont) D  <img src="assets/green circle.png" class="timer-icon"></p>`
      missionA.innerHTML = `<img src="assets/missions_hun/${gameData.missionsChosen[0].description}" alt="Mission A: ${gameData.missionsChosen[0].title}" class="small-img"><br><p>(${gameData.missionScors[0]} pont) A  <img src="assets/green circle.png" class="timer-icon"></p>`
      break
  }
}

function setLeftOfSeason(){
  currentTime.innerHTML = `Évszakból hátralávő idő: ${gameData.currentTimeInTheSeason}/${MAX_TIME}`
}

function setCurrentPiece(){
  currentPiece = gameData.gameTiles[gameData.currentTileIndex]
  currentPieceTable.innerHTML = ""
  currentPieceTime.innerHTML = currentPiece.time
  let innit
  switch (currentPiece.type) {
    case 'water':
      innit = `<td><img src="assets/tiles/water_tile.png" alt="water tile" class="tableimg"></img></td>`
      break
    case 'forest':
      innit = `<td><img src="assets/tiles/forest_tile.png" alt="forest tile" class="tableimg"></img></td>`
      break
    case 'town':
      innit = `<td><img src="assets/tiles/village_tile.png" alt="village tile" class="tableimg"></img></td>`
      break
    case 'farm':
      innit = `<td><img src="assets/tiles/plains_tile.png" alt="plains tile" class="tableimg"></img></td>`
      break
  }
  for (let i = 0; i < 3; i++) {
    let trData = document.createElement('tr')
    let rowData = []
    for (let j = 0; j < 3; j++) {
      if(currentPiece.shape[i][j] == 1){
        rowData.push(innit)
      }
      else{
        rowData.push(`<td><img src="assets/tiles/base_tile.png" alt="base tile" class="tableimg" style="opacity: 0"></img></td>`)
      }
    }
    trData.innerHTML = rowData.join("")
    currentPieceTable.appendChild(trData)
  }
}

function showGameOverMessage(){
  calculateLastSeasonPoints(gameData.currentSeasonData)
  setEndOfGameMessageVisible(true)
  let maxScore = gameData.seasonScores.reduce((sum, num) => sum + num, 0)
  maxScore += calculateSurrundedMountainPoints()
  gameOverMessage.innerHTML = `A játéknak vége!<br>Összeszen ${maxScore} pontot szereztél`
  localStorage.setItem("savedData", null)
}

function checkIfPlaceble(x,y){
  //edges
  if(x == 0 && y == 0){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[0][i] == 1 || currentPiece.shape[i][0] == 1) {
        return false
      }
    }
  }
  else if(x == 0 && y == gameData.currentBoard[0].length-1){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[0][i] == 1 || currentPiece.shape[i][2] == 1) {
        return false
      }
    }
  }
  else if(x == gameData.currentBoard.length-1 && y == gameData.currentBoard[0].length-1){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[2][i] == 1 || currentPiece.shape[i][2] == 1) {
        return false
      }
    }
  }
  else if(x == gameData.currentBoard.length-1 && y == 0){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[2][i] == 1 || currentPiece.shape[i][0] == 1) {
        return false
      }
    }
  }
  //sides
  else if(x == 0){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[0][i] == 1) {
        return false
      }
    }
  }
  else if(y == gameData.currentBoard[0].length-1){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[i][2] == 1) {
        return false
      }
    }
  }
  else if(x == gameData.currentBoard.length-1){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[2][i] == 1) {
        return false
      }
    }
  }
  else if(y == 0){
    for (let i = 0; i < 3; i++) {
      if (currentPiece.shape[i][0] == 1) {
        return false
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (currentPiece.shape[i][j] == 1) {
        if(gameData.currentBoard[x-1+i][y-1+j] !== 0){
          return false
        }
      }
    }
  }
  return true
}

function placeCurrentPiece(x,y){
  let innit
  switch (currentPiece.type) {
    case 'water':
      innit = 1
      break
    case 'forest':
      innit = 2
      break
    case 'town':
      innit = 3
      break
    case 'farm':
      innit = 4
      break
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (currentPiece.shape[i][j] == 1) {
        gameData.currentBoard[x-1+i][y-1+j] = innit
      }
    }
  }
  setTable()
  gameData.currentTimeInTheSeason += currentPiece.time
}

function checkSeason(){
  if (gameData.currentTimeInTheSeason >= MAX_TIME) {
    return true
  }
  return false
}

function newPiece(){
  gameData.currentTileIndex++
  setCurrentPiece()
}

function calculateSurrundedMountainPoints(){
  let points = 0
  //2,2
  if(gameData.currentBoard[0][1] !== 0 && gameData.currentBoard[1][0]  !== 0 && gameData.currentBoard[1][2]  !== 0 && gameData.currentBoard[2][1]  !== 0){
    points++
  }
  //4,9
  if(gameData.currentBoard[2][8] !== 0 && gameData.currentBoard[3][7]  !== 0 && gameData.currentBoard[3][9]  !== 0 && gameData.currentBoard[4][8]  !== 0){
    points++
  }
  //6,4
  if(gameData.currentBoard[4][3] !== 0 && gameData.currentBoard[5][2]  !== 0 && gameData.currentBoard[5][4]  !== 0 && gameData.currentBoard[6][3]  !== 0){
    points++
  }
  //9,10
  if(gameData.currentBoard[7][9] !== 0 && gameData.currentBoard[8][8]  !== 0 && gameData.currentBoard[8][10]  !== 0 && gameData.currentBoard[9][9]  !== 0){
    points++
  }
  //10,6
  if(gameData.currentBoard[8][5] !== 0 && gameData.currentBoard[9][4]  !== 0 && gameData.currentBoard[9][6]  !== 0 && gameData.currentBoard[10][5]  !== 0){
    points++
  }
  return points
}

function calculatePoints(currentSeason){
  let pointsThisSeason = gameData.pointsInCurrentSeason
  let seasonIndex = []
  switch (currentSeason) {
    case 0:
      seasonIndex.push(0)
      seasonIndex.push(1)
      break;
    case 1:
      seasonIndex.push(1)
      seasonIndex.push(2)
      break;
    case 2:
      seasonIndex.push(2)
      seasonIndex.push(3)
      break;
    case 3:
      seasonIndex.push(3)
      seasonIndex.push(0)
      break;
  }
  let pointsMission
  for (let i = 0; i < 2; i++) {
    switch (gameData.missionsChosen[seasonIndex[i]].points) {
      case "mission1":
        pointsMission = mission1()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission2":
        pointsMission = mission2()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission3":
        pointsMission = mission3()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission4":
        pointsMission = mission4()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission5":
        pointsMission = mission5()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission6":
        pointsMission = mission6()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission7":
        pointsMission = mission7()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission8":
        pointsMission = mission8()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission9":
        pointsMission = mission9()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission10":
        pointsMission = mission10()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission11":
        pointsMission = mission11()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
      case "mission12":
        pointsMission = mission12()
        pointsThisSeason += pointsMission - gameData.missionScors[seasonIndex[i]]
        gameData.missionScors[seasonIndex[i]] = pointsMission
        break;
    }    
  }
  gameData.pointsInCurrentSeason = pointsThisSeason
  setSeanonAndMissionsUpdate()
}

function calculateLastSeasonPoints(currentSeason){
  gameData.seasonScores[currentSeason] = gameData.pointsInCurrentSeason
  setScore()
}

function checkIfAdjesentToThisTile(x,y,checksForThisTile){
  if(x == 0 && y == 0){
    if(gameData.currentBoard[0][1] == checksForThisTile || gameData.currentBoard[1][0] == checksForThisTile){
      return true
    }
  }
  else if(x == 0 && y == gameData.currentBoard[0].length-1){
    if(gameData.currentBoard[0][9] == checksForThisTile || gameData.currentBoard[1][10] == checksForThisTile){
      return true
    }
  }
  else if(x == gameData.currentBoard.length-1 && y == gameData.currentBoard[0].length-1){
    if(gameData.currentBoard[9][10] == checksForThisTile || gameData.currentBoard[10][9] == checksForThisTile){
      return true
    }
  }
  else if(x == gameData.currentBoard.length-1 && y == 0){
    if(gameData.currentBoard[9][0] == checksForThisTile || gameData.currentBoard[10][1] == checksForThisTile){
      return true
    }
  }
  //sides
  else if(x == 0){
    if(gameData.currentBoard[0][y-1] == checksForThisTile || gameData.currentBoard[0][y+1] == checksForThisTile || gameData.currentBoard[1][y] == checksForThisTile){
      return true
    }
  }
  else if(y == gameData.currentBoard[0].length-1){
    if(gameData.currentBoard[x-1][10] == checksForThisTile || gameData.currentBoard[x+1][10] == checksForThisTile || gameData.currentBoard[x][9] == checksForThisTile){
      return true
    }
  }
  else if(x == gameData.currentBoard.length-1){
    if(gameData.currentBoard[10][y-1] == checksForThisTile || gameData.currentBoard[10][y+1] == checksForThisTile || gameData.currentBoard[9][y] == checksForThisTile){
      return true
    }
  }
  else if(y == 0){
    if(gameData.currentBoard[x-1][0] == checksForThisTile || gameData.currentBoard[x+1][0] == checksForThisTile || gameData.currentBoard[x][1] == checksForThisTile){
      return true
    }
  }
  //middle
  else{
    if(gameData.currentBoard[x-1][y] == checksForThisTile || gameData.currentBoard[x+1][y] == checksForThisTile || gameData.currentBoard[x][y-1] == checksForThisTile || gameData.currentBoard[x][y+1] == checksForThisTile){
      return true
    }
  }
  return false
}

function checkIfThereAreMoreThanThreeTilesThatAreDifferentAreAdjacentToThisTile(x,y){
  if(x == 0 && y == 0){
      return false
  }
  else if(x == 0 && y == gameData.currentBoard[0].length-1){
    return false
  }
  else if(x == gameData.currentBoard.length-1 && y == gameData.currentBoard[0].length-1){
    return false
  }
  else if(x == gameData.currentBoard.length-1 && y == 0){
    return false
  }
  //sides
  else if(x == 0){
    let container = new Set()
    container.add(gameData.currentBoard[0][y-1])
    container.add(gameData.currentBoard[0][y+1])
    container.add(gameData.currentBoard[1][y])
    container.delete(0)
    if(container.size != 3){
      return false
    }
  }
  else if(y == gameData.currentBoard[0].length-1){
    let container = new Set()
    container.add(gameData.currentBoard[x-1][10])
    container.add(gameData.currentBoard[x+1][10])
    container.add(gameData.currentBoard[x][9])
    container.delete(0)
    if(container.size != 3){
      return false
    }
  }
  else if(x == gameData.currentBoard.length-1){
    let container = new Set()
    container.add(gameData.currentBoard[10][y-1])
    container.add(gameData.currentBoard[10][y+1])
    container.add(gameData.currentBoard[9][y])
    container.delete(0)
    if(container.size != 3){
      return false
    }
  }
  else if(y == 0){
    let container = new Set()
    container.add(gameData.currentBoard[x-1][0])
    container.add(gameData.currentBoard[x+1][0])
    container.add(gameData.currentBoard[x][1])
    container.delete(0)
    if(container.size != 3){
      return false
    }
  }
  //middle
  else{
    let container = new Set()
    container.add(gameData.currentBoard[x-1][y])
    container.add(gameData.currentBoard[x+1][y])
    container.add(gameData.currentBoard[x][y-1])
    container.add(gameData.currentBoard[x][y+1])
    container.delete(0)
    if(container.size < 3){
      return false
    }
  }
  return true
}

//Fasor
function mission1(){
  let points = 0
  let maxLenght = 0
  let currentLenght = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (gameData.currentBoard[j][i] == 2) {
        currentLenght++
      }
      else{
        currentLenght = 0
      }
      if(currentLenght > maxLenght){
        maxLenght = currentLenght
      }
    }
  }
  points = maxLenght * 2
  return points
}

//Az erdő széle
function mission2(){
  let points = 0
  let forestAtEdgeCount = 0
  for (let i = 0; i < 11; i++) {
    if(gameData.currentBoard[0][i] == 2){
      forestAtEdgeCount++
    }
    if(gameData.currentBoard[10][i] == 2){
      forestAtEdgeCount++
    }
  }
  for (let i = 1; i < 10; i++) {
    if(gameData.currentBoard[i][0] == 2){
      forestAtEdgeCount++
    }
    if(gameData.currentBoard[i][10] == 2){
      forestAtEdgeCount++
    }
  }
  points = forestAtEdgeCount
  return points
}

//Krumpliöntözés
function mission3(){
  let points = 0
  let waterNextToFarmCount = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (gameData.currentBoard[i][j] == 1) {
        if(checkIfAdjesentToThisTile(i,j,4)){
          waterNextToFarmCount++
        }
      }
    }
  }
  points = waterNextToFarmCount * 2
  return points
}

//Gazdag város
function mission4(){
  let points = 0
  let villageHasMoreThenThreeNextToIt = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[i][j] == 3){
        if(checkIfThereAreMoreThanThreeTilesThatAreDifferentAreAdjacentToThisTile(i,j)){
          villageHasMoreThenThreeNextToIt++
        }
      }
    }
  }
  points = villageHasMoreThenThreeNextToIt * 3
  return points
}

//Sorház
function mission5(){
  let points = 0
  let maxLenght = 0
  let currentLenght = 0
  let MaxLenghtCount = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[i][j] == 3){
        currentLenght++
      }
      else{
        currentLenght = 0
      }
      if(currentLenght == maxLenght){
        MaxLenghtCount++
      }
      else if(currentLenght > maxLenght){
        maxLenght = currentLenght
        MaxLenghtCount = 1
      }
    }
  }
  points = maxLenght * MaxLenghtCount * 2
  return points
}

//Páratlan silók
function mission6(){
  let points = 0
  let count = 0
  let countInARow
  for (let i = 0; i < 11; i++) {
    countInARow = 0
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[j][i] !== 0){
        countInARow++
      }
    }
    if(countInARow == 11 && i % 2 == 0){
      count++
    }
  }
  points = count * 10
  return points
}

//Álmos-völgy
function mission7(){
  let points = 0
  let count = 0
  let countInARow
  for (let i = 0; i < 11; i++) {
    countInARow = 0
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[i][j] == 2){
        countInARow++
      }
    }
    if(countInARow == 3){
      count++
    }
  }
  points = count * 4
  return points
}

//Öntözőcsatorna
function mission8(){
  let points = 0
  let count = 0
  let countInARowOfWater
  let countInARowOfFarm
  for (let i = 0; i < 11; i++) {
    countInARowOfWater = 0
    countInARowOfFarm = 0
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[j][i] == 1){
        countInARowOfWater++
      }
      if(gameData.currentBoard[j][i] == 4){
        countInARowOfFarm++
      }
    }
    if(countInARowOfWater == countInARowOfFarm && countInARowOfFarm >= 1 && countInARowOfWater >= 1){
      count++
    }
  }
  points = count * 4
  return points
}

//Mágusok völgye
function mission9(){
  let points = 0
  let waterNextToMountainCount = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (gameData.currentBoard[i][j] == 1) {
        if(checkIfAdjesentToThisTile(i,j,-1)){
          waterNextToMountainCount++
        }
      }
    }
  }
  points = waterNextToMountainCount * 3
  return points
}

//Üres telek
function mission10(){
  let points = 0
  let blankNextToVillageCount = 0
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (gameData.currentBoard[i][j] == 0) {
        if(checkIfAdjesentToThisTile(i,j,3)){
          blankNextToVillageCount++
        }
      }
    }
  }
  points = blankNextToVillageCount * 2
  return points
}

//Határvidék
function mission11(){
  let points = 0
  let count = 0
  let countInARow
  for (let i = 0; i < 11; i++) {
    countInARow = 0
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[j][i] !== 0){
        countInARow++
      }
    }
    if(countInARow == 11){
      count++
    }
  }
  for (let i = 0; i < 11; i++) {
    countInARow = 0
    for (let j = 0; j < 11; j++) {
      if(gameData.currentBoard[i][j] !== 0){
        countInARow++
      }
    }
    if(countInARow == 11){
      count++
    }
  }
  points = count * 6
  return points
}

//Gazdag vidék
function mission12(){
  let points = 0
  let count = 0
  for (let i = 0; i < 11; i++) {
    let container = new Set()
    for (let j = 0; j < 11; j++) {
      container.add(gameData.currentBoard[i][j])
    }
    container.delete(0)
    if(container.size >= 5){
      count++
    }
  }
  points = count * 4
  return points
}

startGame()