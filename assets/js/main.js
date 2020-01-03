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
  // let colorString = '<table class="table table-md m-0 toggler"><thead><tr><th>Weight</th><th>Hex</th><th>Color</th></tr></thead><tbody>';
  let colorString = `<div id="colors-div">
                        <div class="row pt-2 pb-3 m-auto text-center" style="background-color: var(--rui-cool-grey-000)">
                          <div class="col-4">
                            <span style="position:relative;top:5px;">Color</span>
                          </div>
                          <div class="col-4">
                            <span style="position:relative;top:5px;">Hex</span>
                          </div>
                          <div class="col-4 w-100">
                            <span style="position:relative;top:5px;">Swatch</span>
                            </div>
                          </div>`;
  palette.colors.colors.forEach((color) => {
    // let shadeString = `<table style="display:none;" class="table table-md m-0"><thead><th>Weight</th><th>Hex</th><th>Color</th></thead><tbody>`;
    // shades table headers
    let shadeString = `<div id="shades-div" style="display:none;">
                          <hr class="w-75">
                          <div class="row p-2 w-75 m-auto text-center">
                            <div class="col-12">
                              Available Shades For ` + color.color + `
                            </div>
                          </div>
                          <div class="row pt-2 pb-3 w-50 m-auto text-center">
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Shade Weight</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Hex</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Swatch</span>
                            </div>
                          </div>`;
    color.shades.forEach((shade) => {
      // console.log(shade);
      shadeString += `<div class="row p-2 w-50 m-auto text-center">
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.weight + `</span>
                        </div>
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.hexValue + `</span>
                        </div>
                        <div class="col-4 w-100">
                          <button class="btn btn-sm btn-just-icon" style="width:5px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
                          </button>
                        </div>
                      </div>`;
    });
    // shadeString += '</tbody></table>';

    shadeString += '<hr class="w-75"></div>';

    // <div class="rounded-circle"
    //                         style="width:25px;height:25px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
    //                       </div>

    let hexValue = color.shades.filter((shade) => { return shade.weight == "200" })[0].hexValue;
    colorString += `<div class="row p-2 m-auto text-center w-100 toggler">
                      <div class="col-4">
                        <span style="position:relative;top:5px;">` + color.color + `</span>
                      </div>
                      <div class="col-4">
                        <span style="position:relative;top:5px;">` + hexValue + `</span>
                      </div>
                      <div class="col-4">
                        <button class="btn btn-sm btn-just-icon"
                          style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                        </button>
                      </div>
                    </div>` + shadeString;
  });
  colorString += '</div>';
  // colorString += '</tbody></table>';
  // let primaryColor = palette.primaryColors[0];

  // console.log(primaryColor)

  $('#palette-cards').append(
    `
      <div class="card mb-4 shadow-md">
        <div class="row">
          <div class="col-md-6">
            <img id="`+ palette.id + `" class="card-img img-point grow2" src="./assets/img/` + palette.id + `.png" alt="Palette ` + palette.id + ` sample">
          </div>
          <div class="col-md-6">
            <div class="card-body grow2">
              <h2 class="card-title text-center">Palette ` + palette.id + `</h2>

              <h4 class="card-title text-center">Primary</h4>
              <p class="card-text text-center">` + palette.primaryColors.join(' and ') + `</p>
              
              <h4 class="card-title text-center">Neutral</h4>
              <p class="card-text text-center">` + palette.neutralColor + `</p>
              
              <h4 class="card-title text-center">Supporting</h4>
              <p class="card-text text-center">` + palette.supportingColors.join(', ') + `</p>
              
            </div>
          </div>
        </div>
        <a id="colors` + palette.id + `" class="toggler btn text-light btn-rui-cyan-200">Show Color Palette</a>
        <div id="colors` + palette.id + `" style="display:none; ">
          ` + colorString + `
        </div>
      </div>
    `
  )
});

// a tag toggler
$(document).on("click", "a.toggler", function () {
  $(this).next().slideToggle("slow");

  $(this).text($(event.target).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');
});

// div tag toggler
$(document).on("click", "div.toggler", function () {
  $(this).next().slideToggle("slow");

  $('a#colors' + event.target.id).text($('a#colors' + event.target.id).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');
});



$(document).ready(function () {

  $('img').click((event) => {
    $('div#colors' + event.target.id).slideToggle('slow');
    $('a#colors' + event.target.id).text($('a#colors' + event.target.id).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');
  });

  $('button').click((event) => {
    // show/hide colors div
    $('div#' + event.target.id).slideToggle("slow");
    // change button text
    $(event.target).text($(event.target).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');

  });

})