/**objetos a usar*/
function Nave(x){//nave principal
    this.vidas=3;
    this.posicionX=x;
    this.posicionY=altoPan-25;
    this.ancho=20;
    this.alto=20;
    this.imagen=new Image();
    this.imagen=cargarImagen("imagenes/principal.png");
}

function Bala(tipo,inicialX,inicialY,url){
    this.tipo=tipo // 0 principal  1 enemiga
    this.ancho=3;
    this.alto=10;
    this.imagen=new Image();
    this.imagen=cargarImagen(url);
    this.posicionX=inicialX-(this.ancho/2);
    this.posicionY=inicialY;
}

function Ctie(x,y){//nave Enemiga
    this.posicionX=x;
    this.posicionY=y;
    this.ancho=20; //  5/4  *4
    this.alto=16;
    this.imagen=new Image();
    this.imagen=cargarImagen("imagenes/caza TIE.png");
}

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
            naveP.posicionX+=2;
        break;

        case "ArrowLeft":
            naveP.posicionX-=2;
        break;

        case " ":
            console.log("DISPARA");
            let x=naveP.posicionX+(naveP.ancho/2);
            let y=naveP.posicionY-3;
            let nueva=new Bala(1,x,y,"imagenes/bala verde.png");
            //console.log(nueva+" "+arrayBalas.push(nueva));
            arrayBalas.push(nueva);

        break;
    }
    //console.log(naveP.posicionX);
    //dibujarPantalla();
});  


/**funcion para mover balas */
function moverBalas(){
    let i=0
    for(i=0;i<arrayBalas.length;i++){
        //console.log("bala mover: "+arrayBalas);
        if(arrayBalas[i].tipo==0){// bala de jugador                  0 principal  1 enemigo
            arrayBalas[i].posicionY+=5;
        }else{ //bala enemiga
            arrayBalas[i].posicionY-=5;
        }

        if(arrayBalas[i].posicionY<(-arrayBalas[i].alto-3)||    //salio por arriba del canvas
        arrayBalas[i].posicionY>altoPan+arrayBalas[i].alto+3){  //salio por abajo del canvas

            //console.log("bala fuera: "+arrayBalas.length);
            arrayBalas=borrarElementoArray(arrayBalas,i);
            i--;
        }
        /**coliciones*/

    }
}

/**crea e inicia enemigos  */
function iniciarEnemigos(){
    let ancho=10;
    let alto1=5
    let alto2=30
    let distancia= 26;
    let alto=0;
    //agregar un for y ver cuantos caben y separacion 
    while(ancho+distancia+10<anchoPan){

        for(let i=0;i<2;i++){
            if(alto==alto1){
                alto=alto2;
            }else{
                alto=alto1;
            }
            let naveP=new Ctie(ancho, alto);//(x,y) crear naves enemigas
            arrayEnemigos.push(naveP);
            ancho+=distancia;
        }
        
    }    
}


/**borra elementos del arreglo*/
function borrarElementoArray(array,borrar){
    const nuevo =Array.from(array.splice(borrar,1));
    //console.log("borado: "+nuevo);
    return nuevo;
}

/**funcion para dibujar la pantalla*/
function dibujarPantalla(){
    pantalla.clearRect(0,0,anchoPan,altoPan);//limpia pantalla
    
    arrayBalas.forEach((actual) => {// array para dibujar balas
        pantalla.drawImage(actual.imagen, actual.posicionX, actual.posicionY, actual.ancho, actual.alto);
    });

    arrayEnemigos.forEach((enemigo)=>{
        pantalla.drawImage(enemigo.imagen, enemigo.posicionX, enemigo.posicionY, enemigo.ancho, enemigo.alto);
    });

    pantalla.drawImage(naveP.imagen, naveP.posicionX, naveP.posicionY, naveP.ancho, naveP.alto);//dibujar jugador
}

/**funcion principal*/
    const arrayBalas=[];
    const arrayEnemigos=[];
    let contTiem=0;

    /**inicar naves*/
    let naveP=new Nave(anchoPan/2-10);//crear nave jugador
    iniciarEnemigos();

/**mover naves Enemigas, mover balas, dibujar todo */
    setInterval(() => { 
        //console.log("balas "+arrayBalas);
        moverBalas();
        dibujarPantalla();
        contTiem++;
    }, 100);