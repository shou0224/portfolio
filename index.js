

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

//乱数を格納
let rs=[];
let rsl=rs.length;
test_r(beanPos);
  //階乗
function stare(l)
{
  if(l==0 || l==1)return 1;
  else return l*stare(l-1);
}
//0~lengthまでの整数を重複なしで返す
function test_r(array)
{
  let n=0;
  while(n<stare(array.length))
  {
    rsl=rs.length;
    for(let i=rsl;i<array.length;i++)
    {
      let r=Math.floor(Math.random()*array.length);
      rs.push(r);
    }
    for(let i=0;i<array.length;i++)
    {
      for(let j=0;j<array.length;j++)
      {
        if(rs[i]==rs[j] && i!=j)
        {
          rs.splice(i,1);
        }
      }
    }
    if(rs.length==array.length)break;
    n++;
  }
}
          

//START
Start();
function Start()
{
  // Init();
  OpenPack();
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
  button.addEventListener('click',OpenPack)
}
function OpenPack()
{
  img.src="open_pack.png";
  img.style.zIndex=100;
  document.body.appendChild(beanNum);
  beanNum.className="count";
  parent.appendChild(dropPlace);
  dropPlace.className="dropPlace";
  DropPlace();
  PopBean();
}

//豆のポップ管理
function PopBean()
{
  //ポップ数の決定
  let maxPop=beanPos.length;
  let minPop=1;
  let popNum=Math.floor(Math.random()*(maxPop-minPop)+minPop);
    
  for(let i=0;i<popNum;i++)
  {
    CreateBean(beanPos[rs[i]][0],beanPos[rs[i]][1]);
  }
}

//豆の生成
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
  
  //豆の動き
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

//ゲームクリア
function GameClear()
{
  if(bool && beanCount==0)
  {
    const gameClear=document.createElement("div");
    parent.appendChild(gameClear);
    gameClear.textContent="GAME CLEAR";
    gameClear.className="gameClear";
    bool=false;

    //リスタート
    const restart=document.createElement("button");
    parent.appendChild(restart);
    restart.textContent="RESTART";
    restart.className="restart";
    restart.addEventListener('click',function(){
      window.location.reload();
    })
  }

}

//豆のドロップ先
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