

const parent=document.getElementById("parent");
const button=document.getElementById("button");
const img=document.getElementById("img");

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

}

//
function Init()
{
  button.addEventListener('click',function(){
    img.src="open_pack.png";
    img.style.zIndex=100;

    PopBean();
  })
}

//
function PopBean()
{
  const bean=document.createElement("img");
  parent.appendChild(bean);
  bean.src="bean.png";
  bean.style.position="absolute";
  bean.style.top=100+"px";
  bean.style.left=100+"px";
  bean.style.zIndex=200;

}