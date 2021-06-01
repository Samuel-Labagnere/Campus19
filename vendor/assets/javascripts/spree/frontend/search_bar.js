$('.inputgroup').on('click',  () => {
    $('.container').addClass('container-search-clicked')
    $('.inputgroup').addClass('inputgroup-search-clicked')
    $('.cross-btn').css('display', 'flex')
  })
  
  $('.cross-btn').on('click', () => {
    $('.container').removeClass('container-search-clicked')
    $('.inputgroup').removeClass('inputgroup-search-clicked')
    $('.cross-btn').css('display', 'none')
  })