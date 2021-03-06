import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $(".viewProof").click(function() {
    $(".showBackstory").show();
  })

  $(".newLocation").click(function() {
    $(".showBackstory").hide();
    $(".showRocks").show();
  })

  $(".curiosityFollowed").click(function() {
    $(".showRocks").hide();
    $(".showFootprints").show();
  })

  $(".Bigfoot").click(function() {
    $(".showFootprints").hide();
    $(".showBigfoot").show();
  })


  $('#selectDate').click(function() {
    const date = $('#date').val();

    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=navcam&page=1&api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      let imageHTML = "";
      for (let i=0; i < 12; i++) {
        imageHTML += "<img src=" + response.photos[i].img_src + ">"
      }
      if (imageHTML === "") {
        $('.noImages').text("No images taken.").show();
      } else {
        $('.noImages').hide();
      }
      $('.showImages').html(imageHTML);
    }
  });
});