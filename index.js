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
  })
}