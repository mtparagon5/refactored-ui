const palettes = ruiPalettes.Palettes;
const swatches = ruiPalettes.Swatches;

swatches.forEach(swatch => {
  swatch.isPrimary = []
  swatch.isNeutral = []
  swatch.isSupporting = []
  palettes.forEach(palette => {
    if (palette.primaryColors.includes(swatch.color)) {
      swatch.isPrimary.push(palette.id);
    }
    if (palette.neutralColor == swatch.color) {
      swatch.isNeutral.push(palette.id);
    }
    if (palette.supportingColors.includes(swatch.color)) {
      swatch.isSupporting.push(palette.id);
    }
  });
});

palettes.forEach(palette => {
  palette.Colors = {};
  palette.Colors.Primary = [], palette.Colors.Neutral = [], palette.Colors.Supporting = [];
  palette.primaryColors.forEach(pColor => {
    swatch = swatches.filter(s => {
      return pColor == s.color;
    });
    palette.Colors.Primary.push(swatch[0]);
  });
  palette.neutralColors = [];
  [palette.neutralColor].forEach(nColor => {
    swatch = swatches.filter(s => {
      return nColor == s.color;
    });
    palette.Colors.Neutral.push(swatch[0]);
  });
  palette.supportingColors.forEach(sColor => {
    swatch = swatches.filter(s => {
      return sColor == s.color;
    });
    palette.Colors.Supporting.push(swatch[0]);
  });
});

