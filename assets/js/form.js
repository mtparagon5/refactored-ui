// VARIABLES
const VARIABLES_FILENAME = 'rui.variables.';
const CUSTOM_CSS_FILENAME = 'rui.custom.css';
const PALETTE_FILENAME = 'rui.custom.palette-';
const TW_FILENAME = 'rui.tailwind.config.js.txt';

let EXPORT_STATE = '';
const PALETTE = 'PALETTE';
const CUSTOM_CSS = 'CUSTOM_CSS';
const TAILWIND_CONFIG = 'TAILWIND_CONFIG';

const SHADE_INDEX = 2;

const CLASS_OPTIONS = ['BACKGROUND', 'BORDER', 'BUTTON', 'TEXT'];
const NAMING_OPTIONS = ['EXPLICIT NAMING'];

let formState = {};

formState.currentType = '';
formState.colors = [];
formState.options = [];
formState.paletteId = 0;

// tab events
$(function () {
  $('#form-tabs li a:last').tab('show');
});

// add export options
$.map(CLASS_OPTIONS, function (option) {
  $('#cssExportOptions').append(
    `
    <div class="form-check form-check-inline ">
        <label class="form-check-label">
          <input class="form-check-input" name="option" type="checkbox" id="inlineCheckbox` + option + `" value="` + option + `"> ` + option + `
          <span class="form-check-sign"></span>
        </label>
      </div>
  `
  );
  $('#paletteExportOptions').append(
    `
    <div class="form-check form-check-inline ">
        <label class="form-check-label">
          <input class="form-check-input" name="option" type="checkbox" id="inlineCheckbox` + option + `" value="` + option + `"> ` + option + `
          <span class="form-check-sign"></span>
        </label>
      </div>
  `
  );
});
// add explicit naming option
$.map(NAMING_OPTIONS, function (option) {
  $('#paletteExportOptions').append(
    `
    <div class="form-check form-check-inline ">
        <label class="form-check-label">
          <input class="form-check-input" name="option" type="checkbox" id="inlineCheckbox` + option + `" value="` + option + `"> ` + option + `
          <span class="form-check-sign"></span>
        </label>
      </div>
  `
  );
});
// attach information button
$('#cssExportOptions').append(
  `
  <sup>
    <a style="position:relative; bottom:5px;" type="button" class="btn  btn-sm btn-just-icon bg-transparent border-transparent grow2"
      data-container="body" data-toggle="popover" title="File Generation"
      data-content="Variables for selected colors will be named explicitly by default, e.g., '.bg-green-000' as opposed to 'bg-primary-0-000'. ">
      <i class="fas fa-info text-rui-green-vivid-300 "></i>
    </a>
  </sup>
  `
);
// attach information button
$('#paletteExportOptions').append(
  `
  <sup>
    <a style="position:relative; bottom:5px;" type="button" class="btn  btn-sm btn-just-icon bg-transparent border-transparent grow2"
      data-container="body" data-toggle="popover" title="File Generation"
      data-content="Explicit Naming refers to the naming of classes, e.g., '.bg-green-000' as opposed to 'bg-primary-0-000'.">
      <i class="fas fa-info text-rui-green-vivid-300 "></i>
    </a>
  </sup>
  `
);


// add radio buttons for palette selection
$.map(palettes, function (palette) {

  // palette specific 
  $('#palette-select').append(
    `
    <div class="form-check-radio form-check-inline">
      <label class="form-check-label">
        <input class="form-check-input palette" name="palette" type="radio" id="paletteColorRadio` + palette.id + `"
          value="option` + palette.id + `">
          ` + palette.id + `
        <span class="form-check-sign"></span>
      </label>
    </div>
     `
  )
});

// sort colors for adding color choice checkboxes in custom css section
let sortedColors = swatches.sort((a, b) => (a.color > b.color) ? 1 : -1)

