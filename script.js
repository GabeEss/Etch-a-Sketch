let squaresOneSide = 16; // number of squares is the number here to the power of two

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => deleteGrid());

makeGrid();

// Determines the size of the grid by setting the global variable for the number
// of squares on one side.
function setSide()
{
    if(input > 0 && !isNaN)
        squaresOneSide = input;

    deleteGrid();
}

function deleteGrid()
{
    const grid = document.querySelector('.GridContainer');

    grid.innerHTML = '';

    makeGrid();
}

function makeGrid()
{
    const grid = document.querySelector('.GridContainer'); // get grid container element

    const square = document.createElement('div'); // create square element
    square.setAttribute('id', 'square'); // give attributes
    square.style.background = 'white';
    square.style.outline = 'solid'; // better than border when there is overlap
    square.style.flexShrink = '1';
    square.style.flexGrow = '1';

    for(i = 0; i < squaresOneSide; i++)
    { 
        let row = square.cloneNode(true); // make clone of square and call it row
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
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