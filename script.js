let t1 = gsap.timeline({ paused: true }); 
let flap = CSSRulePlugin.getRule(".envelope:before"); 

t1.to(flap, { 
  duration: 0.5, 
  cssRule: {
    rotateX: 180
  }
})
 .set(flap, {
  cssRule: {
    zIndex: 10
  }
})
 .to('.letter', {
  translateY: -200,
  duration: 0.9, 
  ease: "back.inOut(1.5)"
})
 .set('.letter', {
  zIndex: 40,
  height: "200px"
})
 .to('.letter', {
  duration: .7,  
  ease: "back.out(.4)",
  translateY: -5,
  translateZ: 250
});

let t2 = gsap.timeline({ paused: true }); 
t2.to('.shadow', {
  delay: 1.4,
  width: 450,
  boxShadow: "-75px 150px 10px 5px #eeeef3",
  ease: "back.out(.2)",
  duration: .7
}); 

function openCard(e) {
  t1.play();
  t2.play();
  createFirework()
}

function closeCard(e) {
  t1.reverse();
  t2.reverse();
}

//Firework
var fw_spread = 250 // how wide the particles expand
var fw_scale = 5  // how large the particles get
var fw_launch_rate = 1000 // in milliseconds 

function createFirework(e) {  
  var f = document.createElement('div')
  f.className = 'firework'
  f.style.width = '3px'
  f.style.height = '3px'
  f.style.position = 'absolute'
  var fx = Math.random()*100 + '%'
  f.style.left = Math.random()*33 + 33 + '%'
  f.style.top = '100%'
  var clr = 'hsl('+Math.random()*360+'deg,100%,50%)'
  // f.style.backgroundColor = clr
  f.style.transition = Math.random() < .5 ? 'ease-out '+ 3 + 's' : 'ease-in '+ 2.5 + 's'

  document.body.appendChild(f)

  for(var i=0;i<25;i++){
    var p = document.createElement('div')
    p.className = 'particle'
    p.style.width = '100%'
    p.style.height = '100%'
    p.style.backgroundColor = clr
    p.style.position = 'absolute'
    p.style.left = '0'
    p.style.top = '0'
    p.style.transition = '.5s'   
    p.style.borderRadius = '50%'
    f.appendChild(p)
  }

  setTimeout(function(){
    f.style.top = Math.random()*50 + 5 + '%'
    // f.style.left = fx    
    f.ontransitionend = function() {
      
      var p = this.querySelectorAll('.particle')
      p.forEach(function(elm){
        var x = Math.random() < .5 ? Math.random()*fw_spread : (-1)*Math.random()*fw_spread
        var y = Math.random() < .5 ? Math.random()*fw_spread : (-1)*Math.random()*fw_spread
        elm.style.left = x + 'px'
        elm.style.top = y +'px'
        elm.style.opacity = '0'
        elm.style.transform = 'scale('+fw_scale+')'
        // elm.style.borderRadius = '50%'
        // elm.style.filter = 'blur(1px)'
        document.body.style.setProperty('--bg-color', clr)
        elm.ontransitionend = function() {          
          this.remove()          
        }
      })
      setTimeout(function(){
        f.remove()
      },1000)
    }
  }, 100)  
  
  setTimeout(createFirework, fw_launch_rate)
}