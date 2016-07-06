/**
 * Created by hspcadmin on 2016/7/1.
 */
var x,y;
var target="";
var oplen=-1;//第几个显示控制
var svgId="";
var SVGlength=0;
var changeSVG=[];
var ele=document.getElementById("touchActive");
//初始化SVG：
var svg=document.getElementById("touchActive").getElementsByTagName("svg");
var svg1=document.getElementById("touchBG").getElementsByTagName("svg");

function svgSmall(num){
    svg[num].offX=svg[num].Rx;
    svg[num].offY=svg[num].Ry;
    svg[num].style.left=svg[num].offX+"px";
    svg[num].style.top=svg[num].offY+"px";
    svg[num].style.margin=0+"px";
}
for(var i=0;i<svg.length;i++)
{
    oplen=svg.length-1;//第几个显示控制
    svg[i].setAttribute("svg-id",i);//生成svg-id便于控制;
    svg[i].Rx=svg1[i].style.left||0;//获取最终位置
    svg[i].Ry=svg1[i].style.top||0;//获取最终位置
    svg[i].style.margin=10+"px";

    if(i==48||i==46||i==44||i==37||i==36||i==35||i==33||i==31||i==30||i==29||i==26||i==25||i==24||i==23||i==22||i==20||i==18||i==13||i==11||i==10||i==9||i==8||i==7||i==6||i==5)
        svgSmall(i);
    else{
        changeSVG[SVGlength]=svg[i];
        SVGlength++;

       // 设置初始值
        svg[i].offX=287;
        svg[i].offY=0;
    }

    //svg[i].offX=svg[i].getBoundingClientRect().left+411;
    //svg[i].offY=svg[i].getBoundingClientRect().top;
}

//初始化显示或不显示
for(var n=0;n<changeSVG.length;n++)
{
    changeSVG[n].setAttribute("svgChange-id",n)//生成svg-id便于控制;
    changeSVG[n].style.left=changeSVG[n].offX+"px";
    changeSVG[n].style.top=changeSVG[n].offY+"px";

    if(n!=changeSVG.length-1)
        changeSVG[n].style.display="none";
    else
        changeSVG[n].style.display="block";
}

touch.on("#touchActive","touchstart",function(e){
    var dragsuccess=false;
    svgId =  e.target.parentNode.getAttribute("svgChange-id");
    ele=changeSVG[svgId];
    console.log(ele);
    e.preventDefault();
});

//拖动开始
touch.on(ele,"dragstart",function(ds){
    console.log("dragstart");
    ele.style.position="absolute";
});

//拖拽
touch.on(ele,"drag",function(drag){
    ele.style.zIndex=999;
    var x=parseInt(ele.offX)+drag.x+"px";
    var y=parseInt(ele.offY)+drag.y+"px";
    ele.style.left=x;
    ele.style.top=y;
    //console.log(ele.Rx);
    if(Math.abs(parseInt(x)-parseInt(ele.Rx))<=10&&Math.abs(parseInt(y)-parseInt(ele.Ry))<=10){
        ele.style.opacity=0.8;
        dragsuccess=true;
    }
    else{
        ele.style.opacity=1;
        dragsuccess=false;
    }
});

//拖动结束
touch.on(ele,"dragend",function(de){
    console.log("dragend");
    ele.style.zIndex=0;
    ele.offX=ele.style.left;
    ele.offY=ele.style.top
    ele.style.opacity=1;
    if(dragsuccess){
        ele.style.left=ele.Rx;
        ele.style.top=ele.Ry;
        ele.style.margin=0;
        if(svgId>0)
        {
            console.log("svgId :" +svgId);
            svgId--;
            changeSVG[svgId].style.display="block";
        }
        else{
            document.getElementById("touchArea").style.display="none";
        }
        dragsuccess=false;
    }
});
