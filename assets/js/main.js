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
    palette.Colors.Primary.push(swatch);
  });
  palette.neutralColors = [];
  [palette.neutralColor].forEach(nColor => {
    swatch = swatches.filter(s => {
      return nColor == s.color;
    });
    palette.Colors.Neutral.push(swatch);
  });
  palette.supportingColors.forEach(sColor => {
    swatch = swatches.filter(s => {
      return sColor == s.color;
    });
    palette.Colors.Supporting.push(swatch);
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
  palette.Colors.Primary.forEach((pColors) => {
    pColors.forEach(pColor => {
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
    });
  });
  // Neutral Colors
  palette.Colors.Neutral.forEach((nColors) => {
    nColors.forEach(nColor => {
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
    });
  });
  // Supporting Colors
  palette.Colors.Supporting.forEach((sColors) => {
    sColors.forEach(sColor => {
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
    });
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

// console.log(palettes)

// palettes.forEach(p => {
//   // console.log(p.Colors.Primary[0])
//   let selectors = ['background', 'text', 'btn', 'border'];
//   p.Colors.Primary.forEach(pColor => {
//     console.log(getClassNames(pColor, 'p', false, selectors))
//   })
// })

// functions

// function to get variable names for user based on selections made in the browser
function getColorVariable(colorObjects, type, isExplicitlyNamed) {
  let varStrings = [];
  colorObjects.forEach(color => {
    let colorId = color.color;
    let shades = color.shades;

    let varString = '';
    let i = 0;
    shades.forEach((shade) => {
      varString = '--color-';
      if (!isExplicitlyNamed) {
        switch (type) {
          case 'p':
            varString += 'primary-';
            break;
          case 'n':
            varString += 'neutral-';
            break;
          case 's':
            varString += 'supporting-';
            break;
          default:
            varString += '';
        }

        varString += i + '-' + shade.weight + ': ' + shade.hexValue + ';';


      } else {
        if (colorId.includes("(Vivid)")) {
          colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
          varString += colorId;
        } else {
          varString += colorId.toLowerCase() + '-';
        }

        varString += shade.weight + ': ' + shade.hexValue + ';';
      }

      varStrings.push(varString);
    })
    i += 1;
  })
  return varStrings;
}

// get class names for the following css selectors: background-color, border-color, text color, and a btn class 
function getClassNames(colorObjects, type, isExplicitlyNamed, classSelectors) {

  let classNames = [];
  // for each color object provided, create class names for all selectors and shades
  colorObjects.forEach(color => {
    let colorId = color.color;
    let shades = color.shades;
    // used for designating multiples of a color type when there are more than one
    // AND when naming is not explicit, i.e., multiple supporting colors
    let i = 0;

    let classString = '';


    // for each shade of color (10), create clas name for each selector provided
    shades.forEach((shade) => {

      // define class prefix based on selector
      classSelectors.forEach(classSelector => {
        switch (classSelector) {
          case 'background':
            classString = '.bg-';
            break;
          case 'border':
            classString = '.border-';
            break;
          case 'text':
            classString = '.text-';
            break;
          case 'btn':
            classString = '.btn-';
            break;
          default:
            classString = '.';
        }

        // if naming not explicit, use generic values of color type, i.e., primary, etc.
        if (!isExplicitlyNamed) {

          switch (type) {
            case 'p':
              classString += 'primary-';
              break;
            case 'n':
              classString += 'neutral-';
              break;
            case 's':
              classString += 'supporting-';
              break;
            default:
              classString += '';
          }
          // determine class definition based on selectors provided
          switch (classSelector) {
            case 'background':
              classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
              break;
            case 'border':
              classString += i + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
              break;
            case 'text':
              classString += i + '-' + shade.weight + '{color:' + shade.hexValue + ';}/*' + colorId + '*/';
              break;
            case 'btn':
              classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
              break;
            default:
              classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
          }
          console.log(classString)

        } else { // if naming explicit, name by color id
          if (colorId.includes("(Vivid)")) { // if color is vivid
            colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
            switch (classSelector) {
              case 'background':
                classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                break;
              case 'border':
                classString += colorId + shade.weight + '{border-color:' + shade.hexValue + ';}';
                break;
              case 'text':
                classString += colorId + shade.weight + '{color:' + shade.hexValue + ';}';
                break;
              case 'btn':
                classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                break;
              default:
                classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
            }

          } else { // if general color

            switch (classSelector) {
              case 'background':
                classString += colorId.toLowerCase() + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                break;
              case 'border':
                classString += colorId.toLowerCase() + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}';
                break;
              case 'text':
                classString += colorId.toLowerCase() + '-' + shade.weight + '{color:' + shade.hexValue + ';}';
                break;
              case 'btn':
                classString += colorId.toLowerCase() + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                break;
              default:
                classString += colorId.toLowerCase() + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
            }
          }
        }
        // push class names to list
        classNames.push(classString);
      })
    })
    i += 1; // increase i for each color of type e.g., primary-1, primary-2
  });
  return classNames;
}