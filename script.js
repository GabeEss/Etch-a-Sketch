let squaresOneSide = 16; // number of squares is the number here to the power of two

const resetBtn = document.querySelector('#reset'); // get reset button element
resetBtn.addEventListener('click', () => deleteGrid()); // create event on click

const setSize = document.querySelector('#size'); // get the size input element

setSize.addEventListener('input', () => setSide()); // give it an event listener

makeGrid(); // makes the grid

// Determines the size of the grid by setting the global variable for the number
// of squares on one side.
function setSide()
{
    // get the number input
    let input1 = document.getElementById('size').value;
    
    // if number is greater than 0 and under or equal to 64, readjusts
    if(input1 > 0 && input1 <= 64)
    {
        squaresOneSide = input1;
        deleteGrid();
    }
}

// sets the grid to an empty container and then calls the makeGrid function to remake
// the grid
function deleteGrid()
{
    const grid = document.querySelector('.GridContainer');

    grid.textContent = ''; // reset grid

    makeGrid();
}

function makeGrid()
{
    const grid = document.querySelector('.GridContainer'); // get grid container element

    const square = document.createElement('div'); // create square element
    square.setAttribute('id', 'square'); // give attributes
    square.style.background = 'white';
    square.style.outline = 'solid'; // better than border because there is no overlap
    square.style.flexShrink = '1';
    square.style.flexGrow = '1'; // all squares will grow to an equal size in the
                                // container

    for(i = 0; i < squaresOneSide; i++)
    { 
        let row = square.cloneNode(true); // make clone of square and call it row
        row.style.display = 'flex';
        row.style.flexDirection = 'row'; // use flex to set direction
        grid.appendChild(row);

        for(i2 = 0; i2 < squaresOneSide; i2++)
        {
            let column = square.cloneNode(true);
            column.style.display='flex';
            column.style.flexDirection='column';

            // Get one random color to fill the square.
            const randomColor = Math.floor(Math.random()*16777215).toString(16); 

            // Add event listener to fill in each of the squares if the mouse moves over.
            // The event can be fired more than once. If you move the mouse over the
            // same square. The square will darken by 10%.
            column.addEventListener('mouseover', 
            () => { column.style.background = "#" + randomColor;
            column.style.filter = getDark(column)}, {once: false});

            row.appendChild(column);
        }
    }
}

// The current column element (one square in the grid) is passed into this function.
// This function makes the random color value 10% darker at each pass.
function getDark(element)
{   
    let style = window.getComputedStyle(element); // get style of element

    // Teturns filter values as a string. In particular, this function is
    // looking to create and edit the brightness value.
    let bright = style.getPropertyValue("filter"); 

    for(i = 10; i > 0; i--) // start at 10 because decreasing brightness makes darker
    {
        if(bright == `none`) // when brightness value is not initialized in square
        {
            bright = `brightness(${1})`; // set to 1
            break;
        }

        math = (i * .1); // multiply by .1 to get 10% decreases in brightness
        let roundMath = decimalAdjust("floor", math, -1); // make rounded decimal

        if(bright == `brightness(${roundMath})`) // if current bright value is found
        {
            iterate = ((i-1) * .1); // equation to iterate the bright value
            let roundDecimal = decimalAdjust("floor", iterate, -1) // make rounded decimal
            bright = `brightness(${roundDecimal})`; // adjust bright value with iteration
            break; // exit the loop until the next time the mouse passes over this square
        }
    }

    // console.log(bright);
    return bright; // return the brightness value
}


// I took this from the Mozilla dev tools website.
/**
 * Adjusts a number to the specified digit.
 *
 * @param {"round" | "floor" | "ceil"} type The type of adjustment.
 * @param {number} value The number.
 * @param {number} exp The exponent (the 10 logarithm of the adjustment base).
 * @returns {number} The adjusted value.
 */
 function decimalAdjust(type, value, exp) {
    type = String(type);
    if (!["round", "floor", "ceil"].includes(type)) {
      throw new TypeError(
        "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
      );
    }
    exp = Number(exp);
    value = Number(value);
    if (exp % 1 !== 0 || Number.isNaN(value)) {
      return NaN;
    } else if (exp === 0) {
      return Math[type](value);
    }
    const [magnitude, exponent = 0] = value.toString().split("e");
    const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
    // Shift back
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
    return Number(`${newMagnitude}e${+newExponent + exp}`);
  }