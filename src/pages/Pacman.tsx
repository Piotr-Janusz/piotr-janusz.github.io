import { JSX } from "react";
import { JsxElement } from "typescript";

export const PacmanRemake = () => {
  return Pacman();
}

class TileData {
    type: number;
    position_x: number;
    position_y: number;

    constructor(type: number, position_x: number, position_y: number)
    {
        this.type = type;
        this.position_x = position_x;
        this.position_y = position_y;
    }
}


function Pacman() : JSX.Element {
    var tileMap: TileData[][] = Array(28).fill(Array(31).fill(new TileData(0,0,0)));

    for(let x = 0; x < 28; x++)
    {
        for(let y = 0; y < 31; y++)
        {
            tileMap[x][y] = new TileData(0, x, y);
        }
    };

    var map: React.ReactNode[][] = tileMap.map((row, rowIndex) => {
        return tileMap.map((tile, tileIndex) => {
            return tileObject();
        });
    });

  return (
    <div className="w-135 grid grid-cols-28 grid-rows-31 gap-0 flex-nowrap">
      {map.flat()}
    </div>
  );
}

function tileObject() {
    return (
        <div className="w-5 h-5 border-2 border-black bg-yellow-500">

        </div>);
}