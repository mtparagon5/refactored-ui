const palettes = ruiPalettes.Palettes;
const swatches = ruiPalettes.Swatches;

palettes.forEach((palette) => {
  let colors = {}
  colors.paletteId = palette.id;
  colors.colors = swatches.filter((swatch) => {
    return palette.primaryColors.includes(swatch.color) || palette.supportingColors.includes(swatch.color) || palette.neutralColor.includes(swatch.color);
  });
  palette.colors = colors;
});

$.map(palettes, function (palette) {
  let colorString = '<table class="table table-striped">';
  palette.colors.colors.forEach((color) => {

    let hexColor = color.shades.filter((shade) => { return shade.weight == "300" })[0].hexColor;
    colorString += '<tr><td><span style="position:relative;top:5px;">' + color.color + '</span></td><td><span style="position:relative;top:5px;">' + hexColor + '</span></td><td><button class="btn btn-sm btn-just-icon" style="width:5px;background-color:' + hexColor + ';border-color:' + hexColor + '"></button></td></tr>'
  });

  $('#palette-cards').append(
    `<div class="col-lg-4 col-md-6 col-xs-12">
      <div class="card" style="min-height:565px;">
        <img id="`+ palette.id + `" class="card-img-top" src="./assets/img/` + palette.id + `.png" alt="palette sample">
        <div class="card-body">
          <h2 class="card-title text-center">Palette ` + palette.id + `</h2>

          <h4 class="card-title text-center">Primary</h4>
          <p class="card-text text-center">` + palette.primaryColors.join(' and ') + `</p>
          
          <h4 class="card-title text-center">Neutral</h4>
          <p class="card-text text-center">` + palette.neutralColor + `</p>
          
          <h4 class="card-title text-center">Supporting</h4>
          <p class="card-text text-center">` + palette.supportingColors.join(', ') + `</p>
          
        </div>
        <button id="colors` + palette.id + `" class="btn btn-primary col-12">Show Color Palette</button>
        <div id="colors` + palette.id + `" style="display:none; ">
          ` + colorString + `
        </div>
      </div>
    </div>`
  )
});

$(document).ready(function () {

  $('img').click((event) => {
    $('div#colors' + event.target.id).slideToggle('slow');
    $('button#colors' + event.target.id).text($('button#colors' + event.target.id).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');
    console.log(event.target.id)
  })

  $('button').click((event) => {
    // show/hide colors div
    $('div#' + event.target.id).slideToggle("slow");
    // change button text
    $(event.target).text($(event.target).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');

  });

})