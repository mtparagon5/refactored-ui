

const PALETTE = 'PALETTE';
const CUSTOM_CSS = 'CUSTOM_CSS';
const TAILWIND_CONFIG = 'TAILWIND_CONFIG';

const SHADE_INDEX = 2;

let currentState = {};

currentState.currentType = '';
currentState.colors = [];

console.log(swatches)

// tab events
$(function () {
  $('#form-tabs li a:last').tab('show');
})


// add radio buttons for palette selection
$.map(palettes, function (palette) {

  // palette specific 
  $('#palette-select').append(
    `
    <div class="form-check-radio form-check-inline">
      <label class="form-check-label">
        <input class="form-check-input palette" type="radio" name="paletteRadio" id="paletteColorRadio` + palette.id + `"
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
$.map(sortedColors, function (color) {
  // console.log(color.shades)

  // custom css colors
  $('#css-custom-color-checkboxes').append(
    `
      <div class="form-check form-check-inline col-2">
        <label class="form-check-label">
          <input class="form-check-input" name="custom" style="background-color: ` + color.shades[SHADE_INDEX].hexValue + ` !important;" type="checkbox" id="inlineCheckbox` + color.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '') + `" value="option1"> ` + color.color + `
          <span class="form-check-sign"></span>
        </label>
      </div>
    `
  )

  $('#tw-custom-color-checkboxes').append(
    `
      <div class="form-check form-check-inline col-2">
        <label class="form-check-label">
          <input class="form-check-input" name="tw" style="background-color: ` + color.shades[SHADE_INDEX].hexValue + ` !important;" type="checkbox" id="inlineCheckbox` + color.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '') + `" value="option1"> ` + color.color + `
          <span class="form-check-sign"></span>
        </label>
      </div>
    `
  )
});


// events

// state selection
$('.nav-tabs a').on('shown.bs.tab', function (event) {
  // active tab
  let currentTab = $(event.target).prop("id")
  switch (currentTab) {
    case 'palette':
      currentState.currentType = PALETTE;
      currentState.colors = [];
      break;
    case 'custom':
      currentState.currentType = CUSTOM_CSS;
      currentState.colors = [];
      break;
    case 'tw':
      currentState.currentType = TAILWIND_CONFIG;
      currentState.colors = [];
      break;
    default:
      currentState.currentType = PALETTE;
      currentState.colors = [];
      break;
  }

  console.log(currentState)
});


// radio buttons for palette selection
$(document).ready(function () {


  // console.log(activeTab)

  $('#form1 input[type=radio]').click(function () {
    currentState.colors = [];

    let selectedPalette = palettes.filter(p => {
      return p.id == this.value.replace('option', '')
    });
    let a = 'P | ';
    // console.log
    $.map(selectedPalette[0].Colors.Primary, function (c) {
      // console.log(color)
      // $.map(colors, function (c) {

      // let colorId = c.color;
      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      currentState.colors.push(c[0]);
      // });
    });
    a += ' N | ';

    $.map(selectedPalette[0].Colors.Neutral, function (c) {
      // $.map(colors, function (c) {

      // let colorId = c.color;
      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      currentState.colors.push(c[0]);
      // });
    });

    a += ' S | ';
    $.map(selectedPalette[0].Colors.Supporting, function (c) {
      // $.map(colors, function (c) {

      // let colorId = c.color;
      let hexValue = c.shades[SHADE_INDEX].hexValue;
      a += `
                  <a class="btn btn-sm btn-just-icon mr-3"
                    style="width:5px;background-color:` + hexValue + `;border-color:` + hexValue + `">
                  </a>
                `;
      currentState.colors.push(c[0]);
      // });
      $('#palette-colors').html(a);
      // $('#palette-colors').hide().html(a).fadeIn("slow");
    });
    console.log(currentState)
  });

  $('#form1 input[name="custom"]').click(function () {


    let colorId = this.id.replace('inlineCheckbox', '');
    let selectedColor = swatches.filter(swatch => {
      return colorId == swatch.color.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '');
    });

    if (this.checked) {
      console.log('checked')
      if (!currentState.colors.includes(selectedColor)) {
        currentState.colors.push(selectedColor[0]);
      }
    } else {

      let index = currentState.colors.indexOf(selectedColor[0]);
      if (index > -1) {
        currentState.colors.splice(index, 1);
      }
      console.log('unchecked')
    }

    console.log(currentState)
    let a = '';
    $.map(currentState.colors, (c) => {
      console.log(c)
      a += `
                <a class="btn btn-sm btn-just-icon mr-3"
                  style="width:5px;background-color:` + c.shades[SHADE_INDEX].hexValue + `;border-color:` + c.shades[SHADE_INDEX].hexValue + `">
                </a>
              `;

    });
    $('#css-colors').html(a);


  });

});






























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