

const parent=document.getElementById("parent");
const button=document.getElementById("button");
const img=document.getElementById("img");
const beanNum=document.createElement("div");
const dropPlace=document.createElement("div");
let beanCount=0;
let bool=false;
const beanPos=[ [10,100],[10,200],[10,300],
                [110,100],[110,200],[110,300],
                [210,100],[210,200],[210,300]
              ];

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
  for(let i=0;i<beanPos.length;i++)
  {
    CreateBean(beanPos[i][0],beanPos[i][1]);
  }
  

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

    const restart=document.createElement("button");
    parent.appendChild(restart);
    restart.textContent="RESTART";
    restart.className="restart";
    restart.addEventListener('click',function(){
      window.location.reload();
    })
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