// add color checkboxes
$.map(sortedColors, function (color) {
  // console.log(color.shades)

  // custom css colors
  $('#css-custom-color-checkboxes').append(
    `
      <div class="form-check form-check-inline col-2">
        <label class="form-check-label">
          <input class="form-check-input" name="custom" style="background-color: ` + color.shades[SHADE_INDEX].hexValue + ` !important;" type="checkbox" id="inlineCheckbox` + color.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '') + `" value="` + color.color + `"> ` + color.color + `
          <span class="form-check-sign"></span>
        </label>
      </div>
    `
  )

  $('#tw-custom-color-checkboxes').append(
    `
      <div class="form-check form-check-inline col-2">
        <label class="form-check-label">
          <input class="form-check-input" name="tw" style="background-color: ` + color.shades[SHADE_INDEX].hexValue + ` !important;" type="checkbox" id="inlineCheckbox` + color.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '') + `" value="` + color.color + `"> ` + color.color + `
          <span class="form-check-sign"></span>
        </label>
      </div>
    `
  )
});


// events

// reset state selection on tab change
$('.nav-tabs a').on('shown.bs.tab', function (event) {
  // clear input selections in all tabs
  clearSelections();

  // active tab / set state
  let currentTab = $(event.target).prop("id")
  switch (currentTab) {
    case 'palette':
      formState.currentType = PALETTE;
      formState.colors = [];
      formState.options = [];
      formState.paletteId = 0;
      break;

    case 'custom':
      formState.currentType = CUSTOM_CSS;
      formState.colors = [];
      formState.options = [];
      formState.paletteId = 0;
      break;

    case 'tw':
      formState.currentType = TAILWIND_CONFIG;
      formState.colors = [];
      formState.options = [];
      formState.paletteId = 0;
      break;

    default:
      formState.currentType = PALETTE;
      formState.colors = [];
      formState.options = [];
      formState.paletteId = 0;
      break;


  }

});

// radio buttons for palette selection
$(document).ready(function () {

  // palette specific tab
  $('#form1 input[type=radio]').click(function () {
    formState.colors = [];

    formState.paletteId = this.value.replace('option', '');

    let selectedPalette = palettes.filter(p => {
      return p.id == this.value.replace('option', '');
    });
    let a = 'P | ';

    $.map(selectedPalette[0].Colors.Primary, function (c) {

      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      formState.colors.push(c);
    });

    a += ' N | ';

    $.map(selectedPalette[0].Colors.Neutral, function (c) {

      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      formState.colors.push(c);
    });

    a += ' S | ';
    $.map(selectedPalette[0].Colors.Supporting, function (c) {

      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      formState.colors.push(c);
    });
    $('#palette-colors').html(a);

  });
  // update state.options for palette tab
  $('#paletteExportOptions input[name="option"]').click(function () {
    if (this.checked) {
      if (!formState.options.includes(this.value)) {
        formState.options.push(this.value);
      }
    } else {

      let index = formState.options.indexOf(this.value);
      if (index > -1) {
        formState.options.splice(index, 1);
      }
    }

  });


  // custom colors tab
  $('#form1 input[name="custom"]').click(function () {

    let colorId = this.id.replace('inlineCheckbox', '');
    let selectedColor = swatches.filter(swatch => {
      return colorId == swatch.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '');
    });

    if (this.checked) {
      if (!formState.colors.includes(selectedColor)) {
        formState.colors.push(selectedColor[0]);

      }
    } else {

      let index = formState.colors.indexOf(selectedColor[0]);
      if (index > -1) {
        formState.colors.splice(index, 1);

      }
    }

    let a = '';
    $.map(formState.colors, (c) => {
      a += `
                <a class="btn btn-sm btn-just-icon mr-3"
                  style="width:5px;background-color:` + c.shades[SHADE_INDEX].hexValue + `;border-color:` + c.shades[SHADE_INDEX].hexValue + `">
                </a>
              `;

    });
    $('#css-colors').html(a);



  });
  // update state.options for custom css tab
  $('#cssExportOptions input[name="option"]').click(function () {
    if (this.checked) {
      if (!formState.options.includes(this.value)) {
        formState.options.push(this.value);

      }
    } else {

      let index = formState.options.indexOf(this.value);
      if (index > -1) {
        formState.options.splice(index, 1);

      }
    }


  });

  // tailwind config tab
  $('#form1 input[name="tw"]').click(function () {

    let colorId = this.id.replace('inlineCheckbox', '');
    let selectedColor = swatches.filter(swatch => {
      return colorId == swatch.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '');
    });

    if (this.checked) {
      if (!formState.colors.includes(selectedColor)) {
        formState.colors.push(selectedColor[0]);
      }
    } else {

      let index = formState.colors.indexOf(selectedColor[0]);
      if (index > -1) {
        formState.colors.splice(index, 1);
      }
    }

    let a = '';
    $.map(formState.colors, (c) => {
      a += `
                <a class="btn btn-sm btn-just-icon mr-3"
                  style="width:5px;background-color:` + c.shades[SHADE_INDEX].hexValue + `;border-color:` + c.shades[SHADE_INDEX].hexValue + `">
                </a>
              `;

    });

    $('#tw-colors').html(a);

  });

});


