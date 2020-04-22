window.addEventListener("scroll", () => {
  //scrolled范围为0-1，表示滚动的页面占全部页面的百分比
  let scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  const domTitle = document.querySelector(".wrapper #title");
  const domXboxLogo = document.querySelector(".wrapper #xbox-logo");
  const domLogo = document.querySelector(".wrapper #xbox-logo #logo");
  const domVideo = document.querySelector(".wrapper video");
  //随着滚动条向下滚动 logo越来越大
  domXboxLogo.style.width = domXboxLogo.style.height = document.documentElement.clientWidth * 10 * scrolled * scrolled * scrolled + "px";
  
  //只有在整个滚动前10%部分显示title，其余时间不显示
  if(scrolled<=0.1){
    domTitle.style.opacity = (0.1-scrolled) / 0.1;
    domTitle.style.marginTop = scrolled * 1000 * -1 + "px";
  }else{
    domTitle.style.opacity = 0;
  }

  //在整个滚动前30%部分隐藏video
  if(scrolled<0.3){
    domVideo.style.opacity  = 0;
  }else{
    domVideo.style.opacity  = scrolled;
  }

  //在整个滚动前50%部分，logo随着滚动逐渐清晰，后50%部分逐渐淡出
  if(scrolled<=0.5){
    domLogo.style.opacity = (scrolled-0.1)/0.1;
  }else{
    domLogo.style.opacity = (1 - scrolled);
  }

  //在整个滚动最底部时只显示video
  if(scrolled==1){
    domLogo.style.opacity = 0;
    domVideo.style.opacity = 1;
  }
})