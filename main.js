//Присваиваем каждой фигуре свой код
var WHITE_KING = 100;
var WHITE_QUEEN = 90;
var WHITE_ROOK = 50;
var WHITE_BISHOP = 31;
var WHITE_KNIGHT = 30;
var WHITE_PAWN = 10;
//Для черных
var BLACK_KING = -WHITE_KING;
var BLACK_QUEEN = -WHITE_QUEEN;
var BLACK_ROOK = -WHITE_ROOK;
var BLACK_BISHOP = -WHITE_BISHOP;
var BLACK_KNIGHT = -WHITE_KNIGHT;
var BLACK_PAWN = -WHITE_PAWN;

//Расставляем фигурки
var board = [
    [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
    [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
    [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]
];

//Возвращаем названия фигур CSS
function getPieceName(pieceValue){
    switch (pieceValue) {
        case WHITE_KING:
            return 'WHITE_KING';
            break;
        case WHITE_QUEEN:
            return 'WHITE_QUEEN';
            break;
        case WHITE_ROOK:
            return 'WHITE_ROOK';
            break;
        case WHITE_BISHOP:
            return 'WHITE_BISHOP';
            break;
        case WHITE_KNIGHT:
            return 'WHITE_KNIGHT';
            break;
        case WHITE_PAWN:
            return 'WHITE_PAWN';
            break;

        case BLACK_KING:
            return 'BLACK_KING';
            break;
        case BLACK_QUEEN:
            return 'BLACK_QUEEN';
            break;
        case BLACK_ROOK:
            return 'BLACK_ROOK';
            break;
        case BLACK_BISHOP:
            return 'BLACK_BISHOP';
            break;
        case BLACK_KNIGHT:
            return 'BLACK_KNIGHT';
            break;
        case BLACK_PAWN:
            return 'BLACK_PAWN';
            break;

        default:
            return 'EMPTY';
            break;
    }
}


$(function(){

    drawBoard(board);

    var pieceSelected = false

    $(".WHITE_PAWN").on("click", function(e) {

        if(pieceSelected) {
        
            var rowColumn = getPieceCords(this),
                row =rowColumn[0],
                column = rowColumn[1];

            showPathPawn(row, column)
        }
        else {
            eraseFree()
        }

        pieceSelected = !pieceSelected
    })

});

function drawBoard(board){
    var str = '';
    for( var i = 0 ; i < 8 ; i++ ){
        str += '<div class="row">';
        for( var j = 0 ; j < 8 ; j++ ){
            str += '<div class="column ' +
                ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
                '<div class="' + getPieceName(board[i][j]) + '"></div>' +
                '</div>';
        }
        str += '</div>';
    }
    $('#board').append(str);
}

function getCell(i, j) {
    //console.log($(".row").get(i).find(".column"))
    var row = $(".row").get(i)
    var column = $(row).find(".column").get(j)
    var cell = $(column).children()
    
    return cell
}

function highlightFree(i, j) {
    console.log("adding FREE to "+i+" "+j)
    $(getCell(i, j)).addClass("FREE")
}

function eraseFree() {
    var cells = $(".row .column").children()
    $(cells).each(function(){
       $(this).removeClass("FREE")
    })
}

function highlightTaken(i, j) {
    $(getCell(i, j)).addClass("TAKEN")
}

function getPieceCords(piece) {
    var column = $(piece).parent()
    var row = $(column).parent()
    var columnIndex = $(row).children().index(column)
    var rowIndex = $(".row").index(row)
    return [rowIndex, columnIndex]
}

function inBounds(i, j) {
    if (i >= 0 && j>=0 && i<=8 && j<=8) return true
    else return false
}


function showPathPawn(i, j) {   

    if (inBounds(i-1, j+1)) {
        if (board[i-1][j+1] == 0) { 
            highlightFree(i-1, j+1)}
        else highlightTaken(i-1, j+1)
    }
    
    if (inBounds(i-1, j-1)) {
        if (board[i-1][j-1] == 0) highlightFree(i-1, j-1)
        else highlightTaken(i-1, j-1)
    }
}