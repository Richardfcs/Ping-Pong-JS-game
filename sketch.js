//variaveis da bola
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//vellociade da bola
let xvelocidadeBolinha = 6;
let yvelocidadeBolinha = 6;

//variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimento = 10;
let altura = 90;

//variaveis do adversario
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let VelocidadeYOponente;

//pontuações
let meusPontos = 0
let pontosOponente = 0

//Sons (não deu certo)
let ponto;
let raquetada;
let trilha;

//extra
let chanceDeErrar = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  verificarBolinha();
  mostrarRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  verificarColisao(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentoRaqueteOponenteMultiplayer()
  movimentaRaqueteOponente();
  verificarColisaoOponente();
  incluirPlacar();
  marcarPonto();
  //verificaColisaoBorda()
  //bolinhaNaoFicaPresa()
}

function mostrarBolinha (){
  circle(xBolinha,yBolinha,diametro)
}
function movimentoBolinha(){
  xBolinha += xvelocidadeBolinha;
  yBolinha += yvelocidadeBolinha;
}
function verificarBolinha (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
  xvelocidadeBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    yvelocidadeBolinha *= -1;
  }
}
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
function verificaColisaoBorda(){
  if (xBolinha + raio > width + xBolinha - raio < 0){
    xvelocidadeBolinha *= -1;
  }
  if (yBolinha + raio> height +
     yBolinha - raio < 0) {
    yvelocidadeBolinha *= -1;
  }
}
function mostrarRaquete(x, y){
  rect(x,y, comprimento, altura);
}
function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;

  }  
    //limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 10, 300);
}
function verificarColisao(x, y){
  if (xBolinha - raio < x + comprimento && yBolinha - raio < y + altura && yBolinha + raio > y ){
    xvelocidadeBolinha *= -1;
    raquetada.play()
  }
}

function movimentoRaqueteOponenteMultiplayer(){
    if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
 
}
 yRaqueteOponente = constrain(yRaqueteOponente, 10, 300);
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimento / 2 - 30;

  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 300);
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function verificarColisaoOponente(){
  if (xBolinha + raio > xRaqueteOponente + comprimento && yBolinha - raio < yRaqueteOponente + altura && yBolinha + raio > yRaqueteOponente ){
    xvelocidadeBolinha *= -1;
    raquetada.play()
  }
}


function incluirPlacar(){
  stroke(255)
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  textSize(20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}
function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play()
    xBolinha = 300;
    yBolinha = 200;
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play()
    xBolinha = 300;
    yBolinha = 200;
  }
}

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}