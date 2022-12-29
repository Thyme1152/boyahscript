// ==UserScript==
// @name     Thyme's awesome Boyah Script
// @version  1.0.0
// @grant    none
// @description Re-add old features from Boyah 1 into Boyah 2
// @match https://boyah.net/forums2/*
// ==/UserScript==

let posts = document.querySelectorAll('.post')
posts.forEach(post => {
  let youtube_links = post.querySelectorAll('.bbc_link')
  if (youtube_links) {
    youtube_links.forEach(link => {
      let href = link.getAttribute('href')
      if (href && validateYoutubeUrl(href)) {
        let id = getId(href)
        let div = document.createElement('div')
        let markup = `<iframe width="560" height="315" src="//www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`
        div.innerHTML = markup
        link.after(div)
      }
    })
  }
})

function validateYoutubeUrl(url)
{
  if (url != undefined || url != '') {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[2].length == 11)
  } else {
    return false
  }
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
  : null;
}
