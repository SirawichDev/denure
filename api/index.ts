import { v4 } from "https://deno.land/std/uuid/mod.ts";

export type Player = {
  id: string;
  name: string;
  items: Array<string>;
};

export let players: Player[] = [
  { id: v4.generate(), name: "Sirawich", items: ["poition", "knife"] },
  { id: v4.generate(), name: "Gafield", items: ["carrot", "teeth"] },
];

export const getAllPlayers = (context: any) => {
  context.response.body = {
    success: true,
    data: players,
  };
};

export const getSinglePlayer = (context: any) => {
  const player: Player | undefined = players.find(
    (person: any) => person.id === context.URLSearchParams.id
  );
  if (player) {
    context.response.status = 200;
    context.response.body = {
      success: true,
      data: player,
    };
  } else {
    context.response.status = 404;
    context.response.body = {
      success: false,
      message: "No Record founds",
    };
  }
};

export const addPlayer = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  if (!request.hasBody) {
    request.status = 400;
  } else {
    const player: Player = body.value;
    player.id = v4.generate();
    players.push(player);
    response.status = 201;
    response.body = {
      success: true,
      data: player,
    };
  }
};

export const updatePlayer = async ({
  params,
  request,
  response,
}: {
  params: any;
  request: any;
  response: any;
}) => {
  const player: Player | undefined = players.find(
    (person: any) => person.id === params.id
  );

  if (player) {
    const body = await request.body();
    const updatePlayer: { name: string; items: Array<string> } = body.value;

    players = players.map((player: Player) =>
      player.id ? { ...player, ...updatePlayer } : player
    );
    response.status = 200;
    response.body = {
      success: true,
      data: players,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Player not found",
    };
  }
};

export const deletePlayer = ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  const player = players.filter((player: any) => player.id !== params.id);
  response.body = {
    success: true,
    message: "Removed Player",
    currentPlayer: player,
  };
};
