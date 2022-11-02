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

    grid.textContent = '';

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

            // Add event listener to fill in each of the squares if the mouse moves over
            column.addEventListener('mouseover', () => column.style.background = 'black');

            row.appendChild(column);
        }
    }
}