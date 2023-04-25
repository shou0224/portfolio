

const parent=document.getElementById("parent");
const button=document.getElementById("button");
const img=document.getElementById("img");
const beanNum=document.createElement("div");
const dropPlace=document.createElement("div");
let beanCount=0;
let bool=false;

//START
Start();
function Start()
{
  Init();
}

//UPDATE
setInterval(Update,1000/60);
function Update()
{
  beanNum.textContent="豆"+beanCount;
  GameClear();
}

//
function Init()
{
  button.addEventListener('click',function(){
    img.src="open_pack.png";
    img.style.zIndex=100;
    document.body.appendChild(beanNum);
    beanNum.className="count";
    parent.appendChild(dropPlace);
    dropPlace.className="dropPlace";
    DropPlace();

    // dropPlace.className="dropPlace";

    PopBean();
  })
}

//
function PopBean()
{
  CreateBean(50,100);
  CreateBean(150,100);
  CreateBean(100,200);
  CreateBean(150,300);
  CreateBean(50,400);

  function CreateBean(top,left)
  {
    beanCount++;
    const bean=document.createElement("img");
    parent.appendChild(bean);
    bean.src="bean.png";
    bean.style.position="absolute";
    bean.style.top=top+"px";
    bean.style.left=left+"px";
    bean.style.zIndex=200;
    
    bean.draggable="true";
    bean.addEventListener('dragstart',function(){
      this.style.zIndex=1000;
      this.id="drag";
    })
    bean.addEventListener('dragover',function(evnt){
      evnt.preventDefault();
    })
    bean.addEventListener('dragend',function(){
      this.style.zIndex=200;
      this.id="";
    })

  }

}

//
function GameClear()
{
  if(bool && beanCount==0)
  {
    const gameClear=document.createElement("div");
    parent.appendChild(gameClear);
    gameClear.textContent="GAME CLEAR";
    gameClear.className="gameClear";
    bool=false;
  }

}

//
function DropPlace()
{
  dropPlace.addEventListener('dragover',function(evnt){
    evnt.preventDefault();
  })
  dropPlace.addEventListener('dragenter',function(){
    dropPlace.className="dropPlace cansee";
  })
  dropPlace.addEventListener('dragleave',function(){
    dropPlace.className="dropPlace";
  })
  dropPlace.addEventListener('drop',function(){
    dropPlace.className="dropPlace";
    beanCount--;
    bool=true;
    const bean=document.getElementById("drag");
    bean.remove();
  })
}