import React from "react";

type PropTypes = {
  playerStats: Record<string, any>[];
};

function H2HTable({ playerStats }: PropTypes) {
  function player1Compare(stat1: number, stat2: number) {
    if (stat1 > stat2) {
      return "bg-success text-success-content";
    } else if (stat1 < stat2) {
      return "bg-base-300";
    } else {
      return "bg-warning text-warning-content";
    }
  }

  function player2Compare(stat1: number, stat2: number) {
    if (stat1 > stat2) {
      return "bg-base-300";
    } else if (stat1 < stat2) {
      return "bg-success text-success-content";
    } else {
      return "bg-warning text-warning-content";
    }
  }
  return (
    <div>
      <table className="table border text-lg">
        <thead className="border">
          <tr className="border">
            <th></th>
            <th>{playerStats[0]?.player_name}</th>
            <th className=""></th>
            <th>{playerStats[1]?.player_name}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <th>PPG</th>
            <td
              className={player1Compare(playerStats[0].pts, playerStats[1].pts)}
            >
              {playerStats[0].pts?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].pts, playerStats[1].pts)}
            >
              {playerStats[1].pts?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>TRB/G</th>
            <td
              className={player1Compare(playerStats[0].trb, playerStats[1].trb)}
            >
              {playerStats[0].trb?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].trb, playerStats[1].trb)}
            >
              {playerStats[1].trb?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>AST/G</th>
            <td
              className={player1Compare(playerStats[0].ast, playerStats[1].ast)}
            >
              {playerStats[0].ast?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].ast, playerStats[1].ast)}
            >
              {playerStats[1].ast?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>STL/G</th>
            <td
              className={player1Compare(playerStats[0].stl, playerStats[1].stl)}
            >
              {playerStats[0].stl?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].stl, playerStats[1].stl)}
            >
              {playerStats[1].stl?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>BLK/G</th>
            <td
              className={player1Compare(playerStats[0].blk, playerStats[1].blk)}
            >
              {playerStats[0].blk?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].blk, playerStats[1].blk)}
            >
              {playerStats[1].blk?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FGM</th>
            <td
              className={player1Compare(playerStats[0].fg, playerStats[1].fg)}
            >
              {playerStats[0].fg?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].fg, playerStats[1].fg)}
            >
              {playerStats[1].fg?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FGA</th>
            <td
              className={player1Compare(playerStats[0].fga, playerStats[1].fga)}
            >
              {playerStats[0].fga?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(playerStats[0].fga, playerStats[1].fga)}
            >
              {playerStats[1].fga?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FG%</th>
            <td
              className={player1Compare(
                playerStats[0].fg_percent,
                playerStats[1].fg_percent
              )}
            >
              {playerStats[0].fg_percent?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(
                playerStats[0].fg_percent,
                playerStats[1].fg_percent
              )}
            >
              {playerStats[1].fg_percent?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FG3M</th>
            <td
              className={player1Compare(
                playerStats[0].threeP,
                playerStats[1].threeP
              )}
            >
              {playerStats[0].threeP?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(
                playerStats[0].threeP,
                playerStats[1].threeP
              )}
            >
              {playerStats[1].threeP?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FG3A</th>
            <td
              className={player1Compare(
                playerStats[0].threePA,
                playerStats[1].threePA
              )}
            >
              {playerStats[0].threePA?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(
                playerStats[0].threePA,
                playerStats[1].threePA
              )}
            >
              {playerStats[1].threePA?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>3P%</th>
            <td
              className={player1Compare(
                playerStats[0].three_percent,
                playerStats[1].three_percent
              )}
            >
              {playerStats[0].three_percent?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(
                playerStats[0].three_percent,
                playerStats[1].three_percent
              )}
            >
              {playerStats[1].three_percent?.toString()}
            </td>
          </tr>
          <tr className="hover">
            <th>FT%</th>
            <td
              className={player1Compare(
                playerStats[0].ft_percent,
                playerStats[1].ft_percent
              )}
            >
              {playerStats[0].ft_percent?.toString()}
            </td>
            <td></td>
            <td
              className={player2Compare(
                playerStats[0].ft_percent,
                playerStats[1].ft_percent
              )}
            >
              {playerStats[1].ft_percent?.toString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default H2HTable;
