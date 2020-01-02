const palettes = ruiPalettes.Palettes;
const swatches = ruiPalettes.Swatches;

let paletteColors = []

// console.log(palettes)
palettes.forEach((palette) => {
  let colors = {}
  colors.paletteId = palette.id;
  colors.colors = swatches.filter((swatch) => {
    return palette.primaryColors.includes(swatch.color) || palette.supportingColors.includes(swatch.color) || palette.neutralColor.includes(swatch.color);
  });
  palette.colors = colors;
});
// console.log(palettes)


$.map(palettes, function (palette) {
  let colorString = '<table class="table table-striped">';
  palette.colors.colors.forEach((color) => {

    // console.log(color.shades.filter((shade) => { return shade.weight == "500" })[0].hexColor)

    // color.shades.forEach((shade) => {
    // console.log(shade)
    let hexColor = color.shades.filter((shade) => { return shade.weight == "300" })[0].hexColor;
    colorString += '<tr><td><span style="position:relative;top:5px;">' + color.color + '</span></td><td><span style="position:relative;top:5px;">' + hexColor + '</span></td><td><button class="btn btn-sm btn-just-icon" style="width:5px;background-color:' + hexColor + ';border-color:' + hexColor + '"></button></td></tr>'
    // })
  });

  $('#palette-cards').append(
    `<div class="col-lg-4 col-md-6 col-xs-12">
      <div class="card" style="min-height:300px;">
        <img class="card-img-top" src="./assets/img/` + palette.id + `.png" alt="palette sample">
        <div class="card-body">
          <h4 class="card-title">Palette ` + palette.id + `</h4>
          <p class="card-text">Primary: ` + palette.primaryColors.join(' and ') + `.<br>Neutral: ` + palette.neutralColor + `.<br>Supporting: ` + palette.supportingColors.join(', ') + `.</p>
        </div>
        <a href="#" class="btn btn-primary">Show Colors</a>
        <div id="palette-colors" style="display:none;">
          <h4>Palette Colors</h4>
          ` + colorString + `
        </div>
      </div>
    </div>`
  )
});