$('#download').click(function () {
  download(formState);
})

// functions

function clearSelections() {
  $("input:checked").each(function (i, input) {
    input.checked = false;
    let a = '';
    $('#palette-colors').html(a);
    $('#tw-colors').html(a);
    $('#css-colors').html(a);
    // loop all checked items

  });
}

// function to get variable names for user based on selections made in the browser
function getColorVariables(state) {
  let varStrings = [];

  let isExplicitlyNamed = state.currentType == CUSTOM_CSS ? true : false;
  if (state.options.indexOf(NAMING_OPTIONS[0]) > -1) {
    isExplicitlyNamed = true;
  }

  if (state.currentType == PALETTE) {
    state.primaries = [];
    state.neutrals = [];
    state.supporters = [];


    // NOTE:
    // determine which colors are which...
    // had trouble doing this earlier in code due to their states
    // being overwritten on each iteration of loop...
    // had do it here each time to ensure values were from current palette
    state.colors.forEach(color => {

      color.isPrimary.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.primaries.includes(color)) {
            state.primaries.push(color)
          }
        }
      });

      color.isNeutral.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.neutrals.includes(color)) {
            state.neutrals.push(color)
          }
        }
      });

      color.isSupporting.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.supporters.includes(color)) {
            state.supporters.push(color)
          }
        }
      });
    });

    let i = 0;
    state.primaries.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;

      let varString = '';
      shades.forEach((shade) => {
        varString = '--color-';
        if (!isExplicitlyNamed) {
          varString += 'primary-';

          varString += i + '-' + shade.weight + ': ' + shade.hexValue + ';/*' + colorId + '*/';


        } else {
          if (colorId.includes("(Vivid)")) {
            colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
            varString += colorId;
          } else {
            varString += colorId.toLowerCase().replace(' ', '-') + '-';
          }

          varString += shade.weight + ': ' + shade.hexValue + ';';
        }

        varStrings.push(varString);
      })
      i += 1;
    });

    i = 0;
    state.neutrals.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;

      let varString = '';
      shades.forEach((shade) => {
        varString = '--color-';
        if (!isExplicitlyNamed) {
          varString += 'neutral-';

          varString += i + '-' + shade.weight + ': ' + shade.hexValue + ';/*' + colorId + '*/';


        } else {
          if (colorId.includes("(Vivid)")) {
            colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
            varString += colorId;
          } else {
            varString += colorId.toLowerCase().replace(' ', '-') + '-';
          }

          varString += shade.weight + ': ' + shade.hexValue + ';';
        }

        varStrings.push(varString);
      })
      i += 1;
    });

    i = 0;
    state.supporters.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;

      let varString = '';
      shades.forEach((shade) => {
        varString = '--color-';
        if (!isExplicitlyNamed) {
          varString += 'supporting-';

          varString += i + '-' + shade.weight + ': ' + ';/*' + colorId + '*/';


        } else {
          if (colorId.includes("(Vivid)")) {
            colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
            varString += colorId;
          } else {
            varString += colorId.toLowerCase().replace(' ', '-') + '-';
          }

          varString += shade.weight + ': ' + shade.hexValue + ';';
        }

        varStrings.push(varString);
      })
      i += 1;
    });
  } else {
    let i = 0;
    state.colors.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;

      let varString = '';
      shades.forEach(shade => {
        varString = '--color-';
        if (!isExplicitlyNamed) {
          varString += 'supporting-';

          varString += i + '-' + shade.weight + ': ' + ';/*' + colorId + '*/';


        } else {
          if (colorId.includes("(Vivid)")) {
            colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
            varString += colorId;
          } else {
            varString += colorId.toLowerCase().replace(' ', '-') + '-';
          }

          varString += '-' + shade.weight + ': ' + shade.hexValue + ';';
        }

        varStrings.push(varString);
      })
      i += 1;
    });
  }


  return varStrings;
}

