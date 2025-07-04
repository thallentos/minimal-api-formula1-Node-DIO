import fastify from "fastify";
import cors from "@fastify/cors";
// import  { PORT } from "./env";

const server = fastify({
  logger: true,
});

server.register(cors, {
  origin: "*",
});

const teams = [
  {
    id: 1,
    name: "McLaren",
    base: "Woking, United Kingdom",
  },
  {
    id: 2,
    name: "Mercedes",
    base: "Brackley, United Kingdom",
  },
  {
    id: 3,
    name: "Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
  },
  {
    id: 4,
    name: "Ferrari",
    base: "Maranello, Italy",
  },
  {
    id: 5,
    name: "Aston Martin",
    base: "Silverstone, United Kingdom",
  },
  {
    id: 6,
    name: "Alpine",
    base: "Enstone, United Kingdom",
  },
  {
    id: 7,
    name: "Williams",
    base: "Grove, United Kingdom",
  },
  {
    id: 8,
    name: "RB (Visa Cash App RB F1 Team)",
    base: "Faenza, Italy",
  },
  {
    id: 9,
    name: "Sauber (Stake F1 Team Kick Sauber)",
    base: "Hinwil, Switzerland",
  },
  {
    id: 10,
    name: "Haas",
    base: "Kannapolis, United States",
  },
];

const drivers = [
  {
    id: 1,
    name: "Lewis Hamilton",
    team: "Red Bull Racing",
  },
  {
    id: 2,
    name: "Valtteri Bottas",
    team: "Mercedes",
  },
  {
    id: 3,
    name: "Max Verstappen",
    team: "Red Bull Racing",
  },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);

  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);

    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.code(404);
      return { message: "Driver not found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen(
  {
    /*port: PORT,*/
    port: 3333,
  },
  () => {
    console.log("Server iniciado com sucesso");
  }
);
