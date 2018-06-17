let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-920px)'})
bindEvents()

function bindEvents(){
  $('#buttonWrapper').on('click', 'button', function(e){
    let $button = $(e.currentTarget) 
    let index = $button.index()
    goToSlide(index)
  })
}

function goToSlide(index){
  if(index > $buttons.length-1){
    index = 0
  }else if(index <0){
    index = $buttons.length - 1
  }

  if(current === $buttons.length -1 && index === 0){
    $slides.css({transform:`translateX(${-($buttons.length + 1) * 920}px)`})
      .one('transitionend', function(){
        $slides.hide()
        $slides.offset() 
        $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
      })

  }else if(current === 0 && index === $buttons.length - 1){
    $slides.css({transform:`translateX(0px)`})
      .one('transitionend', function(){
        $slides.hide().offset()
        $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
      })

  }else{
    $slides.css({transform:`translateX(${- (index+1) * 920}px)`})
  }
  current = index
}

function makeFakeSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length-1).clone(true)

  $slides.append($firstCopy)
  $slides.prepend($lastCopy)
}