// get class names for the following css selectors: background-color, border-color, text color, and a btn class 
function getClassNames(state) {

  let isExplicitlyNamed = state.currentType == CUSTOM_CSS ? true : false;
  if (state.options.indexOf(NAMING_OPTIONS[0]) > -1) {
    isExplicitlyNamed = true;
  }

  let classNames = [];
  // for each color object provided, create class names for all selectors and shades

  if (state.currentType == PALETTE) {

    state.primaries = [];
    state.neutrals = [];
    state.supporters = [];
    state.colors.forEach(color => {
      // NOTE:
      // determine which colors are which...
      // had trouble doing this earlier in code due to their states
      // being overwritten on each iteration of loop...
      // had do it here each time to ensure values were from current palette
      color.isPrimary.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.primaries.includes(color)) {
            state.primaries.push(color)
          }
        }
      });

      color.isNeutral.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.neutrals.includes(color)) {
            state.neutrals.push(color)
          }
        }
      });

      color.isSupporting.forEach(function (val) {
        if (val == state.paletteId) {
          if (!state.supporters.includes(color)) {
            state.supporters.push(color)
          }
        }
      });
    });

    let i = 0;
    state.primaries.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;
      // used for designating multiples of a color type when there are more than one
      // AND when naming is not explicit, i.e., multiple supporting colors

      let classString = '';

      // for each shade of color (10), create clas name for each selector provided
      shades.forEach((shade) => {

        // define class prefix based on selector
        state.options.forEach(classSelector => {
          switch (classSelector) {
            case 'BACKGROUND':
              classString = '.bg-';
              break;
            case 'BORDER':
              classString = '.border-';
              break;
            case 'TEXT':
              classString = '.text-';
              break;
            case 'BUTTON':
              classString = '.btn-';
              break;
            default:
              // classString = '.';
              break;
          }

          // if naming not explicit, use generic values of color type, i.e., primary, etc.
          if (!isExplicitlyNamed) {

            classString += 'primary-';
            // determine class definition based on selectors provided
            switch (classSelector) {
              case 'BACKGROUND':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BORDER':
                classString += i + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'TEXT':
                classString += i + '-' + shade.weight + '{color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BUTTON':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              default:
                // classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
            }
            // console.log(classString)

          } else { // if naming explicit, name by color id
            if (colorId.includes("(Vivid)")) { // if color is vivid
              colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }

            } else { // if general color

              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }
            }
          }
          // console.log(classString)
          // push class names to list
          classNames.push(classString);
        })
      })
      i += 1; // increase i for each color of type e.g., primary-1, primary-2
    });

    i = 0;
    state.neutrals.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;
      // used for designating multiples of a color type when there are more than one
      // AND when naming is not explicit, i.e., multiple supporting colors

      let classString = '';

      // for each shade of color (10), create clas name for each selector provided
      shades.forEach((shade) => {

        // define class prefix based on selector
        state.options.forEach(classSelector => {
          switch (classSelector) {
            case 'BACKGROUND':
              classString = '.bg-';
              break;
            case 'BORDER':
              classString = '.border-';
              break;
            case 'TEXT':
              classString = '.text-';
              break;
            case 'BUTTON':
              classString = '.btn-';
              break;
            default:
              // classString = '.';
              break;
          }

          // if naming not explicit, use generic values of color type, i.e., primary, etc.
          if (!isExplicitlyNamed) {

            classString += 'neutral-';
            // determine class definition based on selectors provided
            switch (classSelector) {
              case 'BACKGROUND':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BORDER':
                classString += i + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'TEXT':
                classString += i + '-' + shade.weight + '{color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BUTTON':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              default:
                // classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
            }
            // console.log(classString)

          } else { // if naming explicit, name by color id
            if (colorId.includes("(Vivid)")) { // if color is vivid
              colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }

            } else { // if general color

              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }
            }
          }
          // push class names to list
          classNames.push(classString);
        })
      })
      i += 1; // increase i for each color of type e.g., primary-1, primary-2
    });

    i = 0;
    state.supporters.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;
      // used for designating multiples of a color type when there are more than one
      // AND when naming is not explicit, i.e., multiple supporting colors

      let classString = '';

      // for each shade of color (10), create clas name for each selector provided
      shades.forEach((shade) => {

        // define class prefix based on selector
        state.options.forEach(classSelector => {
          switch (classSelector) {
            case 'BACKGROUND':
              classString = '.bg-';
              break;
            case 'BORDER':
              classString = '.border-';
              break;
            case 'TEXT':
              classString = '.text-';
              break;
            case 'BUTTON':
              classString = '.btn-';
              break;
            default:
              // classString = '.';
              break;
          }

          // if naming not explicit, use generic values of color type, i.e., primary, etc.
          if (!isExplicitlyNamed) {

            classString += 'supporting-';
            // determine class definition based on selectors provided
            switch (classSelector) {
              case 'BACKGROUND':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BORDER':
                classString += i + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'TEXT':
                classString += i + '-' + shade.weight + '{color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BUTTON':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              default:
                // classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
            }
            // console.log(classString)

          } else { // if naming explicit, name by color id
            if (colorId.includes("(Vivid)")) { // if color is vivid
              colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }

            } else { // if general color

              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  // classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
              }
            }
          }
          // push class names to list
          classNames.push(classString);
        })
      })
      i += 1; // increase i for each color of type e.g., primary-1, primary-2
    });
  } else {
    let i = 0;
    state.colors.forEach(color => {
      let colorId = color.color;
      let shades = color.shades;
      // used for designating multiples of a color type when there are more than one
      // AND when naming is not explicit, i.e., multiple supporting colors

      let classString = '';



      // for each shade of color (10), create clas name for each selector provided
      shades.forEach((shade) => {

        // define class prefix based on selector
        state.options.forEach(classSelector => {
          switch (classSelector) {
            case 'BACKGROUND':
              classString = '.bg-';
              break;
            case 'BORDER':
              classString = '.border-';
              break;
            case 'TEXT':
              classString = '.text-';
              break;
            case 'BUTTON':
              classString = '.btn-';
              break;
            default:
              // classString = '.';
              break;
          }

          // if naming not explicit, use generic values of color type, i.e., primary, etc.
          if (!isExplicitlyNamed) {

            classString += 'supporting-';
            // determine class definition based on selectors provided
            switch (classSelector) {
              case 'BACKGROUND':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BORDER':
                classString += i + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'TEXT':
                classString += i + '-' + shade.weight + '{color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              case 'BUTTON':
                classString += i + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}/*' + colorId + '*/';
                break;
              default:
                break;
            }

          } else { // if naming explicit, name by color id
            if (colorId.includes("(Vivid)")) { // if color is vivid
              colorId = colorId.toLowerCase().replace(/\s/g, '').replace('(', '-').replace(')', '');
              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  break;
              }

            } else { // if general color

              switch (classSelector) {
                case 'BACKGROUND':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';}';
                  break;
                case 'BORDER':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{border-color:' + shade.hexValue + ';}';
                  break;
                case 'TEXT':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{color:' + shade.hexValue + ';}';
                  break;
                case 'BUTTON':
                  classString += colorId.toLowerCase().replace(' ', '-') + '-' + shade.weight + '{background-color:' + shade.hexValue + ';border-color:' + shade.hexValue + ';}';
                  break;
                default:
                  break;
              }
            }
          }
          // push class names to list
          classNames.push(classString);
        })
      })
      i += 1; // increase i for each color of type e.g., primary-1, primary-2
    });
  }

  return classNames;
}

