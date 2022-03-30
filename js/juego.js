/**objetos a usar*/
function Nave(x){//nave principal
    this.vidas=3;
    this.posicionX=x;
    this.posicionY=altoPan-25;
    this.ancho=20;
    this.alto=20;
    //cargar imagen
    this.imagen=new Image();
    this.imagen=cargarImagen("imagenes/principal.png");
}

function Bala(tipo,x,y,url){
    this.tipo=tipo // 0 principal  1 enemiga
    this.posicionX=x;
    this.posicionY=y;
    this.ancho=3;
    this.alto=10;
    this.imagen=new Image();
    this.imagen=cargarImagen(url);
}

/**function Enemigo1(x,y){
    this.posicionX=x;
    this.posicionY=y;
    var ancho=5;
    var alto=10
    //cargar imagen
    var imagen=new Image();
    imagen.src=""; //buscar imagenes 
    
}*/

/**iniciar pantalla */
let pantalla = document.getElementById('pantalla').getContext('2d');
let anchoPan=pantalla.canvas.width;
let altoPan=pantalla.canvas.height;

 

/**funcion par acargar imagenes  */
function cargarImagen(url){
    let ima=new Image();
    ima.src=url;
    return ima;
}

/** evento para mover nave principal */
document.addEventListener('keydown', function(e){
    switch(e.key){
        case "ArrowRight":
            naveP.posicionX=naveP.posicionX+2;
        break;

        case "ArrowLeft":
            naveP.posicionX=naveP.posicionX-2;
        break;

        case " ":
            console.log("DISPARA");
            let x=anchoPan/2;
            let y=altoPan/2;
            let nueva=new Bala(1,x,y,"imagenes/bala verde.png");
            console.log(nueva+" "+arrayBalas.push(nueva));
            //arrayBalas.push(nueva);

        break;
    }
    //console.log(naveP.posicionX);
    dibujarPantalla();
});  

/**funcion principal*/
    let arrayBalas=[];
    let arrayEnemigos=[];
    let contTiem=0;

    /**inicar naves*/

    let naveP=new Nave(anchoPan/2-10);//crear nave jugador


    
/**funcion para dibujar la pantalla*/
function dibujarPantalla(){
    pantalla.clearRect(0,0,anchoPan,altoPan);//limpia pantalla
    pantalla.drawImage(naveP.imagen, naveP.posicionX, naveP.posicionY, naveP.ancho, naveP.alto);//dibujar jugador
    
    arrayBalas.forEach((actual) => {// array para dibujar balas
        pantalla.drawImage(actual.imagen, actual.posicionX, actual.posicionY, actual.ancho, actual.alto);
    });
}

/**mover naves Enemigas, mover balas, dibujar todo */
setInterval(() => { 
    //console.log("balas "+arrayBalas);
    dibujarPantalla();
}, 500);