$.map(palettes, function (palette) {

  // card colors table
  let colorString = `<div id="colors-div">
                        <div class="row table-head pt-2 pb-3 m-auto text-center" >
                          <div class="col-3">
                            <span style="position:relative;top:5px;">Color</span>
                          </div>
                          <div class="col-3">
                            <span style="position:relative;top:5px;">Type</span>
                          </div>
                          <div class="col-3">
                            <span style="position:relative;top:5px;">Hex</span>
                          </div>
                          <div class="col-3 w-100">
                            <span style="position:relative;top:5px;right:8px;">Swatch</span>
                            </div>
                          </div>`;
  // Primary Colors 
  palette.Colors.Primary.forEach((pColor) => {
    // pColors.forEach(pColor => {
    // shades table headers
    let shadeString = `<div id="shades-div" style="display:none;">
                          <hr class="w-75">
                          <div class="row table-head p-2 w-75 m-auto text-center">
                            <div class="col-12">
                              Available Shades For ` + pColor.color + `
                            </div>
                          </div>
                          <div class="row table-head-no-bg pt-2 pb-3 w-75 m-auto text-center">
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Shade Weight</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Hex</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;right:8px;">Swatch</span>
                            </div>
                          </div>`;
    pColor.shades.forEach((shade) => {
      // console.log(shade);
      shadeString += `<div class="row p-2 w-75 m-auto text-center">
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.weight + `</span>
                        </div>
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.hexValue + `</span>
                        </div>
                        <div class="col-4 w-100">
                          <a class="btn btn-sm btn-just-icon" style="width:5px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
                          </a>
                        </div>
                      </div>`;
    });

    // shadeString += '</tbody></table>';

    shadeString += '<hr class="w-75"></div>';

    // <div class="rounded-circle"
    //                         style="width:25px;height:25px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
    //                       </div>

    let hexValue = pColor.shades.filter((shade) => { return shade.weight == "200" })[0].hexValue;
    colorString += `<div class="row table-content p-2 m-auto text-center w-100 toggler">
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + pColor.color + `</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">Primary</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + hexValue + `</span>
                      </div>
                      <div class="col-3">
                        <a class="btn btn-sm btn-just-icon"
                          style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                        </a>
                      </div>
                    </div>` + shadeString;
    // });
  });
  // Neutral Colors
  palette.Colors.Neutral.forEach((nColor) => {
    // nColors.forEach(nColor => {
    // shades table headers
    let shadeString = `<div id="shades-div" style="display:none;">
                          <hr class="w-75">
                          <div class="row table-head p-2 w-75 m-auto text-center">
                            <div class="col-12">
                              Available Shades For ` + nColor.color + `
                            </div>
                          </div>
                          <div class="row table-head-no-bg pt-2 pb-3 w-75 m-auto text-center">
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Shade Weight</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Hex</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;right:8px;">Swatch</span>
                            </div>
                          </div>`;
    nColor.shades.forEach((shade) => {
      // console.log(shade);
      shadeString += `<div class="row table-content p-2 w-75 m-auto text-center">
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.weight + `</span>
                        </div>
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.hexValue + `</span>
                        </div>
                        <div class="col-4 w-100">
                          <a class="btn btn-sm btn-just-icon" style="width:5px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
                          </a>
                        </div>
                      </div>`;
    });

    // shadeString += '</tbody></table>';

    shadeString += '<hr class="w-75"></div>';

    // <div class="rounded-circle"
    //                         style="width:25px;height:25px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
    //                       </div>

    let hexValue = nColor.shades.filter((shade) => { return shade.weight == "200" })[0].hexValue;
    colorString += `<div class="row table-content p-2 m-auto text-center w-100 toggler">
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + nColor.color + `</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">Neutral</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + hexValue + `</span>
                      </div>
                      <div class="col-3">
                        <a class="btn btn-sm btn-just-icon"
                          style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                        </a>
                      </div>
                    </div>` + shadeString;
    // });
  });
  // Supporting Colors
  palette.Colors.Supporting.forEach((sColor) => {
    // sColors.forEach(sColor => {
    // shades table headers
    let shadeString = `<div id="shades-div" style="display:none;">
                          <hr class="w-75">
                          <div class="row table-head p-2 w-75 m-auto text-center">
                            <div class="col-12">
                              Available Shades For ` + sColor.color + `
                            </div>
                          </div>
                          <div class="row table-head-no-bg pt-2 pb-3 w-75 m-auto text-center">
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Shade Weight</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;">Hex</span>
                            </div>
                            <div class="col-4">
                              <span style="position:relative;top:5px;right:8px;">Swatch</span>
                            </div>
                          </div>`;
    sColor.shades.forEach((shade) => {
      // console.log(shade);
      shadeString += `<div class="row table-content p-2 w-75 m-auto text-center">
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.weight + `</span>
                        </div>
                        <div class="col-4">
                          <span style="position:relative;top:5px;">` + shade.hexValue + `</span>
                        </div>
                        <div class="col-4 w-100">
                          <a class="btn btn-sm btn-just-icon" style="width:5px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
                          </a>
                        </div>
                      </div>`;
    });

    // shadeString += '</tbody></table>';

    shadeString += '<hr class="w-75"></div>';

    // <div class="rounded-circle"
    //                         style="width:25px;height:25px;background-color:` + shade.hexValue + `;border-color:` + shade.hexValue + `">
    //                       </div>

    let hexValue = sColor.shades.filter((shade) => { return shade.weight == "200" })[0].hexValue;
    colorString += `<div class="row table-content p-2 m-auto text-center w-100 toggler">
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + sColor.color + `</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">Supporting</span>
                      </div>
                      <div class="col-3">
                        <span style="position:relative;top:5px;">` + hexValue + `</span>
                      </div>
                      <div class="col-3">
                        <a class="btn btn-sm btn-just-icon"
                          style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                        </a>
                      </div>
                    </div>` + shadeString;
    // });
  });
  colorString += '</div>';

  // card body and info
  $('#palette-cards').append(
    `
      <div class="card mb-5 shadow-lg bg-rui-grey-000">
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
        <a id="colors` + palette.id + `" class="toggler btn text-light btn-rui-green-200">Show Color Palette</a>
        <div id="colors` + palette.id + `" style="display:none; ">
          ` + colorString + `
        </div>
      </div>
    `
  )
});



// event handlers

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

// img click handler
$(document).ready(function () {

  $('img').click((event) => {
    $('div#colors' + event.target.id).slideToggle('slow');
    $('a#colors' + event.target.id).text($('a#colors' + event.target.id).text() == 'Show Color Palette' ? 'Hide Color Palette' : 'Show Color Palette');
  });

})