function download(state) {
  // variables
  let text_variables = ':root{\n';
  let text_custom = '';
  let text_twconfig = `module.exports = {
    theme: {
      extend: {
        colors: {
          `;
  // example
  //         gray: {
  //           '100': '#f5f5f5',
  //           '200': '#eeeeee',
  //           '300': '#e0e0e0',
  //           '400': '#bdbdbd',
  //           '500': '#9e9e9e',
  //           '600': '#757575',
  //           '700': '#616161',
  //           '800': '#424242',
  //           '900': '#212121',
  //         }
  //       }
  //     }
  //   }
  // }
  let filename = '';
  let variables = [], classNames = [];
  let documents = [];

  if (state.colors.length >= 1) {

    // tailwind config file
    if (state.currentType == TAILWIND_CONFIG) {

      state.colors.forEach(color => {
        let colorId = color.color.toLowerCase().replace(/\s/g, '').replace('(', '_').replace(')', '');
        text_twconfig += '' + colorId + ":{";
        color.shades.forEach(shade => {
          text_twconfig += "'" + shade.weight + "':'" + shade.hexValue + "',\n"
        });
        text_twconfig += '},\n'
      });
      text_twconfig += '}\n}\n}\n}';

      documents.push({ filename: TW_FILENAME, text: text_twconfig });

    } else { // custom css or palette specific files
      if (state.options.length == 1 & state.options[0] == NAMING_OPTIONS[0]) {
        variables = getColorVariables(state)

        variables.forEach(v => {
          text_variables += v + '\n';
        });
        text_variables += '}';

      } else if (state.options.length > 1) {

        variables = getColorVariables(state);
        variables.forEach(v => {
          text_variables += v + '\n';
        });
        text_variables += '}';

        classNames = getClassNames(state)
        classNames.forEach(v => {
          text_custom += v + '\n';
        });
        let fname = state.currentType == PALETTE ? PALETTE_FILENAME + state.paletteId + '.css' : CUSTOM_CSS_FILENAME;
        let customDoc = { filename: fname, text: text_custom }
        documents.push(customDoc);
      } else {
        variables = getColorVariables(state)
        variables.forEach(v => {
          text_variables += v + '\n';
        });
        text_variables += '}';
      }
      let vfname = state.currentType == PALETTE ? VARIABLES_FILENAME + 'palette-' + state.paletteId + '.css' : VARIABLES_FILENAME + 'custom.css';
      let variablesDoc = { filename: vfname, text: text_variables };
      documents.push(variablesDoc);
    }

  } else {
    alert("It seems you've forgotten to select any colors :(")
  }
  if (documents.length > 1) {
    alert('Multiple documents may be downloaded')
  }
  documents.forEach(d => {

    if (state.currentType == TAILWIND_CONFIG) {
      alert('Tailwind config files will initially be downloaded as text files, simply delete the ending ".txt"');
    }

    // create and download file
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(d.text));
    element.setAttribute('download', d.filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  });
}